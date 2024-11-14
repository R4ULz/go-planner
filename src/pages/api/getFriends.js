import connect from "../../lib/mongoose";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { friendIds } = req.body;

  if (!friendIds || friendIds.length === 0) {
    return res.status(400).json({ message: 'IDs dos amigos são necessários' });
  }

  try {
    // Busca os amigos pelo array de IDs recebido
    const friends = await User.find({ _id: { $in: friendIds } }, 'nome email');

    if (!friends || friends.length === 0) {
      return res.status(404).json({ message: 'Nenhum amigo encontrado' });
    }

    return res.status(200).json({ friends });
  } catch (error) {
    console.error('Erro ao buscar amigos:', error);
    return res.status(500).json({ message: 'Erro ao buscar amigos' });
  }
}
