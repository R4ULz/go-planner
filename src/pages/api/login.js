import connect from "../../lib/mongoose";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `Método ${req.method} não permitido` });
  }

  await connect();

  const { email, senha } = req.body;

  try {
    console.log("Tentativa de login com:", { email });

    const user = await User.findOne({ email });

    if (!user) {
      console.log("Usuário não encontrado");
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);

    if (!isMatch) {
      console.log("Usuário ou senha incorretos");
      return res.status(401).json({ message: "Usuário ou senha incorretos" });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );



    return res.status(200).json({
      user: {
        id: user._id.toString(),
        nome: user.nome,
        email: user.email,
        foto: user.foto,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error); // Mostra o erro completo no console
    return res.status(500).json({ message: "Erro interno do servidor", error });
  }
}
