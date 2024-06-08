import Image from "next/image";

type Props = {
  title: string;
  iconSrc: string;
  className?: string;
};
function formTitle({ title, iconSrc, className: outerClassName }: Props) {
  return (
    <div
      className={`flex justify-center items-center gap-4 ${
        outerClassName ?? ""
      }`}
    >
      <h2 className="font-extrabold capitalize h-fit text-lg md:text-xl lg:text-2xl text-winePatternLight">
        {title}
      </h2>
      <Image
        className="inline m-auto "
        src={iconSrc}
        alt="Ícone do formulário"
        width={24}
        height={24}
      />
    </div>
  );
}

export default formTitle;
