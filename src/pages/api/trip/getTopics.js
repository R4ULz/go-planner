import connect from "../../../lib/mongoose";
import Trip from "../../../models/Trip";
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
          const trip = await Trip.findById(tripId).select('topicos');
      
          if (!trip) {
            return res.status(404).json({ message: 'Viagem não encontrada.' });
          }
      
          // Função para remover tags HTML
          const sanitizeHTML = (input) => {
            const div = document.createElement('div');
            div.innerHTML = input;
            return div.textContent || div.innerText || '';
          };
      
          // Limpa as tags HTML dos tópicos antes de enviar ao cliente
          const sanitizedTopics = trip.topicos.map((topic) => ({
            nome: sanitizeHTML(topic.nome),
            conteudo: sanitizeHTML(topic.conteudo),
          }));
      
          res.status(200).json({ message: 'Tópicos carregados com sucesso.', trip: { topicos: sanitizedTopics } });
        } catch (error) {
          console.error('Erro ao carregar tópicos:', error);
          res.status(500).json({ message: 'Erro ao carregar tópicos.', error });
        }
      }
    }