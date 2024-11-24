import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { notificationTrip } from '../../icons/notificationTrip';

export default function NotificationList({
  notifications,
  onAction,
}) {
  const handleAction = async (notificationId, action) => {
    try {
      await onAction(notificationId, action);
      Toastify({
        text: 'Notificação finalizada',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
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
              className="p-4 hover:bg-gray-100 flex items-center justify-between border-b last:border-b-0"
            >
              <div className="flex items-center gap-3">
                {notification.tipo === "CONVITE_VIAGEM" ? (
                  <span className="text-blue-500 text-lg">{notificationTrip}</span>
                ) : notification.tipo === "SOLICITACAO_AMIZADE" ? (
                  <span className="text-green-500 text-lg">👤</span>
                ) : (
                  <span className="text-gray-500 text-lg">🔔</span>
                )}

                <div>
                  <p className="text-sm font-semibold">
                    {notification.tipo === "CONVITE_VIAGEM"
                      ? "Novo convite de viagem"
                      : notification.tipo === "SOLICITACAO_AMIZADE"
                        ? "Nova solicitação de amizade"
                        : "Notificação"}
                  </p>
                  <p className="text-sm text-gray-500">{notification.mensagem}</p>
                </div>
              </div>

              {/* Botões */}
              {!notification.status && (
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => handleAction(notification.id, "ACCEPT")}
                    className="bg-laranjinha text-white rounded-full w-8 h-8 flex items-center justify-center hover:border-2 hover:bg-white hover:border-laranjinha hover:text-laranja"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleAction(notification.id, "REJECT")}
                    className="bg-rosinha text-white font-bold rounded-full w-8 h-8 flex items-center justify-center hover:bg-white hover:border-2 hover:border-rosinha hover:text-rosinha"
                  >
                    <svg className='size-6' viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" >
                      <g clip-path="url(#clip0_937_372)">
                        <path d="M12.75 4.25L4.25 12.75" stroke="currentColor" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4.25 4.25L12.75 12.75" stroke="currentColor" stroke-width="1.41667" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <clipPath id="clip0_937_372">
                          <rect width="17" height="17" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                  </button>
                </div>
              )}

              {/* Indicador de status */}
              {notification.status === "ACEITO" && (
                <span className="text-green-500 text-sm font-bold">✔ Aceito</span>
              )}
              {notification.status === "RECUSADO" && (
                <span className="text-red-500 text-sm font-bold">✖ Recusado</span>
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
