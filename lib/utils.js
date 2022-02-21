export function formatCurrency(value) {
  if (!['number', 'string'].includes(typeof value)) {
    return value
  }

  if (typeof value !== 'number') {
    value = Number(value.replace(/[^0-9.-]+/g, ''))
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function formatNumber(value) {
  switch (typeof value) {
    case 'number': {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }).format(value)
    }
    case 'string': {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }).format(parseFloat(value))
    }
    default: {
      return value
    }
  }
}

export function formatPercent(value) {
  switch (typeof value) {
    case 'number': {
      value = value.toFixed(2)
      return value + '%'
    }
    case 'string': {
      value = parseFloat(value).toFixed(2)
      return value + '%'
    }
    default: {
      return value
    }
  }
}
