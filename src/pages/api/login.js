import connect from '../../lib/mongoose';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();  // Certifique-se de que a conexão com o MongoDB está correta

  const { email, senha } = req.body;

  try {
    console.log('Tentativa de login com:', { email });

    // Busca o usuário pelo email
    const user = await User.findOne({ email });

    if (!user) {
      console.log('Usuário não encontrado');
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica a senha
    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      console.log('Senha incorreta');
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Se tudo está correto, retorna os dados do usuário
    console.log('Login bem-sucedido', user._id);
    return res.status(200).json({
      user: {
        id: user._id.toString(),
        nome: user.nome,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error); // Mostra o erro completo no console
    return res.status(500).json({ message: 'Erro interno do servidor', error });
  }
}
