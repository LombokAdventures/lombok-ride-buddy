import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Phone, Send, Mail, MessageSquare, Check, X, Eye, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface WaitlistRequest {
  id: string;
  item_type: string;
  item_id: string;
  customer_name: string;
  whatsapp: string | null;
  telegram: string | null;
  email: string | null;
  preferred_contact_method: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

export const AdminWaitlist = () => {
  const [requests, setRequests] = useState<WaitlistRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<WaitlistRequest[]>([]);
  const [itemTypeFilter, setItemTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] = useState<WaitlistRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchWaitlistRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, itemTypeFilter, statusFilter]);

  const fetchWaitlistRequests = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("waitlist_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data);
    } else if (error) {
      console.error("Error fetching waitlist:", error);
      toast({
        title: "Error",
        description: "Failed to load waitlist requests",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const filterRequests = () => {
    let filtered = [...requests];

    if (itemTypeFilter !== "all") {
      filtered = filtered.filter((req) => req.item_type === itemTypeFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    setFilteredRequests(filtered);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("waitlist_requests")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Request marked as ${newStatus}`,
      });
      fetchWaitlistRequests();
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return;

    const { error } = await supabase
      .from("waitlist_requests")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete request",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Request deleted",
      });
      fetchWaitlistRequests();
    }
  };

  const exportToCSV = () => {
    const headers = ["Date", "Item Type", "Item ID", "Customer Name", "WhatsApp", "Telegram", "Email", "Preferred Method", "Status", "Message"];
    const rows = filteredRequests.map((req) => [
      new Date(req.created_at).toLocaleDateString(),
      req.item_type,
      req.item_id,
      req.customer_name,
      req.whatsapp || "",
      req.telegram || "",
      req.email || "",
      req.preferred_contact_method || "",
      req.status,
      req.message || "",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Waitlist Requests</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage customer notification requests
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {pendingCount} Pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <Select value={itemTypeFilter} onValueChange={setItemTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Item Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="bike">Bikes</SelectItem>
                <SelectItem value="tour">Tours</SelectItem>
                <SelectItem value="house">Houses</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={fetchWaitlistRequests} disabled={isLoading}>
              Refresh
            </Button>

            <Button variant="outline" onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium">Date</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Customer</th>
                    <th className="text-left p-3 font-medium">Contact</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-muted-foreground">
                        No waitlist requests found
                      </td>
                    </tr>
                  ) : (
                    filteredRequests.map((request) => (
                      <tr key={request.id} className="border-t hover:bg-muted/30">
                        <td className="p-3 text-sm">
                          {new Date(request.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="capitalize">
                            {request.item_type}
                          </Badge>
                        </td>
                        <td className="p-3 font-medium">{request.customer_name}</td>
                        <td className="p-3">
                          <div className="flex flex-col gap-2">
                            {request.preferred_contact_method && (
                              <Badge className="w-fit capitalize">
                                {request.preferred_contact_method === 'whatsapp' && (
                                  <>
                                    <Phone className="h-3 w-3 mr-1" />
                                    {request.preferred_contact_method}
                                  </>
                                )}
                                {request.preferred_contact_method === 'telegram' && (
                                  <>
                                    <Send className="h-3 w-3 mr-1" />
                                    {request.preferred_contact_method}
                                  </>
                                )}
                                {request.preferred_contact_method === 'email' && (
                                  <>
                                    <Mail className="h-3 w-3 mr-1" />
                                    {request.preferred_contact_method}
                                  </>
                                )}
                              </Badge>
                            )}
                            <div className="flex flex-col gap-1 text-sm">
                              {request.whatsapp && (
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" /> {request.whatsapp}
                                </span>
                              )}
                              {request.telegram && (
                                <span className="flex items-center gap-1">
                                  <Send className="h-3 w-3" /> {request.telegram}
                                </span>
                              )}
                              {request.email && (
                                <span className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" /> {request.email}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge
                            variant={
                              request.status === "pending"
                                ? "default"
                                : request.status === "contacted"
                                ? "secondary"
                                : "outline"
                            }
                            className="capitalize"
                          >
                            {request.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            {request.message && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setSelectedMessage(request)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                            {request.status === "pending" && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => updateStatus(request.id, "contacted")}
                              >
                                <Check className="h-4 w-4 text-green-600" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteRequest(request.id)}
                            >
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Message Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customer Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">From:</p>
              <p className="font-medium">{selectedMessage?.customer_name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Message:</p>
              <p className="whitespace-pre-wrap">{selectedMessage?.message}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
