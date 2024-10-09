
import Services from "../components/Home/Section2/SectionServices";
import Header from "../components/Home/Header/Header";
import BgImg from "@/src/components/icons/BgImgs";
import Footer from "../components/Home/Footer/footer";

export default function Home() {
  return (
    <div className="flex flex-col relative w-full items-center">

      <header className="fixed z-50 w-full flex justify-center">
        <Header />
      </header>

      <section className="z-0 h-full w-full mt-20  ">
          <BgImg/>
      </section>
      
      <section className=" w-full flex justify-center">
        <Services/>
      </section>


      <section className="flex justify-center w-full">
        <Services/>                               {/*Dupliquei a section2 aqui na terceira apenas para testar.*/}
      </section>

      <footer className="w-full">
        <Footer/>
      </footer>

    </div>
  );
}
