interface Props{

title:string

subtitle:string

}

export default function SectionTitle({

title,

subtitle

}:Props){

return(

<div className="mx-auto mb-16 max-w-3xl text-center">

<h2 className="text-5xl font-bold">

{title}

</h2>

<p className="mt-6 text-lg text-slate-400">

{subtitle}

</p>

</div>

)

}