import Link from "next/link";
import { IconeLogo } from "./icons";

export default function Header(){
    return (
        <div className="h-20 flex px-8 justify-between items-center gap-10 bg-white">
            <div className="">
                {IconeLogo}
            </div>
            <nav className="hidden sm:flex space-x-4 font-inter">
                <Link href="/sobre" className="text-gray-500 hover:text-gray-900"> Sobre</Link>
                <Link href="como-funciona" className="text-gray-500 hover:text-gray-900">Como Funciona</Link>
                <Link href="lugares" className="text-gray-500 hover:text-gray-900">Lugares</Link>
            </nav>
            <div className="flex items-center gap-5">
                <Link href="/login" className="border border-rosinha flex items-center px-7 py-2 rounded-2xl font-inter">Login</Link>
                <Link href="/cadastrar" className="bg-rosinha flex items-center px-7 py-2 rounded-2xl text-white font-inter">Cadastre-se</Link>

            </div>
        </div>
    )
}