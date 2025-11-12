import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { sqlToMethods } from "@/utils/sqlExecutor";

export const AdminSQLConsole = () => {
  const [customSQL, setCustomSQL] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<{
    success: number;
    errors: Array<{ statement: string; error: string }>;
  } | null>(null);

  // Execute SQL by converting to Supabase methods
  const executeSQL = async (sql: string) => {
    if (!sql.trim()) {
      toast({
        title: "Error",
        description: "Please paste SQL statements",
        variant: "destructive",
      });
      return;
    }

    setIsExecuting(true);
    setResults(null);
    try {
      const result = await sqlToMethods.execute(supabase, sql);
      setResults(result);

      if (result.success > 0) {
        toast({
          title: "Success! ✓",
          description: `Executed ${result.success} operation${result.success !== 1 ? "s" : ""} successfully`,
        });
      }

      if (result.errors.length > 0) {
        const errorMessages = result.errors
          .map((e) => `${e.statement}: ${e.error}`)
          .slice(0, 3);
        toast({
          title: `${result.errors.length} Error${result.errors.length !== 1 ? "s" : ""}`,
          description:
            errorMessages.join("; ") +
            (result.errors.length > 3 ? "..." : ""),
          variant: "destructive",
        });
      }

      if (result.success > 0 && result.errors.length === 0) {
        setCustomSQL("");
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: "Execution Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>SQL Console</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste SQL statements here..."
            value={customSQL}
            onChange={(e) => setCustomSQL(e.target.value)}
            className="font-mono text-sm min-h-64"
          />

          <div className="flex gap-2">
            <Button
              onClick={() => executeSQL(customSQL)}
              disabled={!customSQL.trim() || isExecuting}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              <Play className="h-4 w-4 mr-2" />
              {isExecuting ? "Executing..." : "Execute"}
            </Button>

            <Button
              onClick={() => setCustomSQL("")}
              variant="outline"
              disabled={!customSQL.trim()}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.success > 0 && (
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-4">
                <p className="text-green-800 dark:text-green-200 font-semibold">
                  ✓ Success: {results.success} operation{results.success !== 1 ? "s" : ""} executed successfully
                </p>
              </div>
            )}

            {results.errors.length > 0 && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200 font-semibold mb-2">
                  ✗ Errors ({results.errors.length}):
                </p>
                <div className="space-y-2">
                  {results.errors.map((err, idx) => (
                    <div key={idx} className="text-sm text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/20 p-2 rounded">
                      <strong>{err.statement}</strong>
                      <p>{err.error}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.success === 0 && results.errors.length === 0 && (
              <div className="bg-gray-50 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-900 rounded-lg p-4">
                <p className="text-gray-800 dark:text-gray-200">
                  No operations executed
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
