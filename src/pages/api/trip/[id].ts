import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";

export default async function handler(req, res) {
    await connect();

    const { id } = req.query;

    if (req.method === "GET") {
        try {
            const trip = await Trip.findById(id);
            if (!trip) {
                return res.status(404).json({ error: "Viagem não encontrada" });
            }
            res.status(200).json(trip);
        } catch (error) {
            console.error("Erro ao buscar viagem:", error);
            res.status(500).json({ error: "Erro ao buscar viagem" });
        }
    } else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
