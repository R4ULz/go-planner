import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export default function NotificationList({
  notifications,
  onAction,
}) {
  const handleAction = async (notificationId, action) => {
    try {
      await onAction(notificationId, action);
      Toastify({
        text: 'notificação finalizada',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    } catch (error) {
      console.error("Erro ao processar a ação:", error);
    }
  };

  return (
    <div className="absolute top-14 xl:right-72 w-96 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-300">
        <h3 className="text-lg font-bold text-gray-700">Notificações</h3>
      </div>
      <ul className="max-h-60 overflow-y-auto">
        {notifications.length > 0 ? (
          [...notifications].reverse().map((notification) => (
            <li
              key={notification.id}
              className="p-4 hover:bg-gray-100 flex flex-col items-center border-b last:border-b-0"
            >
              <p className="text-sm text-gray-600 text-center">
                {notification.mensagem}
              </p>

              {notification.status === "ACEITO" && (
                <p className="text-green-500 text-sm font-semibold mt-2">
                  Convite aceito
                </p>
              )}

              {notification.status === "RECUSADO" && (
                <p className="text-red-500 text-sm font-semibold mt-2">
                  Convite recusado
                </p>
              )}

              {!notification.status && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleAction(notification.id, "ACCEPT")}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Aceitar
                  </button>
                  <button
                    onClick={() => handleAction(notification.id, "REJECT")}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Rejeitar
                  </button>
                </div>
              )}
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
