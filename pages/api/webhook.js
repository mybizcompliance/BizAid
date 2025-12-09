import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const data = req.body

  const {
    PAYFAST_PASSPHRASE,
    SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SUPABASE_URL,
  } = process.env

  if (!data || !data.signature || !data.m_payment_id) {
    return res.status(400).send('Missing fields')
  }

  // Validate PayFast signature
  const incomingSig = data.signature
  const params = { ...data }
  delete params.signature

  const keys = Object.keys(params)
    .filter((k) => params[k])
    .sort()

  const str =
    keys.map((k) => `${k}=${params[k]}`).join('&') +
    (PAYFAST_PASSPHRASE ? `&passphrase=${PAYFAST_PASSPHRASE}` : '')

  const mySignature = crypto.createHash('md5').update(str).digest('hex')

  if (mySignature !== incomingSig) {
    console.warn('Invalid signature from PayFast')
    return res.status(400).send('Invalid signature')
  }

  // If payment was successful
  if (data.payment_status === 'COMPLETE') {
    try {
      const { createClient } = require('@supabase/supabase-js')
      const supabaseAdmin = createClient(
        NEXT_PUBLIC_SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY
      )

      const [user_id] = data.m_payment_id.split('-')

      await supabaseAdmin.from('subscriptions').upsert(
        {
          user_id,
          m_payment_id: data.m_payment_id,
          amount: data.amount_gross || data.amount,
          payment_status: data.payment_status,
          raw: data,
        },
        { onConflict: 'm_payment_id' }
      )

      return res.status(200).send('OK')
    } catch (err) {
      console.error(err)
      return res.status(500).send('Server error')
    }
  }

  return res.status(200).send('Ignored')
}

// Configure webhook to accept PayFast x-www-form-urlencoded body
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
      type: 'application/x-www-form-urlencoded',
    },
  },
}
