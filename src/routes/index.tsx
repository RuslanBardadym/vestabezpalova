import { createFileRoute, Link } from "@tanstack/react-router";
import { sections, productsBySection, formatPrice, CONTACT_URL } from "../lib/products";
import vestaPortrait from "../assets/vesta-portrait.jpg";
import heroBg from "../assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Веста Беспалова — масштаб и деньги в эзотерике" },
      {
        name: "description",
        content:
          "Программы Весты Беспаловой для эзотериков: проявленность и деньги, Таро, работа с Родом, магия и практики, личное наставничество. 15+ лет опыта, 300+ учеников.",
      },
      { property: "og:title", content: "Веста Беспалова — масштаб и деньги в эзотерике" },
      {
        property: "og:description",
        content:
          "Программы для эзотериков: от первой практики до профессии и высокого чека. Таро, Род, магия, проявленность, наставничество.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Micro({ children }: { children: React.ReactNode }) {
  return <p className="micro text-lipstick">{children}</p>;
}

function SectionHeading({
  kicker,
  title,
  dark,
}: {
  kicker: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="fade-up">
      <Micro>{kicker}</Micro>
      <h2
        className={`mt-4 font-display text-4xl font-semibold uppercase leading-tight md:text-6xl ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

function ProductCard({ slug, name, price, short }: { slug: string; name: string; price: number; short: string }) {
  return (
    <Link
      to="/programmy/$slug"
      params={{ slug }}
      className="group flex flex-col justify-between border-2 border-ink bg-paper p-6 transition-colors hover:bg-ink hover:text-paper"
    >
      <div>
        <h3 className="font-display text-2xl font-semibold uppercase leading-snug md:text-3xl">{name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-current/80">{short}</p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="font-display text-3xl font-bold text-lipstick">{formatPrice(price)}</span>
        <span className="micro border-2 border-current px-4 py-3 transition-colors group-hover:border-lipstick group-hover:bg-lipstick group-hover:text-paper">
          Получить доступ
        </span>
      </div>
    </Link>
  );
}

function Index() {
  return (
    <div className="bg-paper text-ink">
      {/* Шапка */}
      <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a href="#top" className="font-display text-xl font-bold uppercase tracking-wide md:text-2xl">
            Веста Беспалова
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#programmy" className="micro hover:text-lipstick">Программы</a>
            <a href="#nastavnichestvo" className="micro hover:text-lipstick">Наставничество</a>
            <a href="#o-veste" className="micro hover:text-lipstick">О Весте</a>
            <a href="#faq" className="micro hover:text-lipstick">Вопросы</a>
          </nav>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noreferrer"
            className="micro bg-lipstick px-4 py-3 text-paper transition-colors hover:bg-lipstick-deep"
          >
            Написать Весте
          </a>
        </div>
      </header>

      {/* 1. Герой */}
      <section id="top" className="border-b-4 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="fade-up">
            <Micro>Веста Беспалова · Масштаб и деньги в эзотерике</Micro>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold uppercase leading-[1.05] md:text-8xl">
              Я знаю, как зарабатывать много на эзотерике.{" "}
              <em className="text-lipstick">И учу этому других.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed md:text-lg">
              Я сама прошла путь от эзотерика-практика до личного чека $10 000. Освоила маркетинг,
              продажи и создание продуктов, чтобы сильные специалисты перестали годами учиться,
              стесняться своих цен и ждать случайных клиентов. Сегодня я помогаю эзотерикам
              становиться востребованными, создавать продукты, уверенно продавать свои знания и
              выходить на новый уровень дохода.
            </p>
            <a
              href="#programmy"
              className="micro mt-10 inline-block bg-lipstick px-8 py-4 text-paper transition-colors hover:bg-lipstick-deep"
            >
              Смотреть программы
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 border-2 border-ink md:grid-cols-4">
            {[
              ["$10 000+", "личный чек как эзотерика-практика"],
              ["15+ лет", "в эзотерических нишах"],
              ["300+", "эзотериков прошли обучение и работу со мной"],
              ["$2 000 000+", "заработали мои ученицы"],
            ].map(([num, label], i) => (
              <div
                key={num}
                className={`p-6 ${i % 2 === 1 ? "border-l-2 border-ink" : ""} ${i >= 2 ? "border-t-2 border-ink md:border-t-0" : ""} ${i > 0 ? "md:border-l-2 md:border-ink" : ""}`}
              >
                <p className="font-display text-4xl font-bold text-lipstick md:text-5xl">{num}</p>
                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Почему я понимаю этот рынок — тёмная секция */}
      <section className="border-b-4 border-ink bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionHeading dark kicker="Почему я понимаю этот рынок" title="Эзотерик. Маркетолог. Продажник. Продюсер. Наставник." />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="fade-up space-y-4 text-base leading-relaxed text-paper/80">
              <p>
                Я знаю этот рынок не со стороны. Более 15 лет я сама работаю как эзотерик: провожу
                практики, создаю обучающие программы и амулеты, работаю с женщинами и продаю свои
                знания на высокие чеки.
              </p>
              <p>
                Одновременно я изучила маркетинг, продажи, упаковку, создание продуктов и
                продвижение. Поэтому понимаю обе стороны.
              </p>
              <p>
                Понимаю женщину, которая только открывает свои способности. И понимаю практика,
                который уже умеет помогать людям, но не знает, как заявить о себе и начать достойно
                зарабатывать.
              </p>
            </div>
            <div className="fade-up grid gap-6">
              <div className="border-2 border-paper/40 p-6">
                <h3 className="font-display text-2xl font-semibold uppercase text-lipstick">Эзотерика для жизни</h3>
                <p className="mt-2 text-sm text-paper/80">
                  Таро, работа с Родом, Северная магия, медитации, тайные символы, раскрытие Дара и
                  внутренние практики.
                </p>
              </div>
              <div className="border-2 border-paper/40 p-6">
                <h3 className="font-display text-2xl font-semibold uppercase text-lipstick">Эзотерика как профессия и бизнес</h3>
                <p className="mt-2 text-sm text-paper/80">
                  Проявленность, позиционирование, продукты, контент, продажи, высокий чек и
                  масштабирование.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Каталог программ */}
      <section id="programmy" className="border-b-4 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionHeading kicker="Программы Весты Беспаловой" title="Выберите то, что нужно вам сейчас" />
          <p className="fade-up mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Здесь нет одной правильной точки входа. Можно начать с небольшой практики, освоить новое
            эзотерическое направление, раскрыть свой Дар, получить профессию или пересобрать уже
            существующий проект.
          </p>

          {sections.map((section) => (
            <div key={section.id} className="mt-16">
              <div className="fade-up border-t-4 border-ink pt-6">
                <h3 className="font-display text-3xl font-semibold uppercase md:text-4xl">{section.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{section.lead}</p>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {productsBySection(section.id).map((p) => (
                  <ProductCard key={p.slug} slug={p.slug} name={p.name} price={p.price} short={p.short} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Помощь с выбором — тёмная с hero-фоном */}
      <section
        className="border-b-4 border-ink bg-ink bg-cover bg-center text-paper"
        style={{ backgroundImage: `linear-gradient(rgba(10,10,10,0.85), rgba(10,10,10,0.85)), url(${heroBg})` }}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionHeading dark kicker="Помощь с выбором" title="Не знаете, с чего начать?" />
          <p className="fade-up mt-6 max-w-2xl text-base leading-relaxed text-paper/80">
            Расскажите, какой вопрос сегодня для вас наиболее важен: деньги и профессиональная
            реализация, проявленность, отношения, работа с Родом, раскрытие Дара, освоение Таро,
            медитации или магические практики. Веста поможет определить, какая программа станет для
            вас подходящим первым шагом.
          </p>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noreferrer"
            className="micro mt-8 inline-block bg-lipstick px-8 py-4 text-paper transition-colors hover:bg-lipstick-deep"
          >
            Помочь мне выбрать
          </a>
        </div>
      </section>

      {/* 5. Наставничество */}
      <section id="nastavnichestvo" className="border-b-4 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionHeading kicker="Личное наставничество" title="Для тех, кто готов к большему масштабу" />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="fade-up">
              <p className="text-base leading-relaxed">
                Личная работа с Вестой для женщин и эзотериков, которым недостаточно отдельного курса
                и нужен индивидуальный маршрут к новому уровню дохода, проявленности и реализации.
              </p>
              <ul className="mt-6 space-y-2 text-sm leading-relaxed">
                {[
                  "определить сильное позиционирование",
                  "упаковать знания и социальные сети",
                  "создать продуктовую линейку",
                  "разработать флагманский продукт",
                  "выстроить контент и продвижение",
                  "создать воронки продаж",
                  "увеличить стоимость своей работы",
                  "реализовать выбранную стратегию",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-lipstick">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="fade-up grid content-start gap-4">
              {[
                ["1 месяц", "старт личной работы"],
                ["4 месяца", "рост дохода до x10"],
                ["1 год", "рост дохода до x20"],
              ].map(([term, result]) => (
                <div key={term} className="flex items-baseline justify-between border-2 border-ink p-6">
                  <span className="font-display text-3xl font-semibold uppercase">{term}</span>
                  <span className="micro text-lipstick">{result}</span>
                </div>
              ))}
              <p className="text-sm text-muted-foreground">
                Участницы получают доступ к обучающим материалам Весты, необходимым для реализации
                персональной стратегии. Стоимость наставничества обсуждается лично.
              </p>
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noreferrer"
                className="micro inline-block bg-ink px-8 py-4 text-center text-paper transition-colors hover:bg-lipstick"
              >
                Узнать о наставничестве
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. О Весте */}
      <section id="o-veste" className="border-b-4 border-ink bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="grid items-start gap-10 md:grid-cols-2">
            <div className="fade-up">
              <img
                src={vestaPortrait}
                alt="Веста Беспалова — эзотерик, наставник"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full border-2 border-paper/40 object-cover"
              />
              <p className="mt-2 text-xs text-paper/50">Фото будет заменено на реальное.</p>
            </div>
            <div>
              <SectionHeading dark kicker="О Весте" title="Деньги — часть большой жизни" />
              <div className="fade-up mt-8 space-y-4 text-base leading-relaxed text-paper/80">
                <p>
                  Меня зовут Веста Беспалова. Более 25 лет я работаю с женщинами и помогаю им не
                  только зарабатывать. Ко мне приходят с вопросами отношений, предназначения,
                  самоценности, раскрытия Дара и выбора собственного пути.
                </p>
                <p>
                  Я 29 лет в браке, жена и мама двоих детей. Поэтому знаю, что женщине недостаточно
                  быть успешной только в одной сфере. Для меня настоящая реализация женщины — это
                  возможность соединить всё.
                </p>
                <p>
                  Я создаю авторские программы, практики и амулеты, работаю с женщинами лично и
                  провожу путешествия по местам силы. Сегодня мой главный профессиональный фокус —
                  масштаб и деньги в эзотерике.
                </p>
                <p className="font-display text-2xl italic text-paper">
                  Дар может помогать людям. Профессия может приносить удовольствие. А сильная работа
                  должна достойно оплачиваться.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Путешествия */}
      <section className="border-b-4 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionHeading kicker="Путешествия по местам силы" title="Авторские путешествия Весты" />
          <p className="fade-up mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Знакомство со страной соединяется с древними традициями, практиками, сильными местами и
            внутренней работой. Среди направлений: Индия, Непал, Тибет, Мексика, США, Мальдивы,
            Бали, страны Европы.
          </p>
          <p className="fade-up mt-4 text-sm text-muted-foreground">
            Здесь будет размещаться информация о ближайших путешествиях.
          </p>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noreferrer"
            className="micro mt-8 inline-block border-2 border-ink px-8 py-4 transition-colors hover:bg-ink hover:text-paper"
          >
            Смотреть путешествия
          </a>
        </div>
      </section>

      {/* 8. FAQ */}
      <section id="faq" className="border-b-4 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <SectionHeading kicker="Частые вопросы" title="Ответы перед стартом" />
          <div className="mt-10 grid gap-px border-2 border-ink bg-ink md:grid-cols-2">
            {[
              [
                "Где находятся материалы?",
                "Материалы размещены в закрытых Telegram-пространствах. После оплаты участница получает информацию для доступа к выбранной программе.",
              ],
              [
                "На какой срок предоставляется доступ?",
                "Доступ к материалам самостоятельных программ предоставляется на три месяца.",
              ],
              [
                "Можно ли заниматься в своём темпе?",
                "Да. Участница самостоятельно выбирает удобный график и может возвращаться к материалам в течение всего периода доступа.",
              ],
              [
                "Как выбрать программу?",
                "Можно выбрать направление по своему запросу или написать Весте и получить рекомендацию.",
              ],
              [
                "Как попасть в наставничество?",
                "Необходимо написать Весте и коротко рассказать о своей ситуации. После знакомства она предложит подходящий формат работы.",
              ],
            ].map(([q, a]) => (
              <div key={q} className="fade-up bg-paper p-6">
                <h3 className="font-display text-xl font-semibold uppercase">{q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Финальный CTA */}
      <section className="bg-lipstick text-paper">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8 md:py-24">
          <h2 className="fade-up font-display text-4xl font-semibold uppercase leading-tight md:text-6xl">
            Выберите свой следующий шаг
          </h2>
          <p className="fade-up mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/90">
            Можно начать с небольшой практики, освоить новое направление, получить профессию или
            прийти в личное наставничество.
          </p>
          <div className="fade-up mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#programmy"
              className="micro bg-ink px-8 py-4 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Смотреть все программы
            </a>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noreferrer"
              className="micro border-2 border-paper px-8 py-4 transition-colors hover:bg-paper hover:text-lipstick"
            >
              Написать Весте
            </a>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="border-t-4 border-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center md:px-8">
          <p className="font-display text-xl font-bold uppercase">Веста Беспалова</p>
          <div className="flex flex-wrap gap-6">
            <a href={CONTACT_URL} target="_blank" rel="noreferrer" className="micro hover:text-lipstick">Telegram</a>
            <a href="#programmy" className="micro hover:text-lipstick">Программы</a>
            <a href="#faq" className="micro hover:text-lipstick">Вопросы</a>
          </div>
          <p className="text-xs text-paper/50">© {new Date().getFullYear()} Веста Беспалова</p>
        </div>
      </footer>
    </div>
  );
}
