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
          <span className="hidden sm:inline font-semibold">{t.termsContent.backToHome}</span>
        </Button>
      </div>

      <main className="flex-1 bg-background pt-32 sm:pt-24 pb-16">
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
              {t.termsContent.rentalRequirements.map((requirement, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <p>{requirement}</p>
                </div>
              ))}
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
              {t.termsContent.usageTerms.map((term, idx) => (
                <div key={idx} className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                  <p>{term}</p>
                </div>
              ))}
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
                <p className="font-semibold text-destructive mb-2">{t.termsContent.liability.warning}</p>
                <p className="text-sm">{t.termsContent.liability.warningDesc}</p>
              </div>
              {t.termsContent.liability.items.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <Shield className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p dangerouslySetInnerHTML={{ __html: item.replace(/\$250 - \$500 USD/g, '<strong>$250 - $500 USD</strong>') }} />
                </div>
              ))}
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
              {t.termsContent.facilities.map((facility, idx) => {
                const [title, ...descParts] = facility.split(':');
                const description = descParts.join(':');
                return (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <p>
                      <strong>{title}:</strong>{description}
                    </p>
                  </div>
                );
              })}
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
              <p className="text-lg mb-4" dangerouslySetInnerHTML={{
                __html: t.termsContent.pricingInfo.replace('$5 USD', '<strong class="text-2xl text-primary">$5 USD</strong>')
              }} />
              <p className="text-muted-foreground">
                {t.termsContent.pricingNote}
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
              <p className="font-semibold mb-2">{t.termsContent.requiredDocs.intro}</p>
              {t.termsContent.requiredDocs.items.map((doc, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <p>{doc}</p>
                </div>
              ))}
              <p className="text-sm text-muted-foreground mt-4">
                {t.termsContent.requiredDocs.note}
              </p>
            </div>
          </section>

          {/* Agreement Notice */}
          <section className="mb-12">
            <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">{t.terms.agreement}</h3>
              <p className="text-muted-foreground">
                {t.termsContent.agreementText}
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
                  {t.termsContent.contactWhatsApp}
                </a>
                <a
                  href="https://t.me/lombookadventures"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0088cc] hover:bg-[#006699] text-white rounded-lg font-semibold transition-colors"
                >
                  {t.termsContent.contactTelegram}
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
