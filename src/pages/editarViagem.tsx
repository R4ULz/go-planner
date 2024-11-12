import { useEffect, useState } from "react";
import Footer from "../components/Home/Footer/footer";
import Header from "../components/Home/Header/Header";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/router";
import axios from "axios";
import EditarViagemLayout from "../components/criarViagem copy/LayoutE";

export default function EditarViagem() {
    const router = useRouter();
    const { tripId } = router.query; // Pega o tripId da URL
    const { user } = useUser();
    const [showModal, setShowModal] = useState(false);
    const [menuEnabled, setMenuEnabled] = useState(false);
    const [tripData, setTripData] = useState({
        titulo: "", // Certifique-se de que o campo corresponde ao banco de dados
        partida: "",
        destino: "",
        DataIda: "",
        DataRetorno: "",
        descricao: "",
        atividades: [],
        amigos: [],
        imagem: null,
    });

    // Carrega os dados da viagem para edição
    useEffect(() => {
        const fetchTripData = async () => {
            try {
                if (tripId) {
                    const response = await axios.get(`/api/trip/${tripId}`);
                    const data = response.data;
                    
                    // Atualizando todos os campos do estado tripData
                    setTripData({
                        titulo: data.titulo || "", // Usando o campo correto
                        partida: data.partida || "",
                        destino: data.destino || "",
                        DataIda: data.DataIda || "",
                        DataRetorno: data.DataRetorno || "",
                        descricao: data.descricao || "",
                        imagem: data.imagem || "/imgs/rio.jpg",
                        atividades: data.atividades || [],
                        amigos: data.amigos || []
                    });
                }
            } catch (error) {
                console.error("Erro ao carregar dados da viagem para edição:", error);
            }
        };

        if (user) {
            setShowModal(false); 
            fetchTripData();
        } else {
            setShowModal(true); 
        }
    }, [tripId, user]);

    const handleRedirect = () => {
        // Salva o caminho para redirecionamento após login
        sessionStorage.setItem("redirectAfterLogin", `/editarViagem?tripId=${tripId}`);
        setShowModal(false);
        router.push({
            pathname: '/autenticacao',
            query: { modo: 'login' }
        });
    };

    return (
        <div>
            {user ? (
                <div className="flex h-screen flex-col">
                    <header className="fixed z-50 w-full flex justify-center bg-white border-b-[0.5px] border-zinc-200">
                        <Header />
                    </header>
                    <div className="mt-20 p-5 w-full flex justify-center">
                        <EditarViagemLayout
                            tripId={tripId}
                            tripData={tripData}
                            menuEnabled={menuEnabled}
                            setMenuEnabled={setMenuEnabled}
                        />
                    </div>
                    <footer className="w-full flex justify-center bg-black">
                        <Footer />
                    </footer>
                </div>
            ) : (
                showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/35 backdrop-blur-sm">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Acesso não permitido</h2>
                            <p className="mb-4 text-lg">Você precisa estar logado para acessar a edição da viagem.</p>
                            <button
                                onClick={handleRedirect}
                                className="bg-gradient-to-r to-rosinha from-laranja text-white px-4 py-2 rounded-lg"
                            >
                                Fazer login
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
