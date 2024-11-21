import connect from "../../../lib/mongoose";
import User from "../../../models/User";

export default async function handler(req, res) {
    await connect();
  
    if (req.method === 'PATCH') {
      const { userId, notificacaoId } = req.body;
  
      if (!userId || !notificacaoId) {
        return res.status(400).json({ error: 'Dados incompletos fornecidos' });
      }
  
      try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
  
        const notificacao = user.notificacoes.id(notificacaoId);
        if (!notificacao) {
          return res.status(404).json({ error: 'Notificação não encontrada' });
        }
  
        notificacao.lida = true;
  
        await user.save();
  
        res.status(200).json({ message: 'Notificação marcada como lida' });
      } catch (error) {
        console.error('Erro ao atualizar notificação:', error);
        res.status(500).json({ error: 'Erro ao atualizar notificação' });
      }
    } else {
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Método ${req.method} não permitido`);
    }
  }
  