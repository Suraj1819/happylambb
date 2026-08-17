import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/data/site";
import { useState, useRef, useEffect } from "react";

// ✅ Custom YouTube Logo Component
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// ✅ Custom Instagram Logo Component
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

// ✅ Custom Facebook Logo Component
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// ✅ Custom X (Twitter) Logo Component
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// ✅ Custom WhatsApp Logo Component
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTouch = () => {
      const isTouch = "ontouchstart" in window || window.innerWidth < 1024;
      setIsTouchDevice(isTouch);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  const whatsappHref = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    "Hi HappyLamb Production, I'd like a quote for a shoot.",
  )}`;

  // ✅ PC HOVER LINKS - All Custom Icons
  const pcHoverLinks = [
    {
      icon: YouTubeIcon,
      href: COMPANY.youtube || "https://youtube.com",
      bg: "bg-red-100",
      iconColor: "text-[#FF0000]",
      hoverBg: "hover:bg-red-500 hover:text-white",
      label: "YouTube",
    },
    {
      icon: InstagramIcon,
      href: COMPANY.instagram || "https://instagram.com",
      bg: "bg-pink-100",
      iconColor: "text-[#E4405F]",
      hoverBg: "hover:bg-pink-500 hover:text-white",
      label: "Instagram",
    },
    {
      icon: FacebookIcon,
      href: COMPANY.facebook || "https://facebook.com",
      bg: "bg-blue-100",
      iconColor: "text-[#1877F2]",
      hoverBg: "hover:bg-blue-600 hover:text-white",
      label: "Facebook",
    },
    {
      icon: XIcon,
      href: COMPANY.twitter || "https://twitter.com",
      bg: "bg-gray-100",
      iconColor: "text-black dark:text-white",
      hoverBg: "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
      label: "Twitter",
    },
  ];

  // ✅ MOBILE CLICK LINKS - All Custom Icons
  const mobileClickLinks = [
    {
      icon: YouTubeIcon,
      href: COMPANY.youtube || "https://youtube.com",
      bg: "bg-red-100",
      iconColor: "text-[#FF0000]",
      hoverBg: "hover:bg-red-500 hover:text-white",
      label: "YouTube",
    },
    {
      icon: InstagramIcon,
      href: COMPANY.instagram || "https://instagram.com",
      bg: "bg-pink-100",
      iconColor: "text-[#E4405F]",
      hoverBg: "hover:bg-pink-500 hover:text-white",
      label: "Instagram",
    },
    {
      icon: XIcon,
      href: COMPANY.twitter || "https://twitter.com",
      bg: "bg-gray-100",
      iconColor: "text-black dark:text-white",
      hoverBg: "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
      label: "Twitter",
    },
    {
      icon: FacebookIcon,
      href: COMPANY.facebook || "https://facebook.com",
      bg: "bg-blue-100",
      iconColor: "text-[#1877F2]",
      hoverBg: "hover:bg-blue-600 hover:text-white",
      label: "Facebook",
    },
    {
      icon: WhatsAppIcon,
      href: whatsappHref,
      bg: "bg-green-100",
      iconColor: "text-[#25D366]",
      hoverBg: "hover:bg-[#25D366] hover:text-white",
      label: "WhatsApp",
    },
  ];

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleContainerMouseLeave = () => {
    if (isTouchDevice) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleSocialClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (isTouchDevice) setIsOpen(false);
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };

  const handleMainClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isTouchDevice) {
      setIsOpen(!isOpen);
    } else {
      window.open(whatsappHref, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const currentLinks = isTouchDevice ? mobileClickLinks : pcHoverLinks;

  return (
    <div
      ref={containerRef}
      className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3"
      onMouseLeave={handleContainerMouseLeave}
    >
      {/* Menu Items Container */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 translate-y-8 pointer-events-none scale-95"
        }`}
      >
        {currentLinks.map((social, index) => {
          const IconComponent = social.icon;
          return (
            <a
              key={index}
              href={social.href}
              onClick={(e) => handleSocialClick(e, social.href)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`flex items-center justify-center rounded-full w-12 h-12 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.bg} ${social.iconColor} ${social.hoverBg} border border-white/50 dark:border-zinc-700/50 cursor-pointer`}
              style={{
                transitionDelay: `${index * 40}ms`,
              }}
            >
              <IconComponent className="h-5 w-5" />
            </a>
          );
        })}
      </div>

      {/* Main FAB Button - Mobile: Gray, PC: WhatsApp Green */}
      <div className="relative" onMouseEnter={handleMouseEnter}>
        <button
          onClick={handleMainClick}
          className={`flex items-center justify-center rounded-full w-14 h-14 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl ${
            isOpen ? "scale-95" : ""
          } cursor-pointer ${
            isTouchDevice
              ? "bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900"
              : "bg-[#25D366] hover:bg-[#1DA851]"
          }`}
        >
          {isTouchDevice ? (
            <MessageCircle className="h-7 w-7" />
          ) : (
            <WhatsAppIcon className="h-7 w-7" />
          )}
        </button>

        {/* Subtle Pulse Ring - Sirf PC */}
        {!isTouchDevice && (
          <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/30"></div>
        )}
      </div>
    </div>
  );
}
