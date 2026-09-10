import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, formatPrice, sections, CONTACT_URL } from "../../lib/products";

export const Route = createFileRoute("/programmy/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} — Веста Беспалова` },
      { name: "description", content: loaderData?.product.short ?? "" },
      { property: "og:title", content: `${loaderData?.product.name} — Веста Беспалова` },
      { property: "og:description", content: loaderData?.product.short ?? "" },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const section = sections.find((s) => s.id === product.section);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b-2 border-ink">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-8">
          <Link to="/" className="font-display text-xl font-bold uppercase md:text-2xl">
            Веста Беспалова
          </Link>
          <Link to="/" className="micro hover:text-lipstick">
            ← Все программы
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-20">
        {section && <p className="micro text-lipstick">{section.title}</p>}
        <h1 className="fade-up mt-4 font-display text-5xl font-semibold uppercase leading-[1.05] md:text-7xl">
          {product.name}
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_320px]">
          <div className="fade-up space-y-4 text-base leading-relaxed">
            {product.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {product.includes.length > 0 && (
              <div className="mt-8 border-2 border-ink p-6">
                <p className="micro text-lipstick">Внутри программы</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                  {product.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-lipstick">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="fade-up h-fit border-2 border-ink p-6 md:sticky md:top-8">
            <p className="micro text-muted-foreground">Стоимость</p>
            <p className="mt-2 font-display text-5xl font-bold text-lipstick">
              {formatPrice(product.price)}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Материалы размещены в закрытом Telegram-пространстве. Доступ предоставляется на три
              месяца, заниматься можно в своём темпе.
            </p>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noreferrer"
              className="micro mt-6 block bg-lipstick px-6 py-4 text-center text-paper transition-colors hover:bg-lipstick-deep"
            >
              Получить доступ
            </a>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noreferrer"
              className="micro mt-3 block border-2 border-ink px-6 py-4 text-center transition-colors hover:bg-ink hover:text-paper"
            >
              Задать вопрос
            </a>
          </aside>
        </div>
      </main>

      <footer className="border-t-4 border-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-8 md:px-8">
          <p className="font-display text-lg font-bold uppercase">Веста Беспалова</p>
          <Link to="/" className="micro hover:text-lipstick">На главную</Link>
        </div>
      </footer>
    </div>
  );
}
