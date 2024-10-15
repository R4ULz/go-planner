import bcrypt from 'bcryptjs';
import connect from '../../lib/mongoose';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { email, senha } = req.body;
  console.log('Dados recebidos:', { email, senha });
  try {
    // Busca o usuário pelo email
    const user = await User.findOne({ email });
    console.log(user.email, user.senha)
    // Se o usuário não for encontrado
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se a senha está correta
    const isMatch = await bcrypt.compare(senha, user.senha);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Se a autenticação for bem-sucedida
    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
}