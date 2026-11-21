import type { SVGProps } from "react";

export function SanjaiLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M366 160H200C164.654 160 136 188.654 136 224C136 259.346 164.654 288 200 288H312C347.346 288 376 316.654 376 352C376 387.346 347.346 416 312 416H146"
        stroke="currentColor"
        strokeWidth="48"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="366" cy="160" r="18" fill="#10b981" />
    </svg>
  );
}
