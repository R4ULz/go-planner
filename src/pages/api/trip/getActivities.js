import connect from "../../../lib/mongoose"
import Trip from "../../../models/Trip"

export default async function getActivities(req, res){
    await connect();

    if(req.method === "GET"){
        const {tripId} = req.query;

        if(!tripId){
            return res.status(400).json({error: "ID da viagem não fornecido"})
        }

        try{
            const viagem = await Trip.findById(tripId, 'atividades');
            if(!viagem){
                return res.status(404).json({error: "viagem não encontrada"})
            }
            return res.status(200).json(viagem.atividades)
        }catch(error){
            console.error("erro ao buscar atividades: ", error)
            return res.status(500).json({error: "erro ao buscar atividades"})
        }
    }else{
        res.setHeader('Allow', ["GET"]);
        return res.status(405).end(`método ${req.method} não permitido`)
    }
}