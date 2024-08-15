import { ReactElement, useCallback } from "react";

type Props = {
  className?: string;
  children?: ReactElement;
};
const Losango = ({ className, children }: Props) => {
  return (
    <div className={`-skew-x-[30deg] p-1 px-2 ${className}`}>
      <div className="skew-x-[30deg]">{children}</div>
    </div>
  );
};
export default Losango;
