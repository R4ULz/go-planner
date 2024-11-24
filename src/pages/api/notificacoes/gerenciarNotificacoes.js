import connect from "../../../lib/mongoose";
import User from "../../../models/User";
import Trip from "../../../models/Trip";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { userId, notificationId, action } = req.body;

  if (!userId || !notificationId || !action) {
    return res.status(400).json({ message: "Dados obrigatórios não fornecidos" });
  }

  try {
    // Buscar o usuário pelo ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Buscar a notificação
    const notification = user.notificacoes.find(
      (notificacao) => notificacao.id === notificationId
    );
    if (!notification) {
      return res.status(404).json({ message: "Notificação não encontrada" });
    }

    // Marca a notificação como lida
    notification.lida = true;

    // Caso: Convite de viagem
    if (notification.tipo === "CONVITE_VIAGEM") {
      const trip = await Trip.findById(notification.viagemId);
      if (!trip) {
        return res.status(404).json({ error: "Viagem não encontrada." });
      }

      const amigoExistente = trip.amigos.find(
        (amigo) => amigo.amigoId.toString() === user._id.toString()
      );
      if (!amigoExistente) {
        return res.status(404).json({ error: "Amigo não encontrado na viagem." });
      }

      amigoExistente.status = action === "ACCEPT" ? "ACEITO" : "RECUSADO";

      await trip.save();
    }

    // Caso: Convite de amizade
    if (notification.tipo === "SOLICITACAO_AMIZADE") {
      const requester = await User.findById(notification.remetenteId);
      if (!requester) {
        return res.status(404).json({ message: "Remetente do convite não encontrado" });
      }

      if (action === "ACCEPT") {
        // Adiciona a amizade em ambos os usuários
        user.amigos.push({ amigoId: requester._id });
        requester.amigos.push({ amigoId: user._id });
        await requester.save();
      }
    }

    // Remove a notificação processada
    user.notificacoes = user.notificacoes.filter(
      (notificacao) => notificacao.id !== notificationId
    );

    await user.save();

    return res.status(200).json({ message: "Notificação atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar notificação:", error);
    return res.status(500).json({ message: "Erro ao atualizar notificação", error });
  }
}
