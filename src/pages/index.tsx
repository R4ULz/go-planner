
import Services from "../components/Home/Section2/SectionServices";
import Header from "../components/Home/Header/Header";
import BgImg from "@/src/components/icons/BgImgs";
import Footer from "../components/Home/Footer/footer";
import TripsSection from "../components/Home/Section3/TripsSection";

export default function Home() {
  return (
    <div className="flex flex-col relative w-full items-center">
      <header className="fixed z-50 w-full flex justify-center border-b bg-white">
        <Header />
      </header>

      <section className="z-0 h-full w-full mt-20 ">
        <BgImg/>
      </section>
      
      <section className=" w-full flex justify-center">
        <Services/>
      </section>

        <hr className="bg-laranjinha h-[2px] w-3/4 " />

      <section className="flex justify-center w-full">
        <TripsSection/>                               
      </section>

      <footer className="w-full bg-black justify-center flex mt-10">
        <Footer/>
      </footer>

    </div>
  );
}
