export default function NotificationList({ notifications, onAction }) {
    return (
      <div className="absolute top-14  xl:right-72 w-80 bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-300">
          <h3 className="text-lg font-bold text-gray-700">Notificações</h3>
        </div>
        <ul className="max-h-60 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li
                key={notification.id}
                className="p-4 hover:bg-gray-100 flex flex-col items-center border-b last:border-b-0"
              >
                <p className="text-sm text-gray-600">{notification.mensagem}</p>
                <p className="text-xs text-gray-400 hidden">{notification.tipo}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => onAction(notification.id, "ACCEPT")}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Aceitar
                  </button>
                  <button
                    onClick={() => onAction(notification.id, "REJECT")}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Rejeitar
                  </button>
                </div>
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