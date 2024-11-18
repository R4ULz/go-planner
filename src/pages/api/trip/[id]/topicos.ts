import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../../lib/mongoose';
import Trip from '../../../../models/Trip';
// Definindo o tipo de resposta
interface DataResponse {
  message: string;
  trip?: any;
  error?: any;
}

// Função principal da API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse>
) {
  const { tripId } = req.query;

  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { topics } = req.body;

      if (!Array.isArray(topics)) {
        return res.status(400).json({ message: 'Os tópicos enviados são inválidos.' });
      }

      // Atualizar o campo "topicos" no banco de dados
      const updatedTrip = await Trip.findByIdAndUpdate(
        tripId,
        { topicos: topics },
        { new: true } // Retorna o documento atualizado
      );

      if (!updatedTrip) {
        return res.status(404).json({ message: 'Viagem não encontrada.' });
      }

      res.status(200).json({ message: 'Tópicos atualizados com sucesso.', trip: updatedTrip });
    } catch (error) {
      console.error('Erro ao atualizar tópicos:', error);
      res.status(500).json({ message: 'Erro ao atualizar tópicos.', error });
    }
  } else if (req.method === 'GET') {
    try {
      const trip = await Trip.findById(tripId).select('topicos');

      if (!trip) {
        return res.status(404).json({ message: 'Viagem não encontrada.' });
      }

      res.status(200).json({ message: 'Tópicos carregados com sucesso.', trip });
    } catch (error) {
      console.error('Erro ao carregar tópicos:', error);
      res.status(500).json({ message: 'Erro ao carregar tópicos.', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${req.method} não permitido.`);
  }
}