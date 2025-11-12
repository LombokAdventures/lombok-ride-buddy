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
    try {
      const result = await sqlToMethods.execute(supabase, sql);

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
  );
};
