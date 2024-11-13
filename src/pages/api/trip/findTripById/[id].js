import connect from "../../../../lib/mongoose";
import Trip from "../../../../models/Trip";
import mongoose from "mongoose";

export default async function handler(req, res) {
    await connect();

    const { id } = req.query; // Extrai o `id` da query

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID da viagem inválido" });
    }

    if (req.method === "GET") {
        try {
            const viagem = await Trip.findById(id);

            if (!viagem) {
                return res.status(404).json({ error: "Viagem não encontrada" });
            }

            return res.status(200).json(viagem);
        } catch (error) {
            console.error("Erro ao buscar viagem:", error);
            return res.status(500).json({ error: "Erro ao buscar viagem" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }
}
