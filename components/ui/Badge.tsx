interface Props{

    children:string

}

export default function Badge({

children

}:Props){

return(

<div className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">

{children}

</div>

)

}