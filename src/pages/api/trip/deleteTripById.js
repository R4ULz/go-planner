import connect from '../../../lib/mongoose'; // Função para conectar ao MongoDB
import Trip from '../../../models/Trip'; // Modelo de dados da Viagem

export default async function handler(req, res) {
  const { method } = req;

  await connect(); // Conectando ao banco de dados

  if (method === 'POST') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID da viagem é obrigatório' });
    }

    try {
      const deletedTrip = await Trip.findByIdAndDelete(id);
      
      if (!deletedTrip) {
        return res.status(404).json({ message: 'Viagem não encontrada' });
      }

      res.status(200).json({ message: 'Viagem deletada com sucesso', deletedTrip });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar a viagem', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Método ${method} não permitido` });
  }
}