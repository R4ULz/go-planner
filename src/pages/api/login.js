import connect from '../../lib/mongoose';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }

    // Inclui o papel (role) no token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // Inclui o papel no token
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      user: {
        id: user._id.toString(),
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor', error });
  }
}
