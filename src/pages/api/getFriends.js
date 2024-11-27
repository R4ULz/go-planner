import connect from "../../lib/mongoose";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  await connect();

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "ID do usuário é obrigatório" });
  }

  try {
    const user = await User.findById(userId).populate("amigos.amigoId", "nome email");
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const friends = user.amigos.map((amigo) => ({
      id: amigo.amigoId._id,
      nome: amigo.amigoId.nome,
      email: amigo.amigoId.email,
    }));

    res.status(200).json({ friends });
  } catch (error) {
    console.error("Erro ao buscar amigos:", error);
    res.status(500).json({ message: "Erro ao buscar amigos" });
  }
}
