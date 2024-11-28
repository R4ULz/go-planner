import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";

export default async function encontrarViagensFavoritadas(req, res) {
    await connect();

    if (req.method === 'GET') {
        try {
            const userId = req.query.id;

            if (!userId) {
                console.log("ID do usuário não fornecido.");
                return res.status(400).json({ error: "ID do usuário não fornecido" });
            }

            // Filtrar viagens criadas pelo usuário que estão favoritadas
            const viagensFavoritadas = await Trip.find({ criador: userId, favoritada: true });
            console.log("Viagens favoritadas encontradas:", viagensFavoritadas);

            return res.status(200).json(viagensFavoritadas);
        } catch (error) {
            console.error("Erro ao buscar viagens favoritadas:", error);
            return res.status(500).json({ error: "Erro ao buscar viagens favoritadas" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        console.log(`Método ${req.method} não permitido.`);
        return res.status(405).end(`Método ${req.method} não permitido`);
    }
}
