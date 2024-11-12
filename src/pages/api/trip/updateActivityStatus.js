import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";

export default async function handler(req, res) {
    await connect();

    if (req.method === "PATCH") {
        const { tripId, atividadeIndex, concluida } = req.body;

        if (!tripId || atividadeIndex == null || typeof concluida !== "boolean") {
            return res.status(400).json({ error: "Dados incompletos fornecidos" });
        }

        try {
            const trip = await Trip.findById(tripId);
            if (!trip) {
                return res.status(404).json({ error: "Viagem não encontrada" });
            }

            trip.atividades[atividadeIndex].concluida = concluida;
            await trip.save();

            res.status(200).json({ message: "Status da atividade atualizado com sucesso" });
        } catch (error) {
            console.error("Erro ao atualizar atividade:", error);
            res.status(500).json({ error: "Erro ao atualizar atividade" });
        }
    } else {
        res.setHeader("Allow", ["PATCH"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
