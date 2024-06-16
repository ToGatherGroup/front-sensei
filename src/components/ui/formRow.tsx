/*

Exemplo de como usar:

    <FormRow
    label={
        <label htmlFor={`coreTime.${index}.value` as const}>
        {field.atletaNome}
        </label>
    }

    input={
        <input type="text"/>
    }

    errorMessage={errors.coreTime?.[index]?.value?.message}
    />
*/

type FormRowProps = {
  label: React.ReactElement;
  input: React.ReactElement;
  errorMessage?: string | undefined;
  className?: string | undefined;
};
const FormRow = ({
  label,
  input,
  errorMessage,
  className: outerClassName,
}: FormRowProps) => {
  const className = {
    labelChildren:
      "[&_label]:w-full [&_label]:max-w-full [&_label]:sm:w-72 [&_label]:text-center",
    inputChildren: `[&_input]:w-24 [&_input]:text-center [&_input]:placeholder:text-center ${
      errorMessage &&
      "[&_input]:outline [&_input]:outline-1 [&_input]:outline-red-600 [&_input]:mb-5"
    }`,
  };
  return (
    <div
      className={`flex flex-col sm:flex-row gap-1 items-center justify-center mt-6 ${className.labelChildren} ${className.inputChildren} ${outerClassName}`}
    >
      {label}
      <div className="flex flex-col justify-center items-center md:justify-start md:items-start">
        {input}
        {errorMessage && (
          <p className={`absolute p-1 text-red-600 translate-y-8 max-w-60`}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};
export default FormRow;
