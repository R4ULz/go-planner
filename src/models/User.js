import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  cpf: {type: String, required: true, trim: true},
  foto: {type: String},
  amigos: [
    {
      amigoId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      status: { type: String, enum: ["PENDENTE", "ACEITO"], default: "PENDENTE" }, // Status do convite
    },
  ],
  notificacoes: [
    {
      id: {type: String, required: true},
      tipo: {type: String, enum: ['SOLICITACAO_AMIZADE', 'CONVITE_VIAGEM'], required: true},
      mensagem: {type: String, required: true},
      data: {type: Date, default: Date.now},
      lida:{type: Boolean, default: false},
      viagemId:{ type:mongoose.Schema.Types.ObjectId, ref: 'Trip'},
      remetenteId:{ type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    }
  ]
});

export default mongoose.models.User || mongoose.model('User', userSchema);
