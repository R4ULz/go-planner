import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    const { id } = req.body; // Recebe o ID da viagem

    try {
        await connect();

        const viagem = await Trip.findById(id);

        if (!viagem) {
            return res.status(404).json({ message: "Viagem não encontrada" });
        }

        // Alternar o estado de 'favoritada'
        viagem.favoritada = !viagem.favoritada;
        await viagem.save();

        res.status(200).json({ message: "Favorito atualizado", favoritada: viagem.favoritada });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar favorito" });
    }
}