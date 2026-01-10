import { Button } from "@/components/ui/button";
import { Award, Users, Clock, Shield, MessageCircle } from "lucide-react";

const About = () => {
  const whatsappNumber = "2348012345678";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20visited%20your%20website%20and%20I%27d%20like%20to%20know%20more%20about%20your%20services.`;

  return (
    <main className="py-12 md:py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            About SmartView Electronics
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your trusted partner for quality electronics and professional repair services in Ibadan, Nigeria
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              Established in Ibadan
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Professional Electronics Engineer at Your Service
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                SmartView Electronics is a leading electronics business based in Ibadan, Oyo State, Nigeria. We specialize in the sales of quality electronic appliances including LED TVs, Smart TVs, Home Theatre Systems, Fans, and other household electronics.
              </p>
              <p>
                Beyond sales, we offer professional repair, maintenance, and installation services. Our certified electronics engineer has years of experience diagnosing and fixing all types of electronic issues, from simple screen problems to complex circuit board repairs.
              </p>
              <p>
                We pride ourselves on delivering honest, reliable, and affordable services to homeowners, office owners, and retail customers across Ibadan. When you choose SmartView Electronics, you're choosing quality, expertise, and trust.
              </p>
            </div>
            <div className="mt-8">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg">
                  <MessageCircle className="w-5 h-5" />
                  Chat With Us
                </Button>
              </a>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "5+", label: "Years Experience" },
                { number: "500+", label: "Happy Customers" },
                { number: "1000+", label: "Repairs Completed" },
                { number: "100%", label: "Satisfaction" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="font-display text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-secondary rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-10">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Trust & Integrity",
                description: "We operate with complete transparency and honesty in all our dealings",
              },
              {
                icon: Award,
                title: "Quality Service",
                description: "We never compromise on the quality of products or services we offer",
              },
              {
                icon: Clock,
                title: "Reliability",
                description: "We deliver on our promises with fast turnaround and dependable service",
              },
              {
                icon: Users,
                title: "Customer First",
                description: "Your satisfaction is our priority. We go the extra mile for our customers",
              },
            ].map((value, index) => (
              <div key={index} className="bg-card rounded-xl p-6 card-shadow">
                <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            Why Customers Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              "Certified Electronics Engineer",
              "Affordable Pricing",
              "Fast Response Time",
              "Quality Products",
              "Warranty on Repairs",
              "Local & Trusted",
            ].map((reason, index) => (
              <div key={index} className="flex items-center gap-3 bg-card rounded-lg p-4 card-shadow">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-foreground">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
