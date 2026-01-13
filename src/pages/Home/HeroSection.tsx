import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ComponentProps, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tv, Wrench, MessageCircle } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

/** Gooey + shine + magnetic button */
type GooeyButtonProps = ComponentProps<typeof Button> & {
  blobColor?: string;
  shineColor?: string;
};

const GooeyButton = ({
  blobColor = "rgba(255,255,255,.26)",
  shineColor = "rgba(255,255,255,.18)",
  className,
  style,
  onMouseMove,
  onMouseLeave,
  children,
  ...props
}: GooeyButtonProps) => {
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);

    // Lighter magnetic pull on mobile
    const isMobile = window.innerWidth < 640;
    const max = isMobile ? 6 : 10;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.setProperty("--tx", `${dx * max}px`);
    el.style.setProperty("--ty", `${dy * max}px`);

    onMouseMove?.(e as any);
  };

  const handleLeave = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--tx", `0px`);
    el.style.setProperty("--ty", `0px`);
    onMouseLeave?.(e as any);
  };

  return (
    <Button
      {...props}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`sv-goo-btn ${className ?? ""}`}
      style={{
        ...(style as object),
        "--blob": blobColor,
        "--shine": shineColor,
      } as CSSProperties}
    >
      <span className="sv-goo-btn__goo" aria-hidden="true">
        <span className="sv-blob sv-blob--1" />
        <span className="sv-blob sv-blob--2" />
        <span className="sv-blob sv-blob--3" />
        <span className="sv-blob sv-blob--4" />
      </span>
      <span className="sv-goo-btn__shine" aria-hidden="true" />
      <span className="sv-goo-btn__content">{children}</span>
    </Button>
  );
};

const HeroSection = () => {
  const whatsappNumber = "2348032090599";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20visited%20your%20website%20and%20I%27m%20interested%20in%20your%20services.`;
  const serviceFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSfySL_uEeHr_1-l29wFKZ8Lj55km73U-JDNsRKZekGjgbPBgw/viewform";

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const heroVariant = useMemo(() => {
    const v = ["nebula", "cyber", "aurora"] as const;
    return v[Math.floor(Math.random() * v.length)];
  }, []);

  const heroRef = useRef<HTMLElement | null>(null);

  const handleHeroMove = (e: MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const nx = px * 2 - 1;
    const ny = py * 2 - 1;
    // Reduced parallax strength on mobile
    const isMobile = window.innerWidth < 640;
    const factor = isMobile ? 0.6 : 1;
    el.style.setProperty("--hx", `${nx * factor}`);
    el.style.setProperty("--hy", `${ny * factor}`);
  };

  const handleHeroLeave = () => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--hx", `0`);
    el.style.setProperty("--hy", `0`);
  };

  return (
    <section
      ref={heroRef}
      data-ready={ready ? "true" : "false"}
      data-variant={heroVariant}
      onMouseMove={handleHeroMove}
      onMouseLeave={handleHeroLeave}
      className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Goo filter */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="sv-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0   0 1 0 0 0   0 0 1 0 0   0 0 0 22 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .sv-hero__*, .sv-angle-in, .sv-goo-btn, .sv-blob { animation:none!important; transition:none!important; transform:none!important; filter:none!important; opacity:1!important; }
        }

        .sv-hero__videoWrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
          transform: translate3d(calc(var(--hx,0) * 10px), calc(var(--hy,0) * 8px), 0) scale(1.08);
        }

        .sv-hero__video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          min-width: 100%;
          min-height: 100%;
        }

        .sv-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(7,16,33,.92), rgba(7,16,33,.78), rgba(7,16,33,0));
          pointer-events: none;
        }

        /* Variant overlays – smaller radial sizes for mobile */
        section[data-variant="aurora"] .sv-hero__overlay {
          background:
            radial-gradient(80vw 50vh at 20% 30%, rgba(99,102,241,.22), transparent 60%),
            radial-gradient(70vw 45vh at 55% 70%, rgba(16,185,129,.18), transparent 60%),
            linear-gradient(90deg, rgba(7,16,33,.92), rgba(7,16,33,.78), rgba(7,16,33,0));
        }

        /* Similar for cyber & nebula – using vw/vh prevents overflow */

        .sv-hero__scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .10;
          background: repeating-linear-gradient(to bottom, rgba(255,255,255,.08) 0px, rgba(255,255,255,.08) 1px, transparent 3px, transparent 6px);
          mix-blend-mode: overlay;
          animation: svScan 9s linear infinite;
        }

        @keyframes svScan { from { transform: translateY(-8%); } to { transform: translateY(8%); } }

        .sv-hero__orbs {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .85;
          filter: blur(16px);
          mix-blend-mode: screen;
          overflow: hidden;
        }

        .sv-orb {
          position: absolute;
          border-radius: 9999px;
          will-change: transform;
        }

        .sv-orb--1 { width: 28vw; height: 28vw; max-width: 340px; max-height: 340px; left: -10vw; top: 5%; background: radial-gradient(circle at 30% 30%, rgba(99,102,241,.55), transparent 65%); }
        .sv-orb--2 { width: 35vw; height: 35vw; max-width: 420px; max-height: 420px; left: 30%; bottom: -15vh; background: radial-gradient(circle at 40% 40%, rgba(16,185,129,.38), transparent 65%); }
        .sv-orb--3 { width: 22vw; height: 22vw; max-width: 260px; max-height: 260px; right: -10vw; top: 12%; background: radial-gradient(circle at 40% 40%, rgba(236,72,153,.40), transparent 65%); }

        /* Reduced animation range to prevent overflow */
        @keyframes svOrbFloat1 { from,to { transform: translate3d(calc(var(--hx,0)*8px), calc(var(--hy,0)*6px),0) scale(.98); } }

        /* Entrance animation */
        .sv-angle-in {
          opacity: 0;
          filter: blur(12px);
          transform: translate3d(var(--from-x,0), var(--from-y,0),0) rotate(var(--from-r,0deg)) scale(var(--from-s,1));
        }

        section[data-ready="true"] .sv-angle-in {
          animation: svAngleIn 900ms cubic-bezier(.22,.95,.22,1) both;
          animation-delay: var(--d,0ms);
        }

        @keyframes svAngleIn {
          to { opacity:1; filter:blur(0); transform:translate3d(0,0,0) rotate(0deg) scale(1); }
        }

        /* Gooey button styles (same core, smaller on mobile) */
        .sv-goo-btn { position:relative; overflow:hidden; isolation:isolate; --mx:50%; --my:50%; --tx:0; --ty:0; transform:translate3d(var(--tx),var(--ty),0); transition:transform .14s linear; }
        .sv-goo-btn:hover { transform:translate3d(var(--tx),var(--ty),0) scale(1.025); }
      `}</style>

      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="sv-hero__videoWrap">
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="sv-hero__video"
          />
        </div>

        <div className="sv-hero__orbs" aria-hidden="true">
          <div className="sv-orb sv-orb--1" />
          <div className="sv-orb sv-orb--2" />
          <div className="sv-orb sv-orb--3" />
        </div>

        <div className="sv-hero__overlay" />
        <div className="sv-hero__scanlines" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-5 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto md:mx-0 text-center md:text-left">
          <span
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/20 text-primary font-medium text-xs sm:text-sm mb-4 sm:mb-6 sv-angle-in"
            style={{
              "--from-x": "-60px",
              "--from-y": "-25px",
              "--from-r": "-8deg",
              "--from-s": 0.97,
              "--d": "100ms",
            } as CSSProperties}
          >
            📍 Trusted Electronics Store in Ibadan
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 sm:mb-7 leading-tight tracking-tight">
            <span
              className="inline-block sv-angle-in"
              style={{
                "--from-x": "-90px",
                "--from-y": "35px",
                "--from-r": "6deg",
                "--from-s": 0.96,
                "--d": "180ms",
              } as CSSProperties}
            >
              Quality Electronics
            </span>
            <span
              className="text-gradient block sv-angle-in"
              style={{
                "--from-x": "100px",
                "--from-y": "-30px",
                "--from-r": "-6deg",
                "--from-s": 0.96,
                "--d": "260ms",
              } as CSSProperties}
            >
              Sales & Repairs
            </span>
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl text-gray-200 sm:text-gray-300 mb-6 sm:mb-8 leading-relaxed sv-angle-in"
            style={{
              "--from-x": "80px",
              "--from-y": "0px",
              "--from-r": "2deg",
              "--from-s": 0.98,
              "--d": "360ms",
            } as CSSProperties}
          >
            Your one-stop shop for LED TVs, Smart TVs, Home Theatre Systems, and professional electronics repair services in Ibadan, Nigeria.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 justify-center md:justify-start">
            <Link
              to="/products"
              className="w-full sm:w-auto sv-angle-in"
              style={{
                "--from-x": "-80px",
                "--from-y": "45px",
                "--from-r": "7deg",
                "--from-s": 0.96,
                "--d": "460ms",
              } as CSSProperties}
            >
              <GooeyButton variant="hero" size="lg" className="w-full sm:w-auto">
                <Tv className="w-5 h-5" /> Buy Products
              </GooeyButton>
            </Link>

            <a
              href={serviceFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto sv-angle-in"
              style={{
                "--from-x": "0px",
                "--from-y": "70px",
                "--from-r": "-6deg",
                "--from-s": 0.96,
                "--d": "540ms",
              } as CSSProperties}
            >
              <GooeyButton variant="hero-outline" size="lg" className="w-full sm:w-auto">
                <Wrench className="w-5 h-5" /> Request Repair
              </GooeyButton>
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto sv-angle-in"
              style={{
                "--from-x": "90px",
                "--from-y": "35px",
                "--from-r": "5deg",
                "--from-s": 0.965,
                "--d": "620ms",
              } as CSSProperties}
            >
              <GooeyButton variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </GooeyButton>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;