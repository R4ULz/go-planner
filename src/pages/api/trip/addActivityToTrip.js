import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
    await connect();

    if (req.method === "POST") {
        const { tripId, atividade } = req.body;

        try {

            const atividadeComId = {...atividade, id: atividade.id || uuidv4}

            const trip = await Trip.findByIdAndUpdate(
                tripId,
                { $push: { atividades: atividadeComId } },
                { new: true }
            );

            if (!trip) return res.status(404).json({ error: "Viagem não encontrada" });

            res.status(200).json(trip.atividades);
        } catch (error) {
            console.error("Erro ao adicionar atividade:", error);
            res.status(500).json({ error: "Erro ao adicionar atividade" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
