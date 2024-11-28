import mongoose from 'mongoose';
import connect from '../../lib/mongoose';
import User from '../../models/User';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: `Método ${req.method} não permitido` });
    }

    await connect();

    const { currentUserId, friendEmail } = req.body;

    if (!currentUserId || !friendEmail) {
        return res.status(400).json({ message: 'Dados obrigatórios não fornecidos' });
    }

    try {
        // Verifica se o usuário atual existe
        const currentUser = await User.findById(currentUserId);
        if (!currentUser) {
            return res.status(404).json({ message: 'Usuário atual não encontrado' });
        }

        // Verifica se o amigo com o email fornecido existe
        const friend = await User.findOne({ email: friendEmail });
        if (!friend) {
            return res.status(404).json({ message: 'Usuário com este email não encontrado' });
        }

        const alreadyFriends = currentUser.amigos.some(
            (amigo) => amigo.amigoId.toString() === friend._id.toString()
        );
        if (alreadyFriends) {
            return res.status(400).json({ message: 'Vocês já são amigos!' });
        }

        friend.notificacoes.push({
            id: new mongoose.Types.ObjectId(),
            tipo: 'SOLICITACAO_AMIZADE',
            mensagem: `${currentUser.nome} enviou uma solicitação de amizade.`,
            lida: false,
            remetenteId: currentUser._id,
        });

        await friend.save();

        return res.status(200).json({ message: 'Solicitação de amizade enviada com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar amigo:', error);
        return res.status(500).json({ message: 'Erro ao adicionar amigo.' });
    }
}
