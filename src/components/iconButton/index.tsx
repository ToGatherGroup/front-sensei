import Link from "next/link";

type IconButtonProps = {
    href: string;
    src: string;
    alt: string;
};

const IconButton = ({ href, src, alt }: IconButtonProps) => {
    return (
        <Link href={href}>
            <img src={src} alt={alt} className="bg-white rounded-lg p-1 object-contain w-10 h-10 lg:w-14 lg:h-14" />
        </Link>
    );
};

export default IconButton;