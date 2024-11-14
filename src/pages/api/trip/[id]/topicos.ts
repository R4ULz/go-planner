import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../lib/mongoose';
import Trip from '../../../../models/Trip';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  console.log('Conexão com o banco de dados estabelecida.');

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { topicos } = req.body;

      if (!topicos) {
        return res.status(400).json({ error: 'Os tópicos não foram fornecidos.' });
      }

      const updatedTrip = await Trip.findByIdAndUpdate(
        id,
        { topicos },
        { new: true }
      );

      if (!updatedTrip) {
        return res.status(404).json({ error: 'Viagem não encontrada.' });
      }

      console.log('Tópicos atualizados com sucesso:', updatedTrip);
      return res.status(200).json(updatedTrip);
    } catch (error) {
      console.error('Erro ao atualizar os tópicos:', error);
      return res.status(500).json({ error: 'Erro ao atualizar os tópicos.' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    console.log(`Método ${req.method} não permitido.`);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}