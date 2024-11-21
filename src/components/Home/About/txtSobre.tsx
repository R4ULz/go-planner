import Link from 'next/link';
import Image from "next/image";
import imagem1 from "@/src/components/Home/About/imagem01.png"
import imagem2 from "@/src/components/Home/About/imagem02.png"
import {Viagem } from "../../icons/index";

export default function txtSobre({ onCreateTrip }){
    return(
        <div className="flex flex-col  justify-center items-center max-w-screen-xl w-full font-inter">
            <div>
                <div className='flex flex-row pb-4'>
                    <h1 className='font-bold text-3xl font-rubik'>Sobre nós</h1><span className="bg-rosinha rounded-full p-1 relative w-1 h-1 top-6 mx-1 md:w-1 md:h-1 md:top-5"></span>
                </div>
                <div className="flex flex-col justify-center items-center text-zinc-600">
                    <p>
                    O Go.planner é uma plataforma interativa desenvolvida para tornar o planejamento de viagens mais simples e divertido. 
                    Com ele, você pode criar viagens personalizadas, organizar atividades para cada dia, e convidar amigos para planejar juntos, 
                    tudo em um único lugar.
                    </p>
                </div>
                <div className='space-y-3'>
                    <div className='flex flex-row w-full justify-between gap-6 pt-8'>
                        <div className='relative rounded-xl w-1/2  overflow-hidden'>
                            <Image
                                src={imagem1}
                                alt='Imagem 1'
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <span className='flex bg-rosinha md:h-64 md:w-px  rounded-full top-7 h-44'></span>
                        </div>
                        <div className='flex flex-col gap-6 text-medium items-start py-4   w-1/2'>
                            <p className='font-bold text-zinc-800" font-rubik'>
                                Go.planner: Planeje suas aventuras com leveza e diversão! ✈️
                            </p>
                    
                            <p className='text-zinc-600'>
                                No Go.planner, transformar o planejamento de viagens em uma experiência prática e agradável é a nossa paixão!
                                🚀 Nossa plataforma permite criar viagens de forma descomplicada, organizando detalhes essenciais como ponto de
                                partida, destino e nome. Planeje cada momento com atividades e convide amigos para tornar tudo ainda mais especial.🌟<br /><br />
                                Nosso objetivo é transformar uma tarefa maçante em algo interativo e divertido, para que você aproveite cada etapa
                                da jornada – dos primeiros planos à realização dos seus sonhos. Bem-vindo ao Go.planner, onde sua próxima grande
                                aventura começa! 🗺️✨
                            </p>
                        </div>
                    </div>
                    
                    <div className='flex flex-row w-full justify-between gap-6 pt-4'>
                        <div className='flex flex-col gap-10 text-medium items-start py-8 w-1/2'>
                            <p className='font-bold text-gray-800 font-rubik'>
                                Go.planner:  missão e visão
                            </p>
                            <div className='text-zinc-800'>
                                <p className='font-rubik text-zinc-800 font-bold'>
                                    Missão
                                </p> 
                                <br />
                                <p className='text-zinc-600'>
                                    Tornar o planejamento de viagens uma experiência simples, colaborativa e divertida,
                                    ajudando pessoas a transformar sonhos em aventuras inesquecíveis. Nosso objetivo é unir organização e criatividade
                                    para que cada etapa do planejamento seja tão prazerosa quanto a própria viagem.🌟
                                </p>
                                <br />
                                <p className='font-rubik text-zinc-800 font-bold'>
                                    Visão
                                </p> 
                                <p className='text-zinc-600'>
                                    Ser a principal plataforma global de planejamento de viagens, reconhecida por sua simplicidade,
                                    inovação e capacidade de conectar pessoas, inspirando milhões a explorar o mundo com confiança e entusiasmo. 🗺️
                                </p>
           
                            </div>
                        </div>
                        <div className='flex justify-center items-center p-2'>
                            <span className='flex bg-rosinha w-1 md:h-72 md:w-px rounded-full top-7 h-44'></span>
                        </div>
                        <div className='relative rounded-xl w-1/2 h overflow-hidden'>
                            <Image
                                src={imagem2}
                                alt='Imagem 1'
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
                <div className='text-zinc-600 border-t-[1px] m-10 pt-10'>
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