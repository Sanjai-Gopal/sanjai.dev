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
        d="M9.5 8.5h7.5a3 3 0 0 1 0 6c-4 0-7.5 1.2-7.5 5.2 0 2 1.6 3.3 3.5 3.3H22"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="8.5" r="2.6" fill="currentColor" />
      <circle cx="13.8" cy="16.5" r="1.7" fill="currentColor" />
      <circle cx="22" cy="23" r="2.6" fill="currentColor" />
    </svg>
  );
}
