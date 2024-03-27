type TitleProps = {
    title: string;
    color?: string;
}

export default function Title({ title, color }: TitleProps) {
    return (
        <h2 className={`text-5xl font-extrabold uppercase ${color ? `text-${color}` : 'text-white'}`}>{title}</h2>
    );
}
