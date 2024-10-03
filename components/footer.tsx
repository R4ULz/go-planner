import { IconeLogo } from "./icons"
import { Xlogo } from "./icons/X"
import { FacebookLogo } from "./icons/facebook"
import { InstagramLogo } from "./icons/instagram"
import { LinkedInLogo } from "./icons/linkedin"

export default function Footer(){
    return(
    <div className="flex flex-col font-rubik text-white w-full h-full bg-black p-5">
        <div className="flex p-20 flex flex-row justify-between">

            <div className="">
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
                        <h1>Company</h1>
                    </div>

                    <div className="opacity-[50%]">
                        <h3>Blogs</h3>
                        <h3>Carreiras</h3>
                        <h3>Viagens</h3>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <div>
                        <h1>Locais</h1>
                    </div>

                    <div className="opacity-[50%]">
                        <h3>Brasil</h3>
                        <h3>Espanha</h3>
                        <h3>Estados Unidos</h3>
                        <h3>França</h3>
                        <h3>Itália</h3>
                        <h3>Japão</h3>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <div>
                        <h1>Legais</h1>
                    </div>

                    <div className="opacity-[50%]">
                        <h3>Termos e serviços</h3>
                        <h3>Políticas e privacidade</h3>
                        <h3>políticas de cookies</h3>
                        <h3>Destaques</h3>
                    </div>
                </div>
            </div>

        </div>


        <div className="p-5 flex justify-center">
            <hr className=" h-[5px] w-[100em]"/>
        </div>

        <div className="flex flex-row justify-between mr-10 opacity-[50%]">

            <div className="flex flex-col ml-10 ">
                <p>Copyright © 2024 Go.planner Todos os direitos reservados. Todas as marcas registradas </p>
                <p>são propriedade dos seus respectivos donos.</p>
            </div>

            <div className="flex flex-row gap-10">
                <div className="hover:cursor-pointer">{FacebookLogo}</div>
                <div className="hover:cursor-pointer">{InstagramLogo}</div>
                <div className="hover:cursor-pointer">{Xlogo}</div>
                <div className="hover:cursor-pointer">{LinkedInLogo}</div>
            
            </div>
        </div>  

    </div>
    )
}