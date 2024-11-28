import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";
import sanitizeHtml from "sanitize-html"; // Importa a biblioteca

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log("Conectando ao banco de dados...");
      await connect();

      const { tripId } = req.query;

      if (!tripId) {
        return res.status(400).json({ message: "ID da viagem não fornecido." });
      }

      const trip = await Trip.findById(tripId).select("topicos");

      if (!trip) {
        return res.status(404).json({ message: "Viagem não encontrada." });
      }
      // Limpa as tags HTML dos tópicos antes de enviar ao cliente
      const sanitizedTopics = trip.topicos.map((topic) => ({
        nome: sanitizeHtml(topic.nome, { allowedTags: [], allowedAttributes: {} }),
        conteudo: sanitizeHtml(topic.conteudo, { allowedTags: [], allowedAttributes: {} }),
      }));

      res.status(200).json({ message: "Tópicos carregados com sucesso.", trip: { topicos: sanitizedTopics } });
    } catch (error) {
      console.error("Erro ao carregar tópicos:", error);
      res.status(500).json({ message: "Erro ao carregar tópicos.", error: error.message || error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Método ${req.method} não permitido.`);
  }
}
