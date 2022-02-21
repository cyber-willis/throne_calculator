const BASE_URL = 'https://snowtrace.io/readContract'
const TOKEN_ADDRESS = '0x643d3707fba05962821e0d0838a82c0ab40d9549'

export async function onRequestGet(context) {
  const params = { a: TOKEN_ADDRESS }
  const url = `${BASE_URL}?${new URLSearchParams(params)}`
  const res = await fetch(url, {
    method: 'GET',
    cf: { cacheTtl: 60, cacheEverything: true },
  })
  const data = await res.text()

  let index =
    data.match(
      /id='readCollapse10'.*'form-group'>(.*?)<i>.*readHeading11'><a/
    )[1] /
    10 ** 9
  index = parseFloat(index)

  const info = JSON.stringify({ index: index })

  let resp = new Response(info, null, 2)
  resp.headers.set('Cache-Control', 'max-age=60')

  return resp
}
