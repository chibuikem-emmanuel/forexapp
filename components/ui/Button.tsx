import { ReactNode } from "react";
import clsx from "clsx";

interface Props{

    children:ReactNode

    variant?:"primary"|"secondary"

}

export default function Button({

    children,

    variant="primary"

}:Props){

    return(

<button

className={clsx(

"rounded-2xl",

"px-7",

"py-4",

"font-semibold",

"transition-all",

"duration-300",

"cursor-pointer",

variant==="primary" &&

"bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,.5)]",

variant==="secondary" &&

"glass hover:bg-white/10"

)}

>

{children}

</button>

    )

}