import connect from '../../lib/mongoose';
import User from '../../models/User';

export default async function handler(req, res) {
  await connect();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'ID do usuário não fornecido' });
  }

  try {
    const user = await User.findById(userId).populate('amigos', 'nome email'); // Obtém nome e email dos amigos

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ friends: user.amigos });
  } catch (error) {
    console.error('Erro ao buscar amigos:', error);
    res.status(500).json({ message: 'Erro ao buscar amigos' });
  }
}