import { location } from "../icons/location";
import {iconeCalendario2} from "../icons/Schedule2"
type ActivityItemProps = {
    activity: {
      id: number;
      name: string;
      date: string;
      time: string;
    };
  };
  
  export default function ActivityItem({ activity }: ActivityItemProps) {
    return (
      <div className="mb-2 p-2 border border-gray-300 rounded-xl border-rosinha flex flex-row justify-between font-medium">
        <p className="flex flex-row gap-2 items-center">{location} {activity.name}</p>

        <div className="flex gap-10">
            <p className="flex flex-row gap-2 items-center">{iconeCalendario2}{activity.date}</p>
            <p className="flex items-center">{activity.time}</p>
        </div>

      </div>
    );
  }
  