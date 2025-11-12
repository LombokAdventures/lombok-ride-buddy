import { SupabaseClient } from "@supabase/supabase-js";

interface ParsedSQL {
  type: "SELECT" | "INSERT" | "UPDATE" | "DELETE";
  table: string;
  data?: Record<string, any>;
  where?: Record<string, any>;
  columns?: string[];
}

/**
 * Parse any SQL statement and convert to method calls
 * Supports: SELECT, INSERT, UPDATE, DELETE
 */
export const sqlToMethods = {
  /**
   * Parse SQL UPDATE statement
   * Example: UPDATE bikes SET purchase_date = '2025-10-15', description = '...' WHERE name = 'Honda Beat'
   */
  parseUpdate(sql: string): ParsedSQL[] {
    const updateRegex =
      /UPDATE\s+(\w+)\s+SET\s+([\s\S]*?)\s+WHERE\s+([\s\S]*?)(?=UPDATE|INSERT|DELETE|SELECT|;|$)/gi;
    const results: ParsedSQL[] = [];

    let match;
    while ((match = updateRegex.exec(sql)) !== null) {
      const table = match[1];
      const setClause = match[2].trim();
      const whereClause = match[3].trim();

      const data = parseSetClause(setClause);
      const where = parseWhereClause(whereClause);

      if (Object.keys(data).length > 0 && Object.keys(where).length > 0) {
        results.push({ type: "UPDATE", table, data, where });
      }
    }
    return results;
  },

  /**
   * Parse SQL INSERT statement
   * Example: INSERT INTO bikes (name, model, daily_price) VALUES ('Honda Beat', '110cc', 5)
   */
  parseInsert(sql: string): ParsedSQL[] {
    const insertRegex =
      /INSERT\s+INTO\s+(\w+)\s*\(([\s\S]*?)\)\s*VALUES\s*\(([\s\S]*?)\)(?=;|INSERT|UPDATE|DELETE|SELECT|$)/gi;
    const results: ParsedSQL[] = [];

    let match;
    while ((match = insertRegex.exec(sql)) !== null) {
      const table = match[1];
      const columns = match[2]
        .split(",")
        .map((col) => col.trim())
        .filter(Boolean);
      const values = parseValues(match[3]);

      if (columns.length === values.length) {
        const data: Record<string, any> = {};
        columns.forEach((col, idx) => {
          data[col] = values[idx];
        });
        results.push({ type: "INSERT", table, data });
      }
    }
    return results;
  },

  /**
   * Parse SQL DELETE statement
   * Example: DELETE FROM bikes WHERE name = 'Honda Beat'
   */
  parseDelete(sql: string): ParsedSQL[] {
    const deleteRegex =
      /DELETE\s+FROM\s+(\w+)\s+WHERE\s+([\s\S]*?)(?=;|INSERT|UPDATE|DELETE|SELECT|$)/gi;
    const results: ParsedSQL[] = [];

    let match;
    while ((match = deleteRegex.exec(sql)) !== null) {
      const table = match[1];
      const where = parseWhereClause(match[2].trim());

      if (Object.keys(where).length > 0) {
        results.push({ type: "DELETE", table, where });
      }
    }
    return results;
  },

  /**
   * Parse SQL SELECT statement
   * Example: SELECT * FROM bikes WHERE name = 'Honda Beat'
   */
  parseSelect(sql: string): ParsedSQL[] {
    const selectRegex =
      /SELECT\s+([\s\S]*?)\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]*?))?(?=;|INSERT|UPDATE|DELETE|SELECT|$)/gi;
    const results: ParsedSQL[] = [];

    let match;
    while ((match = selectRegex.exec(sql)) !== null) {
      const columns = match[1]
        .split(",")
        .map((col) => col.trim())
        .filter(Boolean);
      const table = match[2];
      const where = match[3] ? parseWhereClause(match[3].trim()) : undefined;

      results.push({
        type: "SELECT",
        table,
        columns: columns[0] === "*" ? undefined : columns,
        where,
      });
    }
    return results;
  },

  /**
   * Execute parsed SQL as Supabase methods
   */
  async execute(
    supabase: SupabaseClient,
    sql: string
  ): Promise<{
    success: number;
    errors: Array<{ statement: string; error: string }>;
    statements?: Array<{ type: string; table: string; count: number }>;
  }> {
    let success = 0;
    const errors: Array<{ statement: string; error: string }> = [];
    const statements: Array<{ type: string; table: string; count: number }> = [];

    // Determine SQL type and parse accordingly
    const sqlUpper = sql.toUpperCase();

    if (sqlUpper.includes("UPDATE")) {
      const updates = this.parseUpdate(sql);
      for (const update of updates) {
        try {
          let query = supabase.from(update.table).update(update.data!);

          // Apply WHERE conditions
          for (const [field, value] of Object.entries(update.where!)) {
            query = query.eq(field, value);
          }

          const { data, error, count } = await query.select();

          if (error) {
            errors.push({
              statement: `UPDATE ${update.table} WHERE ${Object.entries(update.where!).map(([k, v]) => `${k}=${v}`).join(" AND ")}`,
              error: error.message,
            });
          } else {
            success++;
            statements.push({ type: "UPDATE", table: update.table, count: count || 0 });
          }
        } catch (err) {
          errors.push({
            statement: `UPDATE ${update.table}`,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }
    } else if (sqlUpper.includes("INSERT")) {
      const inserts = this.parseInsert(sql);
      for (const insert of inserts) {
        try {
          const { data, error, count } = await supabase
            .from(insert.table)
            .insert([insert.data!])
            .select();

          if (error) {
            errors.push({
              statement: `INSERT INTO ${insert.table}`,
              error: error.message,
            });
          } else {
            success++;
            statements.push({ type: "INSERT", table: insert.table, count: count || 1 });
          }
        } catch (err) {
          errors.push({
            statement: `INSERT INTO ${insert.table}`,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }
    } else if (sqlUpper.includes("DELETE")) {
      const deletes = this.parseDelete(sql);
      for (const del of deletes) {
        try {
          let query = supabase.from(del.table).delete();

          // Apply WHERE conditions
          for (const [field, value] of Object.entries(del.where!)) {
            query = query.eq(field, value);
          }

          const { error, count } = await query;

          if (error) {
            errors.push({
              statement: `DELETE FROM ${del.table}`,
              error: error.message,
            });
          } else {
            success++;
            statements.push({ type: "DELETE", table: del.table, count: count || 0 });
          }
        } catch (err) {
          errors.push({
            statement: `DELETE FROM ${del.table}`,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }
    } else if (sqlUpper.includes("SELECT")) {
      const selects = this.parseSelect(sql);
      for (const select of selects) {
        try {
          let query = supabase.from(select.table).select("*");

          // Apply WHERE conditions if any
          if (select.where) {
            for (const [field, value] of Object.entries(select.where)) {
              query = query.eq(field, value);
            }
          }

          const { data, error, count } = await query;

          if (error) {
            errors.push({
              statement: `SELECT FROM ${select.table}`,
              error: error.message,
            });
          } else {
            success++;
            statements.push({ type: "SELECT", table: select.table, count: data?.length || 0 });
          }
        } catch (err) {
          errors.push({
            statement: `SELECT FROM ${select.table}`,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }
    }

    return { success, errors, statements };
  },
};

/**
 * Helper: Parse SET clause (for UPDATE statements)
 * Example: "field1 = 'value1', field2 = 123"
 */
function parseSetClause(setClause: string): Record<string, any> {
  const result: Record<string, any> = {};

  // Split by comma but respect quoted strings (including JSON arrays)
  const pairs = smartSplit(setClause, ",");

  for (const pair of pairs) {
    const [key, ...valueParts] = pair.split("=");
    const keyTrimmed = key.trim();
    const valueTrimmed = valueParts.join("=").trim();

    if (keyTrimmed && valueTrimmed) {
      result[keyTrimmed] = cleanValue(valueTrimmed);
    }
  }

  return result;
}

/**
 * Smart split that respects quoted strings and JSON structures
 */
function smartSplit(str: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  let quoteChar = "";
  let bracketDepth = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    // Track quote state
    if ((char === "'" || char === '"') && (i === 0 || str[i - 1] !== "\\")) {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inQuotes = false;
      }
    }

    // Track bracket depth for JSON arrays/objects
    if (!inQuotes && char === "[") bracketDepth++;
    if (!inQuotes && char === "]") bracketDepth--;

    // Check for delimiter
    if (!inQuotes && bracketDepth === 0 && char === delimiter) {
      if (current.trim()) {
        result.push(current.trim());
      }
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    result.push(current.trim());
  }

  return result;
}

/**
 * Helper: Parse WHERE clause
 * Example: "name = 'Honda Beat'" or "id = 'honda-beat'"
 */
function parseWhereClause(whereClause: string): Record<string, any> {
  const result: Record<string, any> = {};

  // Handle OR conditions
  const orConditions = whereClause.split(/\s+OR\s+/i);

  for (const condition of orConditions) {
    const andConditions = condition.split(/\s+AND\s+/i);

    for (const andCondition of andConditions) {
      const match = andCondition.match(/(\w+)\s*=\s*(.+)/);
      if (match) {
        const field = match[1].trim();
        const value = cleanValue(match[2].trim());
        result[field] = value;
      }
    }
  }

  return result;
}

/**
 * Helper: Parse VALUES from INSERT statement
 * Example: "'value1', 123, 'value3'"
 */
function parseValues(valuesString: string): any[] {
  const values: any[] = [];
  const parts = smartSplit(valuesString, ",");

  for (const part of parts) {
    values.push(cleanValue(part.trim()));
  }

  return values;
}

/**
 * Helper: Clean SQL values
 * - Remove quotes from strings
 * - Parse numbers
 * - Unescape single quotes
 */
function cleanValue(value: string): any {
  let cleanedValue: any = value.trim();

  // Remove surrounding quotes (single or double)
  if ((cleanedValue.startsWith("'") && cleanedValue.endsWith("'")) ||
      (cleanedValue.startsWith('"') && cleanedValue.endsWith('"'))) {
    cleanedValue = cleanedValue.slice(1, -1);
    // Unescape single quotes
    cleanedValue = cleanedValue.replace(/''/g, "'");
  }

  // Try to parse as JSON (array or object)
  if ((cleanedValue.startsWith('[') && cleanedValue.endsWith(']')) ||
      (cleanedValue.startsWith('{') && cleanedValue.endsWith('}'))) {
    try {
      return JSON.parse(cleanedValue);
    } catch (e) {
      // If JSON parsing fails, continue as string
    }
  }

  // Try to parse as number
  if (!isNaN(Number(cleanedValue)) && cleanedValue !== "") {
    return Number(cleanedValue);
  }

  // Handle NULL
  if (cleanedValue.toUpperCase() === "NULL") {
    return null;
  }

  return cleanedValue;
}
