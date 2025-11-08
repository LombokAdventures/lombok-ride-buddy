import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const reviews = [
  {
    name: 'Sarah Johnson',
    country: 'Australia',
    rating: 5,
    text: 'Amazing service! The scooter was in perfect condition and delivery to our hotel was super convenient. Highly recommend!'
  },
  {
    name: 'Marco Rossi',
    country: 'Italy',
    rating: 5,
    text: 'Best rental experience in Lombok. Fair prices, friendly staff, and great bikes. The PCX was perfect for exploring the island.'
  },
  {
    name: 'Anna Schmidt',
    country: 'Germany',
    rating: 5,
    text: 'Professional and reliable. They delivered the scooter on time and picked it up from our hotel. No hassle at all!'
  },
  {
    name: 'David Chen',
    country: 'Singapore',
    rating: 5,
    text: 'Rented a Vario 160 for a week. Excellent condition, great fuel efficiency. Customer service was responsive on WhatsApp.'
  },
  {
    name: 'Emma Williams',
    country: 'UK',
    rating: 5,
    text: 'So easy to book via WhatsApp! The bike was clean, helmets provided, and the price was very reasonable. Will use again!'
  },
  {
    name: 'Alexey Petrov',
    country: 'Russia',
    rating: 5,
    text: 'Отличный сервис! Скутер в идеальном состоянии, доставка в отель была очень удобной. Рекомендую!'
  }
];

export const Reviews = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.reviews.title}
          </h2>
          <div className="flex items-center justify-center gap-2 text-xl">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-6 w-6 fill-accent text-accent" />
              ))}
            </div>
            <span className="font-bold text-foreground">4.8</span>
            <span className="text-muted-foreground">{t.reviews.rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <Card key={idx} className="shadow-card hover:shadow-elegant transition-all">
              <CardContent className="p-6">
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{review.text}"</p>
                <div className="border-t border-border pt-3">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.country}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
