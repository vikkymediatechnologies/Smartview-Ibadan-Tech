import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tv, Wrench, Shield, Clock, Star, ChevronRight, MessageCircle } from "lucide-react";
// import heroImage from "@/assets/hero-electronics.jpg";
import smartTvImage from "@/assets/product-smart-tv.jpg";
import homeTheatreImage from "@/assets/product-home-theatre.jpg";
import fanImage from "@/assets/product-fan.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import serviceVideo from "@/assets/service-video.mp4";


const Index = () => {
  const whatsappNumber = "2348032090599";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20visited%20your%20website%20and%20I%27m%20interested%20in%20your%20services.`;
  const serviceFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSfySL_uEeHr_1-l29wFKZ8Lj55km73U-JDNsRKZekGjgbPBgw/viewform";

  const benefits = [
    {
      icon: Shield,
      title: "Professional Engineer",
      description: "Certified electronics engineer with years of industry experience",
    },
    {
      icon: Clock,
      title: "Fast Response",
      description: "Quick turnaround on repairs and same-day service available",
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description: "All products and repairs backed by our satisfaction guarantee",
    },
    {
      icon: Wrench,
      title: "Expert Repairs",
      description: "Specialized in LED TV, Smart TV, and home electronics repairs",
    },
  ];

  const featuredProducts = [
    {
      image: smartTvImage,
      name: "55\" 4K Smart TV",
      price: "₦185,000",
      category: "Smart TV",
    },
    {
      image: homeTheatreImage,
      name: "5.1 Home Theatre System",
      price: "₦95,000",
      category: "Audio",
    },
    {
      image: fanImage,
      name: "18\" Standing Fan",
      price: "₦25,000",
      category: "Fans",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="SmartView Electronics Store"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-transparent" />
        </div> */}

        <div className="absolute inset-0">
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-transparent" />
      </div>

        
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-medium text-sm mb-6 animate-fade-in">
              📍 Trusted Electronics Store in Ibadan
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Quality Electronics
              <span className="text-gradient block">Sales & Repairs</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Your one-stop shop for LED TVs, Smart TVs, Home Theatre Systems, and professional electronics repair services in Ibadan, Nigeria.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/products">
                <Button variant="hero" size="xl">
                  <Tv className="w-5 h-5" />
                  Buy Products
                </Button>
              </Link>
              <a href={serviceFormLink} target="_blank" rel="noopener noreferrer">
                <Button variant="hero-outline" size="xl">
                  <Wrench className="w-5 h-5" />
                  Request Repair
                </Button>
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="xl">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose SmartView Electronics?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best electronics products and repair services in Ibadan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl card-shadow hover:card-shadow-hover transition-all duration-300"
              >
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">Top-quality electronics at competitive prices</p>
            </div>
            <Link to="/products" className="hidden md:block">
              <Button variant="outline">
                View All Products
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="font-display font-bold text-xl text-primary mb-4">
                    {product.price}
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello, I want to order the ${product.name} priced at ${product.price} from your website.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="whatsapp" className="w-full">
                      <MessageCircle className="w-4 h-4" />
                      Order Now
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-primary-foreground font-medium text-sm mb-6">
                Professional Repair Services
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Expert Electronics Repair in Ibadan
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                From LED TV screen issues to smart TV software problems, our certified technician can diagnose and fix all types of electronic appliances quickly and affordably.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "LED & Smart TV Repair",
                  "Home Theatre Installation",
                  "Fan Repair & Servicing",
                  "Electronics Diagnostics",
                ].map((service, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-200">{service}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link to="/services">
                  <Button variant="hero" size="lg">
                    View All Services
                  </Button>
                </Link>
                <a href={serviceFormLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="hero-outline" size="lg">
                    Request Repair
                  </Button>
                </a>
              </div>
            </div>
            {/* <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <Wrench className="w-24 h-24 text-primary mb-6 mx-auto" />
                  <h3 className="font-display text-2xl font-bold mb-2">Quick Turnaround</h3>
                  <p className="text-gray-400">Same-day repairs available for most issues</p>
                </div>
              </div>
            </div> */}

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 flex items-end justify-center overflow-hidden">
              {/* Video Background */}
              <video
                src={serviceVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              />

              {/* Text with blur background */}
              <div className="relative z-10 w-full text-center">
                <div className="bg-black/50 backdrop-blur-md rounded-lg px-4 py-3 inline-block">
                  <h3 className="font-display text-2xl font-bold mb-2 text-white">
                    Quick Turnaround
                  </h3>
                  <p className="text-gray-200">
                    Same-day repairs available for most issues
                  </p>
                </div>
              </div>
            </div>
          </div>


          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="hero-gradient rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Contact us today for quality electronics or professional repair services in Ibadan
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="xl">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="hero-outline" size="xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
