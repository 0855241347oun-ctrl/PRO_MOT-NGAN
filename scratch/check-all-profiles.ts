
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllProfiles() {
  const { data, error } = await supabase.from("profiles").select("id, full_name, username, email, role");
  if (error) {
    console.error("Error fetching profiles:", error);
  } else {
    console.log("All Profiles:");
    console.table(data);
  }
}

checkAllProfiles();
