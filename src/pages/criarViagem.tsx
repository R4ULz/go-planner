import { useEffect, useState } from "react";
import Layout from "../components/criarViagem/Layout";
import Footer from "../components/Home/Footer/footer";
import Header from "../components/Home/Header/Header";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/router";



export default function CriarViagem(){

    const { user } = useUser();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(true);
    },[user, router])
  
    const handleRedirect = () => {
      setShowModal(false);
      router.push({
          pathname: '/autenticacao',
          query: { modo: 'login' }  
      });
  };

    return(
        <div>
            {user ?
            <div className="flex h-screen flex-col">
                <header className="">
                    <Header></Header>
                </header>
                <div className="p-5 w-full flex justify-center">
                    <Layout></Layout>
                </div>
                <footer>
                    <Footer></Footer>
                </footer>
            </div>
            :
            showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/35 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-lg shadow-lg p-24">
                        <h2 className="text-xl font-bold mb-4">Acesso não permitido</h2>
                        <p className="mb-4 text-lg">Você precisa estar logado para acessar o perfil.</p>
                        <button
                            onClick={handleRedirect}
                            className="bg-gradient-to-r to-rosinha from-laranja text-white px-4 py-2 rounded-lg"
                        >
                            Fazer login
                        </button>
                    </div>
                </div>
            )
                }
        </div>
    )
}