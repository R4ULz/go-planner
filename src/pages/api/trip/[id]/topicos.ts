import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../../lib/mongoose';
import Trip from '../../../../models/Trip';
// Definindo o tipo de resposta
interface DataResponse {
  message: string;
  trip?: any;
  error?: any;
}

function sanitizeHTML(input: string): string {
  const div = document.createElement("div");
  div.innerHTML = input;
  return div.textContent || div.innerText || "";
}
// Função principal da API
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse>
) {
  const { tripId } = req.query;

  await connect();

  if (req.method === 'POST') {
    try {
      const { topics } = req.body;
  
      if (!Array.isArray(topics)) {
        return res.status(400).json({ message: 'Os tópicos enviados são inválidos.' });
      }
  
      // Limpa as tags HTML dos tópicos
      const sanitizedTopics = topics.map((topic: { nome: string; conteudo: string }) => ({
        nome: sanitizeHTML(topic.nome),
        conteudo: sanitizeHTML(topic.conteudo),
      }));
  
      // Atualizar o campo "topicos" no banco de dados
      const updatedTrip = await Trip.findByIdAndUpdate(
        tripId,
        { topicos: sanitizedTopics },
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
  }
}
