import { ReactElement } from "react";

type ContainerProps = {
  children: ReactElement | ReactElement[];
  className?: string | undefined;
};
const FormContainer = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className="py-10 px-5">
      <div
        className={`m-auto w-auto max-w-[650px] min-h-fit bg-container rounded-lg px-5 py-12 box-border ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
export default FormContainer;
