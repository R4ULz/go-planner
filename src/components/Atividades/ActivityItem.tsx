type ActivityItemProps = {
    activity: {
      id: number;
      name: string;
    };
  };
  
  export default function ActivityItem({ activity }: ActivityItemProps) {
    return (
      <div className="mb-2 p-2 border border-gray-300 rounded-xl border-rosinha ">
        <p>{activity.name}</p>
      </div>
    );
  }
  