export default function ServiceCard1({title, description}){
    return(
        <div className="border-solid border-black rounded-md shadow-border-shadow p-5"> 
        <strong className="">
            {title}
        </strong>
        <p className="">
            {description}
        </p>
    </div>
    )
}