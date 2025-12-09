import qs from 'querystring'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const {
    PAYFAST_MERCHANT_ID,
    PAYFAST_MERCHANT_KEY,
    PAYFAST_PASSPHRASE,
    PAYFAST_RETURN_URL,
    PAYFAST_CANCEL_URL,
    PAYFAST_NOTIFY_URL,
  } = process.env

  const { email, user_id, amount } = req.body

  // Build PayFast payment data (sandbox)
  const data = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    return_url: PAYFAST_RETURN_URL,
    cancel_url: PAYFAST_CANCEL_URL,
    notify_url: PAYFAST_NOTIFY_URL,
    amount: parseFloat(amount).toFixed(2),
    item_name: `Subscription for ${email}`,
    m_payment_id: `${user_id}-${Date.now()}`,
    email_address: email,
  }

  // Generate PayFast signature
  const signature = createSignature(data, PAYFAST_PASSPHRASE)
  const query = qs.stringify({ ...data, signature })

  // PayFast sandbox endpoint
  const url = `https://sandbox.payfast.co.za/eng/process?${query}`

  // Redirect user to PayFast
  res.writeHead(302, { Location: url })
  res.end()
}

function createSignature(data, passphrase) {
  const crypto = require('crypto')

  // Sort keys+encode
  const keys = Object.keys(data)
    .filter((k) => data[k])
    .sort()

  const str =
    keys
      .map((k) => `${k}=${encodeURIComponent(data[k])}`)
      .join('&') +
    (passphrase ? `&passphrase=${encodeURIComponent(passphrase)}` : '')

  return crypto.createHash('md5').update(str).digest('hex')
}
