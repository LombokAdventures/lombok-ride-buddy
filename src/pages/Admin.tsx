import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, CheckCircle, XCircle, Trash2, Star, LogOut, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

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
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('bikes');
  const [uploadingImageFor, setUploadingImageFor] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    if (session?.user) {
      await checkAdminRole(session.user.id);
    } else {
      setIsLoading(false);
    }
  };

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    setIsAdmin(!!data);
    setIsLoading(false);
    
    if (data) {
      fetchAllData();
    }
  };

  useEffect(() => {
    if (!isAdmin) return;

    // Set up realtime subscriptions
    const bikesChannel = supabase
      .channel('admin-bikes-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bikes' }, () => {
        fetchBikes();
      })
      .subscribe();

    const reviewsChannel = supabase
      .channel('admin-reviews-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, () => {
        fetchReviews();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(bikesChannel);
      supabase.removeChannel(reviewsChannel);
    };
  }, [isAdmin]);

  const fetchAllData = async () => {
    await Promise.all([
      fetchBikes(),
      fetchReviews(),
      fetchTourEmails(),
      fetchVillaEmails()
    ]);
  };

  const fetchBikes = async () => {
    console.log('Fetching bikes...');
    const { data, error } = await supabase
      .from('bikes')
      .select('*')
      .order('daily_price', { ascending: true });

    if (error) {
      console.error('Error fetching bikes:', error);
      toast({
        title: 'Error loading bikes',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    if (data) {
      console.log('Loaded bikes:', data.length, data);
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
      toast({
        title: 'Error loading reviews',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    if (data) {
      setReviews(data);
      console.log('Loaded reviews:', data.length);
    }
  };

  const fetchTourEmails = async () => {
    const { data, error } = await supabase
      .from('tour_emails')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tour emails:', error);
      toast({
        title: 'Error loading tour emails',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    if (data) {
      setTourEmails(data);
      console.log('Loaded tour emails:', data.length);
    }
  };

  const fetchVillaEmails = async () => {
    const { data, error } = await supabase
      .from('villa_emails')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching villa emails:', error);
      toast({
        title: 'Error loading villa emails',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    if (data) {
      setVillaEmails(data);
      console.log('Loaded villa emails:', data.length);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Logged In',
      description: 'Checking admin permissions...',
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully',
    });
  };

  const toggleBikeStatus = async (bikeId: string) => {
    const bike = bikes.find(b => b.id === bikeId);
    if (!bike) return;

    const newStatus = bike.status === 'available' ? 'rented' : 'available';

    const { error } = await supabase
      .from('bikes')
      .update({ status: newStatus })
      .eq('id', bikeId);

    if (error) {
      toast({
        title: 'Error',
        description: `Failed to update bike status: ${error.message}`,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Status Updated',
      description: `Bike is now ${newStatus}`,
    });
  };

  const updateBikePrice = async (bikeId: string, field: 'daily_price' | 'weekly_price' | 'monthly_price', newPrice: number | null) => {
    if (newPrice !== null && newPrice < 0) {
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
        description: `Failed to update price: ${error.message}`,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Price Updated',
      description: `Price updated to $${newPrice || 0}`,
    });
  };

  const handlePriceChange = (bikeId: string, field: 'daily_price' | 'weekly_price' | 'monthly_price', value: string) => {
    setBikes(prevBikes =>
      prevBikes.map(bike =>
        bike.id === bikeId
          ? { ...bike, [field]: value === '' ? null : parseFloat(value) }
          : bike
      )
    );
  };

  const updateReviewStatus = async (reviewId: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('reviews')
      .update({ approval_status: status })
      .eq('id', reviewId);

    if (error) {
      toast({
        title: 'Error',
        description: `Failed to update review status: ${error.message}`,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Review Updated',
      description: `Review has been ${status}`,
    });
  };

  const deleteEmail = async (table: 'tour_emails' | 'villa_emails', emailId: string) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', emailId);

    if (error) {
      toast({
        title: 'Error',
        description: `Failed to delete email: ${error.message}`,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Email Deleted',
      description: 'Email has been removed',
    });
  };

  const handleImageUpload = async (bikeId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid File',
        description: 'Please upload an image file',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Image must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setUploadingImageFor(bikeId);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${bikeId}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('bike-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('bike-images')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('bikes')
        .update({ image: publicUrl })
        .eq('id', bikeId);

      if (updateError) throw updateError;

      toast({
        title: 'Image Updated',
        description: 'Bike image has been updated successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Upload Failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploadingImageFor(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="w-full max-w-md">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user || !isAdmin) {
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
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-2"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              {!user && (
                <p className="text-sm text-muted-foreground text-center">
                  Only admin users can access this panel
                </p>
              )}
              {user && !isAdmin && (
                <p className="text-sm text-destructive text-center">
                  Your account does not have admin permissions
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your business - All changes sync globally</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
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
                    {/* Bike Image */}
                    <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                      {bike.image ? (
                        <img
                          src={bike.image}
                          alt={bike.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => fileInputRefs.current[bike.id]?.click()}
                          disabled={uploadingImageFor === bike.id}
                          className="gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          {uploadingImageFor === bike.id ? 'Uploading...' : 'Change Image'}
                        </Button>
                      </div>
                      <input
                        ref={(el) => (fileInputRefs.current[bike.id] = el)}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(bike.id, file);
                        }}
                      />
                    </div>
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
                          step="0.01"
                          value={bike.daily_price || ''}
                          onChange={(e) => handlePriceChange(bike.id, 'daily_price', e.target.value)}
                          onBlur={(e) => updateBikePrice(bike.id, 'daily_price', parseFloat(e.target.value) || 0)}
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
                          step="0.01"
                          value={bike.weekly_price || ''}
                          onChange={(e) => handlePriceChange(bike.id, 'weekly_price', e.target.value)}
                          onBlur={(e) => updateBikePrice(bike.id, 'weekly_price', e.target.value ? parseFloat(e.target.value) : null)}
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
                          step="0.01"
                          value={bike.monthly_price || ''}
                          onChange={(e) => handlePriceChange(bike.id, 'monthly_price', e.target.value)}
                          onBlur={(e) => updateBikePrice(bike.id, 'monthly_price', e.target.value ? parseFloat(e.target.value) : null)}
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
                        onCheckedChange={() => toggleBikeStatus(bike.id)}
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
                {tourEmails.length > 0 ? (
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
                ) : (
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
                {villaEmails.length > 0 ? (
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
                ) : (
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
