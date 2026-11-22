import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  IconMapPin,
  IconFlame,
  IconZoomIn,
  IconX,
  IconCompass,
  IconClock,
  IconSparkles,
  IconArrowUpRight,
  IconChevronRight,
} from "@tabler/icons-react";

export function meta() {
  return [
    { title: "Odisha — The Soul of India" },
    {
      name: "description",
      content:
        "Explore Odisha: interactive map, 2,000-year history, living culture, heritage monuments and the sacred Jagannath Aarti of Puri.",
    },
  ];
}

interface PhotoModalInfo {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  note?: string;
}

function Photo({
  src,
  alt,
  title,
  subtitle,
  note,
  className = "",
  onZoom,
}: {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  note?: string;
  className?: string;
  onZoom?: (info: PhotoModalInfo) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      onClick={() => onZoom?.({ src, alt, title: title || alt, subtitle, note })}
      className={`group relative flex items-center justify-center overflow-hidden bg-amber-100/60 dark:bg-stone-900 cursor-pointer ${className}`}
      title="Click to view full photo"
    >
      {!loaded && !error && (
        <div className="absolute inset-0 skeleton-shimmer" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-200 via-orange-100 to-rose-200 p-4 text-center">
          <span className="text-2xl font-display text-orange-900/80">ଓଡ଼ିଶା</span>
          <span className="mt-1 text-xs font-medium text-orange-900/80">{alt}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/35 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
        <span className="flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur">
          <IconZoomIn size={14} /> View Photo
        </span>
      </div>
    </div>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Heading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
        {kicker}
      </p>
      <h2 className="font-display mt-3 text-4xl text-stone-900 md:text-5xl">{title}</h2>
      <div className="mx-auto my-5 h-px w-24 bg-primary/70" />
      {children && (
        <p className="text-lg leading-relaxed text-muted-foreground">
          {children}
        </p>
      )}
    </Reveal>
  );
}

const MAP_URL = "/images/map-odisha.webp";

const places = [
  {
    name: "Bhubaneswar",
    x: 412,
    y: 305,
    image: "/images/place-bhubaneswar.jpg",
    note: "The Temple City of India — capital with over 100 surviving stone temples including the 11th-century Lingaraj and Mukteshvara.",
    subtitle: "Capital & Temple City",
  },
  {
    name: "Puri",
    x: 439,
    y: 322,
    image: "/images/place-puri.jpg",
    note: "Home of Lord Jagannath, one of the four sacred Char Dham pilgrimages, famous for the world-celebrated Rath Yatra and Golden Sea Beach.",
    subtitle: "Char Dham Sacred Pilgrimage",
  },
  {
    name: "Konark",
    x: 465,
    y: 327,
    image: "/images/place-konark.jpg",
    note: "The 13th-century Sun Temple shaped as a colossal chariot with 24 carved stone wheels and seven horses — UNESCO World Heritage Site.",
    subtitle: "UNESCO Sun Chariot",
  },
  {
    name: "Cuttack",
    x: 436,
    y: 261,
    image: "/images/place-cuttack.jpg",
    note: "The Silver City: famous for Bali Jatra maritime trade festival, exquisite silver filigree (Tarakasi) and the historic Barabati Fort.",
    subtitle: "The Millennium Silver City",
  },
  {
    name: "Chilika Lake",
    x: 415,
    y: 346,
    image: "/images/place-chilika.jpg",
    note: "Asia's largest brackish-water lagoon, winter haven for millions of migratory flamingos and home of the endangered Irrawaddy dolphins.",
    subtitle: "Ramsar Wetland Lagoon",
  },
  {
    name: "Sambalpur",
    x: 284,
    y: 189,
    image: "/images/place-sambalpur.jpg",
    note: "Heart of Western Odisha: renowned for GI-tagged Sambalpuri ikat sarees, Hirakud Dam — one of the world's longest earthen dams — and folk music.",
    subtitle: "Weaving & Hirakud Dam",
  },
  {
    name: "Simlipal",
    x: 497,
    y: 140,
    image: "/images/place-simlipal.jpg",
    note: "Tiger reserve, elephant sanctuary and UNESCO biosphere reserve in Mayurbhanj featuring roaring waterfalls like Barehipani and Joranda.",
    subtitle: "Biosphere & Waterfalls",
  },
  {
    name: "Koraput",
    x: 139,
    y: 437,
    image: "/images/place-koraput.jpg",
    note: "Mist-covered hill country in the Eastern Ghats: home of indigenous Bonda, Gadaba and Dongria Kondh communities, high peaks and weekly tribal haats.",
    subtitle: "Eastern Ghats Tribal Hills",
  },
  {
    name: "Rourkela",
    x: 325,
    y: 128,
    image: "/images/place-rourkela.jpg",
    note: "Modern steel city in northern Odisha, home to Birsa Munda International Hockey Stadium and the 75-foot Hanuman Vatika statue.",
    subtitle: "Steel & Hockey Capital",
  },
  {
    name: "Dhauli",
    x: 405,
    y: 333,
    image: "/images/place-dhauli.jpg",
    note: "Historic hills by the Daya river where Emperor Ashoka renounced warfare after the Kalinga war, featuring rock edicts and the White Peace Pagoda.",
    subtitle: "Ashokan Rock Edicts & Peace Stupa",
  },
];

const timeline = [
  {
    era: "Ancient",
    year: "Before 261 BCE",
    title: "Kalinga — the land of mariners",
    image1: "/images/timeline-ancient-1.jpg",
    image2: "/images/timeline-ancient-2.jpg",
    text: "Mentioned in the Mahabharata and Puranas, Kalinga was a powerful maritime kingdom. Its sailors, the Sadhabas, crossed the Bay of Bengal to Bali, Java, Sumatra and Ceylon — celebrated every year on Kartik Purnima as Bali Jatra, when paper boats are floated on rivers with lamps.",
  },
  {
    era: "Mauryan",
    year: "261 BCE",
    title: "The Kalinga War and Ashoka's turning point",
    image1: "/images/timeline-mauryan-1.jpg",
    image2: "/images/timeline-mauryan-2.jpg",
    text: "Emperor Ashoka's bloody conquest of Kalinga along the Daya river cost over a hundred thousand lives. Overcome with deep remorse, he embraced Buddhism and dharma. The rock edicts at Dhauli and Jaugada still proclaim his eternal message of compassion and peace.",
  },
  {
    era: "Mahameghavahana",
    year: "1st c. BCE",
    title: "Emperor Kharavela's golden age",
    image1: "/images/timeline-kharavela-1.jpg",
    image2: "/images/timeline-kharavela-2.jpg",
    text: "Kharavela of the Chedi dynasty restored Kalinga's glory, extending territories from north to south. His Hathigumpha inscription on Udayagiri hill records military triumphs, music festivals, public canals and multi-storeyed rock shelters carved for Jain ascetics.",
  },
  {
    era: "Classical",
    year: "6th–8th c. CE",
    title: "Sailodbhavas and Bhauma-Karas",
    image1: "/images/timeline-classical-1.jpg",
    image2: "/images/timeline-classical-2.jpg",
    text: "Buddhist monasteries at Ratnagiri, Udayagiri and Lalitgiri (the 'Diamond Triangle') flourished with great university campuses and art. Female sovereigns like Tribhuvana Mahadevi governed the kingdom with distinction, leaving grand copper-plate charters.",
  },
  {
    era: "Temple Age",
    year: "9th–12th c. CE",
    title: "Somavamshis and the Kesaris build the temple city",
    image1: "/images/timeline-temple-1.jpg",
    image2: "/images/timeline-temple-2.jpg",
    text: "The distinctive Kalinga architectural style peaked here: the torana arch of Mukteshvara, the romantic sculptures of Rajarani and the colossal 180-ft deula of Lingaraj in Bhubaneswar. King Anantavarman Chodagangadeva soon began the grand Jagannath Temple of Puri.",
  },
  {
    era: "Eastern Gangas",
    year: "13th c. CE",
    title: "Konark and the Sun Chariot",
    image1: "/images/timeline-ganga-1.jpg",
    image2: "/images/timeline-ganga-2.jpg",
    text: "King Narasimhadeva I built the Konark Sun Temple around 1250 CE — a mammoth 24-wheeled chariot of stone pulled by seven rearing horses across the sunlit coast of Arka Kshetra, decorated with thousands of celestial dancers and musicians.",
  },
  {
    era: "Suryavamsi Gajapatis",
    year: "1435–1541",
    title: "Gajapati empire & royal devotion to Jagannath",
    image1: "/images/timeline-gajapati-1.jpg",
    image2: "/images/timeline-gajapati-2.jpg",
    text: "Kapilendradeva established an empire stretching from the Ganges to the Kaveri. The Gajapati kings styled themselves as the humble first servants (Adya Sevak) of Lord Jagannath — a tradition observed to this day when the titular king sweeps the chariots with a golden broom.",
  },
  {
    era: "Medieval",
    year: "1568–1803",
    title: "Sultanate, Mughals and Marathas",
    image1: "/images/timeline-medieval-1.jpg",
    image2: "/images/timeline-medieval-2.jpg",
    text: "After the fall of Mukunda Deva, Odisha was ruled successively by Bengal Sultans, Mughals and Marathas. Through upheavals, temple servitors protected the sacred wooden deities in secret hideouts, preserving the Jagannath faith, Odissi traditions and Sanskrit learning.",
  },
  {
    era: "Colonial",
    year: "1803–1947",
    title: "Paika Rebellion & Utkal Sammilani",
    image1: "/images/timeline-colonial-1.jpg",
    image2: "/images/timeline-colonial-2.jpg",
    text: "The Paika Bidroha of 1817, led by warrior Bakshi Jagabandhu, was one of India's earliest armed struggles against British rule. Later, leaders like Utkal Gourav Madhusudan Das and Gopabandhu Das formed Utkal Sammilani, achieving statehood on 1 April 1936.",
  },
  {
    era: "Modern",
    year: "1947–today",
    title: "Independent Odisha — Vision & Renewal",
    image1: "/images/timeline-modern-1.jpg",
    image2: "/images/timeline-modern-2.jpg",
    text: "Independent Odisha built Hirakud Dam, deep-water ports at Paradip, and a master-planned green capital in Bhubaneswar. Today Odisha is celebrated as the hockey cradle of India, home to top IT clusters, space launches at Chandipur and enduring cultural soul.",
  },
];

const culture = [
  {
    title: "Odissi Dance",
    tag: "Classical Dance",
    image: "/images/culture-odissi.jpg",
    text: "Born in ancient temples as dance of the Maharis who sang Jayadeva's Gita Govinda before Lord Jagannath. Its signature Tribhangi posture, intricate mudras and silver jewelry echo the sculptures carved on Konark's temple walls.",
  },
  {
    title: "Pattachitra",
    tag: "Traditional Scroll Art",
    image: "/images/culture-pattachitra.jpg",
    text: "Cloth and palm-leaf scroll paintings from Raghurajpur, crafted with natural mineral and vegetable pigments on cotton coated with tamarind paste, narrating episodes from the Ramayana, Krishna Lila and Jagannath's Beshas.",
  },
  {
    title: "Sambalpuri Ikat",
    tag: "GI Handloom Heritage",
    image: "/images/culture-sambalpuri.jpg",
    text: "Renowned 'Bandhakala' tie-dyed weaving of western Odisha. Skilled weavers bind warp and weft threads before dyeing to form vibrant geometric patterns, shankha, chakra and lotus motifs into heirloom silk and cotton sarees.",
  },
  {
    title: "Rath Yatra",
    tag: "World-Renowned Festival",
    image: "/images/culture-rathyatra.jpg",
    text: "Each Ashadha Shukla Dwitiya, Lord Jagannath, Balabhadra and Subhadra journey in three colossal painted wooden chariots (Nandighosha, Taladhwaja, Darpadalana) to Gundicha temple, pulled with devotional fervor by millions of pilgrims.",
  },
  {
    title: "Chhau Dance",
    tag: "UNESCO Intangible Art",
    image: "/images/culture-chhau.jpg",
    text: "A martial, acrobatic dance of Mayurbhanj enacting heroic episodes with swords, shields and dramatic stances. Inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity.",
  },
  {
    title: "Odia Cuisine",
    tag: "Heritage Flavors",
    image: "/images/culture-cuisine.jpg",
    text: "Simple yet aromatic cuisine: Pakhala (fermented rice) with badi chura, wholesome Dalma, Chhena Poda (baked caramelized cottage cheese cake, born in Nayagarh), GI-tagged Odisha Rasagola and the 56 offerings of Mahaprasad.",
  },
  {
    title: "Tribal Heritage",
    tag: "Indigenous Traditions",
    image: "/images/culture-tribal.jpg",
    text: "Home to 62 Scheduled Tribes including Santhal, Dongria Kondh, Bonda, Saura and Gadaba. Known for Saura Idital wall paintings, rhythmic Dhemsa folk dances, vibrant woven kapdaganda shawls and deep reverent harmony with nature.",
  },
  {
    title: "Festivals of Odisha",
    tag: "Living Celebrations",
    image: "/images/culture-festivals.jpg",
    text: "Raja Parba celebrating womanhood and Mother Earth with flower-strewn swings; Cuttack's silver tableau (Chandi Medha) Durga Puja; Nuakhai blessing the season's first harvested grain; and Kumar Purnima under the full moon.",
  },
];

const heritage = [
  {
    name: "Konark Sun Temple",
    image: "/images/heritage-konark.jpg",
    note: "13th-century UNESCO World Heritage Site with 24 carved stone sundial wheels.",
  },
  {
    name: "Lingaraj Temple",
    image: "/images/heritage-lingaraj.jpg",
    note: "11th-century Bhubaneswar landmark standing 180 feet tall, dedicated to Harihara.",
  },
  {
    name: "Udayagiri & Khandagiri Caves",
    image: "/images/heritage-udayagiri.jpg",
    note: "Rock-cut Jain hermitages with Emperor Kharavela's 1st-c. BCE Hathigumpha inscription.",
  },
  {
    name: "Dhauli Shanti Stupa",
    image: "/images/heritage-dhauli.jpg",
    note: "White Peace Pagoda atop Dhauli hills, where Ashoka embraced the path of non-violence.",
  },
  {
    name: "Chilika Lake & Dolphins",
    image: "/images/heritage-chilika.jpg",
    note: "Asia's largest coastal lagoon, famous for Irrawaddy dolphins and Nalabana bird sanctuary.",
  },
  {
    name: "Raghurajpur Crafts Village",
    image: "/images/heritage-raghurajpur.jpg",
    note: "Historic heritage village of Pattachitra painters, palm-leaf etchers and Gotipua dancers.",
  },
  {
    name: "Rajarani Temple",
    image: "/images/heritage-rajarani.jpg",
    note: "11th-century sandstone temple celebrated for its gracefully carved feminine figures (nayikas).",
  },
  {
    name: "Ratnagiri Monastery",
    image: "/images/heritage-ratnagiri.jpg",
    note: "Splendid Buddhist monastery of the Diamond Triangle with an intricately carved chlorite portal.",
  },
];

const aarti = [
  {
    time: "5:00 AM",
    name: "Mangala Alati",
    odia: "ମଙ୍ଗଳ ଆଳତି",
    image: "/images/aarti-mangala.jpg",
    text: "The sanctum doors open at dawn. Servitors perform the first auspicious waving of brass oil lamps (karpura and diya) before the three deities, while devotees witness the holy darshan of the sleeping deities awakening.",
  },
  {
    time: "5:30 AM",
    name: "Mailam & Tadap Lagi",
    odia: "ମଇଲମ ଓ ତଡ଼ପ ଲାଗି",
    image: "/images/aarti-mailam.jpg",
    text: "The previous night's floral garlands and attire are ceremonially removed by the Pasupalaka servitors. The deities are adorned in fresh, crisp cotton clothes and scented bathing cloths (tadap).",
  },
  {
    time: "6:00 AM",
    name: "Abakash & Surya Puja",
    odia: "ଅବକାଶ ଓ ସୂର୍ଯ୍ୟ ପୂଜା",
    image: "/images/aarti-abakash.jpg",
    text: "The sacred morning bath (Abakash) where servitors reflect holy water in brass mirrors before the deities, followed by teeth cleansing rituals and worship of the Sun God in the inner courtyard.",
  },
  {
    time: "8:00 AM",
    name: "Sakala Dhupa",
    odia: "ସକାଳ ଧୂପ",
    image: "/images/aarti-sakala.jpg",
    text: "The grand morning meal offering accompanied by chanting of Vedic mantras, burning of aromatic guggulu incense, waving of tiered oil lamps, and beating of temple mardala drums and bells.",
  },
  {
    time: "12:00 PM",
    name: "Madhyahna Dhupa",
    odia: "ମଧ୍ୟାହ୍ନ ଧୂପ",
    image: "/images/aarti-madhyahna.jpg",
    text: "The grand midday offering of Chappan Bhoga cooked in the temple's mega-kitchen with sacred clay pots over wood flames. Once offered, it becomes Mahaprasad, sold to all at Ananda Bazaar.",
  },
  {
    time: "7:00 PM",
    name: "Sandhya Alati",
    odia: "ସନ୍ଧ୍ୟା ଆଳତି",
    image: "/images/aarti-sandhya.jpg",
    text: "The breathtaking evening lamp offering: servitors wave large multi-wick brass lamps while conch shells blow, drums echo through the Natamandira, and hundreds of pilgrims chant 'Jai Jagannath!'",
  },
  {
    time: "9:00 PM",
    name: "Chandana Lagi & Bada Shringar",
    odia: "ଚନ୍ଦନ ଲାଗି ଓ ବଡ଼ସିଂହାର",
    image: "/images/aarti-chandana.jpg",
    text: "The deities are anointed with fragrant sandalwood paste and dressed in the magnificent Bada Shringar Besha — adorned with silk woven with Gita Govinda verses and exquisite floral ornaments.",
  },
  {
    time: "11:00 PM",
    name: "Pahuda",
    odia: "ପହୁଡ଼",
    image: "/images/aarti-pahuda.jpg",
    text: "The deities retire to rest upon the Ratna Singhasana. Jayadeva's Gita Govinda is sung by the sevaks, camphor lamps are lowered, and the sanctum doors are locked until the next dawn.",
  },
];

const gallery = [
  {
    image: "/images/gallery-gopuram.jpg",
    alt: "Singhadwara Lion Gate of Shree Mandir",
    cap: "Singhadwara — Grand entrance of Shree Jagannath Temple, Puri",
    cat: "mandir",
  },
  {
    image: "/images/gallery-badadanda.jpg",
    alt: "Rath Yatra on Bada Danda",
    cap: "Millions pulling the sacred chariots along the Bada Danda",
    cat: "rathyatra",
  },
  {
    image: "/images/gallery-trinity.jpg",
    alt: "Holy Trinity: Jagannath, Balabhadra and Subhadra",
    cap: "Lord Jagannath, Balabhadra, Subhadra & Sudarshana Chakra",
    cat: "mandir",
  },
  {
    image: "/images/gallery-gundicha.jpg",
    alt: "Gundicha Temple Puri",
    cap: "Gundicha Temple — The aunt's garden residence during Rath Yatra",
    cat: "mandir",
  },
  {
    image: "/images/gallery-nabakalebara.jpg",
    alt: "Nabakalebara Divine Renewal",
    cap: "Nabakalebara — Sacred ritual renewal carved from neem trees",
    cat: "rituals",
  },
  {
    image: "/images/gallery-beach.jpg",
    alt: "Puri Golden Beach",
    cap: "Golden Beach of Puri on the Bay of Bengal coastline",
    cat: "tradition",
  },
  {
    image: "/images/gallery-chandanyatra.jpg",
    alt: "Chandan Yatra in Narendra Pokhari",
    cap: "Chandan Yatra — 21-day summer boat cruise in Narendra Pokhari",
    cat: "rituals",
  },
  {
    image: "/images/gallery-snanayatra.jpg",
    alt: "Deba Snana Purnima",
    cap: "Snana Yatra — Royal 108-pot bathing festival atop the Snana Mandap",
    cat: "rituals",
  },
  {
    image: "/images/gallery-kitchen.jpg",
    alt: "Mahaprasad kitchen earthen pots",
    cap: "Temple kitchen with earthen pots stacked seven-high over wood fires",
    cat: "tradition",
  },
  {
    image: "/images/gallery-gitagovinda.jpg",
    alt: "Gita Govinda palm-leaf etching",
    cap: "Ancient palm-leaf manuscript of Jayadeva's Gita Govinda",
    cat: "art",
  },
  {
    image: "/images/gallery-anandabazaar.jpg",
    alt: "Ananda Bazaar holy food court",
    cap: "Ananda Bazaar — where all devotees share Mahaprasad equally",
    cat: "tradition",
  },
  {
    image: "/images/gallery-dancer.jpg",
    alt: "Classical Odissi Dancer",
    cap: "Odissi dancer portraying divine stories with temple mudras",
    cat: "art",
  },
];

const facts = [
  { n: "4", l: "Char Dham pilgrimages include Puri" },
  { n: "1135", l: "Year Jagannath Temple construction began (CE)" },
  { n: "214 ft", l: "Height of the Nila Chakra spire" },
  { n: "56", l: "Items in the sacred Chhappan Bhoga" },
];

const nav = [
  ["Map", "map"],
  ["History", "history"],
  ["Culture", "culture"],
  ["Jagannath", "jagannath"],
  ["Aarti", "aarti"],
  ["Gallery", "gallery"],
  ["Heritage", "heritage"],
];

export default function HomeRoute() {
  const [active, setActive] = useState(places[1]!);
  const [activeGalleryTab, setActiveGalleryTab] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoModalInfo | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredGallery =
    activeGalleryTab === "all"
      ? gallery
      : gallery.filter((g) => g.cat === activeGalleryTab);

  return (
    <div className="odisha-light h-full min-h-0 flex-1 overflow-y-auto bg-background text-foreground scroll-smooth">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="font-display flex items-center gap-2 text-xl tracking-wide">
            <span className="diya-flame" />
            <span className="text-primary font-bold text-2xl">ଓଡ଼ିଶା</span>
            <span className="text-stone-900 font-semibold">Odisha</span>
          </a>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            {nav.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-stone-600 transition-colors hover:text-primary"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#jagannath"
            className="flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <IconFlame size={16} /> Shree Jagannath
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="relative flex min-h-[90vh] items-end overflow-hidden">
        <img
          src="/images/hero-bg.webp"
          alt="Lord Jagannath, Balabhadra and Subhadra"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/25" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 text-white">
          <div className="flex items-end gap-2.5">
            <span className="diya-flame" />
            <span className="diya-flame" />
            <span className="diya-flame" />
            <span className="diya-flame" />
            <span className="diya-flame" />
            <p className="ml-2 text-xs font-semibold uppercase tracking-[0.4em] text-amber-300">
              ଜୟ ଜଗନ୍ନାଥ · Jai Jagannath
            </p>
          </div>
          <h1 className="font-display mt-4 text-6xl font-normal leading-none text-amber-300 md:text-8xl">
            Odisha
          </h1>
          <p className="font-display mt-2 text-3xl text-amber-100 md:text-5xl">
            ଓଡ଼ିଶା — The Soul of India
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
            From the maritime sadhabas of Kalinga and stone chariot wheels of Konark to the sacred lamps of Puri's Sandhya Alati — embark on a journey through two thousand years of living faith, stone and spirit.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#map"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 hover:scale-105"
            >
              Explore the Map <IconCompass size={18} />
            </a>
            <a
              href="#aarti"
              className="inline-flex items-center gap-2 rounded-full border border-amber-300/60 bg-black/40 px-6 py-3 text-sm font-semibold text-amber-200 backdrop-blur transition hover:bg-amber-300/20"
            >
              Jagannath Aarti <IconFlame size={18} />
            </a>
          </div>
        </div>
      </section>

      <div className="alpana-divider" />

      {/* Quick Stats Bar */}
      <section className="border-b bg-amber-50/80 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 text-center md:grid-cols-4">
          {[
            ["1,55,707 km²", "State Area"],
            ["30", "Districts"],
            ["480 km", "Golden Coastline"],
            ["Odia", "Classical Language of India"],
          ].map(([val, label]) => (
            <Reveal key={label}>
              <div className="font-display text-3xl font-bold text-primary md:text-4xl">
                {val}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-stone-600">
                {label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="map" className="mx-auto max-w-6xl px-5 py-24">
        <Heading kicker="ମାନଚିତ୍ର · The Map" title="Odisha at a Glance">
          Stretching from the Bay of Bengal to the Eastern Ghats, choose a destination on the map to explore its history, culture and photos.
        </Heading>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div className="temple-border overflow-hidden rounded-2xl bg-card p-4 shadow-md">
              <div className="relative">
                <img
                  src={MAP_URL}
                  alt="District map of Odisha"
                  className="block w-full select-none rounded-lg"
                  draggable={false}
                />
                {places.map((p) => {
                  const on = p.name === active.name;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setActive(p)}
                      aria-label={p.name}
                      title={p.name}
                      style={{ left: `${(p.x / 612) * 100}%`, top: `${(p.y / 612) * 100}%` }}
                      className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md transition-all ${
                        on
                          ? "scale-150 bg-primary ring-4 ring-primary/40 animate-pulse"
                          : "bg-red-600 hover:scale-125"
                      }`}
                    />
                  );
                })}
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                <IconMapPin size={14} className="text-primary" /> Click any marker or pill below to discover each place
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="temple-border overflow-hidden rounded-2xl bg-card shadow-lg">
              <Photo
                src={active.image}
                alt={active.name}
                title={active.name}
                subtitle={active.subtitle}
                note={active.note}
                className="h-72 w-full"
                onZoom={setSelectedPhoto}
              />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display flex items-center gap-2 text-3xl font-bold text-stone-900">
                    <IconMapPin className="text-primary" size={26} />
                    {active.name}
                  </h3>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-orange-800">
                    {active.subtitle}
                  </span>
                </div>
                <p className="mt-4 leading-relaxed text-stone-700">{active.note}</p>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPhoto({
                      src: active.image,
                      alt: active.name,
                      title: active.name,
                      subtitle: active.subtitle,
                      note: active.note,
                    })
                  }
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
                >
                  <IconZoomIn size={15} /> View High-Resolution Photo
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {places.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setActive(p)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    p.name === active.name
                      ? "border-primary bg-primary text-primary-foreground shadow"
                      : "border-stone-300 bg-white hover:border-primary hover:text-primary"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Panorama Mid-Page Banner */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <Photo
          src="/images/panorama-chilika.jpg"
          alt="Chilika Lake sunset panorama"
          title="Chilika Lagoon"
          subtitle="Asia's Largest Brackish Water Lagoon"
          className="absolute inset-0"
          onZoom={setSelectedPhoto}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
            ଚିଲିକା · Chilika Lagoon
          </p>
          <p className="font-display mt-3 text-3xl leading-snug text-amber-100 md:text-5xl">
            "Where the sea meets the lagoon, and the land still remembers its gods."
          </p>
          <p className="mt-4 text-sm text-white/80">
            Home to migratory birds from Siberia and the Caspian Sea, and the sacred Kalijai temple island.
          </p>
        </div>
      </section>

      <div className="alpana-divider" />

      {/* History / Itihasa Section */}
      <section id="history" className="bg-amber-50/70 py-24">
        <div className="mx-auto max-w-5xl px-5">
          <Heading kicker="ଇତିହାସ · Itihasa" title="A Story of Two Thousand Years">
            Follow the historic thread from Kalinga's courageous sea-merchants to modern independent Odisha.
          </Heading>

          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px bg-primary/40 md:left-1/2" />
            {timeline.map((t, i) => (
              <Reveal key={t.title} className="relative mb-14">
                <div className="absolute left-4 top-3 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow md:left-1/2" />
                <div
                  className={`ml-10 md:ml-0 md:w-1/2 ${
                    i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12"
                  }`}
                >
                  <div className="temple-border overflow-hidden rounded-xl bg-card shadow">
                    <div className="grid grid-cols-2 gap-1 bg-amber-100/40">
                      <Photo
                        src={t.image1}
                        alt={`${t.title} - Artifact 1`}
                        title={t.title}
                        subtitle={`${t.era} (${t.year})`}
                        note={t.text}
                        className="h-44"
                        onZoom={setSelectedPhoto}
                      />
                      <Photo
                        src={t.image2}
                        alt={`${t.title} - Artifact 2`}
                        title={t.title}
                        subtitle={`${t.era} (${t.year})`}
                        note={t.text}
                        className="h-44"
                        onZoom={setSelectedPhoto}
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">
                          {t.era}
                        </span>
                        <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-stone-700">
                          {t.year}
                        </span>
                      </div>
                      <h3 className="font-display mt-2 text-2xl font-bold text-stone-900">
                        {t.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-stone-700">
                        {t.text}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Living Culture Section */}
      <section id="culture" className="mx-auto max-w-6xl px-5 py-24">
        <Heading kicker="ସଂସ୍କୃତି · Sanskruti" title="Living Culture">
          Art, classical dance, textile heritage, sweet feasts and festivals — in Odisha, culture is lived and cherished every single day.
        </Heading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {culture.map((c) => (
            <Reveal key={c.title}>
              <article className="temple-border h-full overflow-hidden rounded-xl bg-card shadow transition-transform hover:-translate-y-1">
                <Photo
                  src={c.image}
                  alt={c.title}
                  title={c.title}
                  subtitle={c.tag}
                  note={c.text}
                  className="h-52 w-full"
                  onZoom={setSelectedPhoto}
                />
                <div className="p-5">
                  <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-semibold text-orange-900">
                    {c.tag}
                  </span>
                  <h3 className="font-display mt-2 text-xl font-bold text-stone-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {c.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Shree Jagannath & Aarti Section */}
      <section
        id="jagannath"
        className="bg-gradient-to-b from-amber-100 via-orange-50 to-rose-100 py-24 text-stone-900"
      >
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
              ଶ୍ରୀ ଜଗନ୍ନାଥ · Shree Jagannath
            </p>
            <h2 className="font-display mt-3 text-4xl font-bold text-stone-900 md:text-6xl">
              The Lord of the Universe
            </h2>
            <div className="mx-auto my-5 h-px w-24 bg-orange-500/60" />
            <p className="text-lg leading-relaxed text-stone-700">
              Lord Jagannath is worshipped in Puri alongside his elder brother Balabhadra and sister Subhadra, together with the Sudarshana Chakra. Carved of sacred neem wood (Daru Brahma), they are among the few divine forms that unite Vaishnava, Shaiva, Shakta, Buddhist and tribal spiritual streams into one open-hearted faith.
            </p>
          </Reveal>

          {/* Shree Mandir Feature */}
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Reveal>
              <div className="temple-border overflow-hidden rounded-2xl shadow-xl">
                <Photo
                  src="/images/hero-jagannath.jpg"
                  alt="Shree Jagannath Temple, Puri"
                  title="Shree Jagannath Mandir, Puri"
                  subtitle="One of the Four Sacred Char Dham Tirthas"
                  note="Rising 214 feet with the sacred Nila Chakra atop, this 12th-century masterpiece is the spiritual epicenter of Odisha."
                  className="h-96 w-full"
                  onZoom={setSelectedPhoto}
                />
              </div>
            </Reveal>

            <Reveal>
              <h3 className="font-display text-3xl font-bold text-stone-900">
                Shree Mandir, Puri
              </h3>
              <p className="mt-4 leading-relaxed text-stone-700">
                Founded by King Anantavarman Chodagangadeva in the 12th century, the temple's spire rises 214 feet, crowned by the eight-spoked alloy Nila Chakra and the holy Patitapabana flag. Every evening before sunset, a servitor scales the dome without safety equipment to replace the flag fluttering against the coastal wind.
              </p>
              <p className="mt-4 leading-relaxed text-stone-700">
                Its sacred kitchen (Roshaghara) is among the largest in the world: dishes are cooked in seven clay pots stacked atop each other over wood hearths. This is Mahaprasad — sanctified food distributed freely across caste and rank beneath the Kalpa Bata banyan tree in Ananda Bazaar.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {facts.map((f) => (
                  <div key={f.l} className="rounded-xl border border-orange-300/80 bg-white/70 p-4 shadow-sm">
                    <div className="font-display text-2xl font-bold text-orange-600">
                      {f.n}
                    </div>
                    <div className="mt-1 text-xs font-medium text-stone-600">
                      {f.l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Jagannath Aarti Rituals */}
          <section id="aarti" className="scroll-mt-20">
            <Reveal className="mt-24 text-center">
              <IconFlame className="mx-auto text-orange-600" size={40} />
              <h3 className="font-display mt-3 text-3xl font-bold text-stone-900 md:text-5xl">
                Jagannath Aarti — The Daily Rituals
              </h3>
              <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-stone-700">
                From morning Mangala Alati to midnight Pahuda, over a hundred rituals are performed daily in ancient order by dedicated sevaks. Experience the sacred lamp-waving that fills the temple with conch vibrations, drum rhythms and camphor incense.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {aarti.map((a) => (
                <Reveal key={a.name}>
                  <div className="temple-border flex h-full overflow-hidden rounded-xl bg-white/90 shadow transition hover:-translate-y-1">
                    <Photo
                      src={a.image}
                      alt={a.name}
                      title={`${a.name} (${a.odia})`}
                      subtitle={`Sacred Timing: ${a.time}`}
                      note={a.text}
                      className="w-36 shrink-0"
                      onZoom={setSelectedPhoto}
                    />
                    <div className="flex flex-col justify-between p-5">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600">
                          <IconClock size={15} /> {a.time}
                        </div>
                        <h4 className="font-display mt-1 text-xl font-bold text-stone-900">
                          {a.name}
                        </h4>
                        <p className="text-xs font-semibold text-orange-800">
                          {a.odia}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-stone-700">
                          {a.text}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPhoto({
                            src: a.image,
                            alt: a.name,
                            title: `${a.name} (${a.odia})`,
                            subtitle: `Timing: ${a.time}`,
                            note: a.text,
                          })
                        }
                        className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                      >
                        <IconZoomIn size={13} /> View Ritual Detail
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Spiritual Culture of Puri Gallery */}
          <section id="gallery" className="scroll-mt-20">
            <Reveal className="mx-auto mt-24 max-w-3xl text-center">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-800">
                Photo Gallery
              </span>
              <h3 className="font-display mt-3 text-3xl font-bold text-stone-900 md:text-4xl">
                Spiritual Culture of Puri
              </h3>
              <p className="mt-3 leading-relaxed text-stone-700">
                Explore high-resolution photographs of sacred celebrations, grand chariots, deity renewal and coastal devotion. Click any image to view in full size.
              </p>

              {/* Gallery Filter Pills */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  ["All Photos (12)", "all"],
                  ["Sacred Mandir", "mandir"],
                  ["Rath Yatra", "rathyatra"],
                  ["Rituals & Festivals", "rituals"],
                  ["Art & Tradition", "tradition"],
                  ["Odissi & Culture", "art"],
                ].map(([label, catKey]) => (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => setActiveGalleryTab(catKey)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                      activeGalleryTab === catKey
                        ? "bg-orange-600 text-white shadow"
                        : "bg-white/80 text-stone-700 hover:bg-orange-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredGallery.map((g) => (
                <Reveal key={g.image}>
                  <figure className="temple-border group overflow-hidden rounded-xl bg-white shadow">
                    <Photo
                      src={g.image}
                      alt={g.alt}
                      title={g.alt}
                      subtitle={g.cap}
                      note={g.cap}
                      className="aspect-square w-full"
                      onZoom={setSelectedPhoto}
                    />
                    <figcaption className="p-3 text-xs leading-tight text-stone-700">
                      <span className="font-medium text-stone-900 line-clamp-2">
                        {g.cap}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* Heritage Monuments & Landscapes */}
      <section id="heritage" className="mx-auto max-w-6xl px-5 py-24">
        <Heading kicker="ଐତିହ୍ୟ · Aitihya" title="Monuments and Landscapes">
          Stone chariots, rock-cut Jain caves, Ashokan stupas and shimmering blue lagoons — discover Odisha's monumental wonders.
        </Heading>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {heritage.map((h) => (
            <Reveal key={h.name}>
              <div className="temple-border group relative overflow-hidden rounded-xl shadow-lg transition hover:-translate-y-1">
                <Photo
                  src={h.image}
                  alt={h.name}
                  title={h.name}
                  note={h.note}
                  className="aspect-[4/5] w-full"
                  onZoom={setSelectedPhoto}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 p-4 text-white">
                  <h3 className="font-display text-lg font-bold leading-tight">
                    {h.name}
                  </h3>
                  <p className="mt-1 text-xs text-white/80 line-clamp-3">
                    {h.note}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-amber-50/90 py-12 text-center text-stone-800">
        <div className="mx-auto max-w-4xl px-5">
          <div className="flex items-center justify-center gap-2">
            <span className="diya-flame" />
            <span className="font-display text-3xl font-bold text-primary">
              ଜୟ ଜଗନ୍ନାଥ
            </span>
            <span className="diya-flame" />
          </div>
          <p className="mt-3 text-lg font-semibold text-stone-900">
            Odisha — Bande Utkala Janani · The Soul of India
          </p>
          <p className="mt-2 text-xs text-stone-500">
            Dedicated to celebrating the history, temples, classical arts and living traditions of Odisha.
          </p>
          <div className="mt-6 flex justify-center gap-6 text-xs text-stone-600">
            {nav.map(([l, id]) => (
              <a key={id} href={`#${id}`} className="hover:text-primary transition-colors">
                {l}
              </a>
            ))}
            <a href="#top" className="font-semibold text-primary hover:underline">
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>

      {/* High-Resolution Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-4xl w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-stone-950 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-800 px-6 py-4">
              <div>
                {selectedPhoto.subtitle && (
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                    {selectedPhoto.subtitle}
                  </p>
                )}
                <h3 className="font-display text-xl font-bold text-amber-100">
                  {selectedPhoto.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo preview"
                className="rounded-full p-2 text-stone-400 transition hover:bg-stone-800 hover:text-white"
              >
                <IconX size={22} />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative flex max-h-[62vh] items-center justify-center bg-black/80 p-2">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-h-[60vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
              />
            </div>

            {/* Modal Footer Lore */}
            {selectedPhoto.note && (
              <div className="border-t border-stone-800/80 bg-stone-900/90 px-6 py-4">
                <p className="text-xs leading-relaxed text-stone-300">
                  {selectedPhoto.note}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
