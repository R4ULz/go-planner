import Header from "../components/Home/Header/Header"
import TxtSobre from "../components/Home/About/txtSobre"
import Footer from "../components/Home/Footer/footer"
import router from "next/router";

const handleCreateTrip = () => {
    router.push({
      pathname: "/criarViagem",
  })
};

export default function sobre(){
    return(
        
    <div>
        <header className="flex justify-center border-b-[0.5px] border-zinc-200">
            <Header />
        </header>

        <div className="px-48 py-12">
         <section className="w-full flex justify-center">
            <TxtSobre onCreateTrip={handleCreateTrip}/>
         </section>

        </div>
        <footer className="w-full flex justify-center bg-black">
            <Footer/>
         </footer>



    </div>
    )
}