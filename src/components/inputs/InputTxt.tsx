/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputTxtProps{
    label: string
    valor: any
    obrigatorio?: boolean
    naoRenderizarQuando?: boolean
    placeholder?: string
    tipo: 'text' | 'email' | 'password'
    valorMudou: (novoValor: any) => void
}

export default function InputTxt(props: InputTxtProps){
    return props.naoRenderizarQuando ? null :(
        <div className="flex flex-col mt-4 w-2/3">
        <label>{props.label}</label>
        <input 
            type={props.tipo ?? 'text'} 
            value={props.valor}
            onChange={e => props.valorMudou?.(e.target.value)}
            required={props.obrigatorio}
            className="px-4 py-3 rounded-xl bg-gray-200 mt-2 border focus:border-blue-500 focus:outline-none focus:bg-white"
            placeholder={props.placeholder}
        />
    </div>
    )
}