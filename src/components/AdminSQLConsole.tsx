import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Copy, Play, AlertCircle } from "lucide-react";

export const AdminSQLConsole = () => {
  const [sqlQuery, setSqlQuery] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    message?: string;
    data?: unknown;
    rowsAffected?: number;
  } | null>(null);

  const exampleQueries = {
    updateBikes: `-- Update bikes with purchase dates and maintenance info
UPDATE bikes
SET
  purchase_date = '2025-10-15',
  kilometers_driven = 2450,
  last_maintenance_date = '2025-11-12',
  next_maintenance_due = '2025-12-12',
  description = 'Your bike description here'
WHERE name = 'Honda Beat';`,
    viewBikes: `-- View all bikes with their details
SELECT id, name, model, daily_price, purchase_date,
       last_maintenance_date, next_maintenance_due, description
FROM bikes
ORDER BY daily_price ASC;`,
  };

  const executeSQLQuery = async () => {
    if (!sqlQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter an SQL query",
        variant: "destructive",
      });
      return;
    }

    setIsExecuting(true);
    setResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/execute_sql`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({ sql: sqlQuery }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResult({
          success: true,
          message: "Query executed successfully",
          data: data,
        });
        toast({
          title: "Success",
          description: "SQL query executed successfully",
        });
      } else {
        const error = await response.json();
        setResult({
          success: false,
          message: error.message || "Failed to execute query",
        });
        toast({
          title: "Error",
          description: error.message || "Failed to execute SQL query",
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setResult({
        success: false,
        message: errorMsg,
      });
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "SQL query copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SQL Console</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Warning:</strong> Only use this for authorized database updates. Test queries on a backup first.
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">SQL Query</label>
            <Textarea
              placeholder="Enter your SQL query here..."
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="font-mono h-48"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={executeSQLQuery}
              disabled={isExecuting || !sqlQuery.trim()}
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              Execute Query
            </Button>
            <Button
              variant="outline"
              onClick={() => setSqlQuery("")}
              disabled={isExecuting}
            >
              Clear
            </Button>
          </div>

          {result && (
            <div
              className={`p-4 rounded-lg border ${
                result.success
                  ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900"
                  : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  result.success
                    ? "text-green-800 dark:text-green-200"
                    : "text-red-800 dark:text-red-200"
                }`}
              >
                {result.message}
              </p>
              {result.data && (
                <pre className="mt-2 text-xs bg-black/50 text-white p-2 rounded overflow-auto max-h-48">
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Example Queries</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(exampleQueries).map(([key, query]) => (
            <div key={key} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(query)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-32">
                {query}
              </pre>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
