/* ─── IMPORT LOGOS ─── */
import aureaLogo from "@/assets/brands/hello.png";
import cofsilsLogo from "@/assets/brands/cofsils.png";
import promptLogo from "@/assets/brands/prompt.jpg";
import skywayLogo from "@/assets/brands/skyway.jpg";
import tataHitachiLogo from "@/assets/brands/TataHitachii.jpeg";
import godrejLogo from "@/assets/brands/godrej.png";
// 🟢 FIX: 'H' Capital rakho, kyunki file name Hailstone.jpeg hai
import hailstoneLogo from "@/assets/brands/Hailstone.jpeg"; 
import jcbLogo from "@/assets/brands/Jcb.jpeg";
import iciciLogo from "@/assets/brands/icici.jpg";
import tatamotors from "@/assets/brands/tatamotors.jpg";
import upstox from "@/assets/brands/upstox.jpeg";


/* 🟢 FIX: clients.tsx wala ALL_BRANDS array yahan copy kiya */
const ALL_BRANDS = [
  { name: "Cofsils", logo: cofsilsLogo },
  { name: "Godrej", logo: godrejLogo },
  // 🟢 FIX: Yahan 'hailstoneLogo' use karo (imported name)
  { name: "Hailstone", logo: hailstoneLogo }, 
  { name: "Aurea", logo: aureaLogo },
  { name: "JCB", logo: jcbLogo },
  { name: "Prompt", logo: promptLogo },
  { name: "Skyway", logo: skywayLogo },
  { name: "Tata Hitachi", logo: tataHitachiLogo },
  { name: "ICICI", logo: iciciLogo },
  { name: "Tata Motors", logo: tatamotors },
  { name: "Upstox", logo: upstox },
];

/* Row 1: First 4 brands */
const ROW_1_BRANDS = ALL_BRANDS.slice(0, 4);

/* Row 2: Last 4 brands */
const ROW_2_BRANDS = ALL_BRANDS.slice(4);

function Logo({ brand }: { brand: { name: string; logo: string } }) {
  return (
    <div className="group flex h-20 w-48 shrink-0 items-center justify-center rounded-xl border border-border/20 bg-surface/30 px-4 transition-all duration-300 hover:border-border/50 hover:bg-surface/50">
      <img
        src={brand.logo}
        alt={brand.name}
        className="max-h-14 max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

export function BrandMarquee() {
  return (
    <div className="space-y-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
      {/* Row 1 - Left to Right (5 baar repeat taaki gap na aaye) */}
      <div className="flex w-max gap-4 animate-[marquee_40s_linear_infinite]">
        {[...ROW_1_BRANDS, ...ROW_1_BRANDS, ...ROW_1_BRANDS, ...ROW_1_BRANDS, ...ROW_1_BRANDS].map((brand, i) => (
          <Logo key={`r1-${brand.name}-${i}`} brand={brand} />
        ))}
      </div>

      {/* Row 2 - Right to Left (5 baar repeat taaki gap na aaye) */}
      <div className="flex w-max gap-4 animate-[marquee-reverse_40s_linear_infinite]">
        {[...ROW_2_BRANDS, ...ROW_2_BRANDS, ...ROW_2_BRANDS, ...ROW_2_BRANDS, ...ROW_2_BRANDS].map((brand, i) => (
          <Logo key={`r2-${brand.name}-${i}`} brand={brand} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}