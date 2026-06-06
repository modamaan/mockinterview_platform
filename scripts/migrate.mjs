/**
 * Run once: node scripts/migrate.mjs
 * - Adds emotionData column to userAnswer table
 * - Drops legacy user_progress table (game feature removed)
 */
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DRIZZLE_DB_URL);

async function migrate() {
  console.log("Running manual migration...\n");

  // 1. Add emotionData column if it doesn't exist
  try {
    await sql`ALTER TABLE "userAnswer" ADD COLUMN IF NOT EXISTS "emotionData" text`;
    console.log('✓ Added "emotionData" column to userAnswer');
  } catch (err) {
    console.error("✗ Failed to add emotionData column:", err.message);
  }

  // 2. Drop user_progress table (game feature removed)
  try {
    await sql`DROP TABLE IF EXISTS "user_progress"`;
    console.log('✓ Dropped legacy "user_progress" table');
  } catch (err) {
    console.error("✗ Failed to drop user_progress table:", err.message);
  }

  console.log("\n✅ Migration complete.");
}

migrate().catch(console.error);
