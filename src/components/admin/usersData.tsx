import { useEffect, useState } from "react";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; // Certifique-se de importar o estilo do Toastify
import { Trash2 } from "lucide-react";

export default function UsersData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/listUsers");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/listUsers?id=${id}`, { method: "DELETE" });
      const result = await response.json();

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Remove o usuário do estado
        Toastify({
          text: "Usuário removido com sucesso!",
          duration: 2000,
          style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" },
        }).showToast();
      } else {
        console.error("Erro ao excluir usuário:", result.error);
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full p-8">
      <h2 className="text-2xl font-bold mb-4">Gerenciar Usuários</h2>
      {loading ? (
        <p>Carregando usuários...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nome</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">CPF</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border p-2">{user.nome}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.cpf}</td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => openModal(user)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="border p-2 text-center">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Modal de Confirmação */}
      {isModalOpen && selectedUser && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/50 flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-8 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-xl font-bold mb-4">Remover Usuário</h2>
            <p className="mb-4">
              Você realmente deseja remover o usuário{" "}
              <span className="font-semibold">{selectedUser.nome}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deleteUser(selectedUser._id);
                  closeModal();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}