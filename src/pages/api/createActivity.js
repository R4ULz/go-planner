import connect from "../../lib/mongoose";
import Activity from "../../models/Activities";
import Trip from "../../models/Trip";

export default async function handler(req, res) {
  await connect();

  if (req.method === 'POST') {
    try {
      const { viagemId, nome, data } = req.body;

      const viagem = await Trip.findById(viagemId);
      if (!viagem) {
        return res.status(404).json({ success: false, error: 'Viagem não encontrada' });
      }

      const newActivity = new Activity({
        nome,
        data, 
        viagem: viagemId
      });

      const savedActivity = await newActivity.save();


      res.status(201).json({ success: true, data: savedActivity });

    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }
}