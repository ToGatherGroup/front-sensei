import { SvgProps } from "@/types/Svg";

const SvgAddAssessment = ({ size = 24, ...props }: SvgProps) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="2 2 20 20"
  width={size}
  height={size}
  fill="currentColor"
  {...props}
>
  <path d="m16.2 10.7l.6-2.4c.1-.3.5-1.7-.3-2.9C15.9 4.5 14.7 4 13 4h-2c-1.7 0-2.9.5-3.5 1.4c-.8 1.2-.4 2.5-.3 2.9l.6 2.4C6.7 11.8 6 13.3 6 15c0 2.1 1.1 3.9 2.7 5h6.6c1.6-1.1 2.7-2.9 2.7-5c0-1.7-.7-3.2-1.8-4.3M9.6 9.5l-.5-1.7v-.1s-.2-.7.1-1.1Q9.5 6 11 6h2c.9 0 1.6.2 1.9.5c.3.4.1 1.1.1 1.1l-.5 1.9c-.8-.3-1.6-.5-2.5-.5s-1.7.2-2.4.5" />

  <defs>
    <clipPath id="clip-add-icon">
      <rect x="2" y="2" width="20" height="20" />
      <circle cx="18" cy="18" r="5" fill="white" />
    </clipPath>
  </defs>

  <g clipPath="url(#clip-add-icon)">
    <path d="m16.2 10.7l.6-2.4c.1-.3.5-1.7-.3-2.9C15.9 4.5 14.7 4 13 4h-2c-1.7 0-2.9.5-3.5 1.4c-.8 1.2-.4 2.5-.3 2.9l.6 2.4C6.7 11.8 6 13.3 6 15c0 2.1 1.1 3.9 2.7 5h6.6c1.6-1.1 2.7-2.9 2.7-5c0-1.7-.7-3.2-1.8-4.3M9.6 9.5l-.5-1.7v-.1s-.2-.7.1-1.1Q9.5 6 11 6h2c.9 0 1.6.2 1.9.5c.3.4.1 1.1.1 1.1l-.5 1.9c-.8-.3-1.6-.5-2.5-.5s-1.7.2-2.4.5" />
  </g>

  <g transform="translate(14, 14) scale(0.5)">
    <path
      d="M12 8v8m4-4H8m14 0c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10"
      
    />
  </g>
</svg>
);

export default SvgAddAssessment;