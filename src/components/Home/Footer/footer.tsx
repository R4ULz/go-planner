import { IconeLogo } from "../../icons/index"
import { Xlogo } from "../../icons/X"
import { FacebookLogo } from "../../icons/facebook"
import { InstagramLogo } from "../../icons/instagram"
import { LinkedInLogo } from "../../icons/linkedin"

export default function Footer(){
    return(
    <div className="flex flex-col font-rubik text-white w-full max-w-screen-2xl h-full bg-black px-8">
        <div className="flex md:py-20 flex-row justify-between sm:py-10">

            <div className="font-bold">
                {IconeLogo}

                <div className="flex flex-col md:text-4xl w-[15em] mt-5 sm:text-2xl">
                    <div className="flex">
                        <p >Transforme a maneira como </p>
                    </div>

                    <div className="flex flex-row">
                        <p>você explora o mundo</p><span className="bg-laranja md:w-3 md:h-3 rounded-full p-1 flex md:mt-6 ml-1 sm:w-2 sm:h-2 sm:mt-5"></span>
                    </div>

                </div>

                <div className="mt-10 text-white opacity-[50%]">
                    VIVA GRANDES AVENTURAS!
                </div>

            </div>

            <div className="flex flex-row md:gap-[7em] sm:gap-[2em]">

                <div className="flex flex-col gap-5">
                    <div>
                        <h1 className="no-underline">Company</h1>
                    </div>

                    <div className="opacity-[50%]">
                        <ul>
                            <li className="no-underline hover:cursor-pointer hover:underline">Blogs</li>
                            <li className="no-underline hover:cursor-pointer hover:underline">Carreiras</li>
                            <li className="no-underline hover:cursor-pointer hover:underline">Viagens</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <div>
                        <h1 className="no-underline">Locais</h1>
                    </div>

                    <div className="opacity-[50%]">
                        <ul>
                            <li className="no-underline hover:cursor-pointer hover:underline">Brasil</li>
                            <li className="no-underline hover:cursor-pointer hover:underline">Espanha</li>
                            <li className="no-underline hover:cursor-pointer hover:underline">Estados Unidos</li>
                            <li className="no-underline hover:cursor-pointer hover:underline">França</li>
                            <li className="no-underline hover:cursor-pointer hover:underline">Itália</li>
                            <li className="no-underline hover:cursor-pointer hover:underline">Japão</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <div>
                        <h1 className="no-underline">Legais</h1>
                    </div>

                    <div className="opacity-[50%]">
                        <ul>
                            <li className="no-underline hover:cursor-pointer hover:underline">Termos e Serviços</li>
                            <li className="no-underline hover:cursor-pointer hover:underline">Políticas de Privacidade</li>
                            <li className="no-underline hover:cursor-pointer hover:underline">Políticas de Cookies</li>
                            <li className="no-underline hover:cursor-pointer hover:underline">Destaques</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>


        <div className="py-5 flex justify-center w-full ">
            <hr className=" h-[5px] w-full opacity-[50%]"/>
        </div>

        <div className="flex flex-row justify-between">
            <div className="md:hidden flex-col opacity-50 text-lg">
                <p>
                    Copyright © 2024 Go.planner Todos os direitos reservados. Todas as marcas registradas são propriedade dos seus respectivos donos.
                </p>
            </div>

            <div className="flex flex-col opacity-50 text-lg hidden md:flex">
                <p>Copyright © 2024 Go.planner Todos os direitos reservados.</p>
                <p>Todas as marcas registradas são propriedade dos seus respectivos donos.</p>
            </div>

            <div className="hidden md:flex flex-row gap-10 mb-14">
                <div className="opacity-[50%] hover:opacity-[100%] hover:cursor-pointer">{FacebookLogo}</div>
                <div className="opacity-[50%] hover:opacity-[100%] hover:cursor-pointer">{InstagramLogo}</div>
                <div className="opacity-[50%] hover:opacity-[100%] hover:cursor-pointer">{Xlogo}</div>
                <div className="opacity-[50%] hover:opacity-[100%] hover:cursor-pointer">{LinkedInLogo}</div>
            </div>

            <div className="flex md:hidden flex-row gap-10 sm:mb-5">
                <div>
                    <div className="pb-5 opacity-[50%] hover:opacity-[100%] hover:cursor-pointer">{FacebookLogo}</div>
                    <div className="opacity-[50%] hover:opacity-[100%] hover:cursor-pointer">{InstagramLogo}</div>
                </div>
                <div>
                    <div className="pb-5 opacity-[50%] hover:opacity-[100%] hover:cursor-pointer">{Xlogo}</div>
                    <div className="opacity-[50%] hover:opacity-[100%] hover:cursor-pointer">{LinkedInLogo}</div>
                </div>
            </div>
        </div>


    </div>
    )
}