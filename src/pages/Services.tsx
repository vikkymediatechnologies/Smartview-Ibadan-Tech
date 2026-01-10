import { Button } from "@/components/ui/button";
import { Tv, Monitor, Speaker, Wind, Cpu, Wrench, Zap, Settings } from "lucide-react";

const Services = () => {
  const serviceFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSfySL_uEeHr_1-l29wFKZ8Lj55km73U-JDNsRKZekGjgbPBgw/viewform";

  const services = [
    {
      icon: Tv,
      title: "LED TV Repair",
      description: "Expert diagnosis and repair for all LED TV brands and models. We fix display issues, power problems, and more.",
      benefits: ["Screen replacement", "Backlight repair", "Power board fixes", "Remote control issues"],
    },
    {
      icon: Monitor,
      title: "Smart TV Repair",
      description: "Specialized Smart TV repairs including software updates, app issues, and connectivity problems.",
      benefits: ["Software updates", "WiFi connectivity", "App troubleshooting", "Factory resets"],
    },
    {
      icon: Speaker,
      title: "Home Theatre Installation",
      description: "Professional installation and setup of home theatre systems for optimal sound experience.",
      benefits: ["Complete setup", "Cable management", "Sound calibration", "Wall mounting"],
    },
    {
      icon: Wind,
      title: "Fan Repair",
      description: "Repair services for all types of fans including standing, table, ceiling, and rechargeable fans.",
      benefits: ["Motor repair", "Blade replacement", "Speed control fixes", "Rewiring"],
    },
    {
      icon: Cpu,
      title: "Electronics Diagnostics",
      description: "Comprehensive diagnostic services to identify issues with your electronic appliances.",
      benefits: ["Accurate diagnosis", "Detailed reports", "Repair recommendations", "Cost estimates"],
    },
    {
      icon: Settings,
      title: "General Maintenance",
      description: "Regular maintenance services to keep your electronics running smoothly and extend their lifespan.",
      benefits: ["Cleaning services", "Performance checks", "Preventive care", "Extended lifespan"],
    },
  ];

  return (
    <main className="py-12 md:py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional electronics repair, maintenance, and installation services in Ibadan
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 group"
            >
              <div className="w-14 h-14 hero-gradient rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 mb-5">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
              <a href={serviceFormLink} target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="w-full">
                  Request Service
                </Button>
              </a>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-secondary rounded-3xl p-8 md:p-12">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Submit Request", description: "Fill out our service request form with your details" },
              { step: "2", title: "Get Quote", description: "We'll contact you with a diagnosis and price estimate" },
              { step: "3", title: "Repair/Service", description: "Our engineer performs the repair or installation" },
              { step: "4", title: "Delivery", description: "Pick up your device or we deliver it to you" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4 font-display font-bold text-xl text-white">
                  {item.step}
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Fast Response Time
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need a Repair? Get Started Now
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Fill out our service request form and we'll get back to you within 24 hours with a quote
          </p>
          <a href={serviceFormLink} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="xl">
              <Wrench className="w-5 h-5" />
              Request Service Now
            </Button>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Services;
