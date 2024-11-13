import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";

export default async function handler(req, res) {
    await connect();

    if (req.method === "POST") {
        const { tripId, atividade } = req.body;

        try {
            // Encontra a viagem pelo ID e adiciona a nova atividade ao array
            const trip = await Trip.findByIdAndUpdate(
                tripId,
                { $push: { atividades: atividade } }, // Adiciona a atividade ao array
                { new: true } // Retorna o documento atualizado
            );

            if (!trip) return res.status(404).json({ error: "Viagem não encontrada" });

            res.status(200).json(trip.atividades); // Retorna o array atualizado de atividades
        } catch (error) {
            console.error("Erro ao adicionar atividade:", error);
            res.status(500).json({ error: "Erro ao adicionar atividade" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
