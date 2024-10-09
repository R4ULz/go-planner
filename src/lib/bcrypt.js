import bcrypt from 'bcryptjs';

export const hashPassword = async (senha) => {
  const salt = await bcrypt.genSalt(10); // Gera um salt para segurança extra
  const hashedData = await bcrypt.hash(senha, salt); // Criptografa os dados
  return hashedData;
};
