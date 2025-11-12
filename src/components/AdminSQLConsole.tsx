import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sqlToMethods } from "@/utils/sqlExecutor";

export const AdminSQLConsole = () => {
  const [customSQL, setCustomSQL] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<{
    success: number;
    errors: Array<{ statement: string; error: string }>;
    statements?: Array<{ type: string; table: string; count: number }>;
  } | null>(null);

  // Copy error message to clipboard
  const copyError = (statement: string, error: string) => {
    const text = `${statement}\n${error}`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied! ✓",
      description: "Error message copied to clipboard",
    });
  };

  // Copy all errors to clipboard
  const copyAllErrors = () => {
    if (!results || results.errors.length === 0) return;
    const text = results.errors
      .map((err) => `${err.statement}\n${err.error}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied! ✓",
      description: `All ${results.errors.length} errors copied to clipboard`,
    });
  };

  // Execute SQL by converting to Supabase methods
  const executeSQL = async (sql: string) => {
    setIsExecuting(true);
    setResults(null);
    try {
      const result = await sqlToMethods.execute(supabase, sql);
      setResults(result);

      if (result.success > 0 && result.errors.length === 0) {
        setCustomSQL("");
      }
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
                {results.statements && results.statements.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {results.statements.map((stmt, idx) => (
                      <div key={idx} className="text-sm text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/20 p-2 rounded">
                        <strong>{stmt.type}</strong> on table <strong>{stmt.table}</strong>
                        {stmt.count > 0 && ` - ${stmt.count} row${stmt.count !== 1 ? "s" : ""} affected`}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {results.errors.length > 0 && (
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-red-800 dark:text-red-200 font-semibold">
                    ✗ Errors ({results.errors.length}):
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyAllErrors}
                    className="h-8 px-2 text-red-700 hover:text-red-900 dark:text-red-300 dark:hover:text-red-100"
                    title="Copy all errors"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy All
                  </Button>
                </div>
                <div className="space-y-2">
                  {results.errors.map((err, idx) => (
                    <div key={idx} className="text-sm text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/20 p-3 rounded flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <strong>{err.statement}</strong>
                        <p className="mt-1">{err.error}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyError(err.statement, err.error)}
                        className="flex-shrink-0 h-8 w-8 p-0"
                        title="Copy error"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
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
