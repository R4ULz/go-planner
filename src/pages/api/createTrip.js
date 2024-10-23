import connect from '../../lib/mongoose';
import Trip from '../../models/Trip'

export default async function createTrip(req,res){
    await connect();
        try {
          const { titulo, destino, dataInicio, fimViagem, descricao } = req.body;

          const newTrip = new Trip({
            titulo,
            destino,
            dataInicio,
            fimViagem,
            descricao,  
          });
          
          const savedTrip = await newTrip.save();
          
          res.status(201).json({ success: true, data: savedTrip._id });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
  

}
