import mongoose from 'mongoose';

const activitiesSchema = new mongoose.Schema({
  descricao:{type: String, required:true}
});

export default mongoose.models.Activities || mongoose.model('Activities', tripSchema);