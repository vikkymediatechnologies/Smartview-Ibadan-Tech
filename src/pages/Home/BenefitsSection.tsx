import { useEffect, useRef, useState } from "react";
import { Shield, Clock, Star, Wrench } from "lucide-react";

const benefits = [
  { icon: Shield, title: "Professional Engineer", description: "Certified and experienced" },
  { icon: Clock, title: "Fast Response", description: "Same-day service available" },
  { icon: Star, title: "Quality Guaranteed", description: "Satisfaction guaranteed" },
  { icon: Wrench, title: "Expert Repairs", description: "LED & Smart TV specialists" },
];

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
      options ?? { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
};

const BenefitsSection = () => {
  const section = useInViewOnce();

  const cardOrigins = [
    { x: -70, y: 35, r: -8 },
    { x: -15, y: 60, r: 6 },
    { x: 50, y: 45, r: -6 },
    { x: 80, y: -20, r: 8 },
  ];

  // Cursor glow – only on hover (lighter on mobile)
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
      className="py-16 sm:py-20 md:py-24 bg-secondary overflow-hidden"
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .sv-benefit-reveal,
          .sv-benefit-card,
          .sv-benefit-card::before,
          .sv-benefit-card::after,
          .sv-benefit-icon {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
          }
        }

        .sv-benefit-reveal {
          opacity: 0;
          filter: blur(10px);
          transform: translate3d(var(--from-x,0), var(--from-y,14px),0) rotate(var(--from-r,0deg)) scale(0.98);
        }

        [data-inview="true"] .sv-benefit-reveal {
          animation: svBenefitPop 850ms cubic-bezier(0.22,0.95,0.22,1) both;
          animation-delay: var(--d,0ms);
        }

        @keyframes svBenefitPop {
          to { opacity:1; filter:blur(0); transform:translate3d(0,0,0) rotate(0deg) scale(1); }
        }

        .sv-benefit-card {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          background: hsl(var(--card));
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .sv-benefit-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
        }

        .sv-benefit-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: radial-gradient(180px circle at var(--mx,50%) var(--my,50%), rgba(99,102,241,0.18), transparent 60%);
          opacity: 0;
          transition: opacity 0.18s ease;
          pointer-events: none;
          z-index: 0;
        }

        .sv-benefit-card:hover::before {
          opacity: 1;
        }

        .sv-benefit-card::after {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(99,102,241,0.35), rgba(16,185,129,0.2), rgba(236,72,153,0.15));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
          z-index: 0;
        }

        .sv-benefit-card:hover::after {
          opacity: 1;
        }

        .sv-benefit-icon-wrap {
          width: 3.5rem;
          height: 3.5rem;
          background: linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--primary)/0.05));
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          transition: transform 0.3s ease;
        }

        .sv-benefit-card:hover .sv-benefit-icon-wrap {
          transform: translateY(-4px) scale(1.08);
        }

        .sv-benefit-icon {
          width: 1.75rem;
          height: 1.75rem;
          color: hsl(var(--primary));
        }

        @media (max-width: 640px) {
          .sv-benefit-card {
            padding: 1.25rem;
          }
          .sv-benefit-icon-wrap {
            width: 3rem;
            height: 3rem;
            margin-bottom: 1rem;
          }
          .sv-benefit-icon {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground sv-benefit-reveal"
            style={{ "--from-x": "-70px", "--from-y": "24px", "--from-r": "-5deg", "--d": "0ms" } as React.CSSProperties}
          >
            Why Choose SmartView Electronics?
          </h2>

          <p
            className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto sv-benefit-reveal"
            style={{ "--from-x": "80px", "--from-y": "18px", "--from-r": "4deg", "--d": "100ms" } as React.CSSProperties}
          >
            Trusted products, fast repairs, and service quality you can count on in Ibadan.
          </p>
        </div>

        {/* Benefits cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const origin = cardOrigins[index % cardOrigins.length];

            return (
              <div
                key={index}
                onMouseMove={onCardMove}
                className="sv-benefit-card sv-benefit-reveal shadow-sm hover:shadow-md transition-shadow"
                style={{
                  "--from-x": `${origin.x}px`,
                  "--from-y": `${origin.y}px`,
                  "--from-r": `${origin.r}deg`,
                  "--d": `${180 + index * 90}ms`,
                } as React.CSSProperties}
              >
                <div className="sv-benefit-icon-wrap">
                  <Icon className="sv-benefit-icon" />
                </div>

                <h3 className="font-semibold text-base sm:text-lg text-foreground mb-2">
                  {benefit.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;