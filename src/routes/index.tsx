import { createFileRoute } from "@tanstack/react-router";
import { Site } from "@/components/site/Site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grupo ZKF | Store, Engenharia e Tecnologia" },
      {
        name: "description",
        content:
          "O Grupo ZKF reúne a ZKF Store (e-commerce), a ZKF Engenharia (projetos, loteamentos, obras industriais, comerciais, casas de alto padrão e lofts) e a ZKF Tecnologia, que desenvolve a Playzo, plataforma para o esporte.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:title", content: "Grupo ZKF" },
      { property: "og:description", content: "ZKF Store, ZKF Engenharia e ZKF Tecnologia: três empresas, um grupo." },
      { property: "og:site_name", content: "Grupo ZKF" },
      { property: "og:url", content: "https://grupokuriharaefigueiredo.vercel.app/" },
      { property: "og:image", content: "https://grupokuriharaefigueiredo.vercel.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Grupo ZKF: Store, Engenharia e Tecnologia" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://grupokuriharaefigueiredo.vercel.app/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://grupokuriharaefigueiredo.vercel.app/" }],
  }),
  component: Site,
});
