export default function ServiceCard1({title, description}){
    return(
        <div className="border-solid border-black rounded-md s shadow-border-shadow"> 
        <strong className="p-2">
            {title}
        </strong>
        <p className="pl-8">
            {description}
        </p>
    </div>
    )
}