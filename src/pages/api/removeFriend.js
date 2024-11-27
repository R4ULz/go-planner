import connect from '../../lib/mongoose';
import User from '../../models/User';

export default async function handlerRemove(req, res) {
  await connect();
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ message: 'ID do usuário ou do amigo não fornecido' });
  }

  try {
    // Remove friendId da lista de amigos de userId
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { amigos: friendId } },
      { new: true }
    ).populate('amigos', 'nome email');

    // Remove userId da lista de amigos de friendId
    const friend = await User.findByIdAndUpdate(
      friendId,
      { $pull: { amigos: userId } },
      { new: true }
    );

    if (!user || !friend) {
      return res.status(404).json({ message: 'Usuário ou amigo não encontrado' });
    }

    res.status(200).json({ message: 'Amigo removido de ambos os lados com sucesso', friends: user.amigos });
  } catch (error) {
    console.error('Erro ao remover amigo:', error);
    res.status(500).json({ message: 'Erro ao remover amigo' });
  }

}
  
