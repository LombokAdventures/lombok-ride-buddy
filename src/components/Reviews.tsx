import { useLanguage } from '@/contexts/LanguageContext';
import { ReviewsList } from './ReviewsList';
import { ReviewForm } from './ReviewForm';

export const Reviews = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.reviews.title}
          </h2>
        </div>

        <ReviewsList />
        <ReviewForm />
      </div>
    </section>
  );
};
