import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  Quote,
  Image as ImageIcon,
  Video,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Briefcase,
  Tag,
  Award,
  Clock,
  Sparkles,
  Film,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Send,
  Grid2X2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/site/Reveal";
import { VideoPlayer } from "@/components/site/VideoPlayer";
import { PROJECTS, type Project, getProjectFolderImages } from "@/data/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectPage,
  head: ({ loaderData, params }) => {
    const p = loaderData?.project;
    const title = p ? `${p.title} — HappyLamb Production` : "Case study";
    const desc = p?.objective.slice(0, 155) ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/work/${params.slug}` },
        { property: "og:image", content: p?.image || "/og-image.jpg" },
      ],
      links: [{ rel: "canonical", href: `/work/${params.slug}` }],
    };
  },
});

// ============== LIGHTBOX ==============
function Lightbox({
  items,
  initialIndex,
  onClose,
}: {
  items: { src: string; type: "image" | "video"; title?: string; poster?: string }[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (items[currentIndex]?.type === "video" && videoRef.current) {
      videoRef.current.play();
    }
  }, [currentIndex, items]);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft")
      setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    if (e.key === "ArrowRight")
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const currentItem = items[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/98"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label="Media lightbox"
    >
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40 font-light tracking-wider sm:text-sm">
            {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          {currentItem?.title && (
            <span className="hidden text-sm text-white/60 sm:block">{currentItem.title}</span>
          )}
          {currentItem?.type === "video" && (
            <span className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
              <Video className="h-3 w-3" /> Video
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-full bg-white/5 p-2 text-white/50 transition-all hover:bg-white/20 hover:text-white hover:scale-110 sm:p-3"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/5 p-2 text-white/50 transition-all hover:bg-white/20 hover:text-white hover:scale-110 sm:left-6 sm:p-3"
          >
            <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/5 p-2 text-white/50 transition-all hover:bg-white/20 hover:text-white hover:scale-110 sm:right-6 sm:p-3"
          >
            <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
        </>
      )}

      <div className="relative flex max-h-[90vh] max-w-[95vw] items-center justify-center sm:max-w-[90vw]">
        {currentItem?.type === "video" ? (
          <video
            ref={videoRef}
            src={currentItem.src}
            controls
            className="max-h-[80vh] w-full max-w-full rounded-lg shadow-2xl sm:max-h-[85vh]"
            poster={currentItem.poster}
          />
        ) : (
          <img
            src={currentItem.src}
            alt={currentItem?.title || `Media ${currentIndex + 1}`}
            className="max-h-[80vh] w-auto max-w-full rounded-lg object-contain shadow-2xl sm:max-h-[85vh]"
            loading="lazy"
          />
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:bottom-6 sm:gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(i);
              }}
              className={`h-1 rounded-full transition-all sm:h-1.5 ${
                i === currentIndex ? "w-6 bg-white sm:w-8" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============== STATS BAR ==============
function StatsBar({ results }: { results: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {results.map((r) => (
        <div key={r.label} className="text-center border-r border-border/30 last:border-r-0 px-4">
          <p className="text-3xl font-medium tracking-tight text-foreground">{r.value}</p>
          <p className="mt-1 text-[10px] text-muted-foreground/80 uppercase tracking-wider">
            {r.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============== GET YOUTUBE THUMBNAIL ==============
function getYouTubeThumbnail(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`
    : "";
}

// ============== DECORATIVE HERO CAROUSEL (NO CLICK) ==============
function HeroCarousel({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const validImages = images.filter((img) => img && img.trim() !== "");
  const hasMultipleImages = validImages.length > 1;

  useEffect(() => {
    if (hasMultipleImages && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % validImages.length);
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [validImages.length, isPaused, hasMultipleImages]);

  if (validImages.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border-2 border-border/40 bg-surface shadow-xl">
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface to-muted">
          <ImageIcon className="h-12 w-12 sm:h-20 sm:w-20 text-muted-foreground/30" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl border-2 border-border/40 shadow-xl group h-full w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image */}
      <div className="h-full w-full relative">
        <img
          src={validImages[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          className="h-full w-full object-cover transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Controls */}
      {hasMultipleImages && (
        <>
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1))
            }
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 sm:p-2.5 text-white opacity-0 transition-all hover:bg-black/60 hover:scale-110 group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % validImages.length)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 sm:p-2.5 text-white opacity-0 transition-all hover:bg-black/60 hover:scale-110 group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
            {validImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${index === currentIndex ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-white" : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 hover:bg-white/60"}`}
              />
            ))}
          </div>
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full bg-black/40 px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-xs text-white/80 backdrop-blur-sm">
            {currentIndex + 1} / {validImages.length}
          </div>
        </>
      )}
    </div>
  );
}

// ============== PHOTO GALLERY WITH LOAD MORE ==============
function PhotoGallery({
  images,
  onImageClick,
}: {
  images: string[];
  onImageClick: (index: number) => void;
}) {
  const [limit, setLimit] = useState(6);
  const ROW_IMAGES = 3;

  if (!images.length) return null;

  const totalImages = images.length;
  const displayedImages = images.slice(0, limit);
  const hasMore = limit < totalImages;

  const handleLoadMore = () => {
    setLimit((prev) => Math.min(prev + ROW_IMAGES * 2, totalImages));
  };

  const handleShowLess = () => {
    setLimit(6);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
        {displayedImages.map((img, i) => (
          <button
            key={i}
            onClick={() => onImageClick(i)}
            className="group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-foreground/20"
          >
            <div className="aspect-square w-full">
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
              <div className="rounded-full bg-white/90 p-1.5 sm:p-3 text-black opacity-0 transition-all scale-75 group-hover:opacity-100 group-hover:scale-100">
                <Maximize2 className="h-3 w-3 sm:h-5 sm:w-5" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {totalImages > 6 && (
        <div className="flex justify-center pt-4">
          {hasMore ? (
            <button
              onClick={handleLoadMore}
              className="group inline-flex items-center gap-2 rounded-full border border-border/40 bg-background px-6 py-2.5 text-xs font-medium tracking-wider text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground"
            >
              Load more
              <span className="text-xs text-muted-foreground/60">
                ({totalImages - limit} remaining)
              </span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </button>
          ) : (
            <button
              onClick={handleShowLess}
              className="group inline-flex items-center gap-2 rounded-full border border-border/40 bg-background px-6 py-2.5 text-xs font-medium tracking-wider text-muted-foreground transition-all hover:border-foreground/30 hover:text-foreground"
            >
              Show less
              <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============== VIDEO GALLERY ==============
function VideoGallery({
  videos,
  onVideoClick,
}: {
  videos: { src: string; title: string; poster?: string }[];
  onVideoClick: (index: number) => void;
}) {
  const [activeVideo, setActiveVideo] = useState(0);
  if (!videos.length) return null;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="w-full overflow-hidden rounded-2xl bg-black shadow-2xl aspect-video">
        <VideoPlayer
          src={videos[activeVideo].src}
          poster={videos[activeVideo].poster || getYouTubeThumbnail(videos[activeVideo].src)}
          title={videos[activeVideo].title}
          meta="Play Video"
          className="w-full h-full"
        />
      </div>
      {videos.length > 1 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {videos.map((video, i) => (
            <button
              key={i}
              onClick={() => setActiveVideo(i)}
              className={`group relative overflow-hidden rounded-xl ${i === activeVideo ? "ring-2 ring-foreground" : ""}`}
            >
              <img
                src={video.poster || getYouTubeThumbnail(video.src)}
                alt={video.title}
                className="aspect-video h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100">
                <Play className="h-8 w-8 text-white" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============== MAIN PROJECT PAGE ==============
function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const infoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (infoRef.current) {
        const rect = infoRef.current.getBoundingClientRect();
        setIsSticky(rect.top < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const folderImages = getProjectFolderImages(project.slug);
  const galleryImages = [...(project.gallery || []), ...folderImages];

  const videos =
    project.videos ||
    (project.video ? [{ src: project.video, title: project.title, poster: project.image }] : []);
  const hasMultipleVideos = videos.length > 1;

  const validVideos = videos.filter((v) => v.src && v.src !== "#" && v.src.trim() !== "");

  const mediaItems = [
    ...validVideos.map((v) => ({
      src: v.src,
      type: "video" as const,
      title: v.title || project.title,
      poster: v.poster || project.image,
    })),
    ...galleryImages.map((img) => ({ src: img, type: "image" as const, title: project.title })),
  ];

  const openLightbox = (index: number) => {
    // 🟢 FIX: Directly pass the calculated index. Lightbox handles boundaries.
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const splitTitle = project.title.includes("—") ? project.title.split("—") : [project.title, ""];

  const heroImages = galleryImages.length > 0 ? galleryImages : [project.image];

  return (
    <>
      {/* ===== PROFESSIONAL HERO SECTION ===== */}
      <section className="relative pt-32 pb-12 overflow-hidden bg-background border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent pointer-events-none"></div>

        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 relative z-10">
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground group mb-8"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-muted/20 px-3 py-0.5 text-[10px] font-medium italic text-muted-foreground/80 uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{project.year}</span>
              </div>

              <h1 className="text-[clamp(2.8rem,6vw,4.5rem)] font-medium tracking-tight leading-[0.95] text-foreground">
                {splitTitle[0].trim()}
                {splitTitle[1] && (
                  <>
                    {" "}
                    —{" "}
                    <span className="italic text-muted-foreground/60">
                      {splitTitle.slice(1).join("—").trim()}
                    </span>
                  </>
                )}
              </h1>

              <p className="text-base text-muted-foreground/80 leading-relaxed max-w-xl">
                {project.objective}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground/80">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-muted-foreground/40" />
                  {project.client}
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-muted-foreground/40" />
                  {project.service}
                </span>
                {hasMultipleVideos && (
                  <span className="flex items-center gap-1.5 text-xs">
                    <Film className="h-3.5 w-3.5 text-muted-foreground/40" />
                    {videos.length} Videos
                  </span>
                )}
              </div>

              <div className="pt-4 border-t border-border/30">
                <StatsBar results={project.results} />
              </div>
            </div>

            {/* Right: Video OR Decorative Photo Carousel */}
            <div className="relative h-full flex flex-col justify-center">
              {validVideos.length > 0 ? (
                // 🎥 CASE 1: Landscape Video Available
                <div
                  className="relative overflow-hidden rounded-2xl border-2 border-border/40 shadow-xl cursor-pointer group aspect-video bg-black"
                  onClick={() => openLightbox(0)}
                >
                  <VideoPlayer
                    src={validVideos[0].src}
                    poster={
                      validVideos[0].poster ||
                      getYouTubeThumbnail(validVideos[0].src) ||
                      project.image
                    }
                    title={validVideos[0].title || project.title}
                    meta="Play Film"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
                </div>
              ) : (
                // 🖼️ CASE 2: Decorative 3-Image Carousel (Click disabled)
                <div className="relative h-[350px] sm:h-[450px] lg:h-[550px] w-full">
                  <HeroCarousel images={heroImages} title={project.title} />
                </div>
              )}

              {/* Decorative Badge */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 rounded-full bg-background border-2 border-border/40 px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                {validVideos.length > 0 ? (
                  <>
                    <Video className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-[10px] font-medium text-muted-foreground">Film</span>
                  </>
                ) : (
                  <>
                    <Grid2X2 className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-[10px] font-medium text-muted-foreground">Gallery</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STICKY NAV ===== */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-md px-6 py-3 sm:px-10"
          >
            <div className="mx-auto max-w-[1400px] flex items-center justify-between">
              <span className="text-sm font-medium truncate">{project.title}</span>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground/80">{project.client}</span>
                <Link
                  to="/contact"
                  className="rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-ink-foreground transition-all hover:bg-ink/80"
                >
                  Enquire
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== INFO SECTION ===== */}
      <section ref={infoRef} className="py-12 border-y border-border/30 bg-surface/20">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                label: "Objective",
                text: project.objective,
                icon: <Award className="h-4 w-4 text-muted-foreground/40" />,
              },
              {
                label: "Challenge",
                text: project.challenge,
                icon: <Clock className="h-4 w-4 text-muted-foreground/40" />,
              },
              {
                label: "Approach",
                text: project.approach,
                icon: <Sparkles className="h-4 w-4 text-muted-foreground/40" />,
              },
            ].map((item, i) => (
              <div key={item.label} className="space-y-2 border-l-2 border-foreground/10 pl-4">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <p className="text-[10px] font-medium text-muted-foreground/80 uppercase tracking-widest italic">
                    {item.label}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEEDBACK ===== */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="relative rounded-xl border border-border/30 bg-surface/20 p-8 md:p-10">
            <Quote className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-muted/20 p-1.5 text-muted-foreground" />
            <div className="pl-4 border-l-2 border-foreground/10">
              <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
                "{project.feedback.quote}"
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted/20 flex items-center justify-center text-muted-foreground font-medium">
                  {project.feedback.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{project.feedback.author}</p>
                  <p className="text-xs text-muted-foreground/80">Client Feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PHOTOS & VIDEOS GALLERY (TABS + LOAD MORE) ===== */}
      {(galleryImages.length > 0 || videos.length > 0) && (
        <section className="py-12 border-t border-border/30 bg-surface/20">
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="h-px w-6 bg-border"></div>
                  <p className="text-[10px] text-muted-foreground/80 uppercase tracking-wider italic">
                    Portfolio
                  </p>
                </div>
                <h2 className="text-xl font-medium tracking-tight">
                  Visual <span className="italic text-muted-foreground/60">Story.</span>
                </h2>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 flex justify-center">
              <div className="inline-flex rounded-full border border-border/40 bg-surface/30 p-1">
                <button
                  onClick={() => setActiveTab("photos")}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition-all ${
                    activeTab === "photos"
                      ? "bg-foreground text-background dark:bg-white dark:text-zinc-950 shadow-sm"
                      : "text-muted-foreground hover:text-foreground dark:text-zinc-500 dark:hover:text-white"
                  }`}
                >
                  <ImageIcon className="h-3.5 w-3.5" />
                  Photos
                </button>
                <button
                  onClick={() => setActiveTab("videos")}
                  className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition-all ${
                    activeTab === "videos"
                      ? "bg-foreground text-background dark:bg-white dark:text-zinc-950 shadow-sm"
                      : "text-muted-foreground hover:text-foreground dark:text-zinc-500 dark:hover:text-white"
                  }`}
                >
                  <Video className="h-3.5 w-3.5" />
                  Videos
                </button>
              </div>
            </div>

            <div className="mt-8">
              {activeTab === "photos" ? (
                <PhotoGallery
                  images={galleryImages}
                  onImageClick={(index) => {
                    // 🟢 FIX: Sirf 'image' type ka index find karo aur Lightbox kholo
                    let imageIndex = -1;
                    for (let i = 0; i < mediaItems.length; i++) {
                      if (mediaItems[i].type === "image") {
                        imageIndex++;
                        if (imageIndex === index) {
                          openLightbox(i);
                          break;
                        }
                      }
                    }
                  }}
                />
              ) : (
                <VideoGallery
                  videos={videos}
                  onVideoClick={(index) => {
                    // 🟢 FIX: Sirf 'video' type ka index find karo aur Lightbox kholo
                    let videoIndex = -1;
                    for (let i = 0; i < mediaItems.length; i++) {
                      if (mediaItems[i].type === "video") {
                        videoIndex++;
                        if (videoIndex === index) {
                          openLightbox(i);
                          break;
                        }
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ===== RELATED PROJECTS ===== */}
      <section className="py-16 border-t border-border/30 bg-surface/20">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <div className="flex items-center justify-between mb-6 border-b border-border/30 pb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="h-px w-6 bg-border"></div>
                <p className="text-[10px] text-muted-foreground/80 uppercase tracking-wider italic">
                  Explore More
                </p>
              </div>
              <h2 className="text-xl font-medium tracking-tight">
                Related <span className="italic text-muted-foreground/60">Work.</span>
              </h2>
            </div>
            <Link
              to="/work"
              className="group flex items-center gap-1.5 text-xs text-muted-foreground/80 transition-colors hover:text-foreground"
            >
              View all projects
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {PROJECTS.filter((p) => p.slug !== project.slug)
              .slice(0, 4)
              .map((p) => {
                const relatedFolderImages = getProjectFolderImages(p.slug);
                const relatedThumbnail =
                  relatedFolderImages.length > 0 ? relatedFolderImages[0] : p.image;

                return (
                  <Link
                    key={p.slug}
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className="group overflow-hidden rounded-xl border border-border/30 bg-background transition-all hover:border-border/50"
                  >
                    <img
                      src={relatedThumbnail}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-3">
                      <p className="text-[10px] text-muted-foreground/80 uppercase tracking-wider italic">
                        {p.client}
                      </p>
                      <p className="text-xs font-medium line-clamp-1">{p.title}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-ink py-32 text-ink-foreground relative overflow-hidden text-center border-t border-ink-foreground/10">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none dark:from-white/10"></div>

        <div className="relative mx-auto max-w-4xl px-6">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight text-white">
              Ready to create something <br />
              <span className="italic font-normal text-zinc-400">exceptional</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-zinc-400 text-lg">
              Let's bring your brand story to life with our production expertise.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-foreground text-background dark:bg-white dark:text-zinc-950 px-10 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 hover:bg-foreground/90 dark:hover:bg-zinc-200 hover:scale-105 shadow-xl shadow-foreground/10 dark:shadow-white/10"
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
              >
                Explore services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {lightboxOpen && mediaItems.length > 0 && (
          <Lightbox items={mediaItems} initialIndex={lightboxIndex} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </>
  );
}
