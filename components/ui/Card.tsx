import { ReactNode } from "react";
import clsx from "clsx";

interface Props{
    children:ReactNode
    className?:string
}

export default function Card({
    children,
    className
}:Props){

    return(

        <div
        className={clsx(

            "glass",

            "rounded-[28px]",

            "transition-all duration-500",

            "hover:-translate-y-2",

            "hover:border-blue-500/40",

            "hover:shadow-[0_0_60px_rgba(37,99,235,.18)]",

            "p-8",

            className

        )}
        >

            {children}

        </div>

    )

}