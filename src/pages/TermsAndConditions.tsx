import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CheckCircle, AlertCircle, Shield, DollarSign, FileText, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export default function TermsAndConditions() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Floating Back Button - Sticky position */}
      <div className="fixed top-20 left-4 z-50 md:left-6">
        <Button
          variant="default"
          onClick={() => {
            const returnToBike = sessionStorage.getItem('returnToBike');
            if (returnToBike) {
              sessionStorage.setItem('openBikeModal', returnToBike);
              sessionStorage.removeItem('returnToBike');
            }
            navigate('/');
            setTimeout(() => {
              if (!returnToBike) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }, 100);
          }}
          className="gap-2 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          size="lg"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline font-semibold">Back to Home</span>
        </Button>
      </div>

      <main className="flex-1 bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.terms.title}</h1>
            <p className="text-muted-foreground text-lg">
              {t.terms.subtitle}
            </p>
          </div>

          {/* Rental Requirements */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">{t.terms.rentalRequirements}</h2>
            </div>
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p>Renters must be between 17 and 70 years old</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p>Valid driver's license from your country is required</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p>Valid ID Card or Passport must be left as deposit during rental period</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p>Full payment required upon receiving the vehicle</p>
              </div>
            </div>
          </section>

          {/* Usage Terms */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-warning/10 rounded-lg">
                <AlertCircle className="h-6 w-6 text-warning" />
              </div>
              <h2 className="text-2xl font-bold">{t.terms.usageTerms}</h2>
            </div>
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <p>Scooters must NOT be driven outside of Lombok Island</p>
              </div>
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <p>Off-road driving is strictly prohibited</p>
              </div>
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <p>Only authorized riders may operate the scooter - do not allow others who don't know how to drive it</p>
              </div>
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <p>Operating the vehicle under the influence of alcohol or drugs is strictly forbidden</p>
              </div>
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <p>All traffic signs and regulations must be strictly followed</p>
              </div>
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <p>Rental rates are calculated on a 24-hour clock basis</p>
              </div>
            </div>
          </section>

          {/* Liability & Insurance */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold">{t.terms.liability}</h2>
            </div>
            <div className="bg-card border border-destructive/20 rounded-lg p-6 space-y-4">
              <div className="bg-destructive/5 p-4 rounded-lg">
                <p className="font-semibold text-destructive mb-2">Important: Renter's Full Responsibility</p>
                <p className="text-sm">The renter is fully responsible for all parts of the scooter during the rental period.</p>
              </div>
              <div className="flex gap-3">
                <Shield className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <p>In case of accident causing damage to the scooter, renter is liable for costs between <strong>$250 - $500 USD</strong> depending on the extent of damage</p>
              </div>
              <div className="flex gap-3">
                <Shield className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <p>If the bike is lost or stolen during the rental period, the renter is fully responsible for the replacement cost</p>
              </div>
              <div className="flex gap-3">
                <Shield className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <p>Renters must consent to being photographed when receiving the fleet for documentation purposes</p>
              </div>
            </div>
          </section>

          {/* Facilities & Services */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <h2 className="text-2xl font-bold">{t.terms.facilities}</h2>
            </div>
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p><strong>Competitive Pricing:</strong> Starting from just $5 USD per day</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p><strong>Safety Equipment:</strong> Two SNI-certified helmets included with every rental</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p><strong>Weather Protection:</strong> Two clean, well-maintained raincoats provided</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p><strong>Free Delivery:</strong> Complimentary delivery to your hotel in the Senggigi area</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p><strong>Quick Booking:</strong> Fast and responsive ordering process through WhatsApp or Telegram</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p><strong>Well-Maintained Fleet:</strong> All scooters are delivered clean and in excellent condition</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p><strong>Latest Models:</strong> Our fleet consists of the newest models with regular maintenance at authorized dealers</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p><strong>Free Replacement:</strong> In the event of mechanical failure or damage to the unit (not caused by renter), we offer free-of-charge replacement</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p><strong>Transparent Pricing:</strong> No hidden costs or future additional charges</p>
              </div>
            </div>
          </section>

          {/* Pricing Information */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">{t.terms.pricing}</h2>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
              <p className="text-lg mb-4">
                Our rental rates start from just <strong className="text-2xl text-primary">$5 USD</strong> per day (24 hours).
              </p>
              <p className="text-muted-foreground">
                All pricing is transparent with no hidden fees. Payment is required in full upon receiving the vehicle.
              </p>
            </div>
          </section>

          {/* Required Documents */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">{t.terms.requiredDocs}</h2>
            </div>
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <p className="font-semibold mb-2">Please ensure you have the following documents:</p>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p>Valid driver's license from your home country</p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <p>Valid identification (ID Card or Passport) - to be left as deposit</p>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Having these documents ensures compliance with local regulations and a hassle-free rental experience.
              </p>
            </div>
          </section>

          {/* Agreement Notice */}
          <section className="mb-12">
            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">{t.terms.agreement}</h3>
              <p className="text-muted-foreground">
                By renting a scooter from Lombok Local, you acknowledge that you have read, understood, and agree to comply with all the terms and conditions stated above. Violation of these terms may result in additional charges or legal action.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center">
            <div className="bg-card border rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">{t.terms.questionsTitle}</h3>
              <p className="text-muted-foreground mb-6">
                {t.terms.questionsSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/6287865475745"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg font-semibold transition-colors"
                >
                  Contact via WhatsApp
                </a>
                <a
                  href="https://t.me/lombookadventures"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg font-semibold transition-colors"
                >
                  Contact via Telegram
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
