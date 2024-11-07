import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  partida: {type: String, required: true},
  destino: { type: String, required: true },
  dataInicio: { type: Date, required: true },
  fimViagem: { type: Date, required: true },
  descricao: { type: String },
  atividades: [{
    nome: { type: String},
    data: { type: Date },
    horario: { type: String},
    concluida: {type: Boolean},
  }],
  amigos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  imagem: { type: String },
  criador:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});


export default mongoose.models.Trip || mongoose.model('Trip', tripSchema);
