import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../lib/mongoose';
import Trip from '../../../../models/Trip';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'PATCH') {
    try {
      const { id } = req.query;
      const { amigos } = req.body; // Array de IDs dos amigos a serem adicionados

      if (!amigos || !Array.isArray(amigos)) {
        return res.status(400).json({ error: 'Lista de amigos inválida' });
      }

      const viagem = await Trip.findById(id);

      if (!viagem) {
        return res.status(404).json({ error: 'Viagem não encontrada' });
      }

      // Adicionando amigos à viagem
      viagem.amigos.push(...amigos);
      const updatedTrip = await viagem.save();

      return res.status(200).json(updatedTrip);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao adicionar amigos à viagem' });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
