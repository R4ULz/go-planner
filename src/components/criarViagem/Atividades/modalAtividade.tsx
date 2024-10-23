import {useState} from "react"

type modalAtividadeProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (name: string, dateTime: Date) => void;

};

export default function ModalAtividade({isOpen, onClose, onSave}: modalAtividadeProps){
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    if(!isOpen) return null;

    const handleSave = () => {
      const combinedDateTime = new Date(`${date}T${time}`);

      onSave(name, combinedDateTime);
      setName("");
      setDate("");
      setTime("");
      
      onClose();
  };

    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2 flex">Adicionar Atividade<span className="bg-laranja w-2 h-2 rounded-full p-1 flex mt-3 ml-1"></span></h2>
          <h2 className="text-lg mb-5 opacity-[50%]">Crie a atividade que você irá fazer no dia x e hora xx:xx </h2>
          <div className="mb-4">
            <label className="block mb-2"></label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded-xl"
              placeholder=" Digite a Atividade"
            />     

            <div className="flex flex-row pt-2 gap-5">

                <div className="mb-4">
                    <label className="block mb-2 w-full"></label>
                    <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="border p-2 w-full rounded-xl"
                    placeholder="12:00"
                    />
                </div> 

                <div className="mb-4 w-full">
                    <label className="block mb-2 w-full"></label>
                    <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 w-full rounded-xl"
                    placeholder="Escolha o dia"
                    />
                </div>

            </div>
          
          </div>
          <div className="flex flex-col">
            <button onClick={onClose} className="mr-4 text-red-500 w-full">Cancelar</button>
            <button onClick={handleSave} className="py-1 bg-gradient-to-r to-rosinha from-laranja rounded-xl text-white w-full">
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
}