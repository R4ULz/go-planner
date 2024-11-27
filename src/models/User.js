import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  cpf: {type: String, required: true, trim: true},
  foto: {type: String},
  amigos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, 
});

export default mongoose.models.User || mongoose.model('User', userSchema);
