import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  partida: {type: String, required: true},
  destino: { type: String, required: true },
  dataInicio: { type: Date, required: true },
  fimViagem: { type: Date, required: true },
  descricao: { type: String },
  atividades: [{
    nome: { type: String, required: true },
    data: { type: Date, required: true },
    horario: { type: String, required: true }
  }],
  amigos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  imagem: { type: String },
});


export default mongoose.models.Trip || mongoose.model('Trip', tripSchema);
