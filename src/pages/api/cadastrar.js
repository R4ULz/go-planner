
import { hashPassword } from '../../lib/bcrypt';
import connect from '../../lib/mongoose';
import User from '../../models/User';

export default async function handler(req, res) {

  await connect();
  if (req.method === 'POST') {
    const { nome, email,cpf, senha } = req.body;
    const hashedPassword = await hashPassword(senha);
    const user = new User({ nome, email, cpf, senha: hashedPassword });

    try {
      console.log("usuario antes de mandar pro banco", user)
      const savedUser = await user.save();
      console.log(savedUser)
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: savedUser });
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      res.status(500).json({ message: 'Erro ao salvar o usuário' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
