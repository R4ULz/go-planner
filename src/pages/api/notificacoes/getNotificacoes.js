import connect from "../../../lib/mongoose";
import User from "../../../models/User";

export default async function getNotificacao(req, res) {
    await connect();

    if(req.method === 'POST'){
        const {userId} = req.body;

        if(!userId){
            return res.status(400).json({error: 'ID do usuário não fornecido'})
        }

        try{
            const user = await User.findById(userId).select("notificacoes");

            if(!user){
                return res.status(404).json({error: "Usuário não encontrado"})
            }
            res.status(200).json({notifications: user.notificacoes || []});
        }catch(error){
            console.error("erro ao buscar notificacoes: ", error);
            res.status(500).json({error: 'Erro ao buscar notificacoes'})
        }
    }else{
        res.setHeader('Allow', ["GET"])
        res.status(405).end(`método ${req.method} não permitido`)
    }
}