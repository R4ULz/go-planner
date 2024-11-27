import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID do usuário não fornecido" });
  }

  try {
    const viagens = await Trip.find({
      "amigos": {
        $elemMatch: {
            amigoId: id,
            status: "ACEITO",
        }
      }
    })
    .select("titulo destino partida descricao dataInicio fimViagem imagem amigos")
    .populate({
        path: "amigos.amigoId",
        select:"nome email",
    });

    const viagensComPermissoes = viagens.map((viagem) => ({
      ...viagem._doc,
      amigos: viagem.amigos.map((amigo) => ({
        amigoId: amigo.amigoId,
        status: amigo.status,
        permissao: amigo.permissao, // Inclui a permissão aqui
      })),
    }));

    console.log(viagensComPermissoes);
    return res.status(200).json(viagensComPermissoes);
  } catch (error) {
    console.error("Erro ao buscar viagens compartilhadas: ", error);
    return res.status(500).json({ error: "Erro ao buscar viagens compartilhadas" });
  }
}
