import { lixeira } from "../../icons/lixeira";
import { location } from "../../icons/location";
import { useState } from "react";

type ActivityItemProps = {
    activity: {
      id: number;
      name: string;
      date: string;
      time: string;
    };
    onRemove: (id: number) => void;
  };
  
  export default function ActivityItem({ activity, onRemove}: ActivityItemProps) {
    const[apagarAtv, setapagarAtv] = useState(false)

    return (
      <div className="mb-2 p-2 border rounded-xl border-black border-opacity-[30%] flex flex-row justify-between w-full">
        <p className="opacity-[70%] flex flex-row px-10 items-center">{activity.name}</p>

        <div className="flex gap-3">
            <p className="flex items-center w-full opacity-[70%]">{activity.time}</p>
            <button onClick={() => onRemove(activity.id)} className="border-l-2 pl-2 flex items-center">{lixeira}</button>
        </div>

      </div>
    );
  }