import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES } from "@/data/site";
import axios from "axios";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact HappyLamb Production — Get a Shoot Quote" },
      {
        name: "description",
        content:
          "Get a quote for ad films, product photography, corporate films or line production. Mumbai & Patna studios.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const STUDIOS = [
  {
    city: "Mumbai",
    address:
      "Happy Lamb Production OPC PVT.LTD, 505, 5th Floor, Bhoomi Building, Sanjay Nagar Co.Op. Society, Cama Estate, Behind Future Studio, Goregoan (E.), Mumbai - 400063",
    mapEmbed: "https://www.google.com/maps?q=Goregoan+East+Mumbai&output=embed",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Happy+Lamb+Production+Goregoan+East+Mumbai",
    phone: "+91 9820778491",
    phoneRaw: "919820778491",
    email: "dilip@happylamb.co.in",
    whatsapp: "919820778491",
  },
  {
    city: "Patna",
    address:
      "WorkSpace - Co-Working Space in Patna, 2nd Floor, Kanti Factory Rd, above Drug Point, near Bank of Baroda, New Colony, Mahatma Gandhi Nagar, Kankarbagh, Patna, Bihar 800020",
    mapEmbed: "https://www.google.com/maps?q=Kankarbagh+Patna&output=embed",
    mapsUrl: "https://maps.app.goo.gl/p3Aux8ziTfCXWDMV8",
    phone: "+91 6207462473",
    phoneRaw: "916207462473",
    email: "ankit@happylamb.co.in",
    whatsapp: "916207462473",
  },
];

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  phone: z.string().min(8, "Enter a valid phone"),
  email: z.string().email("Enter a valid email"),
  company: z.string().min(2, "Enter your company"),
  service: z.string().min(1, "Select a service"),
  budget: z.string().min(1, "Select a budget"),
  studio: z.string().min(1, "Select a studio"),
  message: z.string().min(10, "Tell us more about the brief"),
});

type FormValues = z.infer<typeof schema>;

const BUDGETS = ["Under ₹1 Lakh", "₹1–5 Lakh", "₹5–15 Lakh", "₹15 Lakh+", "Not sure yet"];

const field =
  "mt-1.5 w-full rounded-md border border-border/30 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-muted-foreground/40 dark:placeholder:text-zinc-600 focus:border-foreground/20 dark:focus:border-zinc-500 focus:ring-1 focus:ring-foreground/5 dark:focus:ring-zinc-500";

const cleanBudget = (budget: string) => {
  return budget
    .trim()
    .replace(/[–—]/g, "-")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/[^a-zA-Z0-9\s\-₹,.]/g, "")
    .replace(/\s+/g, " ");
};

function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedStudio, setSubmittedStudio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const firstName = values.name.split(" ")[0];
    const studioName = values.studio;

    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

      const cleanData = {
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim().toLowerCase(),
        company: values.company.trim(),
        service: values.service.trim(),
        budget: cleanBudget(values.budget),
        studio: values.studio.trim(),
        message: values.message.trim(),
      };

      const response = await axios.post(`${API_URL}/contact/send`, cleanData, {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      });

      if (response.data.success) {
        setTimeout(() => {
          setIsSuccess(true);
          setSubmittedName(firstName);
          setSubmittedStudio(studioName);
          reset();
          setIsLoading(false);

          // ✅ FIX 1: Success screen par scroll top par le jao
          window.scrollTo({ top: 0, behavior: "smooth" });

          // ✅ 3 Second baad form wapas
          setTimeout(() => {
            setIsSuccess(false);
            setSubmittedName("");
            setSubmittedStudio("");

            // ✅ FIX 2: Form wapas aane par bhi scroll top par rakho
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 3000);
        }, 1000);
      } else {
        setIsLoading(false);
        toast.error(response.data.message || "Submission failed. Please try again.", {
          duration: 4000,
          position: "top-center",
          className:
            "!bg-background !border !border-border/40 !rounded-2xl !p-4 dark:!bg-zinc-950 dark:!border-zinc-800",
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error("❌ Error:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const data = error.response.data;
        if (status === 400 && data?.errors?.length > 0) {
          errorMessage = data.errors[0].message;
        } else {
          errorMessage = data?.message || `Server error (${status})`;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        duration: 5000,
        position: "top-center",
        className:
          "!bg-background !border !border-border/40 !rounded-2xl !p-4 dark:!bg-zinc-950 dark:!border-zinc-800",
      });
    }
  };

  return (
    <section className="pt-28 pb-20 sm:pt-32 bg-background dark:bg-zinc-950">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        {/* ═══════════════ HEADER ═══════════════ */}
        <Reveal className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-border/50 dark:bg-zinc-700"></div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground/80 dark:text-zinc-400 uppercase font-medium">
              Contact
            </p>
          </div>

          <h1 className="text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.95] tracking-tight font-medium text-foreground dark:text-white">
            Let's talk <br />
            <span className="italic text-muted-foreground/60 dark:text-zinc-400">
              about your next film.
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground dark:text-zinc-400 leading-relaxed max-w-xl">
            Share your brief. We'll come back with a clear plan and quote. Crafted with precision.
          </p>
        </Reveal>

        {/* ═══════════════ FORM & STUDIOS ═══════════════ */}
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Left: Form */}
          <Reveal>
            {/* ✅ FIX 3: 'min-h-[400px]' lagaya taaki phone par screen upar na bhaage */}
            <div className="rounded-2xl border border-border/30 dark:border-zinc-800 bg-transparent p-6 sm:p-8 shadow-sm min-h-[400px] flex flex-col justify-center">
              {/* ✅ SUCCESS SCREEN - ANIMATED GREEN TICK */}
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-700">
                  {/* Animated Tick Mark */}
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                    <svg
                      className="h-10 w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                        className="animate-draw-check"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                      />
                    </svg>
                  </div>

                  <h2 className="mt-6 text-3xl md:text-4xl font-normal tracking-tight text-foreground dark:text-white">
                    You're all set,{" "}
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {submittedName}
                    </span>
                    ! 🎉
                  </h2>

                  <div className="mt-4 flex flex-col items-center gap-1 text-muted-foreground dark:text-zinc-400">
                    <p className="text-sm md:text-base">
                      We'll reply within one working day from our{" "}
                      <span className="font-medium text-foreground dark:text-white">
                        {submittedStudio}
                      </span>{" "}
                      studio.
                    </p>
                    <div className="mt-1 text-xs text-muted-foreground/60 dark:text-zinc-500">
                      We'll reach out to you shortly
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setSubmittedName("");
                      setSubmittedStudio("");
                      // ✅ FIX 4: Manual button click par bhi scroll top karo
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="mt-8 rounded-full bg-gray-100 dark:bg-zinc-800 px-6 py-2.5 text-sm font-medium text-foreground dark:text-white transition-all hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                // ✅ MINIMAL FORM
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground dark:text-zinc-400">
                      Name
                    </label>
                    <input {...register("name")} className={field} placeholder="Full name" />
                    {errors.name && (
                      <p className="mt-1 text-[10px] text-destructive dark:text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground dark:text-zinc-400">
                      Phone
                    </label>
                    <input {...register("phone")} className={field} placeholder="+91" />
                    {errors.phone && (
                      <p className="mt-1 text-[10px] text-destructive dark:text-red-400">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground dark:text-zinc-400">
                      Email
                    </label>
                    <input {...register("email")} className={field} placeholder="you@company.com" />
                    {errors.email && (
                      <p className="mt-1 text-[10px] text-destructive dark:text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground dark:text-zinc-400">
                      Company
                    </label>
                    <input {...register("company")} className={field} placeholder="Brand name" />
                    {errors.company && (
                      <p className="mt-1 text-[10px] text-destructive dark:text-red-400">
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground dark:text-zinc-400">
                      Service
                    </label>
                    <select {...register("service")} className={field} defaultValue="">
                      <option value="" disabled>
                        Select service
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-[10px] text-destructive dark:text-red-400">
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground dark:text-zinc-400">
                      Studio
                    </label>
                    <select {...register("studio")} className={field} defaultValue="">
                      <option value="" disabled>
                        Preferred studio
                      </option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Patna">Patna</option>
                      <option value="Either">Either / Remote</option>
                    </select>
                    {errors.studio && (
                      <p className="mt-1 text-[10px] text-destructive dark:text-red-400">
                        {errors.studio.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground dark:text-zinc-400">
                      Budget
                    </label>
                    <select {...register("budget")} className={field} defaultValue="">
                      <option value="" disabled>
                        Select budget
                      </option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p className="mt-1 text-[10px] text-destructive dark:text-red-400">
                        {errors.budget.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground dark:text-zinc-400">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className={field}
                      placeholder="Project details, timeline, references..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-[10px] text-destructive dark:text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="relative w-full overflow-hidden rounded-md bg-ink py-3 text-sm font-medium tracking-wide text-ink-foreground dark:bg-white dark:text-zinc-950 transition-all hover:bg-ink/80 dark:hover:bg-zinc-200 disabled:opacity-60 sm:w-auto sm:px-10 cursor-pointer"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Enquiry"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          {/* Right: Studios */}
          <Reveal delay={0.08} className="space-y-6">
            {STUDIOS.map((s) => (
              <div
                key={s.city}
                className="overflow-hidden rounded-2xl border border-border/30 dark:border-zinc-800 bg-transparent shadow-sm"
              >
                <div className="relative h-32 w-full">
                  <iframe
                    title={`${s.city} Studio map`}
                    src={s.mapEmbed}
                    loading="lazy"
                    className="h-full w-full border-0 grayscale-[20%] dark:grayscale-[40%]"
                  />
                </div>

                <div className="p-6">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-medium">
                    <span className="text-foreground dark:text-white">{s.city}</span>{" "}
                    <span className="italic text-muted-foreground/60 dark:text-zinc-400">
                      Studio
                    </span>
                  </p>

                  <div className="mt-4 space-y-3 text-sm text-muted-foreground dark:text-zinc-400">
                    <a
                      href={s.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-3 transition hover:text-foreground dark:hover:text-white cursor-pointer"
                    >
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/60 dark:text-zinc-500" />
                      <span className="leading-snug">{s.address}</span>
                    </a>

                    <a
                      href={`tel:${s.phoneRaw}`}
                      className="flex items-center gap-3 transition hover:text-foreground dark:hover:text-white cursor-pointer"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-muted-foreground/60 dark:text-zinc-500" />
                      {s.phone}
                    </a>

                    <a
                      href={`mailto:${s.email}`}
                      className="flex items-center gap-3 break-all transition hover:text-foreground dark:hover:text-white cursor-pointer"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-muted-foreground/60 dark:text-zinc-500" />
                      {s.email}
                    </a>

                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 shrink-0 text-muted-foreground/60 dark:text-zinc-500" />
                      Everyday · 10am – 7pm
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${s.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-muted-foreground/10 dark:bg-zinc-700/30 py-2.5 text-xs font-medium text-foreground dark:text-white transition hover:bg-muted-foreground/20 dark:hover:bg-zinc-600/50 hover:shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4 text-muted-foreground/70 dark:text-zinc-400" />
                    WhatsApp {s.city}
                  </a>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      <style>{`
        .animate-draw-check {
          animation: drawCheck 0.6s ease-in-out forwards;
        }
        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
}
