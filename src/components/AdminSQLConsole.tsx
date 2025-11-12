import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Copy, AlertCircle, ExternalLink, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { sqlToMethods } from "@/utils/sqlExecutor";

export const AdminSQLConsole = () => {
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);
  const [customSQL, setCustomSQL] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);

  const sqlScripts = {
    updateBikes: {
      name: "Update All Bikes with Real Data",
      description: "Updates all 6 bikes with purchase dates, maintenance info, and descriptions",
      file: "UPDATE_BIKES_WITH_REAL_DATA.sql",
      query: `-- Update bikes with real data and maintenance info
-- This updates all 6 bikes with:
-- - Purchase date: October 2025
-- - Last maintenance: November 12, 2025
-- - Next maintenance: December 12, 2025
-- - Kilometers driven and descriptions

-- See UPDATE_BIKES_WITH_REAL_DATA.sql for complete script`,
    },
    viewBikes: {
      name: "View All Bikes Details",
      description: "View all bike information including new maintenance dates and descriptions",
      query: `-- View all bikes with their details
SELECT
  id,
  name,
  model,
  daily_price,
  weekly_price,
  monthly_price,
  purchase_date,
  kilometers_driven,
  last_maintenance_date,
  next_maintenance_due,
  description
FROM bikes
ORDER BY daily_price ASC;`,
    },
    checkMaintenance: {
      name: "Check Upcoming Maintenance",
      description: "View bikes with maintenance due soon",
      query: `-- Check bikes with upcoming maintenance
SELECT
  name,
  next_maintenance_due,
  CURRENT_DATE,
  (next_maintenance_due - CURRENT_DATE) as days_until_maintenance
FROM bikes
WHERE next_maintenance_due IS NOT NULL
ORDER BY next_maintenance_due ASC;`,
    },
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied! ✓",
      description: "SQL query copied to clipboard",
    });
  };

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

  const openSupabaseEditor = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const projectId = supabaseUrl?.split(".")[0].replace("https://", "");
    window.open(
      `https://app.supabase.com/project/${projectId}/sql/new`,
      "_blank"
    );
    toast({
      title: "Opening Supabase SQL Editor",
      description: "Use this to run the SQL queries directly",
    });
  };

  return (
    <div className="space-y-6">
      {/* Instructions Card */}
      <Card className="border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">
            How to Run SQL Queries
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <p className="text-blue-800 dark:text-blue-200">
              Follow these steps to update your database:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200">
              <li>
                <strong>Choose a query</strong> from the examples below
              </li>
              <li>
                <strong>Copy the SQL</strong> (click the copy button)
              </li>
              <li>
                <strong>Open Supabase SQL Editor</strong> (button below)
              </li>
              <li>
                <strong>Paste the SQL</strong> into the editor
              </li>
              <li>
                <strong>Click Run</strong> to execute
              </li>
              <li>
                <strong>Verify</strong> the results in your database
              </li>
            </ol>
          </div>

          <Button
            onClick={openSupabaseEditor}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Supabase SQL Editor
          </Button>

          <p className="text-xs text-blue-700 dark:text-blue-300 italic">
            You will be taken to Supabase.com in a new tab. Log in with your admin credentials if needed.
          </p>
        </CardContent>
      </Card>

      {/* Warning Card */}
      <Card className="border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-950/30">
        <CardContent className="pt-6 flex gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>⚠️ Important:</strong> Only run SQL queries if you understand what they do.
            Test on a backup database first if possible.
          </div>
        </CardContent>
      </Card>

      {/* Query Examples */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Available SQL Scripts</h2>

        {Object.entries(sqlScripts).map(([key, script]) => (
          <Card key={key} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{script.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {script.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted rounded-lg p-4 font-mono text-xs overflow-auto max-h-48 whitespace-pre-wrap break-words">
                {script.query}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(script.query)}
                  className="flex-1"
                  variant="default"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy SQL
                </Button>
                {script.file && (
                  <Button variant="outline" className="flex-1">
                    📄 {script.file}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* For Complex Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Complete Bike Update Scripts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            For complete bike data updates with descriptions in multiple languages, use these files:
          </p>
          <div className="space-y-2">
            <div className="border rounded-lg p-3">
              <p className="font-medium text-sm">📄 UPDATE_BIKES_WITH_REAL_DATA.sql</p>
              <p className="text-xs text-muted-foreground mt-1">
                Updates all 6 bikes with English descriptions, maintenance dates, and pricing
              </p>
            </div>
            <div className="border rounded-lg p-3">
              <p className="font-medium text-sm">📄 UPDATE_BIKES_MULTILANGUAGE.sql</p>
              <p className="text-xs text-muted-foreground mt-1">
                Same updates in 5 languages: English, Russian, Indonesian, German, Uzbek
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Find these files in your project root directory. Copy & paste them into Supabase SQL Editor.
          </p>
        </CardContent>
      </Card>

      {/* Direct Execution */}
      <Card className="border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-950/30">
        <CardHeader>
          <CardTitle className="text-purple-900 dark:text-purple-100">
            ⚡ Direct Execution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-purple-800 dark:text-purple-200">
            Paste any SQL statements (SELECT, INSERT, UPDATE, DELETE) to execute them directly. The app converts SQL to Supabase methods.
          </p>

          <Textarea
            placeholder="Paste SQL statements here...&#10;&#10;Examples:&#10;UPDATE bikes SET purchase_date = '2025-10-15', description = '...' WHERE name = 'Honda Beat';&#10;SELECT * FROM bikes;&#10;INSERT INTO bikes (name, daily_price) VALUES ('Test', 5);"
            value={customSQL}
            onChange={(e) => setCustomSQL(e.target.value)}
            className="font-mono text-xs min-h-48"
          />

          <div className="flex gap-2">
            <Button
              onClick={() => executeSQL(customSQL)}
              disabled={!customSQL.trim() || isExecuting}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              <Play className="h-4 w-4 mr-2" />
              {isExecuting ? "Executing..." : "Execute SQL"}
            </Button>

            <Button
              onClick={() => setCustomSQL("")}
              variant="outline"
              disabled={!customSQL.trim()}
            >
              Clear
            </Button>
          </div>

          <div className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
            <p>✓ Supports SELECT, INSERT, UPDATE, DELETE</p>
            <p>✓ Multiple SQL statements in one execution</p>
            <p>✓ SQL automatically converted to Supabase methods</p>
            <p>✓ No need to access Supabase dashboard</p>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
        <CardHeader>
          <CardTitle className="text-green-900 dark:text-green-100 text-base">
            💡 Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-green-800 dark:text-green-200 space-y-2">
          <p>✓ You can run multiple UPDATE statements at once</p>
          <p>✓ Run the "View All Bikes" query after updating to verify changes</p>
          <p>✓ Changes appear instantly across all devices after execution</p>
          <p>✓ Keep the original SQL files in your project for reference</p>
        </CardContent>
      </Card>
    </div>
  );
};
