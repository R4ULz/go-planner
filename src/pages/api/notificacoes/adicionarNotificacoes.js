import connect from '../../../lib/mongoose'
import User from '../../../models/User'
import { v4 as uuidv4 } from 'uuid';

export default async function adicionarNotificacao(req, res){
    await connect();

    if(req.method === 'POST'){
        const {userId, tipo, mensagem, viagemId, remetenteId} = req.body

        if(!userId || !tipo || !mensagem){
            return res.status(400).json({error: "Dados incompletos fornecidos"});
        }

        try{
            const user = await User.findById(userId);
            if(!user){
                return res.status(404).json({error: "Usuário não encontrado"})
            }

            user.notificacoes.push({
                id: uuidv4(),
                tipo,
                mensagem,
                viagemId,
                remetenteId,
            })

            await user.save();
            
            res.status(201).json({message: "Notificação adicionada com sucesso"})
        }catch(error){
            console.error("erro ao adicionar notificação", error)
            res.status(500).json({error: "Erro ao adicionar notificação"})
        }
    }else{
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Método ${req.method} não permitido`)
    }
}