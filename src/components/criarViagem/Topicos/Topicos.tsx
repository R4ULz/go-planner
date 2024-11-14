import { useState, useEffect } from 'react'; 
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js'; // Dependências do Froala
import 'froala-editor/css/froala_editor.pkgd.min.css'; // Estilos do editor
import 'froala-editor/css/froala_style.min.css'; // Estilos adicionais

export default function Topico({ tripData, handleUpdateTrip }) {
  // Carregar tópicos do sessionStorage se existirem, ou usar tripData
  const initialContent = () => {
    const storedContent = sessionStorage.getItem(`trip_${tripData._id}_topicos`);
    return storedContent ? JSON.parse(storedContent) : (tripData?.topicos?.[0]?.conteudo || '');
  };

  const [content, setContent] = useState(() => {
    const initial = initialContent();
    return typeof initial === 'string' ? initial : '';
  });

  const [topicName, setTopicName] = useState(tripData?.topicos?.[0]?.nome || 'Tópico Principal');

  useEffect(() => {
    // Atualizar sessionStorage sempre que o conteúdo mudar
    sessionStorage.setItem(
      `trip_${tripData._id}_topicos`,
      JSON.stringify(content)
    );
  }, [content]);

  // Função para extrair texto puro do HTML
  const stripHtmlTags = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    return doc.body.textContent || "";
  };

  const handleContentChange = (updatedContent) => {
    if (typeof updatedContent === 'string') {
      setContent(updatedContent);
      const plainTextContent = stripHtmlTags(updatedContent);
      handleUpdateTrip({
        topicos: [{ nome: topicName, conteudo: plainTextContent }],
      });
    }
  };

  // Função para salvar os tópicos no sessionStorage
  const salvarTopicos = () => {
    // Armazenar nome e conteúdo no sessionStorage como texto puro
    const plainTextContent = stripHtmlTags(content);
    const topicosData = {
      nome: topicName,
      conteudo: plainTextContent,
    };
    sessionStorage.setItem(`trip_${tripData._id}_topicos`, JSON.stringify(topicosData));
    alert('Tópicos salvos com sucesso!');
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
              Salvar Tópicos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}