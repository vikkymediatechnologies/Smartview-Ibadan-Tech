import { Button } from "@/components/ui/button";
import { CreditCard, Shield, MessageCircle, AlertCircle, Copy } from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
  const whatsappNumber = "2348012345678";
  const whatsappPaymentLink = `https://wa.me/${whatsappNumber}?text=Hello%2C%20I%20have%20made%20a%20payment%20and%20would%20like%20to%20send%20the%20proof%20of%20payment.`;

  const bankDetails = {
    bankName: "First Bank of Nigeria",
    accountName: "SmartView Electronics",
    accountNumber: "1234567890",
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <main className="py-12 md:py-16">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Payment Information
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Easy and secure payment options for your purchases and services
          </p>
        </div>

        {/* Notice */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8 flex gap-4">
          <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display font-semibold text-foreground mb-2">
              Bank Transfer Only
            </h3>
            <p className="text-muted-foreground text-sm">
              We currently accept payments via bank transfer. After making payment, please send your proof of payment via WhatsApp for order confirmation.
            </p>
          </div>
        </div>

        {/* Bank Details Card */}
        <div className="bg-card rounded-2xl card-shadow overflow-hidden mb-8">
          <div className="hero-gradient p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-white">
                  Bank Account Details
                </h2>
                <p className="text-white/80 text-sm">For bank transfers</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: "Bank Name", value: bankDetails.bankName },
              { label: "Account Name", value: bankDetails.accountName },
              { label: "Account Number", value: bankDetails.accountNumber },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-display font-semibold text-lg text-foreground">
                    {item.value}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(item.value, item.label)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label={`Copy ${item.label}`}
                >
                  <Copy className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Steps */}
        <div className="bg-secondary rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
            How to Pay
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Make Transfer",
                description: "Transfer the agreed amount to the bank account details above",
              },
              {
                step: "2",
                title: "Take Screenshot",
                description: "Take a screenshot or photo of your payment receipt/confirmation",
              },
              {
                step: "3",
                title: "Send Proof",
                description: "Send the proof of payment to us via WhatsApp",
              },
              {
                step: "4",
                title: "Confirmation",
                description: "We'll confirm your payment and process your order immediately",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-10 h-10 hero-gradient rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold text-white">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="bg-card rounded-2xl p-8 card-shadow text-center">
          <div className="w-16 h-16 bg-whatsapp rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Made Your Payment?
          </h2>
          <p className="text-muted-foreground mb-6">
            Send your proof of payment via WhatsApp for quick confirmation
          </p>
          <a href={whatsappPaymentLink} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="lg">
              <MessageCircle className="w-5 h-5" />
              Send Proof of Payment
            </Button>
          </a>
        </div>

        {/* Security Note */}
        <div className="mt-8 flex items-start gap-3 text-sm text-muted-foreground">
          <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            Your payment information is safe. We only request proof of payment for order verification. Never share your bank PIN or password with anyone.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Payment;
