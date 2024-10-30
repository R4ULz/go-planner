import { useEffect, useState } from "react";
import Layout from "../components/criarViagem/Layout";
import Footer from "../components/Home/Footer/footer";
import Header from "../components/Home/Header/Header";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/router";

export default function CriarViagem() {
    const router = useRouter();
    const { pontoPartida, pontoDestino } = router.query;
    const { user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [menuEnabled, setMenuEnabled] = useState(false);
    const [tripData, setTripData] = useState({
        partida: "",
        destino: ""
    });

    useEffect(() => {
        setShowModal(true);
        console.log("Valores da URL:", { pontoPartida, pontoDestino });
        if (pontoPartida && pontoDestino) {
            setTripData({
                partida: pontoPartida as string,
                destino: pontoDestino as string
            });
        }
    }, [pontoPartida, pontoDestino]);

    const handleRedirect = () => {

        sessionStorage.setItem("redirectAfterLogin",
            `/criarViagem?pontoPartida=${pontoPartida}&pontoDestino=${pontoDestino}`);

        setShowModal(false);
        router.push({
            pathname: '/autenticacao',
            query: { modo: 'login' }
        });
    };

    return (
        <div>
            {user ?
                <div className="flex h-screen flex-col">
                    <header className="fixed z-50 w-full flex justify-center bg-white border-b-[0.5px] border-zinc-200fixed z-50 w-full flex justify-center bg-white border-b-[0.5px] border-zinc-200">
                        <Header />
                    </header>
                    <div className="mt-20 p-5 w-full flex justify-center">
                        <Layout 
                            tripData={tripData} 
                            menuEnabled={menuEnabled} 
                            setMenuEnabled={setMenuEnabled} 
                        />
                    </div>
                    <div className="p-5 mt-20 w-full flex justify-center">
                        <Layout
                            tripData={tripData}
                            menuEnabled={menuEnabled}
                            setMenuEnabled={setMenuEnabled}
                        />
                    </div>
                    <footer className="w-full flex justify-center bg-black" className="w-full flex justify-center bg-black">
                        <Footer />
                    </footer>
                </div>
                :
                showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/35 backdrop-blur-sm">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
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
    );
}
