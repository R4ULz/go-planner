import connect from "../../lib/mongoose";
import User from '../../models/User';
import { enviarEmail } from '../../lib/emailService';

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
        // Enviar email para convidar a pessoa a se cadastrar
        try {
          const mensagem = `
            Olá,

            Você foi convidado para se cadastrar no Go.Planner, um aplicativo de planejamento de viagens.

            Clique no link abaixo para se registrar:
            https://go-planner.com/register

            Abraços,
            Equipe Go.Planner
          `;

          await enviarEmail(friendEmail, mensagem);

          return res.status(200).json({
            message: "Usuário amigo não encontrado. Email de convite enviado com sucesso.",
          });
        } catch (emailError) {
          console.error("Erro ao enviar email de convite:", emailError);
          return res.status(500).json({
            message: "Usuário amigo não encontrado e falha ao enviar email de convite.",
          });
        }
      }

      // Adicionar o amigo se ele for encontrado no banco de dados
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
