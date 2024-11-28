import jwt from 'jsonwebtoken';

// Middleware para autenticar o token
export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Adiciona o usuário ao objeto `req` para ser usado nas rotas
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

// Middleware para verificar se o usuário é administrador
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar esta rota.' });
  }
  next();
};