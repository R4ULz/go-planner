export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar esta rota.' });
  }
  next();
};