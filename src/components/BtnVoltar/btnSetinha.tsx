import { useRouter } from "next/router";
import { Setinha } from "./setinha";

export default function VoltarSetinha(){
    const router = useRouter();

    return(
        <button onClick={() => router.back()} >
            {Setinha}
        </button>
    );
}