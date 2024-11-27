import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";

export default async function handler(req, res) {
    await connect();

    if (req.method === "PATCH") {
        const { tripId, atividadeId, concluida } = req.body;

        if (!tripId || !atividadeId || typeof concluida !== "boolean") {
            return res.status(400).json({ error: "Dados incompletos fornecidos" });
        }

        try {
            const trip = await Trip.findById(tripId);
            if (!trip) {
                console.log("Viagem não encontrada");
                return res.status(404).json({ error: "Viagem não encontrada" });
            }

            const atividade = trip.atividades.find((a) => a.id === atividadeId);
            if (!atividade) {
                console.log("Atividade não encontrada");
                return res.status(404).json({ error: "Atividade não encontrada" });
            }

            atividade.concluida = concluida;
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
