type ProductBoxProps = {
  slug: string;
  name: string;
  compact?: boolean;
};

const productMarks: Record<string, { index: string; mark: string; label: string }> = {
  "ezoterik-u-kotorogo-pokupayut": { index: "01", mark: "↗", label: "ПРОЕКТ • ПРОДАЖИ" },
  "kto-ya-takaya-chtoby-govorit": { index: "02", mark: "◉", label: "ГОЛОС • ПРОЯВЛЕННОСТЬ" },
  pereproshivka: { index: "03", mark: "//", label: "НОВАЯ СИСТЕМА" },
  "taro-dlya-sebya": { index: "04", mark: "I", label: "БАЗОВЫЙ УРОВЕНЬ" },
  "taro-dlya-zhizni": { index: "05", mark: "II", label: "РАСШИРЕННЫЙ УРОВЕНЬ" },
  "master-taro": { index: "06", mark: "III", label: "ПРОФЕССИОНАЛЬНЫЙ УРОВЕНЬ" },
  "prizyv-sily-roda": { index: "07", mark: "∞", label: "СИЛА • ПОДДЕРЖКА" },
  "kvantovaya-vetka-roda": { index: "08", mark: "Y", label: "ЛИНИЯ РАЗВИТИЯ" },
  "raspakovka-dara": { index: "09", mark: "✦", label: "СПОСОБНОСТИ • ОПОРА" },
  "severnaya-magiya": { index: "10", mark: "ᛉ", label: "РУНЫ • ТРАДИЦИЯ" },
  "dom-meditatsiy": { index: "11", mark: "○", label: "60 МЕДИТАЦИЙ" },
  "sila-vedmy": { index: "12", mark: "◒", label: "ЛУННЫЙ ЦИКЛ" },
  "taynye-simvoly": { index: "13", mark: "◇", label: "ЗНАКИ • АРТЕФАКТЫ" },
  "mne-mozhno-vsyo": { index: "14", mark: "!", label: "7 ШАГОВ К СЕБЕ" },
  "masterskaya-mechty": { index: "15", mark: "→", label: "МЕЧТА • ДЕЙСТВИЕ" },
};

export function ProductBox({ slug, name, compact = false }: ProductBoxProps) {
  const details = productMarks[slug] ?? { index: "00", mark: "V", label: "ПРОГРАММА ВЕСТЫ" };

  return (
    <div className={`product-box product-box--${slug}${compact ? " product-box--compact" : ""}`} aria-hidden="true">
      <div className="product-box__shadow" />
      <div className="product-box__spine"><span>ВЕСТА БЕСПАЛОВА</span></div>
      <div className="product-box__top" />
      <div className="product-box__front">
        <div className="product-box__meta"><span>{details.index}</span><span>АВТОРСКАЯ ПРОГРАММА</span></div>
        <span className="product-box__mark">{details.mark}</span>
        <div className="product-box__title">{name}</div>
        <div className="product-box__label">{details.label}</div>
      </div>
    </div>
  );
}