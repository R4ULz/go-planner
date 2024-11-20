import connect from '../../../lib/mongoose';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { userId, notificationId, action } = req.body;

  if (!userId || !notificationId || !action) {
    return res.status(400).json({ message: 'Dados obrigatórios não fornecidos' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const notification = user.notificacoes.find(
      (notificacao) => notificacao.id === notificationId
    );
    if (!notification) {
      return res.status(404).json({ message: 'Notificação não encontrada' });
    }

    if (action === 'ACCEPT') {
      notification.status = 'ACEITO';
    } else if (action === 'REJECT') {
      notification.status = 'REJEITADO';
    } else {
      return res.status(400).json({ message: 'Ação inválida' });
    }

    await user.save();
    return res.status(200).json({ message: 'Notificação atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar notificação:', error);
    return res.status(500).json({ message: 'Erro ao atualizar notificação', error });
  }
}
