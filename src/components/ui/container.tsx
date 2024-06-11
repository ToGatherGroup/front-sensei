import { ReactElement } from "react";

type ContainerProps = {
  children: ReactElement | ReactElement[];
  className?: string | undefined;
};
const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className="p-10 px-5">
      <div
        className={`m-auto w-auto max-w-[650px] min-h-fit bg-container rounded p-5 box-border ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
export default Container;
