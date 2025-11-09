import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';

export const ReviewForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !country.trim() || !comment.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            name: name.trim(),
            country: country.trim(),
            rating,
            comment: comment.trim(),
            approval_status: 'pending'
          }
        ]);

      if (error) throw error;

      toast({
        title: t.reviews.thankYou,
        description: t.reviews.pendingApproval,
      });

      // Reset form
      setName('');
      setCountry('');
      setRating(5);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6 border border-border">
      <h3 className="text-2xl font-bold text-foreground mb-4">{t.reviews.submitTitle}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder={t.reviews.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder={t.reviews.countryPlaceholder}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-colors"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= rating
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <Textarea
          placeholder={t.reviews.commentPlaceholder}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows={4}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : t.reviews.submitButton}
        </Button>
      </form>
    </div>
  );
};
