// Original Author: Midas Dicord user @woodmon

// Usage
// =getTotalCROWNTokenBalance("0x39912D83acb4A373321387300f4FBE88Aa5d6F14")
// =getCurrentIndex()
// =getCurrentSellTax()
// =getCurrentBuyTax()

import axios from 'axios'

const SNOWTRACE_URL_BASE = 'https://api.snowtrace.io/api'

const MODULE_ACCOUNT = 'account'
const ACTION_TOKENBALANCE = 'tokenbalance'

const ADDRESS_CROWN = '0x39912D83acb4A373321387300f4FBE88Aa5d6F14'
const ADDRESS_SCROWN = '0x643d3707fba05962821e0d0838a82c0ab40d9549'
const ADDRESS_THRONE = '0x070092b3a985f9e5424351d68730c9a318ad96eb'
const ADDRESS_LP = '0x089a9BF16453b519Fab02e40d143C0dcF9083778'

export async function getTotalCROWNTokenBalance(accountAddress) {
  return (
    getCROWNTokenBalance(accountAddress) +
    getSCROWNTokenBalance(accountAddress) +
    getCurrentIndex() * getTHRONETokenBalance(accountAddress)
  )
}

export async function getCROWNv2PriceDexScreener() {
  // I'm sorry DexScreener I hope you keep your API public forever
  const timestamp = Date.now()
  const url =
    'https://io11.dexscreener.io/u/chart/bars/avalanche/' +
    ADDRESS_LP +
    '?from=' +
    timestamp.toString() +
    '&to=' +
    timestamp.toString() +
    '&res=60&cb=2'
  const response = await axios.get(url)
  const data = Number(
    response.data.bars[response.data.bars.length - 1].closeUsd
  ).toFixed(2)

  return data
}

export async function getCurrentIndex() {
  const url = 'https://snowtrace.io/readContract?a=' + ADDRESS_SCROWN
  const response = await axios.get(url)

  return (
    response.data.match(
      /id='readCollapse10'.*'form-group'>(.*?)<i>.*readHeading11'><a/
    )[1] /
    10 ** 9
  )
}

export async function getCurrentSellTax() {
  const url = 'https://snowtrace.io/readContract?a=' + ADDRESS_CROWN
  const response = await axios.get(url)
  const data =
    response.data.match(
      /id='readCollapse19'.*'form-group'>(.*?)<i>.*readHeading20'><a/
    )[1] /
    10 ** 4

  return data
}

export async function getCurrentBuyTax() {
  const url = 'https://snowtrace.io/readContract?a=' + ADDRESS_CROWN
  const response = await axios.get(url)
  const data =
    response.data.match(
      /id='readCollapse10'.*'form-group'>(.*?)<i>.*readHeading11'><a/
    )[1] /
    10 ** 4

  return data
}

function snowTraceUrl(module, action) {
  return SNOWTRACE_URL_BASE + '?module=' + module + '&action=' + action
}

function convertToEther(val, dec = 9) {
  let result = val / 10 ** dec
  result = result.toFixed(3)

  return result
}

async function getCROWNTokenBalance(accountAddress) {
  const url =
    snowTraceUrl(MODULE_ACCOUNT, ACTION_TOKENBALANCE) +
    '&contractaddress=' +
    ADDRESS_CROWN +
    '&address=' +
    accountAddress
  const response = await axios.get(url)

  return convertToEther(response.data['result'])
}

async function getSCROWNTokenBalance(accountAddress) {
  const url =
    snowTraceUrl(MODULE_ACCOUNT, ACTION_TOKENBALANCE) +
    '&contractaddress=' +
    ADDRESS_SCROWN +
    '&address=' +
    accountAddress
  const response = await axios.get(url)

  return convertToEther(response.data['result'])
}

export async function getTHRONETokenBalance(accountAddress) {
  const url =
    snowTraceUrl(MODULE_ACCOUNT, ACTION_TOKENBALANCE) +
    '&contractaddress=' +
    ADDRESS_THRONE +
    '&address=' +
    accountAddress
  const response = await axios.get(url)
  let data = response.data['result']

  return convertToEther(data, 18)
}
