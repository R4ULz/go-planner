import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/mongoose";
import Trip from "../../models/Trip";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  console.log("Conexão com o banco de dados estabelecida.");

  if (req.method === "POST") {
    try {
      const {
        nomeViagem,
        partida,
        destino,
        dataIda,
        dataVolta,
        descricao,
        atividades,
        amigos,
        imagem,
      } = req.body;

      if (!nomeViagem || !destino || !dataIda || !dataVolta) {
        console.log("Erro: Dados obrigatórios faltando.");
        return res
          .status(400)
          .json({ error: "Dados obrigatórios não fornecidos" });
      }

      const novaViagem = new Trip({
        titulo: nomeViagem,
        partida,
        destino,
        dataInicio: dataIda,
        fimViagem: dataVolta,
        descricao,
        atividades,
        amigos,
        imagem,
      });

      const savedTrip = await novaViagem.save();
      console.log("Viagem salva com sucesso:", savedTrip);
      return res.status(201).json(savedTrip);
    } catch (error) {
      console.error("Erro ao criar a viagem:", error);
      return res.status(500).json({ error: "Erro ao criar a viagem" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    console.log(`Método ${req.method} não permitido.`);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
