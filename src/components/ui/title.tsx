import Image from "next/image";

type Props = {
  title: string;
  iconSrc?: string | undefined;
  className?: string;
};
function Title({ title, iconSrc, className: outerClassName }: Props) {
  return (
    <div className={"flex justify-center items-center gap-4"}>
      <h2
        className={`font-extrabold capitalize h-fit text-center text-lg md:text-xl lg:text-2xl text-winePatternLight ${
          outerClassName ?? ""
        }`}
      >
        {title}
      </h2>
      {iconSrc && (
        <Image
          className="inline m-auto "
          src={iconSrc}
          alt="Ícone do formulário"
          width={24}
          height={24}
        />
      )}
    </div>
  );
}

export default Title;
