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
            <div className="">
                <div className="flex">
                    <h1 className="font-rubik font-bold text-black text-4xl md:text-3xl">Viagens populares</h1>
                    <span className="flex flex-row bg-rosinha w-2 h-2 rounded-full p-1 relative top-6 mx-1"></span>
                </div>
            </div>

            <div className="grid grid-cols-4 grid-rows-3 gap-4 p-6">
              <div className="relative w-full h-60">
                  <Image
                      src={Brasil}
                      alt="Imagem referente ao Brasil"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center bottom" 
                      className="rounded-lg"
                  />
              </div>

                <div className="relative col-span-2 row-span-1 ">
                    <Image
                        src={Espanha}
                        alt="Imagem referente a Espanha"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>

                <div className="relative col-span-1 row-span-2 min-h-[150px] group">
                    <Image
                        src={Paris}
                        alt="Imagem referente a Paris"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                          <div className="text-white text-center p-8">
                              <h3 className="text-lg font-bold">Paris</h3>
                              <p>Uma curiosidade interessante sobre Paris é que a cidade tem uma Estátua da Liberdade! 
                                Localizada na Île aux Cygnes, no rio Sena, essa réplica menor foi um presente dos americanos para a 
                                França em 1889, comemorando o centenário da Revolução Francesa. 
                                Ela fica voltada para o oeste, em direção à sua “irmã” maior em Nova York, simbolizando a 
                                amizade entre as duas nações.</p>
                          </div>
                        </div>
                </div> 

                <div className="relative col-span-1 row-span-2 w-full">
                    <Image
                        src={EUA}
                        alt="Imagem referente aos Estados Unidos"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>

                <div className="relative col-span-2 row-span-1 w-full">
                    <Image
                        src={Italia}
                        alt="Imagem referente a Itália"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>

                <div className="relative w-full col-span-3 row-span-1">
                    <Image
                        src={Tokyo}
                        alt="Imagem referente a Tokyo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}
