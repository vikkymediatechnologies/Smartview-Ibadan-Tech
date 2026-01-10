import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  const whatsappNumber = "2348012345678";
  const phoneNumber = "+234 801 234 5678";
  const email = "info@smartviewelectronics.com";
  
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20visited%20your%20website%20and%20I%27d%20like%20to%20make%20an%20inquiry.`;

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: phoneNumber,
      link: `tel:${whatsappNumber}`,
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email",
      details: email,
      link: `mailto:${email}`,
      action: "Send Email",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Ibadan, Oyo State, Nigeria",
      link: "https://maps.google.com/?q=Ibadan,Nigeria",
      action: "Get Directions",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Saturday: 8AM - 7PM",
      link: null,
      action: null,
    },
  ];

  return (
    <main className="py-12 md:py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get in touch for product inquiries, repair services, or any questions. We're here to help!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((item, index) => (
            <div key={index} className="bg-card rounded-xl p-6 card-shadow text-center">
              <div className="w-14 h-14 hero-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {item.details}
              </p>
              {item.link && (
                <a href={item.link} target={item.title === "Location" ? "_blank" : undefined} rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full">
                    {item.action}
                  </Button>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="hero-gradient rounded-3xl p-8 md:p-12 text-center text-white mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Fastest Way to Reach Us
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Chat with us directly on WhatsApp for quick responses to your inquiries
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="xl">
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </Button>
          </a>
        </div>

        {/* Map Embed */}
        <div className="bg-card rounded-3xl overflow-hidden card-shadow">
          <div className="p-6 border-b border-border">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Our Location
            </h2>
            <p className="text-muted-foreground">Find us in Ibadan, Oyo State, Nigeria</p>
          </div>
          <div className="aspect-[16/9] md:aspect-[21/9] bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46317982048!2d3.7564564!3d7.3775366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398d7c0aa1c2d3%3A0x9a8e56f0ae8f0c8e!2sIbadan%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SmartView Electronics Location"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
