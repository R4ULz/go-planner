
import Services from "../components/Home/Section2/SectionServices";
import Header from "../components/Home/Header/Header";

import Footer from "../components/Home/Footer/footer";
import TripsSection from "../components/Home/Section3/TripsSection";
import { useRouter } from "next/router";
import { useState } from "react";
import SectionHome from "../components/Home/Section1/SectionHome";
import { useUser } from "../contexts/UserContext";

export default function Home() {
  const router = useRouter()
  const user = useUser()
  const [pontoPartida, setPontoPartida] = useState()
  const [pontoDestino, setPontoDestino] = useState()

  const handlePartidaChange = (value) => setPontoPartida(value);
  const handleDestinoChange = (value) => setPontoDestino(value);

  const handleCreateTrip = () => {
    if (!user) {
      sessionStorage.setItem(
        "redirectAfterLogin",
        `/criarViagem?pontoPartida=${pontoPartida}&pontoDestino=${pontoDestino}`
      );
      router.push("/autenticacao?modo=login");
    } else {
      router.push({
        pathname: "/criarViagem",
        query: { pontoPartida, pontoDestino },
      });
    }
  };

  return (
    <div className="flex flex-col relative w-full items-center">

      <header className="fixed z-50 w-full flex justify-center bg-white border-b-[0.5px] border-zinc-200">
        <Header />
      </header>

      <section className="z-0 h-full w-full mt-20 bg-hero-pattern bg-cover bg-center flex justify-center">
        <SectionHome pontoPartida={pontoPartida} pontoDestino={pontoDestino} onPartidaChange={handlePartidaChange} onDestinoChange={handleDestinoChange} onCreateTrip={handleCreateTrip}/>
      </section>
      
      <section className=" w-full flex justify-center">
        <Services/>
      </section>

        <hr className="bg-laranjinha h-[2px] w-3/4 " />

      <section className="flex justify-center w-full">
        <TripsSection/>                               
      </section>

      <footer className="w-full flex justify-center bg-black">
        <Footer/>
      </footer>

    </div>
  );
}
