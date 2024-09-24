import Services from "@/components/SectionServices";
import Header from "@/components/Header";
import BgImg from "@/components/icons/BgImgs";

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
      </section>
    </div>
  );
}
