import { IconeLogo } from "../../icons/index"
import { Xlogo } from "../../icons/X"
import { FacebookLogo } from "../../icons/facebook"
import { InstagramLogo } from "../../icons/instagram"
import { LinkedInLogo } from "../../icons/linkedin"

export default function Footer(){
    return(
    <div className="flex flex-col font-rubik text-white w-full max-w-screen-2xl h-full bg-black px-8">
        <div className="flex py-20 flex-row justify-between">

            <div className="font-bold">
                {IconeLogo}

                <div className="flex flex-col text-4xl w-[15em] mt-5">
                    <div className="flex">
                        <p >Transforme a maneira como </p>
                    </div>

                    <div className="flex flex-row">
                        <p>você explora o mundo</p><span className="bg-laranja w-3 h-3 rounded-full p-1 flex mt-6 ml-1"></span>
                    </div>

                </div>

                <div className="mt-10 text-white opacity-[50%]">
                    VIVA GRANDES AVENTURAS!
                </div>

            </div>

            <div className="flex flex-row gap-[7em]">

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

        <div className="flex flex-row justify-between ">

            <div className="flex flex-col opacity-[50%] ">
                <p>Copyright © 2024 Go.planner Todos os direitos reservados. Todas as marcas registradas </p>
                <p>são propriedade dos seus respectivos donos.</p>
            </div>

            <div className="flex flex-row gap-10 mb-14 ">
                <div className="opacity-[50%]  hover:opacity-[100%] hover:cursor-pointer">{FacebookLogo}</div>
                <div className="opacity-[50%]  hover:opacity-[100%] hover:cursor-pointer">{InstagramLogo}</div>
                <div className="opacity-[50%]  hover:opacity-[100%] hover:cursor-pointer">{Xlogo}</div>
                <div className="opacity-[50%]  hover:opacity-[100%] hover:cursor-pointer">{LinkedInLogo}</div>
            
            </div>
        </div>  

    </div>
    )
}