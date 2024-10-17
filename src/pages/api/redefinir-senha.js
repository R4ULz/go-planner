import connect from '../../lib/mongoose';
import User from '../../models/User';
import bcrypt from 'bcryptjs'; // Para hash da nova senha

export default async function redefinirSenha(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'E-mail e nova senha são obrigatórios' });
  }

  try {
    // Busca o usuário pelo e-mail
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Gera um hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualiza a senha do usuário
    user.senha = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Senha alterada com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao alterar a senha', error });
  }
}
