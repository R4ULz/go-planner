import connect from '../../lib/mongoose';
import User from '../../models/User';

export default async function getUserByEmail(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'E-mail inválido ou não fornecido' });
  }

  try {
    // Busca o usuário pelo e-mail no MongoDB
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Se o usuário for encontrado, retorna os dados
    return res.status(200).json({
      message: 'Usuário encontrado com sucesso',
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        foto: user.foto,
        cpf: user.cpf,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o usuário', error });
  }
}
