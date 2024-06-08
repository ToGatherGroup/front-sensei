/*
    Exemplo de como usar com type={"options"}:

    <Input
        type="select"
        options={[
            { value: "1", label: "Número 1" },
            { value: "2", label: "Número 2" },
        ]}
        placeHolder="Selecione um número"
        size="normal"
    />

*/

type Props = {
  name?: string | undefined;
  type: "text" | "select" | "date" | "email" | "file" | "password" | "submit";
  placeHolder?: string | undefined;
  size: "tiny" | "small" | "normal" | "fit";
  defaultValue?: string | undefined;
  options?: {
    value: string;
    label: string;
  }[];
  className?: string | undefined;
};

const SIZES = {
  tiny: "w-[5rem]",
  small: "w-[8rem]",
  normal: "w-[14rem] sm:w-[19rem]",
  fit: "w-fit",
};

const Input = ({
  name,
  type,
  placeHolder,
  size,
  options, // Only for Select type
  defaultValue, // Only for Select type
  className: outerClassName,
}: Props) => {
  const className = `bg-gray-300 rounded p-1.5 ${SIZES[size]} ${outerClassName}`;

  if (type === "submit")
    throw new Error(
      "Você deveria usar o componente <Button type='submit' /> no lugar deste Input."
    );

  if (type === "select" && !options)
    throw new Error(
      "A prop 'options' é obrigatória para o type={'select'}.\nConsulte o exemplo no componente para saber como passar essa prop."
    );

  if (type === "select")
    return (
      <select
        name={name}
        defaultValue={placeHolder ? "" : defaultValue}
        className={className}
      >
        {placeHolder && (
          <option value="" disabled hidden>
            {placeHolder}
          </option>
        )}
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );

  return (
    <input
      name={name}
      type={type}
      placeholder={placeHolder}
      className={`focus:outline focus:outline-2 focus:outline-winePatternLight ${className}`}
    />
  );
};
export default Input;
