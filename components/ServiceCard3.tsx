export default function ServiceCard3({title, description}){
    return(
        <div className="hover:border-solid hover:border-black hover:rounded-md hover:shadow-border-shadow hover:cursor-pointer"> 
        <strong className="p-2">
            {title}
        </strong>
        <p className="pl-8">
            {description}
        </p>
    </div>
    )
}