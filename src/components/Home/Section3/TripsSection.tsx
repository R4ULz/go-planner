import Brasil from "@/public/imgs/country-Brazil.png";
import EUA from "@/public/imgs/country-EUA-edit.png";
import Italia from "@/public/imgs/country-Italia.png";
import Espanha from "@/public/imgs/country-Espanha.png";
import Paris from "@/public/imgs/country-França.png";
import Tokyo from "@/public/imgs/country-Tokyo-edit.png";
import Image from "next/image"; 

export default function TripsSection() {
    return (
      <div className="flex flex-col w-full max-w-screen-xl pt-10">
           <div className="">
                <div className="flex">
                     <h1 className="font-rubik font-bold text-black text-4xl md:text-3xl ">Viajens populares</h1><span className="flex flex-row bg-rosinha w-2 h-2 rounded-full p-1 relative top-6 mx-1"></span>
                </div>
            </div>

            <div className="flex">

              <div className="flex flex-col gap-10 m-10">
                <div className="flex flex-col gap-10">
                  <div>
                    <Image src={Brasil} alt="Imagem referente ao Brasil" width={200} height={200}/>                
                  </div>

                  <div>
                    <Image src={EUA} alt="Imagem referente aos Estados Unidos" width={200} height={200}/>
                  </div>
                </div>
              </div>

              <div className="flex flex-col m-10">
                <div className="flex flex-col gap-20">
                  <div>
                    <Image src={Italia} alt="Imagem referente a Itália" width={300} height={200}/>                
                  </div>

                  <div>
                    <Image src={Espanha} alt="Imagem referente a Espanha" width={300} height={200}/>
                  </div>

                  <div className="flex">
                  <Image src={Tokyo} alt="Imagem referente a Tokyo" width={200}/>
                </div>

                </div>
              </div>

              <div className="flex flex-col gap-10 m-10">
                <div className="flex">
                  <Image src={Paris} alt="Imagem referente a Paris" width={600} height={398}/>
                </div>
              </div>

            </div>

      </div>
    );
}