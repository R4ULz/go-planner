import Layout from "../components/criarViagem/Layout";
import Footer from "../components/Home/Footer/footer";
import Header from "../components/Home/Header/Header";



export default function CriarViagem(){
    return(
        <div className="flex h-screen flex-col">
            <header className="fixed z-50 w-full flex justify-center border-b bg-white">
                <Header />
            </header>
            <div className="p-5 w-full">
                <Layout></Layout>
            </div>
            <footer className="w-full bg-black justify-center flex mt-10">
                <Footer/>
            </footer>
        </div>
    )
}