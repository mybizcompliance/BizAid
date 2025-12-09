import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(res => {
      if (res?.data?.session?.user) setUser(res.data.session.user)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener?.subscription?.unsubscribe()
  }, [])

  if (loading) return <p>Loading...</p>
  if (!user) return <p>Please sign in first.</p>

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Signed in as: {user.email}</p>

      <form action="/api/subscribe" method="POST">
        <input type="hidden" name="email" value={user.email} />
        <input type="hidden" name="user_id" value={user.id} />
        <label>
          Plan amount (ZAR):
          <input name="amount" defaultValue={49} />
        </label>
        <button type="submit">Subscribe with PayFast (Sandbox)</button>
      </form>
    </div>
  )
}
