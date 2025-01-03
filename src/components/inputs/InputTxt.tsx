/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputTxtProps{
    label?: string
    valor: any
    obrigatorio?: boolean
    naoRenderizarQuando?: boolean
    placeholder?: any
    tipo: 'text' | 'email' | 'password'
    valorMudou: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputTxt(props: InputTxtProps){
    return props.naoRenderizarQuando ? null :(
        <div className="flex flex-col mt-4 w-full ">
        <label>{props.label}</label>
        <input 
            type={props.tipo ?? 'text'} 
            value={props.valor}
            onChange={e => props.valorMudou?.(e)}
            required={props.obrigatorio}
            className="text-zinc-500 px-4 py-3 rounded-xl bg-gray-200 mt-2 border focus:border-blue-500 focus:outline-none focus:bg-white"
            placeholder={props.placeholder}
            
        />
    </div>
    )
}