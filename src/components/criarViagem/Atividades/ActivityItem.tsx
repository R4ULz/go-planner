import { lixeira } from "../../icons/lixeira";
import { location } from "../../icons/location";
import { useState } from "react";

type ActivityItemProps = {
    activity: {
      id: number;
      name: string;
      date: Date;
      time: string;
    };
    onRemove: (id: number) => void;
  };
  
  export default function ActivityItem({ activity, onRemove}: ActivityItemProps) {
    const[apagarAtv, setapagarAtv] = useState(false)

    return (
      <div className="mb-2 p-2 border rounded-xl border-rosinha flex flex-row justify-between font-medium w-[59.5em]">
        <p className="flex flex-row gap-2 items-center">{location} {activity.name}</p>

        <div className="flex gap-3">
            <p className="flex items-center w-full">{activity.time}</p>
            <button onClick={() => onRemove(activity.id)} className="border-l-2 pl-2 flex items-center">{lixeira}</button>
        </div>

      </div>
    );
  }
  