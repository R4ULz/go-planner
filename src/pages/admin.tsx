'use client'

import DashboardAdmin from "../components/admin/dashboardAdmin";
import UsersData from "../components/admin/usersData";
import { useState, useEffect } from "react";
import Header from "../components/Home/Header/Header";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/router";
import { ChartNoAxesCombinedIcon, LogOut, Users } from "lucide-react";

export default function Admin() {
  const [activeComponent, setActiveComponente] = useState("dashboardAdmin");
  const { user, logout } = useUser(); // Pegue o `user` e o `logout` do contexto
  const router = useRouter();

  useEffect(() => {
    // Redireciona se o usuário não for admin
    if (!user || user.role !== "admin") {
      router.replace("/autenticacao?modo=login");
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    alert("Você está saindo");
    router.push("/autenticacao");
  };

  const renderComponent = () => {
    if (activeComponent === "dashboardAdmin") {
      return <DashboardAdmin />;
    } else if (activeComponent === "usersData") {
      return <UsersData />;
    }
  };

  if (!user || user.role !== "admin") {
    // Enquanto verifica, você pode exibir um indicador de carregamento ou retornar null
    return null;
  }

  return (
    <div className="min-h-full flex flex-col items-center">
      <header className="fixed z-50 w-full flex justify-center bg-white border-b-[0.5px] border-zinc-200">
        <Header />
      </header>
      <main className="max-w-screen-2xl w-full flex gap-20 p-8 mt-20 items-start">
        <aside className="px-7 h-[700px] border-zinc-300 border-[1px] rounded-xl flex flex-col justify-start items-center gap-8 py-8 text-zinc-700">
          <div className="flex flex-col gap-8 flex-1">
            <button
              onClick={() => setActiveComponente("dashboardAdmin")}
              className={` size-22  border-laranjinha ${
                activeComponent === "dashboardAdmin" ? "border-b-[3px]" : ""
              }`}
            >
              <ChartNoAxesCombinedIcon />
            </button>
            <button
              onClick={() => setActiveComponente("usersData")}
              className={` size-22  border-rosinha  ${
                activeComponent === "usersData" ? "border-b-[3px]" : ""
              }`}
            >
              <Users />
            </button>
          </div>
          <button
            onClick={() => handleLogout()}
            className={` size-22 hover:text-rosinha ${
              activeComponent === "usersData" ? "border-b-[3px]" : ""
            }`}
          >
            <LogOut />
          </button>
        </aside>

        {renderComponent()}
      </main>
    </div>
  );
}
