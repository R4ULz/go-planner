interface BtnGradientProps{
    text: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any
    onclick?: unknown

}
export default function BtnGradient(props: BtnGradientProps){
    return(
        <div>
            <button className="w-full flex gap-1 items-center font-inter justify-center bg-gradient-to-r from-rosinha to-laranja px-7 py-3 text-white rounded-xl font-bold text-sm">{props.icon}{props.text}</button>
        </div>
    )
}