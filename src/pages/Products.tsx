import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ComponentProps, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import smartTvImage from "@/assets/product-smart-tv.jpg";
import homeTheatreImage from "@/assets/product-home-theatre.jpg";
import fanImage from "@/assets/product-fan.jpg";

interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

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
      options ?? { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
};

/* ---------------- Gooey Button (for ALL Buttons) ---------------- */
type GooeyButtonProps = ComponentProps<typeof Button> & {
  blobColor?: string;
  shineColor?: string;
};

const GooeyButton = ({
  blobColor = "rgba(255,255,255,.22)",
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

    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const max = 8;
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
      style={
        {
          ...(style as object),
          ["--blob" as any]: blobColor,
          ["--shine" as any]: shineColor,
        } as CSSProperties
      }
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

/* ---------------- Gooey Pill (Category filter buttons) ---------------- */
type GooeyPillProps = {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  style?: CSSProperties;
};

const GooeyPill = ({ active, onClick, children, style }: GooeyPillProps) => {
  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <button
      onClick={onClick}
      onMouseMove={onMove}
      className={`sv-pill ${active ? "sv-pill--active" : ""}`}
      style={style}
      type="button"
    >
      <span className="sv-pill__goo" aria-hidden="true">
        <span className="sv-blob sv-blob--1" />
        <span className="sv-blob sv-blob--2" />
        <span className="sv-blob sv-blob--3" />
      </span>
      <span className="sv-pill__shine" aria-hidden="true" />
      <span className="sv-pill__content">{children}</span>
    </button>
  );
};

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const whatsappNumber = "2348012345678";

  const categories = ["All", "LED TVs", "Smart TVs", "Home Theatre", "Fans", "Other"];

  const products: Product[] = [
    {
      id: 1,
      image: smartTvImage,
      name: '32" LED TV',
      description:
        "Full HD display with vibrant colors and slim design. Perfect for bedrooms and small spaces.",
      price: "₦85,000",
      category: "LED TVs",
    },
    {
      id: 2,
      image: smartTvImage,
      name: '43" LED TV',
      description: "Crisp Full HD display with wide viewing angles. Great for living rooms.",
      price: "₦125,000",
      category: "LED TVs",
    },
    {
      id: 3,
      image: smartTvImage,
      name: '43" Smart TV',
      description: "Android TV with built-in apps, WiFi connectivity, and streaming capabilities.",
      price: "₦155,000",
      category: "Smart TVs",
    },
    {
      id: 4,
      image: smartTvImage,
      name: '55" 4K Smart TV',
      description: "Ultra HD 4K display with HDR, smart features, and voice control support.",
      price: "₦185,000",
      category: "Smart TVs",
    },
    {
      id: 5,
      image: smartTvImage,
      name: '65" 4K Smart TV',
      description: "Premium large-screen experience with stunning 4K resolution and Dolby Audio.",
      price: "₦285,000",
      category: "Smart TVs",
    },
    {
      id: 6,
      image: homeTheatreImage,
      name: "2.1 Soundbar System",
      description: "Compact soundbar with wireless subwoofer. Great for enhancing TV audio.",
      price: "₦55,000",
      category: "Home Theatre",
    },
    {
      id: 7,
      image: homeTheatreImage,
      name: "5.1 Home Theatre System",
      description: "Complete surround sound experience with 5 speakers and powerful subwoofer.",
      price: "₦95,000",
      category: "Home Theatre",
    },
    {
      id: 8,
      image: fanImage,
      name: '16" Table Fan',
      description: "Compact and powerful table fan with 3 speed settings and oscillation.",
      price: "₦15,000",
      category: "Fans",
    },
    {
      id: 9,
      image: fanImage,
      name: '18" Standing Fan',
      description: "Tall standing fan with adjustable height, timer, and remote control.",
      price: "₦25,000",
      category: "Fans",
    },
    {
      id: 10,
      image: fanImage,
      name: "Rechargeable Fan",
      description:
        "Battery-powered fan that works during power outages. Up to 8 hours battery life.",
      price: "₦35,000",
      category: "Fans",
    },
  ];

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  const page = useInViewOnce({ threshold: 0.06 }); // triggers quickly at top
  const grid = useInViewOnce({ threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

  const onCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <main
      ref={page.ref as any}
      data-inview={page.inView ? "true" : "false"}
      className="py-12 md:py-16"
    >
      {/* Gooey filter (page-level) */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="sv-goo-products-page">
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
          .sv-reveal,
          .sv-prod-card,
          .sv-prod-card::before,
          .sv-prod-card::after,
          .sv-goo-btn,
          .sv-goo-btn__shine,
          .sv-pill,
          .sv-pill__shine,
          .sv-blob {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
            filter: none !important;
          }
        }

        /* ---------- Scroll/Load reveal: "swivel + settle" ---------- */
        .sv-reveal {
          opacity: 0;
          filter: blur(14px);
          transform:
            translate3d(var(--from-x, 0px), var(--from-y, 18px), 0)
            rotate(var(--from-r, 0deg))
            scale(.975);
          will-change: transform, opacity, filter;
        }

        [data-inview="true"] .sv-reveal {
          animation: svSwivelIn 980ms cubic-bezier(.2,.95,.2,1) both;
          animation-delay: var(--d, 0ms);
        }

        @keyframes svSwivelIn {
          0%   { opacity: 0; filter: blur(14px); transform: translate3d(var(--from-x,0px), var(--from-y,18px), 0) rotate(var(--from-r,0deg)) scale(.975); }
          62%  { opacity: 1; filter: blur(0); transform: translate3d(0,-2px,0) rotate(0deg) scale(1.02); }
          100% { opacity: 1; filter: blur(0); transform: translate3d(0,0,0) rotate(0deg) scale(1); }
        }

        /* ---------- Product Card: glow + gradient border + lift ---------- */
        .sv-prod-card {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          border-radius: 14px;
          --mx: 50%;
          --my: 50%;
          transition: transform 260ms ease, box-shadow 260ms ease;
        }
        .sv-prod-card:hover { transform: translateY(-6px); }

        .sv-prod-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          background: radial-gradient(
            260px circle at var(--mx) var(--my),
            rgba(99,102,241,.18),
            rgba(99,102,241,.06) 35%,
            transparent 65%
          );
          opacity: 0;
          transition: opacity 180ms ease;
          pointer-events: none;
          z-index: 0;
        }
        .sv-prod-card:hover::before { opacity: 1; }

        .sv-prod-card::after {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(99,102,241,.42), rgba(16,185,129,.22), rgba(236,72,153,.18));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 220ms ease;
          pointer-events: none;
          z-index: 0;
        }
        .sv-prod-card:hover::after { opacity: 1; }
        .sv-prod-card > * { position: relative; z-index: 1; }

        .sv-prod-img {
          transition: transform 600ms cubic-bezier(.2,.9,.2,1);
          transform-origin: center;
        }
        .sv-prod-card:hover .sv-prod-img { transform: scale(1.06); }

        /* ---------- Gooey Button ---------- */
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
          background: radial-gradient(190px circle at var(--mx) var(--my), var(--shine, rgba(255,255,255,.18)), transparent 62%);
          mix-blend-mode: overlay;
        }
        .sv-goo-btn:hover .sv-goo-btn__shine { opacity: 1; }

        .sv-goo-btn__goo {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          filter: url(#sv-goo-products-page);
        }

        .sv-blob {
          position: absolute;
          left: var(--mx);
          top: var(--my);
          border-radius: 999px;
          background: var(--blob, rgba(255,255,255,.22));
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

        /* ---------- Gooey Pill (category filter) ---------- */
        .sv-pill {
          position: relative;
          border-radius: 999px;
          padding: 10px 18px;
          font-size: 14px;
          font-weight: 600;
          transition: transform 160ms ease, background 160ms ease, color 160ms ease, border-color 160ms ease;
          overflow: hidden;
          isolation: isolate;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,.0);
          background: hsl(var(--secondary));
          color: hsl(var(--secondary-foreground));
          --mx: 50%;
          --my: 50%;
        }
        .sv-pill:hover { transform: translateY(-1px); background: hsl(var(--secondary) / .8); }

        .sv-pill--active {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          box-shadow: 0 12px 30px rgba(0,0,0,.10);
        }

        .sv-pill__content { position: relative; z-index: 2; }

        .sv-pill__shine {
          position: absolute;
          inset: -2px;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 160ms ease;
          background: radial-gradient(160px circle at var(--mx) var(--my), rgba(255,255,255,.20), transparent 60%);
          mix-blend-mode: overlay;
        }
        .sv-pill:hover .sv-pill__shine { opacity: 1; }

        .sv-pill__goo {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          filter: url(#sv-goo-products-page);
        }
        .sv-pill .sv-blob { background: rgba(255,255,255,.18); }
        .sv-pill:hover .sv-blob { animation: svBlobFly 720ms cubic-bezier(.2,.9,.2,1) both; }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 sv-reveal"
            style={
              {
                ["--from-x" as any]: "-120px",
                ["--from-y" as any]: "30px",
                ["--from-r" as any]: "-7deg",
                ["--d" as any]: "0ms",
              } as CSSProperties
            }
          >
            Our Products
          </h1>
          <p
            className="text-muted-foreground text-lg max-w-2xl mx-auto sv-reveal"
            style={
              {
                ["--from-x" as any]: "120px",
                ["--from-y" as any]: "22px",
                ["--from-r" as any]: "6deg",
                ["--d" as any]: "120ms",
              } as CSSProperties
            }
          >
            Quality electronics at competitive prices. Order via WhatsApp or visit our store in Ibadan.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-10 sv-reveal"
          style={
            {
              ["--from-x" as any]: "0px",
              ["--from-y" as any]: "60px",
              ["--from-r" as any]: "-4deg",
              ["--d" as any]: "220ms",
            } as CSSProperties
          }
        >
          {categories.map((category, idx) => (
            <GooeyPill
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              style={{ ["--d" as any]: `${idx * 40}ms` } as CSSProperties}
            >
              {category}
            </GooeyPill>
          ))}
        </div>

        {/* Products Grid */}
        <section ref={grid.ref as any} data-inview={grid.inView ? "true" : "false"}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => {
              const orderMessage = `Hello, I want to order the ${product.name} priced at ${product.price} from your website.`;
              const negotiateMessage = `Hello, I want to negotiate the price of the ${product.name} listed at ${product.price} on your website.`;

              const origin =
                i % 3 === 0
                  ? { x: "-120px", y: "55px", r: "-10deg" }
                  : i % 3 === 1
                    ? { x: "0px", y: "80px", r: "8deg" }
                    : { x: "120px", y: "45px", r: "-8deg" };

              return (
                <div
                  key={product.id}
                  onMouseMove={onCardMove}
                  className="bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 group sv-prod-card sv-reveal"
                  style={
                    {
                      ["--from-x" as any]: origin.x,
                      ["--from-y" as any]: origin.y,
                      ["--from-r" as any]: origin.r,
                      ["--d" as any]: `${300 + i * 70}ms`,
                    } as CSSProperties
                  }
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover sv-prod-img"
                    />
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="font-display font-bold text-xl text-primary mb-4">
                      {product.price}
                    </p>

                    <div className="flex gap-2">
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <GooeyButton
                          variant="whatsapp"
                          size="sm"
                          className="w-full"
                          blobColor="rgba(255,255,255,.22)"
                          shineColor="rgba(255,255,255,.18)"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Order
                        </GooeyButton>
                      </a>

                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(negotiateMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <GooeyButton
                          variant="outline"
                          size="sm"
                          className="w-full"
                          blobColor="rgba(99,102,241,.24)"
                          shineColor="rgba(99,102,241,.16)"
                        >
                          Negotiate
                        </GooeyButton>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p
            className="text-muted-foreground mb-4 sv-reveal"
            style={
              {
                ["--from-x" as any]: "-80px",
                ["--from-y" as any]: "22px",
                ["--from-r" as any]: "-5deg",
                ["--d" as any]: "260ms",
              } as CSSProperties
            }
          >
            Don't see what you're looking for? Contact us on WhatsApp
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hello, I'm looking for a specific product. Can you help?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block sv-reveal"
            style={
              {
                ["--from-x" as any]: "90px",
                ["--from-y" as any]: "40px",
                ["--from-r" as any]: "6deg",
                ["--d" as any]: "360ms",
              } as CSSProperties
            }
          >
            <GooeyButton
              variant="whatsapp"
              size="lg"
              blobColor="rgba(255,255,255,.22)"
              shineColor="rgba(255,255,255,.18)"
            >
              <MessageCircle className="w-5 h-5" />
              Ask About Products
            </GooeyButton>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Products;