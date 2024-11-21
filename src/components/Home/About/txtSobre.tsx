import Link from 'next/link';
import Image from "next/image";
import imagem1 from "@/src/components/Home/About/imagem01.png"
import imagem2 from "@/src/components/Home/About/imagem02.png"
import {Viagem } from "../../icons/index";

export default function txtSobre({ onCreateTrip }){
    return(
        <div className="flex flex-col font-rubik justify-center items-center w-11/12 ">
            <div>
                <div className='flex flex-row pb-4'>
                    <h1 className='font-bold text-3xl'>Sobre nós</h1><span className="bg-rosinha rounded-full p-1 relative w-1 h-1 top-6 mx-1 md:w-1 md:h-1 md:top-5"></span>
                </div>
                <div className="flex flex-col flex justify-center items-center">
                    <p>
                    O Go.planner é uma plataforma interativa desenvolvida para tornar o planejamento de viagens mais simples e divertido. 
                    Com ele, você pode criar viagens personalizadas, organizar atividades para cada dia, e convidar amigos para planejar juntos, 
                    tudo em um único lugar.
                    </p>
                </div>
                <div className='py-8 flex flex-row'>
                    <Image
                        src={imagem1}
                        alt='Imagem 1'
                        width={600}
                        className="rounded-xl p-1 px-2"

                    />
                    <div className='flex justify-center items-center p-4'>
                        <span className='flex bg-rosinha w-1 md:h-64 md:w-1 rounded-full top-7 h-44'></span> 
                    </div>
                    <div className='flex flex-col gap-10 text-medium items-center py-8'>
                        <p className='font-bold text-gray-800'>
                            Go.planner: Planeje suas aventuras com leveza e diversão! ✈️
                        </p>
                        <p>
                            No Go.planner, transformar o planejamento de viagens em uma experiência prática e agradável é a nossa paixão! 
                            🚀 Nossa plataforma permite criar viagens de forma descomplicada, organizando detalhes essenciais como ponto de 
                            partida, destino e nome. Planeje cada momento com atividades e convide amigos para tornar tudo ainda mais especial.🌟<br />
                            Nosso objetivo é transformar uma tarefa maçante em algo interativo e divertido, para que você aproveite cada etapa 
                            da jornada – dos primeiros planos à realização dos seus sonhos. Bem-vindo ao Go.planner, onde sua próxima grande 
                            aventura começa! 🗺️✨
                        </p>
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-col gap-10 text-medium items-center py-8'>
                        <p className='font-bold text-gray-800'>
                            Go.planner:  missão e visão
                        </p>
                        <p>
                            <strong>Missão</strong> <br /> 
                            Tornar o planejamento de viagens uma experiência simples, colaborativa e divertida, 
                            ajudando pessoas a transformar sonhos em aventuras inesquecíveis. Nosso objetivo é unir organização e criatividade 
                            para que cada etapa do planejamento seja tão prazerosa quanto a própria viagem.🌟
                            <br /> <br />
                            <strong>Visão</strong> <br />
                            Ser a principal plataforma global de planejamento de viagens, reconhecida por sua simplicidade, 
                            inovação e capacidade de conectar pessoas, inspirando milhões a explorar o mundo com confiança e entusiasmo. 🗺️
                        </p>
                    </div>                    
                    <div className='flex justify-center items-center p-4'>
                        <span className='flex bg-rosinha w-1 md:h-72 md:w-1 rounded-full top-7 h-44'></span> 
                    </div>
                    <Image
                        src={imagem2}
                        alt='Imagem 1'
                        width={600}
                        className="rounded-xl p-1 px-2"
                    />
                </div>
                <div className='border-zinc-400 border-t-2 m-10 pt-10'>
                    <div className='flex flex-col gap-7 items-center justify-center text-center'>
                        <p className=''>
                            Pronto para começar sua próxima aventura? Junte-se a nós e torne o <br />
                            planejamento tão divertido quanto a própria viagem! 
                        </p>
                        <button 
                            className="w-2/4 flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-7 py-3 text-white rounded-xl font-bold "
                            onClick={onCreateTrip}>
                            {Viagem} Criar sua viagem
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}