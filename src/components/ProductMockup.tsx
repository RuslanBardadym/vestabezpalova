import domMeditatsiy from "../assets/product-mockups/dom-meditatsiy.png.asset.json";
import ezoterik from "../assets/product-mockups/ezoterik-u-kotorogo-pokupayut.png.asset.json";
import ktoYa from "../assets/product-mockups/kto-ya-takaya-chtoby-govorit.png.asset.json";
import kvantovayaVetka from "../assets/product-mockups/kvantovaya-vetka-roda.png.asset.json";
import masterTaro from "../assets/product-mockups/master-taro.png.asset.json";
import masterskayaMechty from "../assets/product-mockups/masterskaya-mechty.png.asset.json";
import mneMozhnoVse from "../assets/product-mockups/mne-mozhno-vsyo.png.asset.json";
import pereproshivka from "../assets/product-mockups/pereproshivka.png.asset.json";
import prizyvSilyRoda from "../assets/product-mockups/prizyv-sily-roda.png.asset.json";
import raspakovkaDara from "../assets/product-mockups/raspakovka-dara.png.asset.json";
import severnayaMagiya from "../assets/product-mockups/severnaya-magiya.png.asset.json";
import silaVedmy from "../assets/product-mockups/sila-vedmy.png.asset.json";
import taroDlyaSebya from "../assets/product-mockups/taro-dlya-sebya.png.asset.json";
import taroDlyaZhizni from "../assets/product-mockups/taro-dlya-zhizni.png.asset.json";
import taynyeSimvoly from "../assets/product-mockups/taynye-simvoly.png.asset.json";

type ProductMockupProps = {
  slug: string;
  name: string;
  compact?: boolean;
};

const productMockups: Record<string, { url: string }> = {
  "ezoterik-u-kotorogo-pokupayut": ezoterik,
  "kto-ya-takaya-chtoby-govorit": ktoYa,
  pereproshivka,
  "taro-dlya-sebya": taroDlyaSebya,
  "taro-dlya-zhizni": taroDlyaZhizni,
  "master-taro": masterTaro,
  "prizyv-sily-roda": prizyvSilyRoda,
  "kvantovaya-vetka-roda": kvantovayaVetka,
  "raspakovka-dara": raspakovkaDara,
  "severnaya-magiya": severnayaMagiya,
  "dom-meditatsiy": domMeditatsiy,
  "sila-vedmy": silaVedmy,
  "taynye-simvoly": taynyeSimvoly,
  "mne-mozhno-vsyo": mneMozhnoVse,
  "masterskaya-mechty": masterskayaMechty,
};

export function ProductMockup({ slug, name, compact = false }: ProductMockupProps) {
  const mockup = productMockups[slug];
  if (!mockup) return null;

  return (
    <img
      src={mockup.url}
      alt={`Материалы программы «${name}»`}
      width={1200}
      height={1200}
      loading="lazy"
      className={compact ? "product-mockup product-mockup--compact" : "product-mockup"}
    />
  );
}