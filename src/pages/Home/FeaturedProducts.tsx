import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import smartTvImage from "@/assets/product-smart-tv.jpg";
import homeTheatreImage from "@/assets/product-home-theatre.jpg";
import fanImage from "@/assets/product-fan.jpg";

const products = [
  { image: smartTvImage, name: '55" 4K Smart TV', price: "₦185,000", category: "Smart TV" },
  { image: homeTheatreImage, name: "5.1 Home Theatre System", price: "₦95,000", category: "Audio" },
  { image: fanImage, name: '18" Standing Fan', price: "₦25,000", category: "Fans" },
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
      options ?? { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
};

const FeaturedProducts = () => {
  const whatsappNumber = "2348032090599";
  const section = useInViewOnce();

  // Cursor glow for cards
  const onCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  // Magnetic + cursor for buttons (lighter on mobile)
  const onBtnMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);

    const isMobile = window.innerWidth < 640;
    const max = isMobile ? 5 : 8;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.setProperty("--tx", `${dx * max}px`);
    el.style.setProperty("--ty", `${dy * max}px`);
  };

  const onBtnLeave = () => {
    const el = e.currentTarget as HTMLElement;
    el.style.setProperty("--tx", "0px");
    el.style.setProperty("--ty", "0px");
  };

  return (
    <section
      ref={section.ref as any}
      data-inview={section.inView ? "true" : "false"}
      className="py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      {/* Scoped goo filter */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="sv-goo-products">
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
          [class*="sv-prod-"], .sv-goo-btn, .sv-blob {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            filter: none !important;
          }
        }

        .sv-prod-reveal {
          opacity: 0;
          filter: blur(12px);
          transform: translate3d(var(--from-x,0), var(--from-y,16px),0) rotate(var(--from-r,0deg)) scale(0.98);
        }

        [data-inview="true"] .sv-prod-reveal {
          animation: svProdPop 900ms cubic-bezier(0.22,0.95,0.22,1) both;
          animation-delay: var(--d,0ms);
        }

        @keyframes svProdPop {
          to { opacity:1; filter:blur(0); transform:translate3d(0,0,0) rotate(0deg) scale(1); }
        }

        .sv-prod-card {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .sv-prod-card:hover {
          transform: translateY(-8px);
        }

        .sv-prod-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(99,102,241,0.16), transparent 60%);
          opacity: 0;
          transition: opacity 0.18s ease;
          z-index: 0;
          pointer-events: none;
        }

        .sv-prod-card:hover::before {
          opacity: 1;
        }

        .sv-prod-card::after {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(99,102,241,0.4), rgba(16,185,129,0.22), rgba(236,72,153,0.18));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: none;
        }

        .sv-prod-card:hover::after {
          opacity: 1;
        }

        .sv-prod-imgWrap {
          background: hsl(var(--muted));
          overflow: hidden;
        }

        .sv-prod-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 4 / 3;
          transition: transform 0.6s cubic-bezier(0.22,0.9,0.22,1);
        }

        .sv-prod-card:hover .sv-prod-img {
          transform: scale(1.05);
        }

        .sv-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
        }

        /* Gooey button */
        .sv-goo-btn {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transform: translate3d(var(--tx,0), var(--ty,0),0);
          transition: transform 0.12s linear;
        }

        .sv-goo-btn:hover {
          transform: translate3d(var(--tx,0), var(--ty,0),0) scale(1.02);
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground sv-prod-reveal"
            style={{ "--from-x": "-80px", "--from-y": "24px", "--from-r": "-5deg", "--d": "0ms" } as React.CSSProperties}
          >
            Featured Products
          </h2>
          <p
            className="mt-3 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto sv-prod-reveal"
            style={{ "--from-x": "80px", "--from-y": "16px", "--from-r": "4deg", "--d": "100ms" } as React.CSSProperties}
          >
            Top-quality electronics at competitive prices — order directly via WhatsApp
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              onMouseMove={onCardMove}
              className="bg-card rounded-xl overflow-hidden sv-prod-card sv-prod-reveal shadow-sm hover:shadow-md transition-shadow"
              style={{
                "--from-x": index === 0 ? "-80px" : index === 1 ? "0px" : "80px",
                "--from-y": index === 0 ? "45px" : index === 1 ? "70px" : "35px",
                "--from-r": index === 0 ? "-8deg" : index === 1 ? "6deg" : "-7deg",
                "--d": `${160 + index * 100}ms`,
              } as React.CSSProperties}
            >
              <div className="relative sv-prod-imgWrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="sv-prod-img"
                />
                <span className="sv-badge">{product.category}</span>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-semibold text-base sm:text-lg text-foreground mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-primary font-bold text-lg sm:text-xl mb-4">
                  {product.price}
                </p>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hello, I want to order ${product.name} priced at ${product.price}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full sv-goo-btn text-sm sm:text-base"
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
                    <span className="sv-goo-btn__content flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Order Now
                    </span>
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;