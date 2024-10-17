
import { hashPassword } from '../../lib/bcrypt';
import connect from '../../lib/mongoose';
import User from '../../models/User';

export default async function handler(req, res) {

  await connect();
  if (req.method === 'POST') {
    const { nome, email, senha } = req.body;
    const hashedPassword = await hashPassword(senha)
    const user = new User({ nome, email, senha: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
