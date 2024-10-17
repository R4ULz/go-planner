import Link from "next/link";
import InputTxt from "../components/inputs/InputTxt";
import { useState } from "react";
import TxtHome from "../components/Home/Section1/TxtHome";
import { LogoAutent } from "../components/icons";
import { useRouter } from "next/router";

export default function RecuperarSenha() {
  const [email, setEmail] = useState(""); 
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [isEmailVerified, setIsEmailVerified] = useState(false); 
  const [newPassword, setNewPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [passwordError, setPasswordError] = useState(""); 
  const router = useRouter()

  // Função para verificar o e-mail
  const handleEmailVerification = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/getUserByEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsEmailVerified(true); 
        setMessage("Verificação de e-mail bem-sucedida! Agora você pode redefinir sua senha.");
      } else {
        setMessage(data.message || "Ocorreu um erro ao verificar o e-mail.");
      }
    } catch (error) {
      setMessage("Erro ao tentar verificar o e-mail.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setLoading(true);
    setMessage("");
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/redefinir-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Senha alterada com sucesso! Você já pode fazer login.");
        router.push('/autenticacao')
      } else {
        setMessage(data.message || "Ocorreu um erro ao redefinir a senha.");
      }
    } catch (error) {
      setMessage("Erro ao tentar redefinir a senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-hero-login w-screen h-screen bg-cover bg-center flex">
      <div className="w-full h-full flex">
        <div className="w-1/2 h-full bg-black/35 backdrop-blur-sm rounded-r-3xl flex flex-col justify-center items-center">
          <Link href="/">
            <i className="flex justify-center">
              {LogoAutent}
            </i>
          </Link>
          <div className="w-1/2">
            {!isEmailVerified ? (
              <>
                <p className="text-white text-xl text-center">
                  Digite seu e-mail para verificarmos se você está registrado em nossa base de dados
                </p>
                <InputTxt
                  placeholder="Email:"
                  valor={email}
                  valorMudou={setEmail}
                  tipo="text"
                  obrigatorio
                />
                <div className="mt-10 space-y-3">
                  <button
                    onClick={handleEmailVerification}
                    className="w-full flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-7 py-3 text-white rounded-xl font-bold text-sm"
                    disabled={loading}
                  >
                    {loading ? "Verificando..." : "Verificar Email"}
                    <i className="pi pi-arrow-right"></i>
                  </button>

                  {message && (
                    <p className="text-center text-white mt-4">
                      {message}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="text-white text-xl text-center">
                  E-mail verificado! Agora, digite sua nova senha.
                </p>
                <InputTxt
                  placeholder="Nova senha:"
                  valor={newPassword}
                  valorMudou={setNewPassword}
                  tipo="password"
                  obrigatorio
                />
                <InputTxt
                  placeholder="Confirmar senha:"
                  valor={confirmPassword}
                  valorMudou={setConfirmPassword}
                  tipo="password"
                  obrigatorio
                />
                <div className="mt-10 space-y-3">
                  {passwordError && (
                    <p className="text-center text-red-500 mt-2">
                      {passwordError}
                    </p>
                  )}
                  <button
                    onClick={handlePasswordReset}
                    className="w-full flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-7 py-3 text-white rounded-xl font-bold text-sm"
                  >
                    Alterar Senha
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center w-1/2 p-20">
          <TxtHome />
        </div>
      </div>
    </div>
  );
}
