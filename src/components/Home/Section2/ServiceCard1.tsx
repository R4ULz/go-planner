export default function ServiceCard1({ title, description, onClick, option, isActive }) {
    const bgColorClass =
      option === 1
        ? 'bg-rosinha'
        : option === 2
        ? 'bg-laranja'
        : option === 3
        ? 'bg-roxo'
        : '';
  
    return (
      <div
        className={`flex flex-row p-2 ${
          isActive
            ? 'border-solid border-black rounded-xl shadow-border-shadow cursor-pointer'
            : 'group hover:border-solid hover:border-black hover:rounded-xl hover:shadow-border-shadow hover:cursor-pointer'
        }`}
        onClick={onClick}
      >
        <div className="flex flex-row p-3">
          <div>
            <span
              className={`${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              } flex flex-row ${bgColorClass} w-2 md:h-40 rounded-full p-1 top-6 sm:h-28`}
            ></span>
          </div>
        </div>
  
        <div className="mt-2">
          <strong className="text-xl p-2">{title}</strong>
          <p className="p-2">{description}</p>
        </div>
      </div>
    );
  }