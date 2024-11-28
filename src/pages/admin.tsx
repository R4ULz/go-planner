'use client'

import DashboardAdmin from "../components/admin/dashboardAdmin"
import UsersData from "../components/admin/usersData"
import { useState } from "react"
import Header from "../components/Home/Header/Header"
import { useUser } from "../contexts/UserContext"
import { useRouter } from "next/router"
import { ChartNoAxesCombinedIcon, Group, LogOut, Users } from "lucide-react"

export default function Admin(){
  const[activeComponent, setActiveComponente] = useState("dashboardAdmin")
  const { user } = useUser();
  const { logout } = useUser();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout();
    alert("Você está saindo");
    router.push("/autenticacao");
  };


  const renderComponent= () => {
    if(activeComponent === "dashboardAdmin"){
      return <DashboardAdmin />
    }
    else if (activeComponent === "usersData"){
      return <UsersData />
    }
  }
  if (!user || user.role !== 'admin') {
    return (
      showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/35 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-lg p-24">
            <h2 className="text-xl font-bold mb-4">Acesso não permitido</h2>
            <p className="mb-4 text-lg">
              Você precisa estar logado como administrador para acessar o painel.
            </p>
            <button
              onClick={() => router.push('/autenticacao?modo=login')}
              className="bg-gradient-to-r to-rosinha from-laranja text-white px-4 py-2 rounded-lg"
            >
              Fazer login
            </button>
          </div>
        </div>
      )
    );
  }
  return(
    <div className="min-h-full flex flex-col items-center">
       <header className="fixed z-50 w-full flex justify-center bg-white border-b-[0.5px] border-zinc-200">
        <Header />
      </header>
      <main className="max-w-screen-2xl w-full flex gap-20 p-8 mt-20 items-start">
        <aside className="px-7 h-[700px] border-zinc-300 border-[1px] rounded-xl flex flex-col justify-start items-center gap-8 py-8 text-zinc-700">
          <div className="flex flex-col gap-8 flex-1">
            <button onClick={() => setActiveComponente('dashboardAdmin')} className={` size-22  border-laranjinha ${
              activeComponent === "dashboardAdmin" ? "border-b-[3px]" : ""
            }`}>
              <ChartNoAxesCombinedIcon />
            </button>
            <button onClick={() => setActiveComponente('usersData')} className={` size-22  border-rosinha  ${
              activeComponent === "usersData" ? "border-b-[3px]" : ""
            }`}>
              <Users/>
            </button>
          </div>
          <button onClick={() => handleLogout()} className={` size-22 hover:text-rosinha ${
            activeComponent === "usersData" ? "border-b-[3px]" : ""
          }`}>
            <LogOut/>
          </button> 
        </aside>

      {renderComponent()}

      </main>
    </div>
  )
}