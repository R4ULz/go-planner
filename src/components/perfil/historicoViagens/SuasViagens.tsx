import Image from "next/image"
import { Viagem } from "../../icons"
import { location } from "../../icons/location"
import { lixeira } from "../../icons/lixeira"
import { calendariu } from "../../icons/teste"
import { iconeCalendario2 } from "../../icons/Schedule2"

export default function SuasViagens() {

    const MinhasViagens = [
        {
            id: 1,
            nome: "Viagem dos Guys",
            destino: "Japão, Tokyo",
            dataInicio: "20/12/2024",
            dataFim: "25/12/2024",
            convidados: ["J", "A", "P", "O"],
            imagem: "/imgs/padraoViagem.png",
        },
        {
            id: 2,
            nome: "Viagem dos Amigos",
            destino: "Brasil, Rio de Janeiro",
            dataInicio: "10/01/2025",
            dataFim: "15/01/2025",
            convidados: ["M", "G", "L"],
            imagem: "/imgs/padraoViagem.png",
        },
        {
            id: 3,
            nome: "Viagem dos Guys",
            destino: "Japão, Tokyo",
            dataInicio: "20/12/2024",
            dataFim: "25/12/2024",
            convidados: ["J", "A", "P", "O"],
            imagem: "/imgs/padraoViagem.png",
        },
        {
            id: 4,
            nome: "Viagem dos Amigos",
            destino: "Brasil, Rio de Janeiro",
            dataInicio: "10/01/2025",
            dataFim: "15/01/2025",
            convidados: ["M", "G", "L"],
            imagem: "/imgs/padraoViagem.png",
        },
    ]

    return (
        <div className="space-y-4 font-inter">
            {MinhasViagens.map((viagem) => (
                <div key={viagem.id} className="bg-white w-full p-4 rounded-xl border-[1px] shadow-md">
                    <div className="flex justify-between">
                        <h3 className="text-lg  text-zinc-600 font-bold">{viagem.nome}</h3>
                        <span>{lixeira}</span>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <p className="text-sm text-zinc-500 flex gap-2 items-center">
                                <span role="img" aria-label="Localização">{location}</span> {viagem.destino}
                            </p>
                            <p className="text-sm text-zinc-500 flex items-center gap-1">
                                <span role="img" aria-label="Data">{iconeCalendario2}</span> {viagem.dataInicio} - {viagem.dataFim}
                            </p>
                            <div className="flex items-center mt-2 hidden">
                                <p className="text-sm text-zinc-500 mr-2">Convidados:</p>
                                <div className="flex space-x-2">
                                    {viagem.convidados.map((convidado, index) => (
                                        <span key={index} className="text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                                            {convidado}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex space-x-4 mt-4">
                                <button className="bg-laranja px-4 py-2 text-white rounded-xl font-semibold">Visualizar</button>
                                <button className="border border-laranja px-4 py-1 text-laranja rounded-xl font-semibold">Editar viagem</button>
                            </div>
                        </div>
                        <div className="size-44 relative">
                            <Image src={viagem.imagem} alt={viagem.nome} layout="fill" objectFit="cover" className="rounded-lg" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}