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
  atividades: [
    {
      nome: { type: String },
      data: { type: Date },
      horario: { type: String },
      concluida: { type: Boolean },
    },
  ],
  topicos: [
    {
      nome: { type: String },
      conteudo: { type: String },
    },
  ],
  amigos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  imagem: { type: String },
  criador: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.models.Trip || mongoose.model('Trip', tripSchema);
