import TxtHome from "@/src/components/Home/Section1/TxtHome";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from '../contexts/UserContext';
import { LogoAutent } from "../components/icons";
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css';

export default function Login() {
    const router = useRouter()
    const { login } = useUser();
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nome, setNome] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [modo, setModo] = useState<"login" | "cadastro">("login");
    const [message, setMessage] = useState("")
    const [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        if (router.query.modo) {
            setModo(router.query.modo as "login" | "cadastro");
        }
    }, [router.query.modo]);

    useEffect(() => {
        if (modo === "login") {
            setEmail("");
            setSenha("");
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
            body: JSON.stringify
            ({ 
                email, 
                senha }),
          });
      
          const data = await res.json();

          if (res.ok) {
            login(data.user);
            const redirectUrl = sessionStorage.getItem("redirectAfterLogin") || '/perfil';
            sessionStorage.removeItem("redirectAfterLogin"); 
            router.push(redirectUrl); 

        } else {
            setMessage(data.message);
            setShowMessage(true);
            console.log('Erro no login:', data.message);
        }
        } catch (error) {
          console.log('Erro ao se conectar ao servidor', error);
        }
      };
      


      const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        if (senhasNaoIguais()) {
            return;
        }

        if(camposVazios()){
            return
        }
    
        try {
            const userData = { nome, email, senha };
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
                })
                router.push('/autenticacao?modo=login');
            } else {
                alert('Erro ao cadastrar: ' + data.message);
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
                            <input type="text" className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-2 border focus:border-blue-500 focus:outline-none focus:bg-white" placeholder="Email:" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-2 border focus:border-blue-500 focus:outline-none focus:bg-white" placeholder="Senha:" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                            <Link className="text-zinc-300 text-sm font-inter float-end" href={'/recuperarSenha'}>Esqueceu a senha?</Link>
                            <div className="mt-10 space-y-3">
                                <p className="text-white flex justify-center font-inter text-sm gap-1">Não tem login? Clique em <a onClick={() => setModo("cadastro")} className="text-laranja cursor-pointer"> Cadastrar</a></p>
                                <button onClick={handleLogin} className="w-full flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-7 py-3 text-white rounded-xl font-bold text-sm">Fazer Login <i className="pi pi-arrow-right"></i></button>
                            </div>
                            <div className="flex flex-row justify-between items-center gap-3 mt-3">
                                <hr className="bg-zinc-300 h-[1px] w-full" />
                                <p className="text-zinc-300">Ou</p>
                                <hr className="bg-zinc-300 h-[1px] w-full" />
                            </div>
                            <div className="mt-3">
                                <button className="w-full flex gap-2 items-center font-inter justify-center bg-white px-7  text-zinc-500 py-3 rounded-xl text-sm">
                                    <i><svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_197_99)">
                                        <path d="M25.9492 13.5135C25.9492 12.4266 25.861 11.6334 25.6702 10.8109H13.2583V15.7168H20.5438C20.397 16.936 19.6038 18.7721 17.8411 20.0058L17.8164 20.1701L21.7408 23.2103L22.0127 23.2374C24.5097 20.9313 25.9492 17.5382 25.9492 13.5135Z" fill="#4285F4" />
                                        <path d="M13.2584 26.4395C16.8277 26.4395 19.8241 25.2643 22.0128 23.2374L17.8412 20.0058C16.7249 20.7843 15.2266 21.3278 13.2584 21.3278C9.76253 21.3278 6.79546 19.0217 5.73778 15.8343L5.58275 15.8475L1.5021 19.0055L1.44873 19.1539C3.62262 23.4723 8.08797 26.4395 13.2584 26.4395Z" fill="#34A853" />
                                        <path d="M5.73721 15.8343C5.45813 15.0118 5.29662 14.1304 5.29662 13.2197C5.29662 12.309 5.45813 11.4277 5.72252 10.6052L5.71513 10.43L1.58334 7.22119L1.44816 7.28549C0.552193 9.07752 0.0380859 11.0899 0.0380859 13.2197C0.0380859 15.3496 0.552193 17.3619 1.44816 19.1539L5.73721 15.8343Z" fill="#FBBC05" />
                                        <path d="M13.2584 5.1116C15.7407 5.1116 17.4152 6.18386 18.37 7.07993L22.1009 3.43713C19.8095 1.30729 16.8277 0 13.2584 0C8.08797 0 3.62262 2.96707 1.44873 7.28549L5.7231 10.6052C6.79546 7.41774 9.76253 5.1116 13.2584 5.1116Z" fill="#EB4335" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_197_99">
                                            <rect width="26" height="26.5306" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                    </i>
                                    Continue com Google</button>
                            </div>
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
                            <input type="text" className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-2 border focus:border-blue-500 focus:outline-none focus:bg-white" placeholder="Nome:" value={nome} onChange={(e) => setNome(e.target.value)} required/>
                            <input type="email" className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-2 border focus:border-blue-500 focus:outline-none focus:bg-white" placeholder="Email:" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <input type="password" className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-2 border focus:border-blue-500 focus:outline-none focus:bg-white" placeholder="Senha:" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
                            <input type="password" className="w-full text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-2 border focus:border-blue-500 focus:outline-none focus:bg-white" placeholder="Confirmar senha:" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required/>
                            <div className="mt-3">
                                <p className="text-white flex justify-center font-inter text-sm gap-1">Já possui uma conta? Clique em<a onClick={() => setModo("login")} className="text-laranja cursor-pointer">Login</a></p>
                                <button className="w-full flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-7 py-3 text-white rounded-xl font-bold text-sm" onClick={handleSubmit}>Cadastrar <i className="pi pi-arrow-right"></i></button>
                            </div>
                            <div className="flex flex-row justify-between items-center gap-3 mt-3">
                                <hr className="bg-zinc-300 h-[1px] w-full" />
                                <p className="text-zinc-300">Ou</p>
                                <hr className="bg-zinc-300 h-[1px] w-full" />
                            </div>
                            <div>
                                <button className="w-full flex gap-2 items-center font-inter justify-center mt-3 bg-white px-7  text-zinc-500 py-3 rounded-xl text-sm">
                                    <i><svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_197_99)">
                                        <path d="M25.9492 13.5135C25.9492 12.4266 25.861 11.6334 25.6702 10.8109H13.2583V15.7168H20.5438C20.397 16.936 19.6038 18.7721 17.8411 20.0058L17.8164 20.1701L21.7408 23.2103L22.0127 23.2374C24.5097 20.9313 25.9492 17.5382 25.9492 13.5135Z" fill="#4285F4" />
                                        <path d="M13.2584 26.4395C16.8277 26.4395 19.8241 25.2643 22.0128 23.2374L17.8412 20.0058C16.7249 20.7843 15.2266 21.3278 13.2584 21.3278C9.76253 21.3278 6.79546 19.0217 5.73778 15.8343L5.58275 15.8475L1.5021 19.0055L1.44873 19.1539C3.62262 23.4723 8.08797 26.4395 13.2584 26.4395Z" fill="#34A853" />
                                        <path d="M5.73721 15.8343C5.45813 15.0118 5.29662 14.1304 5.29662 13.2197C5.29662 12.309 5.45813 11.4277 5.72252 10.6052L5.71513 10.43L1.58334 7.22119L1.44816 7.28549C0.552193 9.07752 0.0380859 11.0899 0.0380859 13.2197C0.0380859 15.3496 0.552193 17.3619 1.44816 19.1539L5.73721 15.8343Z" fill="#FBBC05" />
                                        <path d="M13.2584 5.1116C15.7407 5.1116 17.4152 6.18386 18.37 7.07993L22.1009 3.43713C19.8095 1.30729 16.8277 0 13.2584 0C8.08797 0 3.62262 2.96707 1.44873 7.28549L5.7231 10.6052C6.79546 7.41774 9.76253 5.1116 13.2584 5.1116Z" fill="#EB4335" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_197_99">
                                            <rect width="26" height="26.5306" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                    </i>
                                    Continue com Google</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}