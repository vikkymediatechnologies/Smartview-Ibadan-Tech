import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const useInViewOnce = (options?: IntersectionObserverInit) => {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);
        }
      },
      options ?? { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
};

const CTASection = () => {
  const whatsappNumber = "2348032090599";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20would%20like%20to%20make%20an%20en%20quiry.`;

  const section = useInViewOnce();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const onWrapMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  // Gooey button cursor-follow + slight magnetic
  const onBtnMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const max = 8;
    el.style.setProperty("--tx", `${dx * max}px`);
    el.style.setProperty("--ty", `${dy * max}px`);
  };

  const onBtnLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--tx", `0px`);
    el.style.setProperty("--ty", `0px`);
  };

  return (
    <section
      ref={section.ref as any}
      data-inview={section.inView ? "true" : "false"}
      className="py-16 md:py-24"
    >
      {/* Gooey filter for CTA buttons */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="sv-goo-cta">
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

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .sv-cta-wrap,
          .sv-cta-wrap::before,
          .sv-cta-wrap::after,
          .sv-cta-reveal,
          .sv-goo-btn,
          .sv-goo-btn__shine,
          .sv-blob {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
          }
        }

        /* ===== Modern "Glass + Mesh" CTA panel ===== */
        .sv-cta-wrap {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          border-radius: 24px;
          --mx: 50%;
          --my: 50%;
          transform: translateZ(0);
        }

        /* animated mesh background */
        .sv-cta-wrap::before {
          content: "";
          position: absolute;
          inset: -40%;
          background:
            radial-gradient(700px 340px at 20% 25%, rgba(99,102,241,.40), transparent 60%),
            radial-gradient(680px 340px at 75% 70%, rgba(16,185,129,.26), transparent 60%),
            radial-gradient(620px 320px at 70% 18%, rgba(236,72,153,.20), transparent 55%),
            linear-gradient(135deg, rgba(0,0,0,.20), rgba(0,0,0,.05));
          filter: blur(18px);
          opacity: .95;
          animation: svMeshDrift 10s ease-in-out infinite alternate;
          z-index: 0;
        }

        @keyframes svMeshDrift {
          from { transform: translate3d(-2.5%, -2.5%, 0) scale(1.02); }
          to   { transform: translate3d(2.5%, 2.5%, 0) scale(1.06); }
        }

        /* cursor spotlight highlight */
        .sv-cta-wrap::after {
          content: "";
          position: absolute;
          inset: -2px;
          background: radial-gradient(
            320px circle at var(--mx) var(--my),
            rgba(255,255,255,.26),
            rgba(255,255,255,.10) 35%,
            transparent 65%
          );
          opacity: 0;
          transition: opacity 180ms ease;
          z-index: 1;
          pointer-events: none;
          mix-blend-mode: overlay;
        }
        .sv-cta-wrap:hover::after { opacity: 1; }

        /* subtle gradient border */
        .sv-cta-border {
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(255,255,255,.28), rgba(99,102,241,.26), rgba(16,185,129,.18));
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: .85;
          z-index: 2;
          pointer-events: none;
        }

        .sv-cta-inner {
          position: relative;
          z-index: 3;
          /* keeps your existing hero-gradient vibe but adds "glass" */
          background: linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.03));
          backdrop-filter: blur(10px);
          border-radius: 24px;
        }

        /* ===== "Different angles" entrance for heading/text/buttons ===== */
        .sv-cta-reveal {
          opacity: 0;
          filter: blur(14px);
          transform:
            translate3d(var(--from-x, 0px), var(--from-y, 18px), 0)
            rotate(var(--from-r, 0deg))
            scale(.97);
          will-change: transform, opacity, filter;
        }

        [data-inview="true"] .sv-cta-reveal {
          animation: svCtaPop 980ms cubic-bezier(.2,.95,.2,1) both;
          animation-delay: var(--d, 0ms);
        }

        @keyframes svCtaPop {
          0%   { opacity: 0; filter: blur(14px); transform: translate3d(var(--from-x,0px), var(--from-y,18px), 0) rotate(var(--from-r,0deg)) scale(.97); }
          65%  { opacity: 1; filter: blur(0); transform: translate3d(0,-2px,0) rotate(0deg) scale(1.02); }
          100% { opacity: 1; filter: blur(0); transform: translate3d(0,0,0) rotate(0deg) scale(1); }
        }

        /* ===== Gooey buttons ===== */
        .sv-goo-btn {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          transform: translate3d(var(--tx, 0px), var(--ty, 0px), 0);
          transition: transform 120ms linear;
          --mx: 50%;
          --my: 50%;
        }
        .sv-goo-btn:hover { transform: translate3d(var(--tx, 0px), var(--ty, 0px), 0) scale(1.02); }
        .sv-goo-btn:active { transform: translate3d(0px, 0px, 0) scale(.99); }

        .sv-goo-btn__content {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: .5rem;
        }

        .sv-goo-btn__shine {
          position: absolute;
          inset: -2px;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 160ms ease;
          background: radial-gradient(190px circle at var(--mx) var(--my), rgba(255,255,255,.18), transparent 62%);
          mix-blend-mode: overlay;
        }
        .sv-goo-btn:hover .sv-goo-btn__shine { opacity: 1; }

        .sv-goo-btn__goo {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          filter: url(#sv-goo-cta);
        }

        .sv-blob {
          position: absolute;
          left: var(--mx);
          top: var(--my);
          border-radius: 999px;
          background: rgba(255,255,255,.22);
          transform: translate(-50%, -50%) translateX(-120px) translateY(var(--dy,0px)) scale(.9);
          opacity: 0;
          mix-blend-mode: screen;
        }
        .sv-blob--1 { width: 24px; height: 24px; --dy: -10px; }
        .sv-blob--2 { width: 18px; height: 18px; --dy:  10px; }
        .sv-blob--3 { width: 14px; height: 14px; --dy:  -2px; }
        .sv-blob--4 { width: 20px; height: 20px; --dy:   6px; }

        .sv-goo-btn:hover .sv-blob { animation: svBlobFly 760ms cubic-bezier(.2,.9,.2,1) both; }
        .sv-goo-btn:hover .sv-blob--2 { animation-delay: 45ms; }
        .sv-goo-btn:hover .sv-blob--3 { animation-delay: 95ms; }
        .sv-goo-btn:hover .sv-blob--4 { animation-delay: 150ms; }

        @keyframes svBlobFly {
          0%   { opacity: 0; transform: translate(-50%, -50%) translateX(-110px) translateY(var(--dy,0px)) scale(.92); }
          18%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -50%) translateX(340px) translateY(var(--dy,0px)) scale(1.2); }
        }
      `}</style>

      <div className="container">
        <div
          ref={wrapRef}
          onMouseMove={onWrapMove}
          className="sv-cta-wrap hero-gradient rounded-3xl"
        >
          <div className="sv-cta-border" aria-hidden="true" />

          <div className="sv-cta-inner p-8 md:p-12 text-center text-white">
            <h2
              className="font-display text-3xl md:text-4xl font-bold mb-4 sv-cta-reveal"
              style={
                {
                  ["--from-x" as any]: "-110px",
                  ["--from-y" as any]: "22px",
                  ["--from-r" as any]: "-7deg",
                  ["--d" as any]: "0ms",
                } as React.CSSProperties
              }
            >
              Ready to Get Started?
            </h2>

            <p
              className="text-xl text-white/80 mb-8 max-w-2xl mx-auto sv-cta-reveal"
              style={
                {
                  ["--from-x" as any]: "120px",
                  ["--from-y" as any]: "18px",
                  ["--from-r" as any]: "6deg",
                  ["--d" as any]: "120ms",
                } as React.CSSProperties
              }
            >
              Contact us today for quality electronics or professional repair services in Ibadan.
            </p>

            <div
              className="flex flex-wrap justify-center gap-4 sv-cta-reveal"
              style={
                {
                  ["--from-x" as any]: "0px",
                  ["--from-y" as any]: "60px",
                  ["--from-r" as any]: "-6deg",
                  ["--d" as any]: "240ms",
                } as React.CSSProperties
              }
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="whatsapp"
                  size="xl"
                  className="sv-goo-btn"
                  onMouseMove={onBtnMove}
                  onMouseLeave={onBtnLeave}
                >
                  <span className="sv-goo-btn__goo" aria-hidden="true">
                    <span className="sv-blob sv-blob--1" />
                    <span className="sv-blob sv-blob--2" />
                    <span className="sv-blob sv-blob--3" />
                    <span className="sv-blob sv-blob--4" />
                  </span>
                  <span className="sv-goo-btn__shine" aria-hidden="true" />
                  <span className="sv-goo-btn__content">
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </span>
                </Button>
              </a>

              <Link to="/contact">
                <Button
                  variant="hero-outline"
                  size="xl"
                  className="sv-goo-btn"
                  onMouseMove={onBtnMove}
                  onMouseLeave={onBtnLeave}
                >
                  <span className="sv-goo-btn__goo" aria-hidden="true">
                    <span className="sv-blob sv-blob--1" />
                    <span className="sv-blob sv-blob--2" />
                    <span className="sv-blob sv-blob--3" />
                    <span className="sv-blob sv-blob--4" />
                  </span>
                  <span className="sv-goo-btn__shine" aria-hidden="true" />
                  <span className="sv-goo-btn__content">Contact Us</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;