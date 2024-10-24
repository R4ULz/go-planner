
export default function ServiceCard1({title, description, onClick}){
    return(
    <div className="flex flex-row group hover:border-solid hover:border-black hover:rounded-xl hover:shadow-border-shadow hover:cursor-pointer"> 
        <div className="flex flex-row p-3">
            <div className="">
                <span className="opacity-0 group-hover:opacity-100 flex flex-row bg-rosinha w-2 h-40 rounded-full p-1 top-6"></span>
            </div>
        </div>

        <div className="mt-2" onClick={onClick}>
            <strong className="text-xl p-2">
                {title}
            </strong>

            <p className="p-2">
                {description}
            </p>
        </div>
    </div>
    )
}