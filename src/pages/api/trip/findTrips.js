import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";

export default async function encontrarViagens(req, res) {
    await connect();

    if (req.method === 'GET') {
        try {
            const userId = req.query.id;

            if (!userId) {
                console.log("ID do usuário não fornecido.");
                return res.status(400).json({ error: "ID do usuário não fornecido" });
            }

            const viagens = await Trip.find({ criador: userId });
            console.log("Viagens encontradas:", viagens);

            return res.status(200).json(viagens);
        } catch (error) {
            console.error("Erro ao buscar viagens:", error);
            return res.status(500).json({ error: "Erro ao buscar viagens" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        console.log(`Método ${req.method} não permitido.`);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }
}