const BASE_URL = 'https://api.dev.dex.guru/v1'
const CHAIN_ID = 43114
const TOKEN_ADDRESS = '0x39912D83acb4A373321387300f4FBE88Aa5d6F14'

export async function onRequestGet(context) {
  const api_key = context.env.DEXGURU_API_KEY
  const url = `${BASE_URL}/chain/${CHAIN_ID}/tokens/${TOKEN_ADDRESS}/market`
  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'api-key': api_key,
    }),
    cf: { cacheTtl: 20, cacheEverything: true },
  })
  const data = await res.json()

  if (
    data.hasOwnProperty('detail') &&
    data.detail === 'Not found token finance'
  ) {
    return new Response('error', { status: res.status })
  }

  const price = parseFloat(data.price_usd).toFixed(2)
  const info = JSON.stringify({ price: price })

  let resp = new Response(info, null, 2)
  resp.headers.set('Cache-Control', 'max-age=60')

  return resp
}
