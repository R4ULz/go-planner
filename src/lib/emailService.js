import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

export const enviarEmail = async (email, templateData) => {
  if (!email || !templateData) {
    throw new Error('Parâmetros inválidos: é necessário enviar email e dados do template.');
  }

  // Caminho do template na pasta public
  const templatePath = path.join(process.cwd(), 'public', 'email-templates', 'invite.html');
  let template = fs.readFileSync(templatePath, 'utf-8');

  // Configuração do transporte SMTP
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // Seu email
      pass: process.env.EMAIL_PASS, // Senha de app gerada
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Convite para Viagem',
    html: template, // Enviar o HTML como conteúdo do email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso:', info.response);
    return info;
  } catch (error) {
    console.error('Erro ao enviar email:', error.message);
    throw error;
  }
};
