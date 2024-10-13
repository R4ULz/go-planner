import Image from "next/image";

export default function LoginESenha() {
    return (
        <div className="bg-white w-full h-full rounded-xl border-[1px] shadow-xl border-zinc-400 flex flex-col">
            <div className="h-full py-14 max-hd:py-5 max-hd:px-5 px-20 flex justify-center items-center flex-col space-y-10">
                <Image src={"/imgs/manutencao.png"} alt="manutencao" width={180} height={180} className="size-40"></Image>
                <h1 className="text-4xl text-zinc-700">Aqui teremos a página de Login e Senha</h1>
            </div>
        </div>
    )
}