import mongoose from 'mongoose';

const activitiesSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  date: {type: Date, required:true},
  viagem: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true }
});

export default mongoose.models.Activities || mongoose.model('Activities', activitiesSchema);