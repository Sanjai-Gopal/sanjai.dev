import type { SVGProps } from "react";

export function SanjaiLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M23.5 9H12.5C10.0147 9 8 11.0147 8 13.5C8 15.9853 10.0147 18 12.5 18H19.5C21.9853 18 24 20.0147 24 22.5C24 24.9853 21.9853 27 19.5 27H8.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="23.5" cy="9" r="1.5" fill="#10b981" />
    </svg>
  );
}
