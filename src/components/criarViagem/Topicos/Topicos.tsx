import { useState, useEffect } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import Toastify from 'toastify-js';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';

export default function Topico({ tripData, handleUpdateTrip }) {
  const initialTopics = () => {
    const storedTopics = localStorage.getItem(`trip_${tripData._id}_topicos`);
    return storedTopics ? JSON.parse(storedTopics) : (tripData?.topicos || []);
  };

  const [topics, setTopics] = useState(() => Array.isArray(initialTopics()) ? initialTopics() : []);
  const [topicName, setTopicName] = useState('');
  const [activeTopicIndex, setActiveTopicIndex] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  useEffect(() => {
    if (tripData._id) {
      localStorage.setItem(
        `trip_${tripData._id}_topicos`,
        JSON.stringify(topics)
      );
    }
  }, [topics, tripData._id]);

  const handleContentChange = (updatedContent) => {
    if (activeTopicIndex !== null) {
      const updatedTopics = topics.map((topic, index) =>
        index === activeTopicIndex ? { ...topic, conteudo: updatedContent } : topic
      );
      setTopics(updatedTopics);

      if (tripData._id) {
        localStorage.setItem(
          `trip_${tripData._id}_topicos`,
          JSON.stringify(updatedTopics)
        );
      }
    }
  };

  const salvarTopico = () => {
    if (!topicName.trim()) {
        Toastify({
            text: 'O nome do tópico não pode estar vazio.',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'right',
            stopOnFocus: true,
            style: {
                background: "#ce1836",
            }
        }).showToast();
        return;
    }

    if (isCreatingNew) {
        const newTopic = {
            nome: topicName,
            conteudo: '',
        };

        const updatedTopics = [...topics, newTopic];
        setTopics(updatedTopics);

        handleUpdateTrip({
            topicos: updatedTopics,
        });

        setTopicName('');
        setIsCreatingNew(false);

        Toastify({
            text: 'Novo tópico criado com sucesso!',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'right',
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    } else {
        const updatedTopics = topics.map((topic, index) =>
            index === activeTopicIndex ? { ...topic, nome: topicName } : topic
        );
        setTopics(updatedTopics);

        handleUpdateTrip({
            topicos: updatedTopics,
        });

        setIsCreatingNew(false); // Desativa o modo de criação de novos tópicos
        setTopicName(''); // Limpa o input de nome

        Toastify({
            text: 'Tópico atualizado com sucesso!',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'right',
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    }
};


const excluirTopico = () => {
  if (activeTopicIndex === null) {
      Toastify({
          text: 'Nenhum tópico selecionado para exclusão.',
          duration: 3000,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true,
          style: {
              background: "#ce1836",
          }
      }).showToast();
      return;
  }

  const updatedTopics = topics.filter((_, index) => index !== activeTopicIndex);
  setTopics(updatedTopics);

  handleUpdateTrip({
      topicos: updatedTopics,
  });

  setActiveTopicIndex(null);
  setTopicName('');
  setIsCreatingNew(false);

  Toastify({
      text: 'Tópico excluído com sucesso!',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
  }).showToast();
};


  const selecionarTopico = (index) => {
    setActiveTopicIndex(index);
    setTopicName(topics[index]?.nome || '');
    setIsCreatingNew(false); // Desativa o modo de criação de novos tópicos
  };

  const iniciarNovoTopico = () => {
    setTopicName('');
    setActiveTopicIndex(null);
    setIsCreatingNew(true);
  };

  return (
    <div className="font-rubik flex">
      {/* Menu lateral */}
      <aside className="w-1/5 bg-gray-200 p-4 rounded-l-lg h-[500px] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4">Tópicos:</h3>
        <ul>
          <li className="mb-4">
            <button
              onClick={iniciarNovoTopico}
              className="w-full py-2 bg-gradient-to-r from-laranja to-rosinha text-white font-bold rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              Novo Tópico +
            </button>
          </li>
          <hr className="border-t border-gray-300 my-4" />
          {topics.map((topic, index) => (
            <li key={index} className="mb-2 flex items-center">
              <button
                onClick={() => selecionarTopico(index)}
                className={`w-full truncate text-left px-4 py-2 rounded ${
                  index === activeTopicIndex
                    ? 'bg-gradient-to-r from-laranja to-rosinha text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
                title={topic.nome}
              >
                {topic.nome}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Conteúdo principal */}
      <div className="w-4/5 p-6">
        {isCreatingNew ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2 justify-start">
              <input
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                className="text-lg font-bold w-1/2 px-2 py-1 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-laranja"
                placeholder="Digite o nome do novo tópico"
              />
              <button
                onClick={salvarTopico}
                className="py-1.5 px-3 bg-gradient-to-r from-laranja to-rosinha text-white font-bold rounded-md shadow hover:shadow-lg transition duration-300"
              >
                Salvar Novo Tópico
              </button>
            </div>
          </div>
        ) : activeTopicIndex !== null ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2 justify-start">
              <input
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                className="text-lg font-bold w-1/2 px-2 py-1 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-laranja"
                placeholder="Edite o nome do tópico"
              />
              <button
                onClick={salvarTopico}
                className="py-1.5 px-3 bg-gradient-to-r from-laranja to-rosinha text-white font-bold rounded-md shadow hover:shadow-lg transition duration-300"
              >
                Salvar
              </button>
              <button
                onClick={excluirTopico}
                className="py-1.5 px-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-md shadow hover:shadow-lg transition duration-300"
              >
                Excluir
              </button>
            </div>
            <FroalaEditor
              tag="textarea"
              model={topics[activeTopicIndex]?.conteudo || ''}
              onModelChange={(content) => handleContentChange(content)}
            />
          </div>
        ) : (
          <p className="text-gray-600">Selecione um tópico para editar ou clique em "Novo Tópico" para criar um.</p>
        )}
      </div>
    </div>
  );
}
