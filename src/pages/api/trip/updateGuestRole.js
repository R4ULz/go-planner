import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { tripId, guestId, permissao } = req.body;
  console.log(tripId, guestId, permissao)
  
  if (!tripId || !guestId || !permissao) {
    return res.status(400).json({ message: "Dados obrigatórios não fornecidos" });
  }

  if (!["LEITOR", "EDITOR"].includes(permissao)) {
    return res.status(400).json({ message: "Role inválido. Use 'LEITOR' ou 'EDITOR'." });
  }

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Viagem não encontrada" });
    }

    const guest = trip.amigos.find(
      (amigo) => amigo.amigoId.toString() === guestId.toString() && amigo.status === "ACEITO"
    );

    if (!guest) {
      return res.status(404).json({ message: "Convidado não encontrado ou não aceitou o convite" });
    }

    guest.permissao = permissao;

    await trip.save();

    return res.status(200).json({ message: "Papel do convidado atualizado com sucesso", guest });
  } catch (error) {
    console.error("Erro ao atualizar papel do convidado:", error);
    return res.status(500).json({ message: "Erro interno do servidor", error });
  }
}
