import connect from "../../lib/mongoose";;
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { currentUserId, friendEmail } = req.body;

    if (!currentUserId || !friendEmail) {
      return res.status(400).json({ message: "Dados insuficientes: Verifique o ID do usuário e o email do amigo." });
    }

    try {
      await connect();

      const friendUser = await User.findOne({ email: friendEmail });
      if (!friendUser) {
        return res.status(404).json({ message: "Usuário amigo não encontrado." });
      }

      const currentUser = await User.findByIdAndUpdate(
        currentUserId,
        { $addToSet: { amigos: friendUser._id } }, // Garante que o amigo não será adicionado mais de uma vez
        { new: true }
      );

      await User.findByIdAndUpdate(
        friendUser._id,
        { $addToSet: { amigos: currentUserId } }, // Garante que o usuário atual não será adicionado mais de uma vez
        { new: true }
      );

      res.status(200).json({ message: "Amizade estabelecida com sucesso!", friend: friendUser });
    } catch (error) {
      console.error("Erro ao estabelecer amizade:", error);
      res.status(500).json({ message: "Erro ao estabelecer amizade" });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}
