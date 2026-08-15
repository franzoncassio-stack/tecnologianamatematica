import { createFileRoute } from "@tanstack/react-router";

import { FunctionLab } from "@/components/function-lab";
import { FUNCTIONS } from "@/lib/functions";

const def = FUNCTIONS.afim;

export const Route = createFileRoute("/afim")({
  head: () => ({
    meta: [
      { title: `${def.title} — Funcio` },
      { name: "description", content: `${def.formula}: ${def.description}` },
      { property: "og:title", content: `${def.title} — Funcio` },
      { property: "og:description", content: `${def.formula}: ${def.description}` },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return <FunctionLab def={def} />;
}
