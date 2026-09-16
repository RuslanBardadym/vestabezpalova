import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "../../components/Reveal";
import { ProductMockup } from "../../components/ProductMockup";
import { getProduct, formatPrice, sections, CONTACT_URL } from "../../lib/products";

export const Route = createFileRoute("/programmy/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} — Веста Безпалова` },
      { name: "description", content: loaderData?.product.short ?? "" },
      { property: "og:title", content: `${loaderData?.product.name} — Веста Безпалова` },
      { property: "og:description", content: loaderData?.product.short ?? "" },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const section = sections.find((item) => item.id === product.section);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10">
          <Link to="/" className="font-display text-xl font-semibold">Веста Безпалова</Link>
          <Link to="/" hash="programmy" className="nav-link flex items-center gap-2"><ArrowLeft size={14} /> Все программы</Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden py-20 md:py-32">
          <span aria-hidden className="pointer-events-none absolute -right-12 -top-24 font-display text-[28rem] italic leading-none text-ink/[0.03]">V</span>
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="micro flex items-center gap-4 text-lipstick"><span className="h-px w-10 bg-current" />{section?.title}</p>
              <h1 className="mt-8 max-w-5xl font-display text-6xl font-light leading-[0.88] md:text-8xl">{product.name}</h1>
              <p className="mt-8 max-w-2xl font-display text-2xl font-light italic leading-snug text-muted-foreground md:text-3xl">{product.short}</p>
              <div className="mt-10 max-w-sm border-y border-ink/15 py-7">
                <p className="micro text-muted-foreground">Стоимость</p>
                <p className="mt-2 font-display text-5xl font-light text-lipstick">{formatPrice(product.price)}</p>
                {product.paymentUrl ? (
                  <>
                    <a href={product.paymentUrl} target="_blank" rel="noreferrer" className="button-primary mt-7 w-full justify-center">Купить <ArrowRight size={15} /></a>
                    {product.paymentNote && <p className="mt-4 text-xs font-light leading-5 text-muted-foreground">{product.paymentNote}</p>}
                  </>
                ) : (
                  <a href={CONTACT_URL} target="_blank" rel="noreferrer" className="button-dark mt-7 w-full justify-center">Получить доступ <ArrowRight size={15} /></a>
                )}
              </div>
            </Reveal>
            <Reveal className="mx-auto w-full max-w-lg lg:col-span-5" delay={120}>
               <ProductMockup slug={product.slug} name={product.name} />
            </Reveal>
          </div>
        </section>

        <section className="bg-ink py-20 text-paper md:py-28">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="micro flex items-center gap-4 text-paper/50"><span className="h-px w-10 bg-current" />О программе</p>
              <div className="mt-7 space-y-5 font-light leading-8 text-paper/65">{product.description.map((text) => <p key={text}>{text}</p>)}</div>
              <p className="mt-10 border-l border-lipstick pl-6 font-display text-2xl italic text-paper">Занимайтесь в своём темпе. Доступ к материалам — три месяца.</p>
            </Reveal>
            {product.includes.length > 0 && <Reveal className="lg:col-span-6 lg:col-start-7" delay={100}>
              <p className="font-display text-4xl font-light">Что внутри</p>
              <ol className="mt-8 divide-y divide-paper/15 border-t border-paper/15">{product.includes.map((item, index) => <li key={item} className="flex gap-6 py-5"><span className="font-display italic text-lipstick">{String(index + 1).padStart(2, '0')}</span><span className="font-light text-paper/75">{item}</span></li>)}</ol>
            </Reveal>}
          </div>
        </section>

        <section className="py-24 text-center md:py-32">
          <Reveal className="mx-auto max-w-3xl px-5">
            <p className="font-display text-2xl italic text-lipstick">Готовы начать?</p>
            <h2 className="mt-4 font-display text-5xl font-light leading-none md:text-7xl">Получите доступ к программе</h2>
            <p className="mx-auto mt-6 max-w-lg font-light leading-7 text-muted-foreground">{product.paymentUrl ? (product.paymentNote ?? "После оплаты напишите Весте в Telegram — она выдаст доступ.") : "Материалы находятся в закрытом Telegram-пространстве. Веста ответит на вопросы и поможет с доступом."}</p>
            <div className="mt-9 flex justify-center">{product.paymentUrl ? <a href={product.paymentUrl} target="_blank" rel="noreferrer" className="button-primary">Купить <ArrowRight size={15} /></a> : <a href={CONTACT_URL} target="_blank" rel="noreferrer" className="button-primary">Получить доступ <ArrowRight size={15} /></a>}</div>
          </Reveal>
        </section>
      </main>

      <footer className="bg-ink py-10 text-paper"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10"><p className="font-display text-xl">Веста Безпалова</p><Link to="/" className="nav-link text-paper">На главную</Link></div></footer>
    </div>
  );
}