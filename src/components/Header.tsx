import { useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

type IntroVariant = "slideDown" | "fadeScale" | "blurIn";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Unique intro animation per full page reload (picked once on mount)
  const introVariant: IntroVariant = useMemo(() => {
    const variants: IntroVariant[] = ["slideDown", "fadeScale", "blurIn"];
    return variants[Math.floor(Math.random() * variants.length)];
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/payment", label: "Payment Info" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const whatsappNumber = "2348032090599";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20visited%20your%20website%20and%20I%27m%20interested%20in%20your%20services.`;

  const introClass = `sv-intro sv-intro--${introVariant}`;

  // Cursor-follow highlight (updates CSS vars used by hover effects)
  const handlePointerMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  // "Magnetic" hover for buttons (subtle follow)
  const handleMagnetEnter = (e: MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).classList.add("sv-magnet--active");
  };

  const handleMagnetMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // normalize [-1..1]
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);

    const max = 10; // px
    el.style.setProperty("--tx", `${dx * max}px`);
    el.style.setProperty("--ty", `${dy * max}px`);
  };

  const handleMagnetLeave = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--tx", `0px`);
    el.style.setProperty("--ty", `0px`);
    el.classList.remove("sv-magnet--active");
  };

  // For CTA: combine cursor vars + magnet
  const handleCtaMove = (e: MouseEvent<HTMLElement>) => {
    handlePointerMove(e);
    handleMagnetMove(e);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Gooey filter definition (used by CTA blobs only) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="sv-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 22 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      {/* Local CSS */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .sv-intro, .sv-stagger, .sv-mobile-panel {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
          }
          .sv-pointer::before,
          .sv-pointer::after {
            transition: none !important;
            animation: none !important;
          }
          .sv-cta-btn,
          .sv-cta-btn * {
            transition: none !important;
            animation: none !important;
          }
        }

        /* --- Intro variants (run once on mount) --- */
        .sv-intro { will-change: transform, opacity, filter; }

        .sv-intro--slideDown { animation: svSlideDown 700ms cubic-bezier(.2,.9,.2,1) both; }
        @keyframes svSlideDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sv-intro--fadeScale { animation: svFadeScale 650ms cubic-bezier(.2,.9,.2,1) both; }
        @keyframes svFadeScale {
          from { opacity: 0; transform: translateY(-8px) scale(.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .sv-intro--blurIn { animation: svBlurIn 800ms cubic-bezier(.2,.9,.2,1) both; }
        @keyframes svBlurIn {
          from { opacity: 0; transform: translateY(-10px); filter: blur(10px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        /* --- Stagger --- */
        .sv-stagger {
          opacity: 0;
          will-change: transform, opacity;
          animation: svStaggerIn 600ms cubic-bezier(.2,.9,.2,1) both;
        }
        @keyframes svStaggerIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* --- Mobile panel --- */
        .sv-mobile-panel {
          transform-origin: top;
          animation: svMobilePanelIn 260ms ease-out both;
          will-change: transform, opacity;
        }
        @keyframes svMobilePanelIn {
          from { opacity: 0; transform: translateY(-6px) scaleY(.98); }
          to   { opacity: 1; transform: translateY(0) scaleY(1); }
        }

        /* =========================================================
           Cursor-follow "pointer animation"
           Uses CSS vars: --mx, --my set via onMouseMove
        ========================================================== */
        .sv-pointer {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          --mx: 50%;
          --my: 50%;
        }

        /* soft glow following cursor */
        .sv-pointer::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: radial-gradient(
            150px circle at var(--mx) var(--my),
            rgba(99, 102, 241, .22),
            rgba(99, 102, 241, .08) 35%,
            transparent 65%
          );
          opacity: 0;
          transition: opacity 180ms ease;
          z-index: 0;
          pointer-events: none;
        }
        .sv-pointer:hover::before { opacity: 1; }

        /* underline for nav items */
        .sv-pointer::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 7px;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(99,102,241,.0), rgba(99,102,241,.85), rgba(99,102,241,.0));
          transform: scaleX(0);
          transform-origin: var(--mx) 50%;
          transition: transform 220ms cubic-bezier(.2,.9,.2,1);
          z-index: 0;
          pointer-events: none;
        }
        .sv-pointer:hover::after { transform: scaleX(1); }

        /* disable underline (for CTA buttons) */
        .sv-pointer--no-underline::after { display: none; }

        /* keep content above pseudo-elements */
        .sv-pointer > * { position: relative; z-index: 1; }

        /* =========================================================
           CTA Buttons: magnetic + gooey hover + shine (done properly)
        ========================================================== */
        .sv-cta-btn {
          position: relative;
          overflow: hidden;
          isolation: isolate;

          /* magnetic motion vars */
          --tx: 0px;
          --ty: 0px;
          --s: 1;

          transform: translate3d(var(--tx), var(--ty), 0) scale(var(--s));
          transition: transform 280ms cubic-bezier(.2,.85,.2,1);
          will-change: transform;
        }

        /* faster follow while active */
        .sv-cta-btn.sv-magnet--active {
          transition: transform 70ms linear;
        }

        .sv-cta-btn:hover { --s: 1.03; }
        .sv-cta-btn:active { --s: .99; }

        /* subtle shine that follows cursor */
        .sv-cta-shine {
          position: absolute;
          inset: -2px;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 170ms ease;
          background: radial-gradient(
            180px circle at var(--mx) var(--my),
            var(--shine, rgba(255,255,255,.22)),
            transparent 60%
          );
          mix-blend-mode: overlay;
        }
        .sv-cta-btn:hover .sv-cta-shine { opacity: 1; }

        /* goo layer (only blobs are filtered so text stays crisp) */
        .sv-cta-goo {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          filter: url(#sv-goo);
        }

        .sv-blob {
          position: absolute;
          left: var(--mx);
          top: var(--my);
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: var(--blob, rgba(255,255,255,.22));
          transform: translate(-50%, -50%) translateX(-120px) translateY(var(--dy, 0px)) scale(.9);
          opacity: 0;
          mix-blend-mode: screen;
        }

        .sv-blob--2 { width: 18px; height: 18px; }
        .sv-blob--3 { width: 14px; height: 14px; }
        .sv-blob--4 { width: 22px; height: 22px; }

        .sv-blob--1 { --dy: -10px; }
        .sv-blob--2 { --dy:  12px; }
        .sv-blob--3 { --dy:  -2px; }
        .sv-blob--4 { --dy:   6px; }

        .sv-cta-btn:hover .sv-blob {
          animation: svBlobFly 760ms cubic-bezier(.2,.9,.2,1) both;
        }
        .sv-cta-btn:hover .sv-blob--2 { animation-delay: 40ms; }
        .sv-cta-btn:hover .sv-blob--3 { animation-delay: 90ms; }
        .sv-cta-btn:hover .sv-blob--4 { animation-delay: 140ms; }

        @keyframes svBlobFly {
          0%   { opacity: 0; transform: translate(-50%, -50%) translateX(-110px) translateY(var(--dy,0px)) scale(.92); }
          18%  { opacity: 1; }
          65%  { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -50%) translateX(340px) translateY(var(--dy,0px)) scale(1.2); }
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className={`flex items-center gap-2 ${introClass}`}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img
                src={logo}
                alt="SmartView Electronics Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-display font-bold text-lg md:text-xl text-foreground">
                SmartView
              </span>
              <span className="hidden md:inline font-display font-bold text-lg md:text-xl text-primary">
                {" "}
                Electronics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                to={link.href}
                onMouseMove={handlePointerMove}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors sv-stagger sv-pointer ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                style={{ animationDelay: `${120 + idx * 55}ms` }}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA Buttons (cursor-follow + REAL gooey + magnetic) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${whatsappNumber}`}
              className="sv-stagger"
              style={{ animationDelay: "520ms" }}
            >
              <Button
                variant="outline"
                size="sm"
                onMouseEnter={handleMagnetEnter}
                onMouseMove={handleCtaMove}
                onMouseLeave={handleMagnetLeave}
                className="sv-cta-btn sv-pointer sv-pointer--no-underline"
                style={
                  {
                    ["--blob" as any]: "rgba(99, 102, 241, .32)",
                    ["--shine" as any]: "rgba(99, 102, 241, .25)",
                  } as React.CSSProperties
                }
              >
                <span className="sv-cta-goo" aria-hidden="true">
                  <span className="sv-blob sv-blob--1" />
                  <span className="sv-blob sv-blob--2" />
                  <span className="sv-blob sv-blob--3" />
                  <span className="sv-blob sv-blob--4" />
                </span>
                <span className="sv-cta-shine" aria-hidden="true" />

                <span className="relative z-10 inline-flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Now
                </span>
              </Button>
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="sv-stagger"
              style={{ animationDelay: "600ms" }}
            >
              <Button
                variant="whatsapp"
                size="sm"
                onMouseEnter={handleMagnetEnter}
                onMouseMove={handleCtaMove}
                onMouseLeave={handleMagnetLeave}
                className="sv-cta-btn sv-pointer sv-pointer--no-underline"
                style={
                  {
                    ["--blob" as any]: "rgba(255, 255, 255, .26)",
                    ["--shine" as any]: "rgba(255, 255, 255, .22)",
                  } as React.CSSProperties
                }
              >
                <span className="sv-cta-goo" aria-hidden="true">
                  <span className="sv-blob sv-blob--1" />
                  <span className="sv-blob sv-blob--2" />
                  <span className="sv-blob sv-blob--3" />
                  <span className="sv-blob sv-blob--4" />
                </span>
                <span className="sv-cta-shine" aria-hidden="true" />

                <span className="relative z-10 inline-flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </span>
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border sv-mobile-panel">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseMove={handlePointerMove}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors sv-pointer ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;