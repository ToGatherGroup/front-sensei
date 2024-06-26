type TitleProps = {
    title: string;
    color?: string;
}

export default function Title({ title, color }: TitleProps) {
    return (
        <h2 className={`text-3xl xl:text-5xl lg:text-5xl md:text-3xl sm:text-3xl font-extrabold uppercase ${color ? `text-${color}` : 'text-white'}`}>{title}</h2>
    );
}
