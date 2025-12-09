import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).send('Missing service role key')
  }

  const supabaseAdmin = createClient(
    NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
  )

  // Example: fetch up to 50 subscriptions
  const { data, error } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .limit(50)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json(data)
}
