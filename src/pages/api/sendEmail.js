import { enviarEmail } from '../../lib/emailService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email } = req.body;
  const mensagem = "Mensagem para voce"

  if (!email || !mensagem) {
    return res.status(400).json({ message: 'Parâmetros inválidos: é necessário enviar email e mensagem.' });
  }

  try {
    const response = await enviarEmail(email, mensagem);
    res.status(200).json({
      message: 'Email enviado com sucesso',
      response,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao enviar email',
      error: error.message,
    });
  }
}
