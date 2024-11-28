import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import Trip from '../../models/Trip';
import connect from '../../lib/mongoose';

export const config = {
  api: {
    bodyParser: false, // Necessário para o formidable
  },
};

export default async function handler(req, res) {
  await connect(); // Conecta ao banco de dados

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  // Configuração do formidable para salvar as imagens em public/imgsTrip
  const form = formidable({
    uploadDir: path.join(process.cwd(), 'public/imgsTrip'),
    keepExtensions: true, // Mantém a extensão original do arquivo
  });

  // Processa o formulário com formidable
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Erro ao processar o formulário:', err);
      return res.status(500).json({ message: 'Erro no upload da imagem' });
    }

    const { id } = fields; // ID da viagem
    const imageFile = files.image; // Arquivo enviado

    // Valida se o arquivo foi enviado corretamente
    if (!imageFile) {
      return res.status(400).json({ message: 'Nenhuma imagem foi enviada.' });
    }

    // Gera o caminho da imagem
    const filePath = `/imgsTrip/${path.basename(imageFile.filepath)}`;

    try {
      // Atualiza a viagem no banco de dados com a URL da imagem
      const trip = await Trip.findByIdAndUpdate(
        id,
        { imagem: filePath },
        { new: true } // Retorna o documento atualizado
      );

      if (!trip) {
        return res.status(404).json({ message: 'Viagem não encontrada' });
      }

      // Retorna a URL da imagem salva
      return res.status(200).json({
        message: 'Imagem da viagem atualizada com sucesso',
        imagem: filePath,
      });
    } catch (error) {
      console.error('Erro ao salvar a imagem no banco de dados:', error);
      return res.status(500).json({ message: 'Erro ao salvar a imagem no banco de dados' });
    }
  });
}
