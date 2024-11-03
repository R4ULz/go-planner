import connect from '../../lib/mongoose';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { id, novoEmail, nome, senha } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de usuário inválido' });
  }

  try {
    const existingUser = await User.findOne({ email: novoEmail });
    if (existingUser && existingUser._id.toString() !== id) {
      return res.status(400).json({ message: 'O novo email já está em uso por outro usuário' });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        nome,
        email: novoEmail,
        ...(senha && {
          senha: await bcrypt.hash(senha, 10), // Se a senha foi alterada, atualiza-a
        }),
      },
      { new: true, runValidators: true } // Retorna o novo documento e valida os campos
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json({ message: 'Dados atualizados com sucesso', user: updatedUser });
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    return res.status(500).json({ message: 'Erro ao atualizar o usuário', error });
  }
}
