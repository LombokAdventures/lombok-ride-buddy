import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

// Read environment variables
const envContent = fs.readFileSync('.env', 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const supabase = createClient(
  envVars.VITE_SUPABASE_URL,
  envVars.VITE_SUPABASE_PUBLISHABLE_KEY
);

console.log('🔍 Checking database migration status...\n');

async function checkMigration() {
  try {
    // Test 1: Try to update a bike (will fail if UPDATE policy doesn't exist)
    console.log('Test 1: Checking if bikes can be updated...');
    const { error: bikeError } = await supabase
      .from('bikes')
      .update({ daily_price: 5 })
      .eq('id', 'honda-beat');

    if (bikeError) {
      console.log('❌ FAILED - Bikes UPDATE policy missing');
      console.log(`   Error: ${bikeError.message}\n`);
    } else {
      console.log('✅ PASSED - Bikes can be updated\n');
    }

    // Test 2: Try to view all reviews
    console.log('Test 2: Checking if all reviews are visible...');
    const { data: reviews, error: reviewError } = await supabase
      .from('reviews')
      .select('*');

    if (reviewError) {
      console.log('❌ FAILED - Reviews SELECT policy missing');
      console.log(`   Error: ${reviewError.message}\n`);
    } else {
      console.log(`✅ PASSED - Can view all reviews (found ${reviews?.length || 0} reviews)\n`);
    }

    // Test 3: Try to view tour emails
    console.log('Test 3: Checking if tour emails are visible...');
    const { data: tourEmails, error: tourError } = await supabase
      .from('tour_emails')
      .select('*');

    if (tourError) {
      console.log('❌ FAILED - Tour emails SELECT policy missing');
      console.log(`   Error: ${tourError.message}\n`);
    } else {
      console.log(`✅ PASSED - Can view tour emails (found ${tourEmails?.length || 0} emails)\n`);
    }

    // Test 4: Try to view villa emails
    console.log('Test 4: Checking if villa emails are visible...');
    const { data: villaEmails, error: villaError } = await supabase
      .from('villa_emails')
      .select('*');

    if (villaError) {
      console.log('❌ FAILED - Villa emails SELECT policy missing');
      console.log(`   Error: ${villaError.message}\n`);
    } else {
      console.log(`✅ PASSED - Can view villa emails (found ${villaEmails?.length || 0} emails)\n`);
    }

    // Summary
    const allPassed = !bikeError && !reviewError && !tourError && !villaError;

    console.log('═'.repeat(60));
    if (allPassed) {
      console.log('✅ ALL TESTS PASSED! Migration has been applied.');
      console.log('Your admin panel should work perfectly now!');
    } else {
      console.log('❌ MIGRATION NOT APPLIED YET!');
      console.log('\n📋 To fix this:');
      console.log('1. Open apply-migration.html in your browser');
      console.log('2. Follow the 3 simple steps');
      console.log('3. Run this script again to verify');
      console.log('\nOR manually:');
      console.log('Go to: https://supabase.com/dashboard/project/mbbdaettoxezvftsfiff/sql');
      console.log('Paste SQL from: supabase/migrations/20251109120000_add_admin_policies.sql');
      console.log('Click RUN');
    }
    console.log('═'.repeat(60));

  } catch (error) {
    console.error('❌ Error running tests:', error.message);
  }
}

checkMigration();
