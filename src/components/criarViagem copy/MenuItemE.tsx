/* eslint-disable @typescript-eslint/no-explicit-any */
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

interface MenuItemVProps {
    texto: string
    url?: string
    className?: string
    onclick?: (evento: any) => void
    disabled?: boolean
    selected?: boolean
    cor?: string
}

export default function MenuItemV({texto, onclick, disabled, selected, cor}: MenuItemVProps) {
    
    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        if (disabled) {
          Toastify({
            text: "É necessário cadastrar uma viagem primeiro!",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#ff5f5f",
            close: true,
          }).showToast();
        } else if (onclick) {
          onclick(e);
        }
      };

    return (
        <li
            onClick={handleClick}
            className={`${disabled ? "cursor-not-allowed bg-gray-300 rounded-none" : "hover:bg-gray-100 cursor-pointer rounded-t-xl"} ${
                selected ? "bg-gray-100" : ""
              }`}
        >
            <a
                className={`flex flex-row items-center w-60 h-16 border-b-[1px] mx-2 border-gray-400 text-gray-700 ${selected ? "group" : ""
                    }`}
            >
                <span
                    className={`${selected ? "opacity-100" : "opacity-0"
                        } group-hover:opacity-100 flex flex-row ${cor} w-1 h-8 rounded-full p-1 top-6`}
                ></span>
                <span className="px-8 text-lg font-bold">{texto}</span>
            </a>
        </li>
    )
}