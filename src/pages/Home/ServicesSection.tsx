import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import serviceVideo from "@/assets/service-video.mp4";

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
      options ?? { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
};

const ServicesSection = () => {
  const serviceFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSfySL_uEeHr_1-l29wFKZ8Lj55km73U-JDNsRKZekGjgbPBgw/viewform";

  const services = [
    "LED & Smart TV Repair",
    "Home Theatre Installation",
    "Fan Repair & Servicing",
    "Electronics Diagnostics",
  ];

  const section = useInViewOnce();

  // Magnetic + cursor for buttons (lighter on mobile)
  const onBtnMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);

    const isMobile = window.innerWidth < 640;
    const maxPull = isMobile ? 5 : 8;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.setProperty("--tx", `${dx * maxPull}px`);
    el.style.setProperty("--ty", `${dy * maxPull}px`);
  };

  const onBtnLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  };

  // Cursor glow for video card
  const onCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={section.ref as any}
      data-inview={section.inView ? "true" : "false"}
      className="py-12 sm:py-16 md:py-24 bg-navy text-white overflow-hidden"
    >
      {/* Scoped goo filter */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="sv-goo-services">
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
          [class*="sv-serv-"], .sv-goo-btn, .sv-blob { animation: none !important; transition: none !important; transform: none !important; filter: none !important; }
        }

        .sv-serv-reveal {
          opacity: 0;
          filter: blur(12px);
          transform: translate3d(var(--from-x,0), var(--from-y,16px),0) rotate(var(--from-r,0deg)) scale(0.98);
        }

        [data-inview="true"] .sv-serv-reveal {
          animation: svServPop 900ms cubic-bezier(0.22,0.95,0.22,1) both;
          animation-delay: var(--d,0ms);
        }

        @keyframes svServPop {
          to { opacity:1; filter:blur(0); transform:translate3d(0,0,0) rotate(0deg) scale(1); }
        }

        .sv-serv-item {
          opacity: 0;
          transform: translateX(-12px);
        }
        [data-inview="true"] .sv-serv-item {
          animation: svItemIn 600ms ease-out both;
          animation-delay: var(--d,0ms);
        }
        @keyframes svItemIn { to { opacity:1; transform:translateX(0); } }

        .sv-serv-card {
          position: relative;
          overflow: hidden;
          border-radius: 1.5rem;
          transition: transform 0.25s ease;
        }
        .sv-serv-card:hover { transform: translateY(-6px); }

        .sv-serv-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: radial-gradient(240px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.16), transparent 60%);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
        }
        .sv-serv-card:hover::before { opacity: 1; }

        .sv-serv-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.22,0.9,0.22,1);
        }
        .sv-serv-card:hover .sv-serv-video { transform: scale(1.05); }
      `}</style>

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="order-2 lg:order-1">
            <span
              className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 text-primary-foreground font-medium text-xs sm:text-sm mb-4 sv-serv-reveal"
              style={{ "--from-x": "-80px", "--from-y": "20px", "--from-r": "-6deg", "--d": "0ms" } as React.CSSProperties}
            >
              Professional Repair Services
            </span>

            <h2
              className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-5 sv-serv-reveal"
              style={{ "--from-x": "-110px", "--from-y": "30px", "--from-r": "7deg", "--d": "100ms" } as React.CSSProperties}
            >
              Expert Electronics Repair in Ibadan
            </h2>

            <p
              className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed sv-serv-reveal"
              style={{ "--from-x": "90px", "--from-y": "8px", "--from-r": "-3deg", "--d": "200ms" } as React.CSSProperties}
            >
              From LED TV screen issues to smart TV software problems, our certified technician delivers fast, reliable, and affordable electronics repair services.
            </p>

            <ul className="space-y-3 mb-8">
              {services.map((service, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 sv-serv-item text-gray-200"
                  style={{ "--d": `${280 + i * 80}ms` } as React.CSSProperties}
                >
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{service}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/services"
                className="w-full sm:w-auto sv-serv-reveal"
                style={{ "--from-x": "-100px", "--from-y": "50px", "--from-r": "7deg", "--d": "600ms" } as React.CSSProperties}
              >
                <Button
                  variant="hero"
                  size="lg"
                  className="sv-goo-btn w-full sm:w-auto"
                  onMouseMove={onBtnMove}
                  onMouseLeave={onBtnLeave}
                >
                  <span className="sv-goo-btn__goo" aria-hidden>
                    <span className="sv-blob sv-blob--1" />
                    <span className="sv-blob sv-blob--2" />
                    <span className="sv-blob sv-blob--3" />
                    <span className="sv-blob sv-blob--4" />
                  </span>
                  <span className="sv-goo-btn__shine" aria-hidden />
                  <span className="sv-goo-btn__content">View All Services</span>
                </Button>
              </Link>

              <a
                href={serviceFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto sv-serv-reveal"
                style={{ "--from-x": "100px", "--from-y": "50px", "--from-r": "-7deg", "--d": "680ms" } as React.CSSProperties}
              >
                <Button
                  variant="hero-outline"
                  size="lg"
                  className="sv-goo-btn w-full sm:w-auto"
                  onMouseMove={onBtnMove}
                  onMouseLeave={onBtnLeave}
                >
                  <span className="sv-goo-btn__goo" aria-hidden>
                    <span className="sv-blob sv-blob--1" />
                    <span className="sv-blob sv-blob--2" />
                    <span className="sv-blob sv-blob--3" />
                    <span className="sv-blob sv-blob--4" />
                  </span>
                  <span className="sv-goo-btn__shine" aria-hidden />
                  <span className="sv-goo-btn__content">Request Repair</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Video Card – Responsive aspect */}
          <div
            onMouseMove={onCardMove}
            className="relative sv-serv-reveal order-1 lg:order-2"
            style={{ "--from-x": "120px", "--from-y": "35px", "--from-r": "-7deg", "--d": "180ms" } as React.CSSProperties}
          >
            <div className="aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden sv-serv-card mx-auto max-w-[90%] sm:max-w-full">
              <video
                src={serviceVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover sv-serv-video"
              />

              <div className="relative z-10 h-full flex items-end justify-center pb-6 sm:pb-8 px-4">
                <div className="bg-black/50 backdrop-blur-md rounded-lg px-4 py-3 text-center max-w-xs">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
                    Quick Turnaround
                  </h3>
                  <p className="text-sm sm:text-base text-gray-200">
                    Same-day repairs available for most issues
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;