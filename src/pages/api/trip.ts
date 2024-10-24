import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongoose';
import Trip from '../../models/Trip'; // Modelo da viagem

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { titulo, destino, dataInicio, fimViagem, descricao, atividades, amigos, imagem } = req.body;

      if (!titulo || !destino || !dataInicio || !fimViagem) {
        return res.status(400).json({ error: 'Dados obrigatórios não fornecidos' });
      }

      const novaViagem = new Trip({
        titulo,
        destino,
        dataInicio,
        fimViagem,
        descricao,
        atividades,
        amigos,
        imagem
      });

      const savedTrip = await novaViagem.save();
      return res.status(201).json(savedTrip);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar a viagem' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
