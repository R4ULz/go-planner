import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
      const { tripId, topicos } = req.body;

      try {
          await connect();

          const trip = await Trip.findByIdAndUpdate(
              tripId,
              { topicos },
              { new: true }
          );

          if (!trip) {
              return res.status(404).json({ message: "Viagem não encontrada" });
          }

          res.status(200).json({ message: "Tópicos atualizados com sucesso", trip });
      } catch (error) {
          console.error("Erro ao atualizar tópicos:", error);
          res.status(500).json({ message: "Erro ao atualizar tópicos", error });
      }
  } else {
      res.setHeader("Allow", ["PATCH"]);
      res.status(405).end(`Método ${req.method} não permitido`);
  }
}
