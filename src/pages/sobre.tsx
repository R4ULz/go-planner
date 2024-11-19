import Header from "../components/Home/Header/Header"
import TxtHome from "../components/Home/Section1/TxtHome"
import TxtSobre from "../components/Home/Header/txtSobre"
import Footer from "../components/Home/Footer/footer"

export default function sobre(){
    return(
    <div>
        <header className="flex justify-center border-b-[0.5px] border-zinc-200">
            <Header />
        </header>

        <section className="flex w-full justify-center font-rubik font-bold text-black p-24 text-4xl">
            <h1>SOBRE NÓS</h1><span className="bg-roxo rounded-full p-1 relative w-1 h-1 top-6 mx-1 md:w-3 md:h-3 md:top-6"></span>
        </section>

        <section className="flex justify-center">
            <TxtSobre/>
        </section>


        <footer className="w-full flex justify-center bg-black">
            <Footer/>
        </footer>

    </div>
    )
}