type Title = {
    title: string;
}

export default function Title({title} : Title){
    return (
        <h2 className="text-5xl	font-extrabold text-white uppercase">{title}</h2>
    )
}