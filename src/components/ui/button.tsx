"use client";

type Props = {
  text: string;
  type: "submit" | "button";
  onClick?: () => void | undefined;
  font?:
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | undefined;
  className?: string | undefined;
  disabled?: boolean | undefined;
  isLoading?: boolean | undefined;
  active?: boolean | undefined;
};

const Button = ({
  text,
  type,
  onClick: handleClick,
  font: outerFont,
  className: outerClassName,
  disabled = false,
  isLoading = false,
  active = false,
}: Props) => {
  const font = outerFont ? ` font-${outerFont}` : " font-semibold";

  let className =
    "box-border capitalize min-h-10 rounded-md py-2 px-6 text-center duration-300 outline outline-1 outline-solid outline-winePatternLight tracking-wide " +
    (active
      ? "bg-white text-winePattern"
      : "bg-winePattern text-white hover:bg-white hover:text-winePattern") +
    font;

  if (outerClassName) className = `${className} ${outerClassName}`;

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${className} ${isLoading && "!pointer-events-none"}`}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Carregando ..." : text}
    </button>
  );
};
export default Button;
