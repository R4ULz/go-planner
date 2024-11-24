import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const atividadeSchema = new mongoose.Schema({
  id: { type: String, default: () => uuidv4() }, 
  nome: { type: String, required: true },
  data: { type: Date, required: true },
  horario: { type: String },
  concluida: { type: Boolean, default: false },
});

const tripSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  partida: { type: String, required: true },
  destino: { type: String, required: true },
  dataInicio: { type: Date, required: true },
  fimViagem: { type: Date, required: true },
  descricao: { type: String },
  atividades: [atividadeSchema],
  topicos: [
    {
      nome: { type: String },
      conteudo: { type: String },
    },
  ],
  amigos: [
    {
      amigoId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, enum: ["PENDENTE", "ACEITO", "RECUSADO"], default: "PENDENTE" },
      permissao: { type: String, enum: ['EDITOR', 'LEITOR'], default: 'LEITOR' }
    },
  ],
  imagem: { type: String },
  criador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.models.Trip || mongoose.model('Trip', tripSchema);
