export default function NotificationList({notifications}){
    return (
        <div className="absolute top-14 right-72 w-72 bg-white shadow-lg rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-300">
                <h3 className="text-lg font-bold text-gray-700">Notificações</h3>
            </div>
            <ul className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <li key={notification.id} className="p-4 hover:bg-gray-100 border-b last:border-b-0">
                            <p className="text-sm text-gray-600">{notification.text}</p>
                            <p className="text-xs text-gray-400">{notification.time}</p>
                        </li>
                    ))
                ) : (
                    <div className="p-4 text-sm text-gray-400 text-center">
                        Sem notificações no momento.
                    </div>
                )}
            </ul>
        </div>
    );
}