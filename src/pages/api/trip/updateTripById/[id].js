import connect from "../../../../lib/mongoose";
import Trip from "../../../../models/Trip";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await connect();

  const { id } = req.query;
  console.log(id)
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID da viagem inválido ou não fornecido" });
  }

  if (req.method === "PUT") {
    try {
      const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedTrip) {
        return res.status(404).json({ error: "Viagem não encontrada para atualização" });
      }
      res.status(200).json(updatedTrip);
    } catch (error) {
      console.error("Erro ao atualizar viagem:", error);
      res.status(500).json({ error: "Erro ao atualizar viagem" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
