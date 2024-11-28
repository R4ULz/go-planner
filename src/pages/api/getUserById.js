import connect from '../../lib/mongoose';
import User from '../../models/User';
import mongoose from 'mongoose';

export default async function getUserById(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { id } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        foto: user.foto,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ message: 'Erro ao buscar o usuário', error });
  }
}
