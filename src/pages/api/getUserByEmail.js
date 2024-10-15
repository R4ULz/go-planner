import connect from '../../lib/mongoose';
import User from '../../models/User';

export default async function getUserByEmail(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { id } = req.body;

  try {
    // Busca o usuário pelo email no MongoDB
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Se o usuário for encontrado, retorna os dados
    return res.status(200).json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o usuário', error });
  }
}
