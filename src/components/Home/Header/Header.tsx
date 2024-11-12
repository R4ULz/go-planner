import Link from "next/link";
import { IconeLogo } from "../../icons/index";
import { useState } from "react";
import Image from "next/image";
import { useUser } from "@/src/contexts/UserContext";

export default function Header() {
    const { user } = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div className="h-20 w-full flex justify-between items-center max-w-screen-2xl gap-10 px-5">
            <div className="flex items-center gap-10">
                <Link href="/">{IconeLogo}</Link>
            </div>

            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-900">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <nav className="hidden md:flex space-x-8 font-inter">
                <Link href="/sobre" className="text-gray-500 hover:text-gray-900">Sobre</Link>
                <Link href="/como-funciona" className="text-gray-500 hover:text-gray-900">Como Funciona</Link>
                <Link href="/lugares" className="text-gray-500 hover:text-gray-900">Lugares</Link>
            </nav>

            {menuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4">
                    <Link href="/sobre" className="text-gray-500 hover:text-gray-900">Sobre</Link>
                    <Link href="/como-funciona" className="text-gray-500 hover:text-gray-900">Como Funciona</Link>
                    <Link href="/lugares" className="text-gray-500 hover:text-gray-900">Lugares</Link>

                    {user ? (
                        <Link href={{ pathname: '/perfil' }}>
                            <Image className="rounded-full mt-2" src="/imgs/perfil.jpg" alt="Imagem de perfil" width={50} height={50} />
                        </Link>
                    ) : (
                        <div className="flex flex-col items-center gap-3 mt-4">
                            <Link href={{ pathname: '/autenticacao', query: { modo: 'login' } }} className="border border-rosinha flex items-center px-7 py-2 rounded-2xl font-inter text-gray-500 hover:text-gray-900">Login</Link>
                            <Link href={{ pathname: '/autenticacao', query: { modo: 'cadastro' } }} className="bg-rosinha flex items-center px-7 py-2 rounded-2xl text-white font-inter">Cadastre-se</Link>
                        </div>
                    )}
                </div>
            )}

            <div className="hidden md:flex items-center gap-5">
                {user ? (
                    <Link href={{ pathname: '/perfil' }}>
                        <Image className="rounded-full" src="/imgs/perfil.jpg" alt="Imagem de perfil" width={50} height={50} />
                    </Link>
                ) : (
                    <>
                        <Link href={{ pathname: '/autenticacao', query: { modo: 'login' } }} className="border border-rosinha flex items-center px-7 py-2 rounded-2xl font-inter text-gray-500 hover:text-gray-900">Login</Link>
                        <Link href={{ pathname: '/autenticacao', query: { modo: 'cadastro' } }} className="bg-rosinha flex items-center px-7 py-2 rounded-2xl text-white font-inter">Cadastre-se</Link>
                    </>
                )}
            </div>
        </div>
    );
}
