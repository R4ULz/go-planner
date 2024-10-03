
import Services from "@/components/SectionServices";
import Header from "@/components/Header";
import BgImg from "@/components/icons/BgImgs";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col relative w-full h-[600px]">

      <div className="fixed z-50 w-full">
        <Header />
      </div>

      <section className="z-0 h-full w-full">
          <BgImg/>
      </section>
      
      <section className="flex w-full">
        <Services/>
        <hr className="bg-laranjinha h-[10px]" />
      </section>

      <div className="flex justify-center items-center">
        <hr className="bg-laranjinha h-[2px] w-3/4 " />
      </div>

      <section className="flex w-full">
        <Services/>                               {/*Dupliquei a section2 aqui na terceira apenas para testar.*/}
        <hr className="bg-laranjinha h-[10px]" /> {/*Dupliquei a section2 aqui na terceira apenas para testar.*/}
      </section>

      <div>
        <Footer/>
      </div>

    </div>
  );
}
