import Head from 'next/head'
import AuthForm from '../components/AuthForm'

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <Head>
        <title>MVP — Subscribe</title>
      </Head>
      <h1>Welcome — Subscribe</h1>
      <p>Sign in with email (Supabase) and then hit "Subscribe" on the dashboard.</p>
      <AuthForm />
    </div>
  )
}
