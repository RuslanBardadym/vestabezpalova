import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, ArrowRight, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "../components/Reveal";
import { ProductMockup } from "../components/ProductMockup";
import { sections, productsBySection, formatPrice, CONTACT_URL } from "../lib/products";
import heroBg from "../assets/hero-bg.jpg";
import vestaHero from "../assets/vesta-hero.png.asset.json";
import vestaAbout from "../assets/vesta-about.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Веста Безпалова — масштаб и деньги в эзотерике" },
      {
        name: "description",
        content:
          "Программы Весты Безпаловой для эзотериков: проявленность, деньги, Таро, Род, магия и личное наставничество.",
      },
      { property: "og:title", content: "Веста Безпалова — масштаб и деньги в эзотерике" },
      {
        property: "og:description",
        content: "От сильной практики — к профессии, высокому чеку и масштабу.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const stats = [
  ["$10 000+", "личный чек"],
  ["15+", "лет в эзотерике"],
  ["300+", "учениц"],
  ["$2 млн+", "заработали ученицы"],
];

const faq = [
  [
    "Где находятся материалы?",
    "Материалы размещены в закрытых Telegram-пространствах. После оплаты участница получает информацию для доступа.",
  ],
  [
    "На какой срок предоставляется доступ?",
    "Доступ к материалам самостоятельных программ предоставляется на три месяца.",
  ],
  [
    "Можно ли заниматься в своём темпе?",
    "Да. Вы самостоятельно выбираете удобный график и возвращаетесь к материалам в течение всего периода доступа.",
  ],
  [
    "Как выбрать программу?",
    "Выберите направление по своему запросу или напишите Весте, чтобы получить личную рекомендацию.",
  ],
  [
    "Как попасть в наставничество?",
    "Напишите Весте и коротко расскажите о своей ситуации. После знакомства она предложит подходящий формат.",
  ],
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`micro flex items-center gap-4 ${light ? "text-paper/60" : "text-lipstick"}`}>
      <span className="h-px w-10 bg-current" />
      {children}
    </p>
  );
}

function Heading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className={`mt-5 max-w-4xl font-display text-5xl font-light leading-[0.95] md:text-7xl ${light ? "text-paper" : "text-ink"}`}
    >
      {children}
    </h2>
  );
}

function SectionNav({ activeId }: { activeId: string | null }) {
  return (
    <div className="section-nav">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          onClick={() => {
            const element = document.getElementById(section.id);
            if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className={`section-nav__item ${activeId === section.id ? "section-nav__item--active" : ""}`}
        >
          {section.title}
        </button>
      ))}
    </div>
  );
}

function TopicList() {
  return (
    <section className="border-t border-ink/10 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <Eyebrow>Что я даю</Eyebrow>
        </Reveal>
        <div className="topic-list mt-8 md:mt-10">
          {sections.map((section, index) => {
            const items = productsBySection(section.id);
            const from = Math.min(...items.map((item) => item.price));
            return (
              <Reveal key={section.id} delay={index * 70}>
                <button
                  type="button"
                  onClick={() => {
                    const element = document.getElementById(section.id);
                    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="topic-list__row"
                >
                  <span className="topic-list__title">{section.title}</span>
                  <span className="topic-list__meta">
                    <span>{items.length} программ</span>
                    <span className="text-lipstick">от {formatPrice(from)}</span>
                    <ArrowRight size={16} className="topic-list__arrow" />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRatios = useRef<Record<string, number>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionRatios.current[entry.target.id] = entry.intersectionRatio;
        });
        const best = Object.entries(sectionRatios.current)
          .filter(([, ratio]) => ratio > 0)
          .sort((a: [string, number], b: [string, number]) => b[1] - a[1])[0];
        if (best) setActiveSection(best[0]);
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.5] },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden bg-paper text-ink">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 md:px-10">
          <a href="#top" className="font-display text-xl font-semibold">
            Веста Безпалова
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            <a href="#programmy" className="nav-link">
              Программы
            </a>
            <a href="#nastavnichestvo" className="nav-link">
              Наставничество
            </a>
            <a href="#o-veste" className="nav-link">
              О Весте
            </a>
          </nav>
          <a href={CONTACT_URL} target="_blank" rel="noreferrer" className="button-primary">
            Написать Весте
          </a>
        </div>
      </header>

      <main>
        <section id="top" className="relative min-h-[72svh] pt-28 md:min-h-[80svh]">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-14 top-20 font-display text-[24rem] italic leading-none text-ink/[0.035]"
          >
            V
          </span>
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-14 md:min-h-[calc(80svh-7rem)] md:gap-12 md:px-10 lg:grid-cols-12 lg:gap-16">
            <Reveal className="relative lg:col-span-6 lg:order-2">
              <div className="absolute -left-4 -top-4 h-full w-full border border-lipstick/35" />
              <div className="image-reveal relative aspect-[4/5] overflow-hidden shadow-luxury">
                <img
                  src={vestaHero.url}
                  alt="Веста Безпалова с лимоном"
                  width={3024}
                  height={4032}
                  fetchPriority="high"
                  className="h-full w-full object-cover object-[center_20%] transition-transform duration-1000 hover:scale-[1.025] md:object-[center_18%]"
                />
              </div>
              <div className="absolute -bottom-5 right-0 bg-paper px-6 py-4 shadow-soft md:-right-7 md:px-8">
                <p className="font-display text-xl italic">Дар должен быть проявлен</p>
              </div>
            </Reveal>

            <Reveal className="relative z-10 lg:col-span-6 lg:order-1" delay={120}>
              <Eyebrow>Масштаб и деньги в эзотерике</Eyebrow>
              <h1 className="mt-6 font-display text-[clamp(3.6rem,7vw,7.2rem)] font-light leading-[0.82]">
                Веста
                <br />
                <span className="ml-[12%] italic text-lipstick">Безпалова</span>
              </h1>
              <p className="mt-9 max-w-lg font-display text-3xl font-light leading-tight md:text-4xl">
                Я знаю, как зарабатывать много на эзотерике.
              </p>
              <p className="mt-5 max-w-md text-sm font-light leading-7 text-ink/85 md:text-base md:leading-8">
                Помогаю сильным специалистам становиться востребованными, создавать продукты и
                уверенно продавать свои знания.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-7">
                <a href="#programmy" className="button-dark">
                  Смотреть программы <ArrowRight size={15} />
                </a>
                <a href="#o-veste" className="text-link">
                  Моя история
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <TopicList />

        <section className="border-y border-ink/10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 md:grid-cols-4 md:px-10">
            {stats.map(([value, label], index) => (
              <Reveal
                key={value}
                delay={index * 80}
                className="border-ink/10 py-7 odd:border-r md:border-r md:last:border-r-0 md:px-7 first:pl-0"
              >
                <p className="font-display text-4xl font-light text-lipstick md:text-5xl">
                  {value}
                </p>
                <p className="micro mt-2 text-muted-foreground">{label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-ink py-24 text-paper md:py-36">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <Eyebrow light>Почему я понимаю этот рынок</Eyebrow>
              <Heading light>
                Эзотерик. Маркетолог. Продюсер.{" "}
                <em className="font-light text-lipstick">Наставник.</em>
              </Heading>
            </Reveal>
            <Reveal
              className="space-y-6 self-end text-base font-light leading-8 text-paper/65 lg:col-span-5"
              delay={120}
            >
              <p>
                Более 15 лет я сама работаю как эзотерик: провожу практики, создаю программы и
                продаю свои знания на высокие чеки.
              </p>
              <p>
                Одновременно я изучила маркетинг, продажи и создание продуктов. Поэтому понимаю и
                женщину, которая открывает способности, и практика, который готов достойно
                зарабатывать.
              </p>
            </Reveal>
          </div>
          <div className="mx-auto mt-20 grid max-w-7xl gap-px bg-paper/15 md:grid-cols-2">
            {[
              [
                "01",
                "Эзотерика для жизни",
                "Таро, Род, Северная магия, медитации, символы и раскрытие Дара.",
              ],
              [
                "02",
                "Эзотерика как профессия",
                "Проявленность, продукты, контент, продажи, высокий чек и масштаб.",
              ],
            ].map(([n, title, text]) => (
              <Reveal key={n} className="group bg-ink px-5 py-12 md:px-10 md:py-16">
                <span className="font-display text-2xl italic text-lipstick">{n}</span>
                <h3 className="mt-12 font-display text-4xl font-light md:text-5xl">{title}</h3>
                <p className="mt-5 max-w-lg text-sm font-light leading-7 text-paper/55">{text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="programmy" className="py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal>
              <Eyebrow>Программы Весты</Eyebrow>
              <Heading>
                Выберите то, что нужно вам <em className="font-light text-lipstick">сейчас</em>
              </Heading>
              <p className="mt-7 max-w-xl font-light leading-7 text-muted-foreground">
                Начните с небольшой практики, освойте направление, раскройте Дар или пересоберите
                профессиональный проект.
              </p>
            </Reveal>
            <SectionNav activeId={activeSection} />
            <div className="mt-10 md:mt-12">
              {sections.map((section, sectionIndex) => (
                <div
                  id={section.id}
                  key={section.id}
                  className="border-t border-ink/20 py-12 md:py-16 scroll-mt-28"
                >
                  <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
                    <div className="flex min-w-0 items-start gap-5">
                      <p className="shrink-0 font-display text-xl italic text-lipstick">
                        0{sectionIndex + 1}
                      </p>
                      <h3 className="font-display text-4xl font-light leading-[1.05] md:text-5xl">
                        {section.title}
                      </h3>
                    </div>
                    <p className="max-w-md text-sm font-light leading-6 text-muted-foreground">
                      {section.lead}
                    </p>
                  </Reveal>
                  <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" delay={100}>
                    {productsBySection(section.id).map((product) => (
                      <Link
                        key={product.slug}
                        to="/programmy/$slug"
                        params={{ slug: product.slug }}
                        className="program-card group"
                      >
                        <div className="program-card__visual">
                          <ProductMockup slug={product.slug} name={product.name} compact />
                        </div>
                        <div className="program-card__body">
                          <h4 className="font-display text-3xl font-light leading-[1.05]">
                            {product.name}
                          </h4>
                          <p className="mt-4 text-sm font-light leading-6 text-muted-foreground">
                            {product.short}
                          </p>
                          <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                            <span className="whitespace-nowrap font-display text-2xl text-lipstick">
                              {formatPrice(product.price)}
                            </span>
                            <span className="program-card__link">
                              Подробнее <ArrowDownRight size={16} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal>
              <div className="telegram-section">
                <div>
                  <Eyebrow light>Telegram</Eyebrow>
                  <h2 className="mt-5 font-display text-4xl font-light leading-[1.02] md:text-5xl">
                    Бесплатное обучение <em className="font-light text-lipstick">в Telegram</em>
                  </h2>
                  <p className="mt-5 max-w-lg font-light leading-7 text-paper/65">
                    Вступайте в закрытое сообщество: практики, разборы и поддержка на пути
                    эзотерика.
                  </p>
                </div>
                <a
                  href="https://t.me/+DTe_SNWQfLwyODQy"
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary mt-8 md:mt-0"
                >
                  <Send size={15} /> Войти в Telegram
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-ink py-28 text-paper md:py-44">
          <img
            src={heroBg}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 -z-10 bg-ink/70" />
          <Reveal className="mx-auto max-w-4xl px-5 text-center md:px-10">
            <p className="font-display text-3xl italic text-lipstick">Личная рекомендация</p>
            <h2 className="mt-5 font-display text-5xl font-light leading-none md:text-7xl">
              Не знаете, с чего начать?
            </h2>
            <p className="mx-auto mt-7 max-w-xl font-light leading-7 text-paper/65">
              Расскажите, какой вопрос для вас сейчас самый важный. Веста поможет выбрать программу,
              которая станет правильным первым шагом.
            </p>
            <a href={CONTACT_URL} target="_blank" rel="noreferrer" className="button-primary mt-9">
              Помочь мне выбрать <ArrowRight size={15} />
            </a>
          </Reveal>
        </section>

        <section id="nastavnichestvo" className="py-24 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <Eyebrow>Личное наставничество</Eyebrow>
              <Heading>
                Для тех, кто готов к большему <em className="font-light text-lipstick">масштабу</em>
              </Heading>
              <p className="mt-8 max-w-xl font-light leading-7 text-muted-foreground">
                Индивидуальный маршрут к новому уровню дохода, проявленности и реализации — с личным
                сопровождением Весты.
              </p>
              <a href={CONTACT_URL} target="_blank" rel="noreferrer" className="button-dark mt-9">
                Обсудить наставничество <ArrowRight size={15} />
              </a>
            </Reveal>
            <Reveal
              className="divide-y divide-ink/15 border-y border-ink/15 lg:col-span-5"
              delay={100}
            >
              {[
                ["1 месяц", "точный старт"],
                ["4 месяца", "рост дохода до ×10"],
                ["1 год", "рост дохода до ×20"],
              ].map(([term, result]) => (
                <div key={term} className="flex items-baseline justify-between gap-5 py-7">
                  <span className="font-display text-4xl font-light">{term}</span>
                  <span className="micro text-lipstick">{result}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="o-veste" className="bg-ink py-24 text-paper md:py-36">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 md:px-10 lg:grid-cols-12">
            <Reveal className="relative lg:col-span-5">
              <div className="absolute -right-4 -top-4 h-full w-full border border-lipstick/45" />
              <img
                src={vestaAbout.url}
                alt="Веста Безпалова — эзотерик и наставник"
                width={3024}
                height={4032}
                loading="lazy"
                className="relative aspect-[4/5] w-full object-cover object-[center_12%] md:object-[center_10%]"
              />
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={100}>
              <Eyebrow light>О Весте</Eyebrow>
              <Heading light>
                Деньги — часть <em className="font-light text-lipstick">большой жизни</em>
              </Heading>
              <div className="mt-8 space-y-5 font-light leading-8 text-paper/65">
                <p>
                  Более 25 лет я работаю с женщинами и помогаю им не только зарабатывать. Ко мне
                  приходят с вопросами отношений, предназначения, самоценности и раскрытия Дара.
                </p>
                <p>
                  Я создаю авторские программы и практики, работаю лично и провожу путешествия по
                  местам силы. Сегодня мой главный профессиональный фокус — масштаб и деньги в
                  эзотерике.
                </p>
              </div>
              <blockquote className="mt-10 border-l border-lipstick pl-7 font-display text-3xl font-light italic leading-tight">
                Сильная работа должна достойно оплачиваться.
              </blockquote>
            </Reveal>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal className="grid gap-8 border-y border-ink/15 py-12 md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-14 md:py-16">
              <div>
                <Eyebrow>Путешествия по местам силы</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-light leading-[1.02] md:text-6xl">
                  Увидеть мир. Услышать <em className="font-light text-lipstick">себя.</em>
                </h2>
              </div>
              <div>
                <p className="max-w-lg font-light leading-7 text-muted-foreground">
                  Индия, Непал, Тибет, Мексика, США, Мальдивы, Бали и Европа — через древние
                  традиции, практики и внутреннюю работу.
                </p>
                <a
                  href={CONTACT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link mt-6 inline-flex"
                >
                  Узнать о путешествиях
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="border-t border-ink/10 py-24 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Частые вопросы</Eyebrow>
              <Heading>Перед тем, как начать</Heading>
            </Reveal>
            <Reveal
              className="divide-y divide-ink/15 border-t border-ink/15 lg:col-span-7 lg:col-start-6"
              delay={100}
            >
              {faq.map(([question, answer]) => (
                <details key={question} className="faq group">
                  <summary>
                    <span>{question}</span>
                    <span className="faq-plus">+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="bg-lipstick py-24 text-paper md:py-36">
          <Reveal className="mx-auto max-w-5xl px-5 text-center md:px-10">
            <p className="font-display text-2xl italic text-paper/70">Ваш следующий шаг</p>
            <h2 className="mt-5 font-display text-6xl font-light leading-[0.9] md:text-8xl">
              Дар. Профессия.
              <br />
              Масштаб.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <a href="#programmy" className="button-dark">
                Смотреть программы <ArrowRight size={15} />
              </a>
              <a href={CONTACT_URL} target="_blank" rel="noreferrer" className="button-light">
                Написать Весте
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-10">
          <div>
            <p className="font-display text-3xl font-light">Веста Безпалова</p>
            <p className="micro mt-2 text-paper/40">Масштаб и деньги в эзотерике</p>
          </div>
          <div className="flex gap-7">
            <a href="#programmy" className="nav-link text-paper">
              Программы
            </a>
            <a href="#faq" className="nav-link text-paper">
              Вопросы
            </a>
            <a href={CONTACT_URL} target="_blank" rel="noreferrer" className="nav-link text-paper">
              Telegram
            </a>
          </div>
          <p className="text-xs text-paper/35">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
