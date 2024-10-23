import { lixeira } from "../../icons/lixeira";
import { location } from "../../icons/location";
import { useState } from "react";

type ItemAmigoProps = {
    amigo:{
        id: number,
        email: string;
      };
    onRemove: (id: number) => void;
  };
  
  export default function ItemAmigo({ amigo, onRemove}: ItemAmigoProps) {
    const[apagarAamigo, setapagarAmigo] = useState(false)

    return (
      <div className="mb-2 p-2 border rounded-xl border-rosinha flex flex-row justify-between font-medium w-[59.5em]">
        <p className="flex flex-row gap-2 items-center">{location} {amigo.email}</p>

        <div className="flex gap-3">
            {/* <p className="flex items-center w-full">{activity.time}</p> */}
            <button onClick={() => onRemove(amigo.id)} className="border-l-2 pl-2 flex items-center">{lixeira}</button>
        </div>

      </div>
    );
  }