import { Viajem } from "../icons"

interface BtnGradientProps{
    text: string
}
export default function BtnGradient(props: BtnGradientProps){
    return(
        <div>
            <button className="flex gap-1 items-center font-inter bg-gradient-to-r from-rosinha to-laranja px-7 py-3 text-white rounded-xl font-bold text-sm">{Viajem}{props.text}</button>
        </div>
    )
}