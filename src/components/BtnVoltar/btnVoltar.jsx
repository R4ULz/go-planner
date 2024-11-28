import { useRouter } from "next/router";

export default function Voltar(){
    const router = useRouter();

    return(
        <button onClick={() => router.back()} className="px-4 py-2 bg-gradient-to-r from-rosinha to-laranja text-white rounded-xl hover:bg-blue-600 transition">
            Voltar
        </button>
    );
}