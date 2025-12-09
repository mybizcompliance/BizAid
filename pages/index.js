import Head from 'next/head'
import AuthForm from '../components/AuthForm'

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <Head>
        <title>MVP — Subscribe</title>
      </Head>

      <h1>Welcome</h1>
      <p>Sign in with your email to access your dashboard.</p>

      <AuthForm />
    </div>
  )
}
