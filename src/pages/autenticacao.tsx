import TxtHome from "@/src/components/Home/Section1/TxtHome";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from '../contexts/UserContext';
import { LogoAutent } from "../components/icons";
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css';
import { olhoCortado } from "../components/icons/olhoCortado";
import { olhoAberto } from "../components/icons/olhoAberto";
import InputMask from 'react-input-mask';
import Voltar from "../components/BtnVoltar/btnVoltar";
import VoltarSetinha from "../components/BtnVoltar/btnSetinha";


export default function Login() {
    const router = useRouter()
    const { login } = useUser();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nome, setNome] = useState("")
    const [cpf, setCPF] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [modo, setModo] = useState<"login" | "cadastro">("login");
    const [message, setMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)

    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar senha
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar senha de confirmação

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    useEffect(() => {
        if (router.query.modo) {
            setModo(router.query.modo as "login" | "cadastro");
        }
    }, [router.query.modo]);

    useEffect(() => {
        if (modo === "login") {
            setEmail("");
            setSenha("");
            setConfirmarSenha("");
            setNome("");
            setCPF("");
            setShowMessage(false);
        }
    }, [modo]);



    function senhasNaoIguais() {
        if (senha !== confirmarSenha) {
            setMessage("As senhas não são iguais");
            setShowMessage(true)
            return true;
        }
        return false;
    }

    function camposVazios(){
        if(!nome || !email || !senha){
            setMessage("Todos os campos são obrigatórios!")
            setShowMessage(true)
            return true;
        }
        setShowMessage(false)
        return false
    }

    const handleLogin = async () => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                login(data.user, data.token);
                
                if (data.user.role === 'admin') {
                    router.push('/admin'); // Redireciona para o painel de administrador
                } else {
                    router.push('/perfil'); // Redireciona para a página de perfil
                }
            } else {
                setMessage(data.message);
                setShowMessage(true);
                console.log('Erro no login:', data.message);
            }
        } catch (error) {
            console.log('Erro ao se conectar ao servidor', error);
        }
    };
      


      const handleCadastro = async (e: any) => {

        if (!email.endsWith('@gmail.com')) {
            Toastify({
                text: 'Somente emails do domínio @gmail.com são permitidos.',
                duration: 3000,
                close:true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true,
                style:{
                    background: "#EB4335",
                }
            }).showToast()
            return;
        }

        if (senhasNaoIguais()) {
            return;
        }

        if(camposVazios()){
            return
        }
    
        try {
            const userData = { nome, email, senha, cpf };
            console.log("Dados enviados para API:", userData);
            
            const res = await fetch('/api/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            const data = await res.json();
    
            if (res.ok) {
                Toastify({
                    text: 'Cadastro realizado com sucesso, redirecionando para a página de login...',
                    duration: 3000,
                    close:true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true,
                    style:{
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast()
                setModo('login')
            } else {
                Toastify({
                    text: data.message,
                    duration: 3000,
                    close:true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true,
                    style:{
                        background: "#EB4335",
                    }
                }).showToast()
            }
        } catch (error) {
            console.error('Erro ao se conectar ao servidor', error);
            alert('Ocorreu um erro ao tentar cadastrar');
        }
    };
    


    return (
        <div className="bg-hero-login w-screen h-screen bg-cover bg-center flex">
            {modo === "login"
                ?
                <div className="w-full h-full flex">

                    <div className="w-1/2 h-full bg-black/35 backdrop-blur-sm rounded-r-3xl flex flex-col justify-center items-center">
                    <div className="flex flex-start items-center justify-start w-2/3">
                        <VoltarSetinha/>
                    </div>
                        <Link href="/">
                        <i className="flex justify-center">
                            {LogoAutent}
                        </i>
                        </Link>
                        <div className="w-1/2">
                        {showMessage && (
                            <p className="text-red-800 p-3 mt-5 border flex justify-center rounded-lg bg-red-300 border-red-700">
                                {message}
                            </p>
                        )}
                        
                            <form onSubmit={(e) => {e.preventDefault(); handleLogin();}}>
                                <input type="text" className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-2 border focus:border-rosinha focus:outline-none focus:bg-white" placeholder="Email:" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-2 border focus:border-rosinha focus:outline-none focus:bg-white"
                                        placeholder="Senha:"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}/>
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-6 text-zinc-400"
                                    >
                                        {showPassword ? (olhoCortado) : (olhoAberto)}
                                    </button>
                                </div>
                                <Link className="text-zinc-300 text-sm font-inter float-end" href={'/recuperarSenha'}>Esqueceu a senha?</Link>
                                <div className="mt-10 space-y-3">
                                    <p className="text-white flex justify-center font-inter text-sm gap-1">Não tem login? Clique em <a onClick={() => setModo("cadastro")} className="text-laranja cursor-pointer"> Cadastrar</a></p>
                                    <button type="submit" className="w-full flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-7 py-3 text-white rounded-xl font-bold text-sm">Fazer Login <i className="pi pi-arrow-right"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-1/2 p-20">
                        <TxtHome />
                    </div>
                </div>
                :
                <div className="w-full h-full flex">
                    <div className="flex justify-center items-center w-1/2 p-20">
                        <TxtHome />
                    </div>
                    <div className="w-1/2 h-full bg-black/35 backdrop-blur-sm rounded-l-3xl flex flex-col justify-center items-center">
                    <div className="flex flex-start items-center justify-start w-2/3">
                        <VoltarSetinha/>
                    </div>
                    <Link href="/">
                        <i className="flex justify-center">
                            {LogoAutent}
                        </i>
                        </Link>
                        <p className="flex text-lg text-zinc-300 font-bold p-3">Cadastro</p>
                        {showMessage && (
                            <p className="text-red-800 p-3 mt-5 border rounded-lg bg-red-300 border-red-700">
                                {message}
                            </p>
                        )}
                        <div className="w-1/2">
                            <form onSubmit={(e) => {e.preventDefault(); handleCadastro();}}>
                                <input type="text" className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-2 border focus:border-rosinha focus:outline-none focus:bg-white" placeholder="Nome:" value={nome} onChange={(e) => setNome(e.target.value)} required/>
                                <input type="email" className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-5 border focus:border-rosinha focus:outline-none focus:bg-white" placeholder="Email:" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <InputMask type="text" className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-5 border focus:border-rosinha focus:outline-none focus:bg-white" placeholder="CPF:" mask="999.999.999-99" value={cpf} onChange={(e) => setCPF(e.target.value)} required/>
                                
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-5 border focus:border-rosinha focus:outline-none focus:bg-white"
                                        placeholder="Senha:"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}/>
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-6 text-zinc-400"
                                    >
                                        {showPassword ? (olhoCortado) : (olhoAberto)}
                                    </button>
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-5 border focus:border-rosinha focus:outline-none focus:bg-white"
                                        placeholder="Confirmar Senha:"
                                        value={confirmarSenha}
                                        onChange={(e) => setConfirmarSenha(e.target.value)}/>
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute right-3 top-6 text-zinc-400"
                                    >
                                        {showConfirmPassword ? (olhoCortado) : (olhoAberto)}
                                    </button>
                                </div>
                                <div className="mt-3">
                                    <p className="text-white flex justify-center font-inter text-sm gap-1">Já possui uma conta? Clique em<a onClick={() => setModo("login")} className="text-laranja cursor-pointer">Login</a></p>
                                    <button type="submit" className="w-full flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-7 py-3 text-white rounded-xl font-bold text-sm">Cadastrar <i className="pi pi-arrow-right"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}