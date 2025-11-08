import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

const faqs = [
  {
    question: 'Do I need an international driving license?',
    answer: 'Yes, an international driving permit (IDP) is required to legally rent and ride a motorbike in Indonesia. Make sure to bring both your IDP and your home country license.'
  },
  {
    question: 'What is included in the rental price?',
    answer: 'All rentals include a helmet, lock, basic insurance, and free delivery within the main tourist areas of Lombok. Fuel is not included.'
  },
  {
    question: 'How do I book a scooter?',
    answer: 'Simply contact us via WhatsApp or Telegram, tell us which bike you want and for how long. We\'ll confirm availability and arrange delivery to your location.'
  },
  {
    question: 'Is there a deposit required?',
    answer: 'We require a small security deposit which is fully refundable when you return the scooter in good condition. Payment can be made in cash (IDR/USD) or via bank transfer.'
  },
  {
    question: 'Do you provide helmets?',
    answer: 'Yes! Every rental includes a free helmet. We sanitize all helmets between rentals for your safety.'
  },
  {
    question: 'Can you deliver to my hotel?',
    answer: 'Absolutely! We offer free delivery to most hotels and accommodations in Lombok. Just let us know your location when booking.'
  },
  {
    question: 'What if the scooter breaks down?',
    answer: 'We provide 24/7 support. If you have any mechanical issues, contact us immediately via WhatsApp and we\'ll arrange a replacement or repair as quickly as possible.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We offer flexible cancellations. If you cancel at least 24 hours before your rental start time, you\'ll receive a full refund of any deposit paid.'
  },
  {
    question: 'Is insurance included?',
    answer: 'Basic third-party insurance is included. We strongly recommend purchasing additional travel insurance that covers motorbike rental for complete peace of mind.'
  },
  {
    question: 'What happens if the scooter is damaged?',
    answer: 'Minor wear and tear is expected. For significant damage, you\'ll be responsible for repair costs up to the deposit amount. This is why we recommend comprehensive travel insurance.'
  },
  {
    question: 'Can I extend my rental period?',
    answer: 'Yes! Just contact us via WhatsApp before your rental ends. If the bike is available, we can easily extend your rental period.'
  },
  {
    question: 'Do you offer weekly or monthly rates?',
    answer: 'Yes, we offer discounted rates for weekly and monthly rentals. Contact us for special long-term pricing.'
  },
  {
    question: 'What are your business hours?',
    answer: 'We\'re available 24/7 via WhatsApp and Telegram for bookings and support. Our office hours are 8 AM - 8 PM daily.'
  },
  {
    question: 'Are the scooters automatic or manual?',
    answer: 'All our scooters are automatic transmission, making them easy to ride even for beginners. No clutch or gear shifting required!'
  },
  {
    question: 'What is the minimum rental period?',
    answer: 'The minimum rental period is 1 day (24 hours). We offer discounts for rentals of 3 days or more.'
  }
];

export const FAQ = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.faq.title}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`}
                className="bg-card border border-border rounded-lg px-6 shadow-card"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
