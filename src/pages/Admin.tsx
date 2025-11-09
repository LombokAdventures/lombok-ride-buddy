import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, CheckCircle, XCircle, Trash2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Bike {
  id: string;
  name: string;
  model: string;
  daily_price: number;
  weekly_price: number | null;
  monthly_price: number | null;
  features: string[];
  engine: string;
  transmission: string;
  fuel_capacity: string;
  status: string;
  image: string;
}

interface Review {
  id: string;
  name: string;
  country: string;
  rating: number;
  comment: string;
  approval_status: string;
  created_at: string;
}

interface EmailEntry {
  id: string;
  email: string;
  created_at: string;
}

const Admin = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tourEmails, setTourEmails] = useState<EmailEntry[]>([]);
  const [villaEmails, setVillaEmails] = useState<EmailEntry[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('bikes');
  const { toast } = useToast();

  // Simple password protection (in production, use proper authentication)
  const ADMIN_PASSWORD = 'lombok2025';

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  const fetchAllData = async () => {
    await Promise.all([
      fetchBikes(),
      fetchReviews(),
      fetchTourEmails(),
      fetchVillaEmails()
    ]);
  };

  const fetchBikes = async () => {
    const { data, error } = await supabase
      .from('bikes')
      .select('*')
      .order('daily_price', { ascending: true });

    if (error) {
      console.error('Error fetching bikes:', error);
      toast({
        title: 'Error',
        description: 'Failed to load bikes',
        variant: 'destructive',
      });
      return;
    }

    if (data) {
      setBikes(data);
    }
  };

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return;
    }

    if (data) {
      setReviews(data);
    }
  };

  const fetchTourEmails = async () => {
    const { data, error } = await supabase
      .from('tour_emails')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tour emails:', error);
      return;
    }

    if (data) {
      setTourEmails(data);
    }
  };

  const fetchVillaEmails = async () => {
    const { data, error } = await supabase
      .from('villa_emails')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching villa emails:', error);
      return;
    }

    if (data) {
      setVillaEmails(data);
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: 'Access Granted',
        description: 'Welcome to the admin panel!',
      });
    } else {
      toast({
        title: 'Access Denied',
        description: 'Incorrect password',
        variant: 'destructive',
      });
    }
  };

  const toggleBikeStatus = async (bikeId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'available' ? 'rented' : 'available';

    const { error } = await supabase
      .from('bikes')
      .update({ status: newStatus })
      .eq('id', bikeId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update bike status',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Status Updated',
      description: 'Bike availability status has been changed globally.',
    });

    fetchBikes();
  };

  const updateBikePrice = async (bikeId: string, field: 'daily_price' | 'weekly_price' | 'monthly_price', newPrice: number) => {
    if (newPrice < 0) {
      toast({
        title: 'Invalid Price',
        description: 'Price cannot be negative',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('bikes')
      .update({ [field]: newPrice })
      .eq('id', bikeId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update price',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Price Updated',
      description: `Price updated globally to $${newPrice}`,
    });

    fetchBikes();
  };

  const updateReviewStatus = async (reviewId: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('reviews')
      .update({ approval_status: status })
      .eq('id', reviewId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update review status',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Review Updated',
      description: `Review has been ${status}`,
    });

    fetchReviews();
  };

  const deleteEmail = async (table: 'tour_emails' | 'villa_emails', emailId: string) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', emailId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete email',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Email Deleted',
      description: 'Email has been removed from the list',
    });

    if (table === 'tour_emails') {
      fetchTourEmails();
    } else {
      fetchVillaEmails();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-6 w-6" />
              Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mt-2"
                  placeholder="Enter admin password"
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Demo password: <code className="bg-muted px-2 py-1 rounded">lombok2025</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage your business - All changes are saved to the database and reflected globally</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="bikes">Bikes ({bikes.length})</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.filter(r => r.approval_status === 'pending').length} pending)</TabsTrigger>
            <TabsTrigger value="tour-emails">Tour Emails ({tourEmails.length})</TabsTrigger>
            <TabsTrigger value="villa-emails">Villa Emails ({villaEmails.length})</TabsTrigger>
          </TabsList>

          {/* Bikes Tab */}
          <TabsContent value="bikes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bike Fleet Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Update prices and availability. Changes are saved to the database and will reflect across all devices immediately.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bikes.map((bike) => (
                <Card key={bike.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{bike.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{bike.model}</p>
                      </div>
                      <Badge
                        variant={bike.status === 'available' ? 'default' : 'destructive'}
                        className={bike.status === 'available' ? 'bg-success' : 'bg-warning'}
                      >
                        {bike.status === 'available' ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Available
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 mr-1" />
                            Rented
                          </>
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Daily Price */}
                    <div className="p-3 bg-muted rounded-lg">
                      <Label htmlFor={`daily-${bike.id}`} className="text-xs font-semibold mb-2 block">
                        Daily Price (USD)
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">$</span>
                        <input
                          id={`daily-${bike.id}`}
                          type="number"
                          min="0"
                          value={bike.daily_price}
                          onChange={(e) => updateBikePrice(bike.id, 'daily_price', parseFloat(e.target.value) || 0)}
                          className="flex-1 px-2 py-1 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm font-bold"
                        />
                        <span className="text-xs text-muted-foreground">/day</span>
                      </div>
                    </div>

                    {/* Weekly Price */}
                    <div className="p-3 bg-muted rounded-lg">
                      <Label htmlFor={`weekly-${bike.id}`} className="text-xs font-semibold mb-2 block">
                        Weekly Price (USD)
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">$</span>
                        <input
                          id={`weekly-${bike.id}`}
                          type="number"
                          min="0"
                          value={bike.weekly_price || ''}
                          onChange={(e) => updateBikePrice(bike.id, 'weekly_price', parseFloat(e.target.value) || 0)}
                          placeholder="Optional"
                          className="flex-1 px-2 py-1 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm font-bold"
                        />
                        <span className="text-xs text-muted-foreground">/week</span>
                      </div>
                    </div>

                    {/* Monthly Price */}
                    <div className="p-3 bg-muted rounded-lg">
                      <Label htmlFor={`monthly-${bike.id}`} className="text-xs font-semibold mb-2 block">
                        Monthly Price (USD)
                      </Label>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">$</span>
                        <input
                          id={`monthly-${bike.id}`}
                          type="number"
                          min="0"
                          value={bike.monthly_price || ''}
                          onChange={(e) => updateBikePrice(bike.id, 'monthly_price', parseFloat(e.target.value) || 0)}
                          placeholder="Optional"
                          className="flex-1 px-2 py-1 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm font-bold"
                        />
                        <span className="text-xs text-muted-foreground">/month</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <Label htmlFor={`bike-${bike.id}`} className="text-sm font-semibold">
                        Mark as {bike.status === 'available' ? 'Rented' : 'Available'}
                      </Label>
                      <Switch
                        id={`bike-${bike.id}`}
                        checked={bike.status === 'available'}
                        onCheckedChange={() => toggleBikeStatus(bike.id, bike.status)}
                      />
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <p><strong>Engine:</strong> {bike.engine}</p>
                      <p><strong>Transmission:</strong> {bike.transmission}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Approve or reject customer reviews. Only approved reviews will be visible on the website.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    No reviews yet
                  </CardContent>
                </Card>
              ) : (
                reviews.map((review) => (
                  <Card key={review.id} className={review.approval_status === 'pending' ? 'border-primary' : ''}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg">{review.name}</h3>
                            <span className="text-sm text-muted-foreground">{review.country}</span>
                            <Badge
                              variant={
                                review.approval_status === 'approved' ? 'default' :
                                review.approval_status === 'rejected' ? 'destructive' :
                                'outline'
                              }
                              className={
                                review.approval_status === 'approved' ? 'bg-success' :
                                review.approval_status === 'rejected' ? 'bg-warning' :
                                'border-primary text-primary'
                              }
                            >
                              {review.approval_status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <p className="text-foreground mb-2">{review.comment}</p>
                          <p className="text-xs text-muted-foreground">
                            Submitted: {new Date(review.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {review.approval_status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => updateReviewStatus(review.id, 'approved')}
                            className="flex-1 bg-success hover:bg-success/90"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => updateReviewStatus(review.id, 'rejected')}
                            variant="destructive"
                            className="flex-1"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Tour Emails Tab */}
          <TabsContent value="tour-emails" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tour Inquiry Emails</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage email addresses from customers interested in tours and adventures.
                </p>
                {tourEmails.length > 0 && (
                  <div className="space-y-3">
                    {tourEmails.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{entry.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(entry.created_at).toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteEmail('tour_emails', entry.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {tourEmails.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No tour email inquiries yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Villa Emails Tab */}
          <TabsContent value="villa-emails" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Villa Inquiry Emails</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage email addresses from customers interested in villas and houses.
                </p>
                {villaEmails.length > 0 && (
                  <div className="space-y-3">
                    {villaEmails.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{entry.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(entry.created_at).toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteEmail('villa_emails', entry.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {villaEmails.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No villa email inquiries yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
