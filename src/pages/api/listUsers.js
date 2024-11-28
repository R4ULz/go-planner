import connect from "../../lib/mongoose";
import User from "../../models/User";
export default async function handler(req, res) {
  await connect();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({}, { senha: 0 }); // Evita retornar a senha
        return res.status(200).json(users);
      } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar usuários." });
      }

    case "DELETE":
      try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: "ID do usuário é necessário." });

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ error: "Usuário não encontrado." });

        return res.status(200).json({ message: "Usuário excluído com sucesso." });
      } catch (error) {
        return res.status(500).json({ error: "Erro ao excluir usuário." });
      }

    default:
      return res.status(405).json({ error: "Método não permitido." });
  }
}