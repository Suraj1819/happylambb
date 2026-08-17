import productImg from "@/assets/work-product.jpg";
import furnitureImg from "@/assets/work-furniture.jpg";
import corporateImg from "@/assets/work-corporate.jpg";
import brandImg from "@/assets/work-brand.jpg";
import catalogueImg from "@/assets/work-catalogue.jpg";
import heroStudio from "@/assets/hero-studio.jpg";

const CDN = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample";

export type StudioVideo = {
  id: string;
  title: string;
  client: string;
  category: "Ad Films" | "Product Reels" | "Corporate Films" | "Brand Campaigns" | "Social Media" | "Film" | "Brands Films";
  meta: string;
  src: string;
  poster: string;
  aspect: "16/9" | "9/16" | "21/9" | "1/1";
  span?: "hero" | "tall" | "wide";
};

export const STUDIO_VIDEOS: StudioVideo[] = [
  {
    id: "Aparchunauti",
    title: "Aparchunauti — Short Film",
    client: "Aparchunauti",
    category: "Film",
    meta: "16:32 min • short film",
    src: "https://youtu.be/sMH_NYSLS8k?si=nUOQZatdYL2ggUNi",
    poster: productImg,
    aspect: "16/9",
    span: "hero",
  },
  {
    id: "Mandi",
    title: "Mandi",
    client: "Mandi",
    category: "Film",
    meta: "10:33 min • short film",
    src: "https://youtu.be/U0IDup33qZw",
    poster: furnitureImg,
    aspect: "9/16",
    span: "tall",
  },
  {
    id: "prompt",
    title: "prompt",
    client: "prompt",
    category: "Brands Films",
    meta: "2:21 min",
    src: "https://youtu.be/DgAnsPindfA?si=Ofh19w8OOw13zmmY",
    poster: corporateImg,
    aspect: "16/9",
  },
  {
    id: "TATA HITACHI",
    title: "TATA SHINRAI PRIME",
    client: "TATA HITACHI",
    category: "Ad Films",
    meta: "2:26 min",
    src: "https://youtu.be/BW1l76qxZ4g?si=0svhJUko8YZYaUaz",
    poster: brandImg,
    aspect: "16/9",
  },
  {
    id: "TATA HITACHI",
    title: "ZAXIS 23U",
    client: "TATA HITACHI",
    category: "Ad Films",
    meta: "2:34 min",
    src: "https://youtu.be/9jonOmcgz-4?si=oAZ8qTvYwH9t757v",
    poster: catalogueImg,
    aspect: "16/9",
  },
  {
    id: "TATA HITACHI",
    title: "EX 350 LC PRIME",
    client: "TATA HITACHI",
    category: "Ad Films",
    meta: "2:20 min",
    src: "https://youtu.be/JGhwVETg3tM?si=a36ZCcwUMvYB7bE-",
    poster: heroStudio,
    aspect: "16/9",
    span: "hero",
  },
  {
    id: "HAIL-STONE",
    title: "TRACK MOUNTED JAW AND CONE CRUSH",
    client: "HAIL STONE",
    category: "Ad Films",
    meta: "2:00 min",
    src: "https://youtu.be/7vaqp1j8Y9o?si=nEbuD7g2tayPKU9a",
    poster: productImg,
    aspect: "9/16",
    span: "tall",
  },
  {
    id: "TATA HITACHI",
    title: "SHINRAI CEV 5",
    client: "TATA HITACHI",
    category: "Ad Films",
    meta: "2:53 min",
    src: "https://youtu.be/YvFeBXJHurs?si=xmilc2kX9Nt79A-e",
    poster: brandImg,
    aspect: "9/16",
  },
  {
    id: "TATA HITACHI",
    title: "EX 350 LC PRIME",
    client: "TATA HITACHI",
    category: "Ad Films",
    meta: "60s • Retail + Web",
    src: "https://youtu.be/VuiOXiYmGqs?si=C-U2KKqjeu5wZFH0",
    poster: catalogueImg,
    aspect: "16/9",
  },
  {
    id: "TATA HITACHI",
    title: "NX 50",
    client: "TATA HITACHI",
    category: "Ad Films",
    meta: "10s • Square loop",
    src: "https://youtu.be/-ZBTxUT_zAg?si=2gHehkp28Wr7J6o1",
    poster: furnitureImg,
    aspect: "1/1",
  },
  {
    id: "TATA HITACHI",
    title: "ZAXIS 23U",
    client: "TATA HITACHI",
    category: "Ad Films",
    meta: "0:55 min",
    src: "https://www.youtube.com/watch?v=JTT5I84Sz4k",
    poster: heroStudio,
    aspect: "16/9",
    span: "hero",
  },
  {
    id: "TATA HITACHI",
    title: "SHINRAI PRO",
    client: "TATA HITACHI",
    category: "Ad Films",
    meta: "7:21 min",
    src: "https://youtu.be/mdtj7MOb_8U?si=h35PUZJ0D58A5gW4",
    poster: corporateImg,
    aspect: "16/9",
  },
  {
    id: "JCB",
    title: "JCB STAGE 5",
    client: "JCB",
    category: "Ad Films",
    meta: "1:05 min",
    src: "https://youtu.be/r3-lsRlqrEA?si=_ImSa-lkECAmyNxX",
    poster: corporateImg,
    aspect: "16/9",
  },
];

export const SHOWREEL = STUDIO_VIDEOS.find((v) => v.id === "showreel-2026")!;

export const VIDEO_CATEGORIES = [
  "All",
  "Ad Films",
  "Product Reels",
  "Corporate Films",
  "Brand Campaigns",
  "Social Media",
] as const;