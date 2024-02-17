type TitleProps = {
    title: string;
}

export default function Title({title} : TitleProps){
    return (
        <h2 className="text-5xl	font-extrabold text-white uppercase">{title}</h2>
    )
}