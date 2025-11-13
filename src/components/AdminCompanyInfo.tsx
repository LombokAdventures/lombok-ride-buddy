import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CompanyInfo {
  id: string;
  key: string;
  value: string;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const AdminCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const [newInfo, setNewInfo] = useState({
    key: '',
    value: '',
    category: 'contact',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchCompanyInfo();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('company_info_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'company_info',
        },
        () => {
          fetchCompanyInfo();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('company_info')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setCompanyInfo(data || []);
    } catch (error: any) {
      console.error('Error fetching company info:', error);
      toast({
        title: 'Error',
        description: 'Failed to load company information',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newInfo.key || !newInfo.value) {
      toast({
        title: 'Error',
        description: 'Key and value are required',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase.from('company_info').insert([newInfo]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Company info added successfully',
      });

      setNewInfo({
        key: '',
        value: '',
        category: 'contact',
        display_order: 0,
        is_active: true,
      });
      setIsAddDialogOpen(false);
    } catch (error: any) {
      console.error('Error adding company info:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add company info',
        variant: 'destructive',
      });
    }
  };

  const handleUpdate = async (id: string, updates: Partial<CompanyInfo>) => {
    try {
      const { error } = await supabase
        .from('company_info')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Company info updated successfully',
      });

      setEditingId(null);
    } catch (error: any) {
      console.error('Error updating company info:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update company info',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase.from('company_info').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Company info deleted successfully',
      });
    } catch (error: any) {
      console.error('Error deleting company info:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete company info',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Company Information</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Info
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Company Information</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Key</Label>
                <Input
                  placeholder="email, whatsapp, instagram, etc."
                  value={newInfo.key}
                  onChange={(e) =>
                    setNewInfo({ ...newInfo, key: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Value</Label>
                <Input
                  placeholder="contact@example.com, +123456, etc."
                  value={newInfo.value}
                  onChange={(e) =>
                    setNewInfo({ ...newInfo, value: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={newInfo.category}
                  onValueChange={(value) =>
                    setNewInfo({ ...newInfo, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={newInfo.display_order}
                  onChange={(e) =>
                    setNewInfo({
                      ...newInfo,
                      display_order: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newInfo.is_active}
                  onCheckedChange={(checked) =>
                    setNewInfo({ ...newInfo, is_active: checked })
                  }
                />
                <Label>Active</Label>
              </div>
              <Button onClick={handleAdd} className="w-full">
                Add
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companyInfo.map((info) => (
              <TableRow key={info.id}>
                <TableCell>
                  {editingId === info.id ? (
                    <Input
                      value={info.key}
                      onChange={(e) => {
                        const updated = companyInfo.map((i) =>
                          i.id === info.id ? { ...i, key: e.target.value } : i
                        );
                        setCompanyInfo(updated);
                      }}
                    />
                  ) : (
                    info.key
                  )}
                </TableCell>
                <TableCell>
                  {editingId === info.id ? (
                    <Input
                      value={info.value}
                      onChange={(e) => {
                        const updated = companyInfo.map((i) =>
                          i.id === info.id ? { ...i, value: e.target.value } : i
                        );
                        setCompanyInfo(updated);
                      }}
                    />
                  ) : (
                    info.value
                  )}
                </TableCell>
                <TableCell>
                  {editingId === info.id ? (
                    <Select
                      value={info.category}
                      onValueChange={(value) => {
                        const updated = companyInfo.map((i) =>
                          i.id === info.id ? { ...i, category: value } : i
                        );
                        setCompanyInfo(updated);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contact">Contact</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    info.category
                  )}
                </TableCell>
                <TableCell>
                  {editingId === info.id ? (
                    <Input
                      type="number"
                      value={info.display_order}
                      onChange={(e) => {
                        const updated = companyInfo.map((i) =>
                          i.id === info.id
                            ? { ...i, display_order: parseInt(e.target.value) || 0 }
                            : i
                        );
                        setCompanyInfo(updated);
                      }}
                    />
                  ) : (
                    info.display_order
                  )}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={info.is_active}
                    onCheckedChange={(checked) =>
                      handleUpdate(info.id, { is_active: checked })
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {editingId === info.id ? (
                      <Button
                        size="sm"
                        onClick={() => {
                          const item = companyInfo.find((i) => i.id === info.id);
                          if (item) {
                            handleUpdate(info.id, {
                              key: item.key,
                              value: item.value,
                              category: item.category,
                              display_order: item.display_order,
                            });
                          }
                        }}
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => setEditingId(info.id)}>
                        Edit
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(info.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
