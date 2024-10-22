import Layout from "../components/criarViagem/Layout";
import Footer from "../components/Home/Footer/footer";
import Header from "../components/Home/Header/Header";

export default function CriarViagem(){
    return(
        <div className="flex h-screen w-screen flex-col">
            <header>
                <Header></Header>
            </header>
            <div className="p-5 w-full">
                <Layout></Layout>
            </div>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    )
}