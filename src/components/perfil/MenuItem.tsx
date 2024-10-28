import React from "react";

interface MenuItemProps {
  texto: string;
  onclick: () => void;
  selected?: boolean;
  cor?: string;
}

export default function MenuItem({ texto, onclick, selected, cor }: MenuItemProps) {
  return (
    <li
      onClick={onclick}
      className={`${
        selected ? "bg-gray-100" : ""
      } cursor-pointer hover:bg-gray-100 rounded-t-xl`}
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
  );
}
