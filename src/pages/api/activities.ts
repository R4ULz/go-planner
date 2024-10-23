import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/mongoose';
import Activity from '../../models/Activities'; // Modelo da atividade

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { nome, data, viagem } = req.body;

      if (!nome || !data || !viagem) {
        return res.status(400).json({ error: 'Dados obrigatórios não fornecidos' });
      }

      const novaAtividade = new Activity({
        nome,
        data,
        viagem
      });

      const savedActivity = await novaAtividade.save();
      return res.status(201).json(savedActivity);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar a atividade' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
