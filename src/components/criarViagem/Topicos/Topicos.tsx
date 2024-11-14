import { useState, useEffect } from 'react'; 
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js'; // Dependências do Froala
import 'froala-editor/css/froala_editor.pkgd.min.css'; // Estilos do editor
import 'froala-editor/css/froala_style.min.css'; // Estilos adicionais

export default function Topico({ tripData, handleUpdateTrip }) {
  // Carregar tópicos do sessionStorage se existirem, ou usar tripData
  const initialTopics = () => {
    if (!tripData._id) return []; // Se a viagem ainda não foi criada, retornar um array vazio
    const storedTopics = sessionStorage.getItem(`trip_${tripData._id}_topicos`);
    return storedTopics ? JSON.parse(storedTopics) : (tripData?.topicos || []);
  };

  const [topics, setTopics] = useState(() => Array.isArray(initialTopics()) ? initialTopics() : []);
  const [content, setContent] = useState('');
  const [topicName, setTopicName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (tripData._id) {
      // Atualizar sessionStorage sempre que os tópicos mudarem e a viagem já tiver sido criada
      sessionStorage.setItem(
        `trip_${tripData._id}_topicos`,
        JSON.stringify(topics)
      );
    }
  }, [topics, tripData._id]);
 
  // Função para extrair texto puro do HTML
  const stripHtmlTags = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    return doc.body.textContent || "";
  };

  const handleContentChange = (updatedContent) => {
    if (typeof updatedContent === 'string') {
      setContent(updatedContent);
    }
  };

  // Função para salvar os tópicos no sessionStorage e atualizar o tripData
  const salvarTopicos = () => {
    // Armazenar nome e conteúdo no sessionStorage como texto puro
    const plainTextContent = stripHtmlTags(content);
    if (!topicName.trim()) {
      alert('O nome do tópico não pode estar vazio.');
      return;
    }

    const newTopic = {
      nome: topicName,
      conteudo: plainTextContent,
    };

    let updatedTopics;
    if (editingIndex !== null) {
      // Editar tópico existente
      updatedTopics = topics.map((topic, index) => (index === editingIndex ? newTopic : topic));
      setEditingIndex(null);
    } else {
      // Adicionar novo tópico
      updatedTopics = [...topics, newTopic];
    }

    setTopics(updatedTopics);

    // Atualizar tripData com os tópicos atualizados
    handleUpdateTrip({
      topicos: updatedTopics,
    });

    // Limpar os campos para adicionar um novo tópico
    setTopicName('');
    setContent('');

    alert('Tópico salvo com sucesso!');
  };

  const editarTopico = (index) => {
    const topicToEdit = topics[index];
    setTopicName(topicToEdit.nome);
    setContent(topicToEdit.conteudo);
    setEditingIndex(index);
  };

  return (
    <div className="font-rubik">
      <div className="flex flex-row">
        <div className="w-full">
          <div className="flex">
            <p className="font-bold text-xl">Tópicos</p>
            <span className="bg-roxo w-2 h-2 rounded-full p-1 flex mt-3 ml-1"></span>
          </div>

          <div className="mt-2">
            <input
              type="text"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              placeholder="Nome do Tópico"
              className="w-full px-4 py-2 border rounded mb-4"
            />
          </div>

          <div className="mt-4">
            <FroalaEditor
              tag="textarea"
              model={content}
              onModelChange={handleContentChange}
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={salvarTopicos}
              className="w-48 py-3 bg-gradient-to-r to-rosinha from-laranja rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              {editingIndex !== null ? 'Atualizar Tópico' : 'Salvar Tópico'}
            </button>
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">Tópicos Salvos:</h3>
            <ul>
              {topics.map((topic, index) => (
                <li key={index} className="mb-2 flex justify-between items-center">
                  <span>{topic.nome}</span>
                  <button
                    onClick={() => editarTopico(index)}
                    className="w-32 py-1 bg-gradient-to-r to-rosinha from-laranja rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}