import connect from '../../lib/mongoose';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { email, nome, senha } = req.body;

  try {
    // Busca o usuário pelo email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Atualiza o nome do usuário
    user.nome = nome;


    // Se uma nova senha foi fornecida, criptografa-a antes de salvar
    if (senha) {
      const salt = await bcrypt.genSalt(10);
      user.senha = await bcrypt.hash(senha, salt);
    }

    // Salva o usuário com os novos dados
    await user.save();

    return res.status(200).json({ message: 'Dados atualizados com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    return res.status(500).json({ message: 'Erro ao atualizar o usuário', error });
  }
}
