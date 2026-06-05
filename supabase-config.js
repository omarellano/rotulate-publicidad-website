/* Supabase Configuration — Rotúlate Publicidad */

const SUPABASE_URL = "https://wtljdvexsksextnhpkkd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0bGpkdmV4c2tzZXh0bmhwa2tkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MDg3MjUsImV4cCI6MjA5NjE4NDcyNX0.JtM9gA7JrdSkUvyUYUSNL5z1Gs5IzHAYxQ5yNsOGq2s";

if (typeof supabase === 'undefined') {
  console.error("Supabase SDK not loaded. Connection could not be established.");
} else {
  // Initialize Supabase Client globally
  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("Supabase Client initialized successfully.");
}
