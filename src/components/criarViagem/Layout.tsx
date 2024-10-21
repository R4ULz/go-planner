import DadosPrincipais from "./DadosPrincipais";
import MenuLateralV from "./MenuLateralV";


export default function Layout(){
    return (
        <div className="flex gap-10 w-full">
            <aside className="w-1/5 px-14 max-hd:px-1 ml-10">
                <MenuLateralV />
            </aside>
            <div className="w-4/5 max-w-screen-2xl">
                <DadosPrincipais></DadosPrincipais>
            </div>
        </div>
    )
}