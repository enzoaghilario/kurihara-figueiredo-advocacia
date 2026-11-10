import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/Site";

const TITULO = "Grupo Kurihara & Figueiredo | Conglomerado jurídico-empresarial";
const DESC =
  "O Grupo Kurihara & Figueiredo é um conglomerado de empresas voltado à área jurídico-empresarial: assessoria jurídica, contábil, financeira, patrimonial, SST, certificado digital, marcas e patentes. Ribeirão Preto e Morro Agudo, SP.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:title", content: "Grupo Kurihara & Figueiredo" },
      { property: "og:description", content: "Conglomerado de empresas voltado à área jurídico-empresarial. Ribeirão Preto e Morro Agudo, SP." },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Site,
});
