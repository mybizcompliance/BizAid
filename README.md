# MVP — Supabase + Vercel + PayFast (Sandbox)

## Setup

1. Copy `.env.local.example` to `.env.local` and fill in values.
2. Create the `subscriptions` table in Supabase (run the SQL in db/create_subscriptions.sql).
3. Add environment variables to Vercel in your project settings (same names as `.env.local`).
4. Deploy to Vercel (link your GitHub repo) — Vercel will use `next build`.

## Testing PayFast

- Use PayFast sandbox: https://sandbox.payfast.co.za
- When you POST to `/api/subscribe`, the server builds a PayFast redirect to sandbox.
- Once sandbox notifies your `/api/webhook` with `payment_status=COMPLETE`, the webhook will insert a record into Supabase.

## Notes

- Keep service role key strictly server-side ONLY (set on Vercel secrets and never expose to client).
- Use `APP_BASE_URL` as your canonical URL (Vercel URL in production).
