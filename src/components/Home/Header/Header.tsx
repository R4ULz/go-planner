import Link from "next/link";
import { IconeLogo } from "../../icons/index";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@/src/contexts/UserContext";
import { notifications } from "../../icons/notifications";
import NotificationList from "./NotificationList";

export default function Header() {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);
  const [userData, setUserData] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);

  // Função para buscar notificações
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(`/api/notificacoes/getNotificacoes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) throw new Error("Erro ao buscar notificações");

        const data = await response.json();
        const unreadNotifications = data.notifications.filter(
          (notification) => !notification.lida
        );
        setNotificationsList(unreadNotifications || []);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    if (user) fetchNotifications();
  }, [user]);

  // Função para buscar dados do usuário
  const fetchUserData = async () => {
    if (!user?.id) return;

    try {
      const response = await fetch("/api/getUserById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });

      if (!response.ok) throw new Error("Erro ao buscar dados do usuário");

      const data = await response.json();
      setUserData(data.user);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleNotificationAction = async (notificationId, action) => {
    try {
      const response = await fetch(`/api/notificacoes/gerenciarNotificacoes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          notificationId,
          action,
        }),
      });

      if (!response.ok) throw new Error("Erro ao processar notificação");

      setNotificationsList((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error("Erro ao processar notificação:", error);
    }
  };

  return (
    <div className="h-20 w-full flex justify-between items-center max-w-screen-2xl gap-10 px-5">
      <div className="flex items-center gap-10">
        <Link href="/">{IconeLogo}</Link>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-900">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <nav className="hidden md:flex space-x-8 font-inter">
        <Link href="/sobre" className="text-gray-500 hover:text-gray-900">
          Sobre
        </Link>
        <Link href="/#como-funciona" className="text-gray-500 hover:text-gray-900">
          Como Funciona
        </Link>
        <Link href="/#lugares" className="text-gray-500 hover:text-gray-900">
          Lugares
        </Link>
      </nav>

      {menuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4">
          <Link href="/sobre" className="text-gray-500 hover:text-gray-900">
            Sobre
          </Link>
          <Link href="#como-funciona" className="text-gray-500 hover:text-gray-900">
            Como Funciona
          </Link>
          <Link href="#lugares" className="text-gray-500 hover:text-gray-900">
            Lugares
          </Link>

          {user ? (
            <Link href={{ pathname: "/perfil" }}>
              <Image
                className="rounded-full mt-2"
                src={userData?.foto ? userData.foto : "/imgs/perfil.jpg"}
                alt="Imagem de perfil"
                width={50}
                height={50}
              />
            </Link>
          ) : (
            <div className="flex flex-col items-center gap-3 mt-4">
              <Link
                href={{ pathname: "/autenticacao", query: { modo: "login" } }}
                className="border border-rosinha flex items-center px-7 py-2 rounded-2xl font-inter text-gray-500 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                href={{ pathname: "/autenticacao", query: { modo: "cadastro" } }}
                className="bg-rosinha flex items-center px-7 py-2 rounded-2xl text-white font-inter"
              >
                Cadastre-se
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="hidden md:flex items-center gap-5">
        {user ? (
          <div className="flex items-center gap-7">
            <button onClick={toggleNotifications} className="size-5">
              {notifications}
              {notificationsList.length > 0 && (
                <span className="relative bottom-9 left-3 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notificationsList.length}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <NotificationList
                notifications={notificationsList}
                onAction={handleNotificationAction}
              />
            )}

            <Link href={{ pathname: "/perfil" }}>
              <Image
                className="rounded-full"
                src={userData?.foto ? userData.foto : "/imgs/perfil.jpg"}
                alt="Imagem de perfil"
                width={50}
                height={50}
              />
            </Link>
          </div>
        ) : (
          <>
            <Link
              href={{ pathname: "/autenticacao", query: { modo: "login" } }}
              className="border border-rosinha flex items-center px-7 py-2 rounded-2xl font-inter text-gray-500 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              href={{ pathname: "/autenticacao", query: { modo: "cadastro" } }}
              className="bg-rosinha flex items-center px-7 py-2 rounded-2xl text-white font-inter"
            >
              Cadastre-se
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
