import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Fleet } from '@/components/Fleet';
import { Benefits } from '@/components/Benefits';
import { HowItWorks } from '@/components/HowItWorks';
import { Reviews } from '@/components/Reviews';
import { ComingSoon } from '@/components/ComingSoon';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { FloatingContact } from '@/components/FloatingContact';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <Fleet />
        <Benefits />
        <HowItWorks />
        <Reviews />
        <div id="coming-soon">
          <ComingSoon />
        </div>
        <FAQ />
        <div id="footer">
          <Footer />
        </div>
      </main>
      <FloatingContact />
    </div>
  );
};

export default Index;
