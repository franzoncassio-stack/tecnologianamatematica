import { createFileRoute } from "@tanstack/react-router";
import { MathFunctionApp } from "@/components/math-function-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Funcio — Aprenda Funções Matemáticas" },
      {
        name: "description",
        content:
          "Explore funções matemáticas de forma interativa. Ajuste parâmetros, visualize gráficos e domine funções afins, quadráticas e muito mais.",
      },
      { property: "og:title", content: "Funcio — Aprenda Funções Matemáticas" },
      {
        property: "og:description",
        content:
          "Explore funções matemáticas de forma interativa. Ajuste parâmetros, visualize gráficos e domine funções afins, quadráticas e muito mais.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <MathFunctionApp />;
}
