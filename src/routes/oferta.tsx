import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { OFERTA_PARAGRAPHS } from "../lib/oferta";

export const Route = createFileRoute("/oferta")({
  head: () => ({
    meta: [
      { title: "Договір оферти — Веста Безпалова" },
      { name: "description", content: "Публічний договір (оферта) про надання послуг ФОП Безпалова Вєста Олександрівна." },
      { property: "og:title", content: "Договір оферти — Веста Безпалова" },
      { property: "og:description", content: "Публічний договір (оферта) про надання послуг." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OfertaPage,
});

const isHeading = (p: string) => /^\d+\.\s/.test(p);

function OfertaPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10">
          <Link to="/" className="font-display text-xl font-semibold">Веста Безпалова</Link>
          <Link to="/" className="nav-link flex items-center gap-2"><ArrowLeft size={14} /> На главную</Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <h1 className="font-display text-4xl font-light leading-tight md:text-6xl">Публічний договір (оферта) про надання послуг</h1>
        <div className="mt-12 space-y-4 font-light leading-7 text-ink/85">
          {OFERTA_PARAGRAPHS.map((p, i) =>
            isHeading(p) ? (
              <h2 key={i} className="pt-6 font-display text-2xl font-medium text-ink">{p}</h2>
            ) : (
              <p key={i}>{p}</p>
            ),
          )}
        </div>
      </main>
    </div>
  );
}
