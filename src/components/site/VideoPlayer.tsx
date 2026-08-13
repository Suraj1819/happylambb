// components/site/VideoPlayer.tsx

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
  Video,
  Youtube,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ═══════════════════ HELPERS ═══════════════════ */

function isYouTubeUrl(src?: string) {
  if (!src) return false;
  return /(?:youtube\.com|youtu\.be)/i.test(src);
}

function getYouTubeId(src: string): string | null {
  if (!src) return null;
  
  try {
    const url = src.trim();
    
    if (url.includes('/embed/')) {
      const match = url.match(/\/embed\/([^?&]+)/);
      return match ? match[1] : null;
    }
    
    if (url.includes('youtu.be/')) {
      const match = url.match(/youtu\.be\/([^?&]+)/);
      return match ? match[1] : null;
    }
    
    if (url.includes('watch?v=') || (url.includes('watch?') && url.includes('v='))) {
      const match = url.match(/[?&]v=([^?&]+)/);
      return match ? match[1] : null;
    }
    
    if (url.includes('/shorts/')) {
      const match = url.match(/\/shorts\/([^?&]+)/);
      return match ? match[1] : null;
    }
    
    if (/^[\w-]{11}$/.test(url)) {
      return url;
    }
    
    const idMatch = url.match(/([\w-]{11})(?=[?&]|$)/);
    return idMatch ? idMatch[1] : null;
    
  } catch {
    const fallbackMatch = src.match(/([\w-]{11})/);
    return fallbackMatch ? fallbackMatch[1] : null;
  }
}

function ytThumb(id: string, q: "maxresdefault" | "hqdefault" = "maxresdefault") {
  return `https://i.ytimg.com/vi/${id}/${q}.jpg`;
}

function ytModalEmbed(id: string) {
  const p = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    fs: "1",
    origin: typeof window !== "undefined" ? window.location.origin : "",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${p}`;
}

function ytHoverEmbed(id: string) {
  const p = new URLSearchParams({
    autoplay: "1",
    mute: "0",
    controls: "0",
    disablekb: "1",
    fs: "0",
    modestbranding: "1",
    playsinline: "1",
    rel: "0",
    iv_load_policy: "3",
    loop: "1",
    playlist: id,
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${p}`;
}

function fmt(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/* ═══════════════════ TYPES ═══════════════════ */

export type VideoPlayerProps = {
  src: string;
  poster?: string;
  title?: string;
  client?: string;
  meta?: string;
  category?: string;
  aspect?: string;
  autoplayInView?: boolean;
  className?: string;
};

/* ═══════════════════ COMPONENT ═══════════════════ */

export function VideoPlayer({
  src,
  poster,
  title,
  client,
  meta,
  category,
  aspect = "16/9",
  className,
}: VideoPlayerProps) {
  const isYT = isYouTubeUrl(src);
  const ytId = useMemo(() => (isYT ? getYouTubeId(src) : null), [isYT, src]);

  const previewRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const modalShellRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [thumb, setThumb] = useState<string | undefined>();
  const [videoError, setVideoError] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fs, setFs] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (ytId) {
      setThumb(ytThumb(ytId));
      setVideoError(false);
    } else {
      setThumb(poster);
    }
  }, [ytId, poster, src]);

  /* ── hover play with audio ── */
  const onEnter = async () => {
    setHovered(true);
    if (isYT) return;

    const v = previewRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.volume = 0.9;
    v.muted = false;
    try {
      await v.play();
    } catch {
      v.muted = true;
      await v.play().catch(() => {});
    }
  };

  const onLeave = () => {
    setHovered(false);
    const v = previewRef.current;
    if (!isYT && v) {
      v.pause();
      v.currentTime = 0;
      v.muted = true;
    }
  };

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const v = previewRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
      v.muted = true;
    }
    setHovered(false);
    setOpen(true);
    setPlaying(true);
    setMuted(false);
    setProgress(0);
    setTime(0);
    setShowControls(true);
  };

  const closeModal = useCallback(() => {
    setOpen(false);
    setPlaying(false);
    const v = modalVideoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [open, showControls]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout) clearTimeout(controlsTimeout);
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    setControlsTimeout(timer);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === " " || e.key === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, closeModal]);

  useEffect(() => {
    if (!open || isYT) return;
    const el = modalVideoRef.current;
    if (!el) return;
    
    const onTime = () => {
      if (!el.duration) return;
      setDuration(el.duration);
      setTime(el.currentTime);
      if (!isDragging) {
        setProgress((el.currentTime / el.duration) * 100);
      }
    };
    
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setTime(0);
    };
    
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onTime);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    
    el.volume = volume;
    el.muted = false;
    el.play().catch(() => {});
    
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onTime);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, [open, isYT, volume]);

  const seek = (e: MouseEvent<HTMLDivElement>) => {
    const el = modalVideoRef.current;
    if (!el?.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    el.currentTime = pct * el.duration;
    setProgress(pct * 100);
  };

  const handleProgressMouseDown = () => {
    setIsDragging(true);
  };

  const handleProgressMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    seek(e);
  };

  const togglePlay = () => {
    const el = modalVideoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const el = modalVideoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    const el = modalVideoRef.current;
    if (!el) return;
    el.volume = v;
    el.muted = v === 0;
    setMuted(v === 0);
  };

  const skipForward = () => {
    const el = modalVideoRef.current;
    if (!el) return;
    el.currentTime = Math.min(el.currentTime + 10, el.duration);
  };

  const skipBackward = () => {
    const el = modalVideoRef.current;
    if (!el) return;
    el.currentTime = Math.max(el.currentTime - 10, 0);
  };

  const toggleFs = async () => {
    const node = modalShellRef.current;
    if (!node) return;
    try {
      if (!document.fullscreenElement) {
        await node.requestFullscreen();
        setFs(true);
      } else {
        await document.exitFullscreen();
        setFs(false);
      }
    } catch {
      /* */
    }
  };

  useEffect(() => {
    const fn = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", fn);
    return () => document.removeEventListener("fullscreenchange", fn);
  }, []);

  const ratio = aspect.includes("/") ? aspect.replace(":", "/") : aspect;

  const watchOnYouTube = useMemo(() => {
    if (ytId) {
      return `https://www.youtube.com/watch?v=${ytId}`;
    }
    return null;
  }, [ytId]);

  /* ═══════════════ MODAL ═══════════════ */
  const modal = (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-2 sm:p-4"
      onClick={closeModal}
    >
      <motion.div
        ref={modalShellRef}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
      >
        {/* Header */}
        <div className={`flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="min-w-0">
            {title && (
              <p className="truncate font-medium text-sm tracking-wide text-white sm:text-base">
                {title}
              </p>
            )}
            {(client || meta) && (
              <p className="truncate text-xs text-white/50 sm:text-sm">
                {[client, meta].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative w-full bg-black" style={{ aspectRatio: "16 / 9" }}>
          {isYT && ytId ? (
            <iframe
              src={ytModalEmbed(ytId)}
              title={title ?? "Video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <>
              <video
                ref={modalVideoRef}
                src={src}
                playsInline
                className="absolute inset-0 h-full w-full object-contain"
                onClick={togglePlay}
                onError={() => setVideoError(true)}
              />
              
              {/* Centered Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlay}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playing ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform hover:scale-110">
                  {playing ? (
                    <Pause className="h-8 w-8" />
                  ) : (
                    <Play className="h-8 w-8 fill-current pl-0.5" />
                  )}
                </span>
              </button>

              {/* Video Error Overlay */}
              {videoError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                  <Video className="h-12 w-12 text-white/40" />
                  <p className="mt-2 text-sm text-white/60">Video unavailable</p>
                </div>
              )}

              {/* Controls */}
              <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pt-12 pb-3 sm:px-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                {/* Progress Bar */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="font-mono text-xs text-white/80 sm:text-sm">
                    {fmt(time)}
                  </span>
                  <div
                    ref={progressRef}
                    className="relative h-1.5 flex-1 cursor-pointer rounded-full bg-white/20 transition hover:h-2"
                    onMouseDown={handleProgressMouseDown}
                    onMouseUp={handleProgressMouseUp}
                    onMouseLeave={() => setIsDragging(false)}
                  >
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-white transition-all"
                      style={{ width: `${progress}%` }}
                    />
                    <div
                      className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-lg transition-all"
                      style={{ 
                        left: `calc(${progress}% - 6px)`,
                        opacity: isDragging || hovered ? 1 : 0,
                      }}
                    />
                  </div>
                  <span className="font-mono text-xs text-white/80 sm:text-sm">
                    {fmt(duration)}
                  </span>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={skipBackward}
                      className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
                    >
                      <SkipBack className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white text-black transition hover:bg-white/90"
                    >
                      {playing ? (
                        <Pause className="h-5 w-5 fill-current" />
                      ) : (
                        <Play className="h-5 w-5 fill-current pl-0.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={skipForward}
                      className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
                    >
                      <SkipForward className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={toggleMute}
                      className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
                    >
                      {muted || volume === 0 ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={muted ? 0 : volume}
                      onChange={onVolumeChange}
                      className="h-1 w-16 cursor-pointer accent-white sm:w-24"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={toggleFs}
                    className="grid h-8 w-8 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
                  >
                    {fs ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  /* ═══════════════ CARD ═══════════════ */
  return (
    <>
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl border border-border/40 bg-black shadow-sm transition-all hover:shadow-xl",
          className
        )}
        style={{ aspectRatio: ratio }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* Thumbnail */}
        <img
          src={thumb}
          alt={title ?? ""}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out",
            hovered && "scale-105"
          )}
          loading="lazy"
          onError={() => {
            if (ytId) setThumb(ytThumb(ytId, "hqdefault"));
          }}
        />

        {/* MP4 hover preview with audio */}
        {!isYT && (
          <video
            ref={previewRef}
            src={src}
            loop
            playsInline
            preload="metadata"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              hovered ? "opacity-100" : "opacity-0"
            )}
            onError={() => setVideoError(true)}
          />
        )}

        {/* YouTube hover preview with audio */}
        {isYT && ytId && hovered && (
          <iframe
            src={ytHoverEmbed(ytId)}
            title="preview"
            allow="autoplay; encrypted-media"
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
            style={{ transform: "scale(1.02)" }}
          />
        )}

        {/* gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Play Button - Only this opens modal */}
        <button
          type="button"
          onClick={openModal}
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-500 cursor-pointer",
            hovered ? "opacity-0" : "opacity-100"
          )}
        >
          <span className="grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-md transition-transform hover:scale-110 sm:h-16 sm:w-16">
            <Play className="h-6 w-6 fill-current pl-0.5 sm:h-7 sm:w-7" />
          </span>
        </button>

        {/* Watch on YouTube button */}
        {isYT && ytId && hovered && (
          <a
            href={watchOnYouTube || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg transition-all hover:bg-red-700 hover:scale-105"
          >
            <Youtube className="h-4 w-4" />
            Watch on YouTube
          </a>
        )}

        {/* meta */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
          {category && (
            <p className="mb-1 font-heading text-[0.6rem] tracking-[0.2em] text-white/70 uppercase">
              {category}
            </p>
          )}
          {title && (
            <h3 className="truncate font-display text-base tracking-wide text-white drop-shadow sm:text-lg">
              {title}
            </h3>
          )}
          {(client || meta) && (
            <p className="mt-0.5 truncate text-xs text-white/60 sm:text-sm">
              {[client, meta].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>{open ? modal : null}</AnimatePresence>,
          document.body
        )}
    </>
  );
}