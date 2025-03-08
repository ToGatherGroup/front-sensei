import { SvgProps } from "@/types/Svg";

const SvgAddUser = ({ size = 24, ...props }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.5 22H6.59c-1.545 0-2.774-.752-3.877-1.803c-2.26-2.153 1.45-3.873 2.865-4.715A10.65 10.65 0 0 1 15 14.78m1.5-8.28a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m2 15.5v-7M15 18.5h7" />
  </svg>
);

export default SvgAddUser;
