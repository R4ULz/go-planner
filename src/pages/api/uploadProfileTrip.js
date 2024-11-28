import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const uploadDir = path.join(process.cwd(), 'public/uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Erro ao fazer upload:', err);
      return res.status(500).json({ message: 'Erro ao fazer upload' });
    }

    console.log('Arquivos recebidos:', files);

    const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!uploadedFile || !uploadedFile.filepath) {
      return res.status(400).json({ message: 'Nenhum arquivo foi enviado ou arquivo inválido' });
    }

    const fileUrl = `/uploads/${path.basename(uploadedFile.filepath)}`;

    res.status(200).json({ url: fileUrl }); // Retorna o URL da imagem
  });
}
