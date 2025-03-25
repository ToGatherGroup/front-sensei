import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};
const FormContainer = ({ children, className = "" }: ContainerProps) => {
  return (
    <section className="py-10 px-5">
      <div
        className={`m-auto w-auto max-w-[650px] min-w-fit min-h-fit bg-container rounded-lg px-5 py-12 box-border ${className}`}
      >
        {children}
      </div>
    </section>
  );
};
export default FormContainer;
