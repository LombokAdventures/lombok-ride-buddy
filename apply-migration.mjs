import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read environment variables
const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL;
const supabaseKey = envVars.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

console.log('🔧 Connecting to Supabase...');
const supabase = createClient(supabaseUrl, supabaseKey);

// Read the migration file
const migrationPath = path.join(__dirname, 'supabase', 'migrations', '20251109120000_add_admin_policies.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

console.log('📝 Applying migration...\n');

// Split SQL into individual statements
const statements = migrationSQL
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

async function applyMigration() {
  try {
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      if (!stmt) continue;

      console.log(`Executing statement ${i + 1}/${statements.length}...`);

      const { error } = await supabase.rpc('exec_sql', { sql: stmt });

      if (error) {
        // Try direct approach - create policies via REST API won't work
        // We need to use the SQL editor or supabase-js doesn't support raw SQL execution
        console.log(`⚠️  Statement ${i + 1} failed (this is expected with anon key)`);
        console.log(`   Error: ${error.message}`);
      } else {
        console.log(`✅ Statement ${i + 1} executed successfully`);
      }
    }

    console.log('\n⚠️  IMPORTANT: The anon key cannot execute DDL statements.');
    console.log('You need to apply the migration manually via Supabase Dashboard.\n');
    console.log('Quick steps:');
    console.log('1. Go to: https://supabase.com/dashboard/project/mbbdaettoxezvftsfiff/sql');
    console.log('2. Copy/paste the SQL from: supabase/migrations/20251109120000_add_admin_policies.sql');
    console.log('3. Click RUN\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📋 You need to apply the migration manually.');
    console.log('See docs/APPLY_MIGRATION_NOW.md for instructions.');
    process.exit(1);
  }
}

applyMigration();
