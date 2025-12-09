create table if not exists public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id text,
  m_payment_id text unique,
  amount numeric,
  payment_status text,
  raw jsonb,
  created_at timestamptz default now()
);
