import Brasil from "@/public/imgs/country-Brazil.png";
import EUA from "@/public/imgs/country-EUA.png";
import Italia from "@/public/imgs/country-Italia.png";
import Espanha from "@/public/imgs/country-Espanha.png";
import Paris from "@/public/imgs/country-França.png";
import Tokyo from "@/public/imgs/country-Tokyo.png";
import Image from "next/image";

export default function TripsSection() {
    return (
        <div className="flex flex-col w-full max-w-screen-xl pt-10">
            <div >
                <div className="flex md:justify-start justify-center">
                    <h1 className="font-rubik font-bold text-black text-4xl md:text-3xl">Viagens populares</h1>
                    <span className="flex flex-row bg-rosinha w-2 h-2 rounded-full p-1 relative top-6 mx-1"></span>
                </div>
            </div>

            <div className="grid md:grid-cols-4 md:grid-rows-3 md:gap-4 md:p-6 grid-cols-4 grid-rows-5 gap-4 p-6">
                {/* Brasil */}
                <div className="relative w-full h-60 group md:col-span-1 md:row-span-1 col-span-2 row-span-1">
                    <Image
                        src={Brasil}
                        alt="Imagem referente ao Brasil"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center bottom"
                        className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <div className="text-white p-8 space-y-2">
                        <div className="flex gap-3 items-center">
                                <h3 className="text-lg font-bold">Brasil</h3>
                                <div className="flex gap-1">
                                    <div className="size-3 rounded-full bg-green-600"></div>
                                    <div className="size-3 rounded-full bg-yellow-600"></div>
                                    <div className="size-3 rounded-full bg-blue-600"></div>
                                </div>
                            </div>
                            <p>A Amazônia, que abrange 40% da América do Sul, abriga uma incrível biodiversidade.</p>
                        </div>
                    </div>
                </div>

                {/* Espanha */}
                <div className="relative md:col-span-2 md:row-span-1 group col-span-2">
                    <Image
                        src={Espanha}
                        alt="Imagem referente a Espanha"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <div className="text-white p-8 space-y-2">
                            <div className="flex gap-3 items-center">
                                <h3 className="text-lg font-bold">Madrid</h3>
                                <div className="flex gap-1">
                                    <div className="size-3 rounded-full bg-red-600"></div>
                                    <div className="size-3 rounded-full bg-yellow-600"></div>
                                    <div className="size-3 rounded-full bg-red-600"></div>
                                </div>
                            </div>
                            <p>Madri é uma das cidades mais ensolaradas da Europa, com cerca de 2.769 horas de sol por ano!</p>
                        </div>
                    </div>
                </div>

                {/* Paris */}
                <div className="relative md:col-span-1 md:row-span-2 min-h-[150px] group col-span-2 row-span-2">
                    <Image
                        src={Paris}
                        alt="Imagem referente a Paris"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <div className="text-white p-8 space-y-2">
                            <div className="flex gap-3 items-center">
                                <h3 className="text-lg font-bold">Paris</h3>
                                <div className="flex gap-1">
                                    <div className="size-3 rounded-full bg-blue-600"></div>
                                    <div className="size-3 rounded-full bg-white"></div>
                                    <div className="size-3 rounded-full bg-red-600"></div>
                                </div>
                            </div>
                            <p>Paris possui uma Estátua da Liberdade no rio Sena, presente dos EUA em 1889, em comemoração ao centenário da Revolução Francesa.</p>
                        </div>
                    </div>
                </div>

                {/* EUA */}
                <div className="relative md:col-span-1 md:row-span-2 w-full group col-span-2 row-span-2">
                    <Image
                        src={EUA}
                        alt="Imagem referente aos Estados Unidos"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <div className="text-white p-8 space-y-2">
                        <div className="flex gap-2 items-center">
                            <h3 className="text-lg font-bold">Estados Unidos</h3>
                                    <div className="flex gap-1">
                                        <div className="size-3 rounded-full bg-red-600"></div>
                                        <div className="size-3 rounded-full bg-white"></div>
                                        <div className="size-3 rounded-full bg-blue-600"></div>
                                    </div>
                        </div>
                            <p>O Magic Kingdom, em Orlando, é o parque temático mais visitado do mundo, atraindo milhões de visitantes todos os anos.</p>
                        </div>
                    </div>
                </div>

                {/* Itália */}
                <div className="relative md:col-span-2 md:row-span-1 w-full group col-span-4 row-span-1">
                    <Image
                        src={Italia}
                        alt="Imagem referente a Itália"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <div className="text-white p-8 space-y-2">
                            <div className="flex gap-2 items-center">
                                <h3 className="text-lg font-bold">Itália</h3>
                                    <div className="flex gap-1">
                                        <div className="size-3 rounded-full bg-green-600"></div>
                                        <div className="size-3 rounded-full bg-white"></div>
                                        <div className="size-3 rounded-full bg-red-600"></div>
                                    </div>
                            </div>
                            <p>Veneza é composta por mais de 100 pequenas ilhas e tem cerca de 400 pontes!</p>
                        </div>
                    </div>
                </div>

                {/* Tokyo */}
                <div className="relative w-full md:col-span-3 md:row-span-1 group col-span-4 row-span-1">
                    <Image
                        src={Tokyo}
                        alt="Imagem referente a Tokyo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <div className="text-white p-8 space-y-2">
                        <div className="flex gap-2 items-center">
                            <h3 className="text-lg font-bold">Tóquio</h3>
                                    <div className="flex gap-1">
                                        <div className="size-3 rounded-full bg-white"></div>
                                        <div className="size-3 rounded-full bg-red-600"></div>
                                        <div className="size-3 rounded-full bg-white"></div>
                                    </div>
                        </div>
                            <p>Tóquio tem o cruzamento mais movimentado do mundo, em Shibuya, onde milhares de pessoas atravessam ao mesmo tempo!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
