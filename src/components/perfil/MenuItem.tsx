/* eslint-disable @typescript-eslint/no-explicit-any */

interface MenuItemProps {
    texto: string
    url?: string
    className?: string
    onclick?: (evento: any) => void
}

export default function MenuItem(props: MenuItemProps) {
    return (
        <li
            onClick={props.onclick}
            className="hover:bg-gray-100 cursor-pointer rounded-t-xl"
        >
            <a className="flex flex-col justify-center items-center w-60 h-16 border-b-[1px] mx-2 border-gray-400 text-gray-700">
                <span className="text-lg font-bold">{props.texto}</span>
            </a>
        </li>
    )
}