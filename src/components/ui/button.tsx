"use client";

type Props = {
  text: string;
  type: "submit" | "button";
  onClick?: () => any | undefined;
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
};

const Button = ({
  text,
  type,
  onClick: handleClick,
  font: outerFont,
  className: outerClassName,
  disabled = false,
  isLoading = false,
}: Props) => {
  const font = outerFont ? ` font-${outerFont}` : " font-semibold";

  let className =
    "box-border capitalize min-h-10 rounded-md py-2 px-6 text-center duration-300 bg-winePattern outline outline-1 outline-solid outline-winePatternLight text-white tracking-wide hover:bg-white hover:text-winePattern" +
    font;

  if (outerClassName) className = `${className} ${outerClassName}`;

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${className} ${
        (isLoading || disabled) &&
        "!pointer-events-none !bg-gray-400 !text-gray-600 !outline-gray-500"
      }`}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Carregando ..." : text}
    </button>
  );
};
export default Button;
