import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import User from '../../models/User';
import connect from '../../lib/mongoose';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await connect();

  if (req.method !== 'POST') {
    console.log("Método não permitido");
    return res.status(405).json({ message: 'Método não permitido' });
  }

  console.log("Iniciando processamento do formulário");

  const form = formidable({ 
    uploadDir: path.join(process.cwd(), 'public/uploads'), 
    keepExtensions: true 
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Erro ao processar o formulário:", err);
      return res.status(500).json({ message: 'Erro no upload da imagem' });
    }

    console.log("Formulário processado com sucesso:", { fields, files });

    const { id } = fields;
    const profilePicFile = files.profilePic;

    const filePath = profilePicFile
      ? `/uploads/${path.basename(Array.isArray(profilePicFile) ? profilePicFile[0].filepath : profilePicFile.filepath)}`
      : null;

    if (!filePath) {
      console.error("Caminho do arquivo não foi gerado corretamente");
      return res.status(500).json({ message: 'Erro ao salvar o caminho da imagem' });
    }

    console.log("Caminho da imagem gerado:", filePath);

    try {
      const user = await User.findByIdAndUpdate(id, { foto: filePath }, { new: true });
      if (!user) {
        console.error("Usuário não encontrado com o ID fornecido:", id);
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      console.log("Imagem de perfil atualizada com sucesso no banco de dados:", user);
      res.status(200).json({ message: 'Imagem de perfil atualizada com sucesso', foto: filePath });
    } catch (error) {
      console.error("Erro ao salvar a imagem no banco de dados:", error);
      res.status(500).json({ message: 'Erro ao salvar a imagem no banco de dados' });
    }
  });
}
