export default function ServiceCard1({title, description, isSelected, onSelect}){
    return(
    <div className=" group hover:border-solid hover:border-black hover:rounded-md hover:shadow-border-shadow hover:cursor-pointer"> 
        <strong className="p-2">
            {title}
        </strong>
        <div className="flex flex-row ">
            <div>
                <span className="opacity-0 group-hover:opacity-100 flex flex-row bg-rosinha w-2 h-28 rounded-full p-1 top-6 mx-1"></span>
            </div>
            <p className="pl-8 pb-4">
                {description}
            </p>
        </div>
    </div>
    )
}