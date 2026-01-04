import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, answers, compliant, missing } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Insert lead into Supabase
    const { error } = await supabase.from("leads").insert([
      {
        email,
        answers,
        compliant,
        missing,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: "Failed to save lead" });
    }

    // Success
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
