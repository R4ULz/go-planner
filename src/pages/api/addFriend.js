import mongoose from 'mongoose';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { currentUserId, friendEmail } = req.body;

    if (!currentUserId || !friendEmail) {
      return res.status(400).json({ message: "Dados insuficientes" });
    }

    try {
      await mongoose.connect(process.env.MONGODB_URI_NICKY);

      // Verifica se o email está cadastrado
      const friendUser = await User.findOne({ email: friendEmail });
      if (!friendUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Adiciona o amigo ao array de amigos
      await User.findByIdAndUpdate(currentUserId, {
        $addToSet: { amigos: friendUser._id }
      });

      res.status(200).json({ message: "Amigo adicionado com sucesso!", friend: friendUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao adicionar amigo" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
