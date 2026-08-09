"use client";

import dynamic from "next/dynamic";

const AskSanjai = dynamic(
  () => import("./ask-sanjai").then((mod) => mod.AskSanjai),
  { ssr: false, loading: () => null }
);

export function AskSanjaiEntry() {
  return <AskSanjai />;
}
