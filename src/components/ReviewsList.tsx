import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  country: string;
  rating: number;
  comment: string;
}

export const ReviewsList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('approval_status', 'approved')
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Error fetching reviews:', error);
      return;
    }

    if (data) {
      setReviews(data);
    }
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-card p-6 rounded-lg shadow-card border border-border"
        >
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < review.rating
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <p className="text-muted-foreground mb-4 italic">"{review.comment}"</p>
          <div className="border-t border-border pt-3">
            <p className="font-semibold text-foreground">{review.name}</p>
            <p className="text-sm text-muted-foreground">{review.country}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
