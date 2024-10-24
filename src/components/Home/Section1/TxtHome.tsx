export default function TxtHome(){
    return(
       <div className="space-y-3">
            <div>
                <div className="flex flex-row max-w-4xl">
                    <h1 className="font-rubik font-semibold text-white text-6xl">Descubra</h1><span className="bg-rosinha w-3 h-3 rounded-full p-1 relative top-8 mx-1"></span>
                    <h1 className="font-rubik font-semibold text-white text-6xl">Planeje</h1><span className="bg-roxo w-3 h-3 rounded-full p-1 relative top-8 mx-1"></span>
                </div>
                <div className="flex">
                    <h1 className="font-rubik font-semibold text-white text-6xl flex">Explore com</h1>
                </div>
                <div className="flex">
                    <h1 className="font-rubik font-semibold text-white text-6xl flex">Go</h1><span className="bg-laranja w-3 h-3 rounded-full p-1 relative top-8 mx-1"></span><h1 className="font-rubik font-semibold text-white text-6xl">Planner</h1>
                </div>
            </div>
            <div>
                <p className="text-gray-400 font-inter text-[1.2rem] w-96">Planeje com facilidade, descubra destinos únicos e faça cada viagem ser inesquecível</p>
            </div>
       </div> 
    )
}