import bcrypt from 'bcryptjs';

export const hashPassword = async (senha) => {
  const salt = await bcrypt.genSalt(10); 
  const hashedData = await bcrypt.hash(senha, salt); 
  return hashedData;
};
