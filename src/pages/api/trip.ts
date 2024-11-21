import mongoose from "mongoose";
import connectToDatabase from "../../lib/mongoose";
import Trip from "../../models/Trip";
import User from "../../models/User";
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "POST") {
    const { nomeViagem, partida, destino, DataIda, DataRetorno, descricao, atividades, amigos, imagem, criador, topicos } = req.body;
    console.log("dados recebidos no backend ", req.body)

    if (!nomeViagem || !destino || !DataIda || !DataRetorno || !criador) {
      return res.status(400).json({ error: "Dados obrigatórios não fornecidos." });
    }

    try {
      const novaViagem = new Trip({
        titulo: nomeViagem,
        partida,
        destino,
        dataInicio: DataIda,
        fimViagem: DataRetorno,
        descricao,
        atividades,
        amigos: amigos.map((amigo) => ({
          amigoId: amigo.amigoId, // Conversão explícita para ObjectId
          status: amigo.status,
        })),
        imagem,
        criador: criador,
        topicos,
      });

      const savedTrip = await novaViagem.save();

      await Promise.all(
        amigos.map(async (amigo) => {
          await User.findByIdAndUpdate(amigo.amigoId, {
            $push: {
              notificacoes: {
                id: uuidv4(),
                tipo: "CONVITE_VIAGEM",
                mensagem: `Você foi convidado para a viagem "${nomeViagem}"`,
                viagemId: savedTrip._id,
                remetenteId: criador,
              },
            },
          });
        })
      );

      return res.status(201).json(savedTrip);
    } catch (error) {
      console.error("Erro ao criar a viagem:", error);
      return res.status(500).json({ error: "Erro ao criar a viagem." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Método ${req.method} não permitido.`);
  }
}
