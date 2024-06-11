import { ReactElement } from "react";

type Props = {
  children: ReactElement;
  className?: string | undefined;
};
const Container = ({ children, className = "" }: Props) => {
  return (
    <div className="p-10 px-5">
      <div
        className={`m-auto w-auto max-w-[650px] min-h-[80vh] bg-gray-200 rounded p-5 box-border ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
export default Container;
