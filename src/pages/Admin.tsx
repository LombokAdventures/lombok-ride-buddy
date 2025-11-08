import { useState } from 'react';
import { bikes as initialBikes, Bike } from '@/data/bikes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Lock, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [bikes, setBikes] = useState<Bike[]>(initialBikes);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  // Simple password protection (in production, use proper authentication)
  const ADMIN_PASSWORD = 'lombok2025';

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

  const toggleBikeStatus = (bikeId: string) => {
    setBikes((prevBikes) =>
      prevBikes.map((bike) =>
        bike.id === bikeId
          ? { ...bike, status: bike.status === 'available' ? 'rented' : 'available' }
          : bike
      )
    );
    
    toast({
      title: 'Status Updated',
      description: 'Bike availability status has been changed.',
    });
  };

  const updateBikePrice = (bikeId: string, newPrice: number) => {
    if (newPrice <= 0) {
      toast({
        title: 'Invalid Price',
        description: 'Price must be greater than 0',
        variant: 'destructive',
      });
      return;
    }

    setBikes((prevBikes) =>
      prevBikes.map((bike) =>
        bike.id === bikeId ? { ...bike, dailyPrice: newPrice } : bike
      )
    );
    
    toast({
      title: 'Price Updated',
      description: `Daily price updated to $${newPrice}`,
    });
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
          <p className="text-muted-foreground">Manage bike availability status</p>
        </div>

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
              <CardContent>
                <div className="mb-4 p-4 bg-muted rounded-lg">
                  <Label htmlFor={`price-${bike.id}`} className="text-sm font-semibold mb-2 block">
                    Daily Price (USD)
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">$</span>
                    <input
                      id={`price-${bike.id}`}
                      type="number"
                      min="1"
                      value={bike.dailyPrice}
                      onChange={(e) => updateBikePrice(bike.id, parseInt(e.target.value) || 0)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg font-bold"
                    />
                    <span className="text-sm text-muted-foreground">/day</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg mb-4">
                  <Label htmlFor={`bike-${bike.id}`} className="font-semibold">
                    Mark as {bike.status === 'available' ? 'Rented' : 'Available'}
                  </Label>
                  <Switch
                    id={`bike-${bike.id}`}
                    checked={bike.status === 'available'}
                    onCheckedChange={() => toggleBikeStatus(bike.id)}
                  />
                </div>

                <div className="text-sm text-muted-foreground">
                  <p><strong>Engine:</strong> {bike.specs.engine}</p>
                  <p><strong>Transmission:</strong> {bike.specs.transmission}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3>How to Update Bike Status & Prices</h3>
            <ol>
              <li><strong>Change Price:</strong> Simply type a new number in the price input field - changes are instant!</li>
              <li><strong>Toggle Availability:</strong> Use the switch to change status between "Available" and "Rented"</li>
              <li>Green badge = Available for rent</li>
              <li>Red badge = Currently rented</li>
              <li>All changes are instant and will reflect on the main website</li>
            </ol>
            
            <h3>Code-Based Editing (Alternative Method)</h3>
            <p>You can also edit bike prices and status directly in the code:</p>
            <ol>
              <li>Open <code>src/data/bikes.ts</code></li>
              <li>Find the bike you want to update</li>
              <li>Change the <code>dailyPrice</code> field to set a new price</li>
              <li>Change the <code>status</code> field to either <code>'available'</code> or <code>'rented'</code></li>
              <li>Save the file - changes will appear automatically</li>
            </ol>

            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold mb-2">Example:</p>
              <pre className="text-xs overflow-x-auto">
{`{
  id: 'honda-pcx',
  name: 'Honda PCX 160',
  dailyPrice: 12, // Change price here
  status: 'available', // Change to 'rented'
  ...
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
