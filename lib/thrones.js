// nodesInfo: [
//     { id: 0, name: 'Hermes', tCost: 2.0, tYield: 0.65 },
//     { id: 1, name: 'Apollo', tCost: 10.0, tYield: 0.85 },
//     { id: 2, name: 'Ares', tCost: 50.0, tYield: 1.00 },
//     { id: 3, name: 'Athena', tCost: 100.0, tYield: 1.30 },
//     { id: 4, name: 'Zeus', tCost: 150.0, tYield: 1.70 },
// ]

const BONUS_RATES = {
  5: 1.05,
  10: 1.15,
  20: 1.3,
  30: 1.5,
}

function _get_node_by_id(nId, nodesInfo) {
  return nodesInfo.find((node) => node.id === nId)
}

function _get_bonus_rate(days) {
  if (days < 5) {
    return 1.0
  } else if (days < 10) {
    return BONUS_RATES[5]
  } else if (days < 20) {
    return BONUS_RATES[10]
  } else if (days < 30) {
    return BONUS_RATES[20]
  } else if (days >= 30) {
    return BONUS_RATES[30]
  }
  return 1.0
}

function _get_new_index(cIndex, eAPY) {
  return cIndex + (365 * ((eAPY / 100 + 1) ** (1 / 365) - 1) * 100) / 365 / 100
}

export function nodeCost(tCost, cIndex, cPrice) {
  return tCost * cIndex * cPrice
}

export function nodeInvestment(tCost, cIndex, cPrice, nQty) {
  return nodeCost(tCost, cIndex, cPrice) * nQty
}

export function thronePerDay(nId, nodesInfo) {
  const node = _get_node_by_id(nId, nodesInfo)

  return (node.tCost * node.tYield) / 100
}

export function crownPerDay(nId, nodesInfo, cIndex) {
  const node = _get_node_by_id(nId, nodesInfo)

  return (node.tCost * node.tYield * cIndex) / 100
}

export function totalThronePerDay(nId, nodesInfo, selectedNodes) {
  const qty = selectedNodes[nId]

  return thronePerDay(nId, nodesInfo) * qty
}

export function totalThroneInvested(nId, nodesInfo, selectedNodes) {
  const node = _get_node_by_id(nId, nodesInfo)
  const qty = selectedNodes[nId]

  return node.tCost * qty
}

export function grandTotalThroneInvested(nodesInfoData) {
  return nodesInfoData.reduce((a, b) => a + (b['tInvested'] || 0), 0)
}

export function nodesInfoData(nodesInfo, selectedNodes, cIndex, cPrice) {
  return nodesInfo.map((n) => {
    return {
      id: n.id,
      nName: n.name,
      tCost: n.tCost,
      tYield: n.tYield,
      nCost: nodeCost(n.tCost, cIndex, cPrice),
      nCrownPerDay: crownPerDay(n.id, nodesInfo, cIndex),
      nThronePerDay: thronePerDay(n.id, nodesInfo),
      nQty: selectedNodes[n.id],
      tReward: totalThronePerDay(n.id, nodesInfo, selectedNodes),
      tInvested: totalThroneInvested(n.id, nodesInfo, selectedNodes),
    }
  })
}

export function nodesEarningsData(nodesInfoData, cIndex, cPrice, fPrice) {
  const tDay = nodesInfoData.reduce((a, b) => a + (b['tReward'] || 0), 0)
  return [
    {
      header: 'Crown',
      perDay: { value: tDay * cIndex, format: 'number' },
      perDay5: { value: tDay * cIndex * BONUS_RATES[5], format: 'number' },
      perDay10: { value: tDay * cIndex * BONUS_RATES[10], format: 'number' },
      perDay20: { value: tDay * cIndex * BONUS_RATES[20], format: 'number' },
      perDay30: { value: tDay * cIndex * BONUS_RATES[30], format: 'number' },
      perWeek: { value: tDay * cIndex * BONUS_RATES[5] * 7, format: 'number' },
      perMonth: {
        value: tDay * cIndex * BONUS_RATES[30] * 30,
        format: 'number',
      },
    },
    {
      header: 'Throne',
      perDay: { value: tDay, format: 'number' },
      perDay5: { value: tDay * BONUS_RATES[5], format: 'number' },
      perDay10: { value: tDay * BONUS_RATES[10], format: 'number' },
      perDay20: { value: tDay * BONUS_RATES[20], format: 'number' },
      perDay30: { value: tDay * BONUS_RATES[30], format: 'number' },
      perWeek: { value: tDay * BONUS_RATES[5] * 7, format: 'number' },
      perMonth: { value: tDay * BONUS_RATES[30] * 30, format: 'number' },
    },
    {
      header: 'Current USD',
      perDay: { value: tDay * cIndex * cPrice, format: 'currency' },
      perDay5: {
        value: tDay * cIndex * BONUS_RATES[5] * cPrice,
        format: 'currency',
      },
      perDay10: {
        value: tDay * cIndex * BONUS_RATES[10] * cPrice,
        format: 'currency',
      },
      perDay20: {
        value: tDay * cIndex * BONUS_RATES[20] * cPrice,
        format: 'currency',
      },
      perDay30: {
        value: tDay * cIndex * BONUS_RATES[30] * cPrice,
        format: 'currency',
      },
      perWeek: {
        value: tDay * cIndex * BONUS_RATES[5] * 7 * cPrice,
        format: 'currency',
      },
      perMonth: {
        value: tDay * cIndex * BONUS_RATES[30] * 30 * cPrice,
        format: 'currency',
      },
    },
    {
      header: 'Future USD',
      perDay: { value: tDay * cIndex * fPrice, format: 'currency' },
      perDay5: {
        value: tDay * cIndex * BONUS_RATES[5] * fPrice,
        format: 'currency',
      },
      perDay10: {
        value: tDay * cIndex * BONUS_RATES[10] * fPrice,
        format: 'currency',
      },
      perDay20: {
        value: tDay * cIndex * BONUS_RATES[20] * fPrice,
        format: 'currency',
      },
      perDay30: {
        value: tDay * cIndex * BONUS_RATES[30] * fPrice,
        format: 'currency',
      },
      perWeek: {
        value: tDay * cIndex * BONUS_RATES[5] * 7 * fPrice,
        format: 'currency',
      },
      perMonth: {
        value: tDay * cIndex * BONUS_RATES[30] * 30 * fPrice,
        format: 'currency',
      },
    },
  ]
}

export function simData(
  nodesInfoData,
  cIndex,
  cPrice,
  fPrice,
  eAPY,
  rThrone,
  options = null
) {
  // Sanitiaztion
  cIndex = parseFloat(cIndex)
  cPrice = parseFloat(cPrice)
  fPrice = parseFloat(fPrice)
  eAPY = parseFloat(eAPY)
  rThrone = parseFloat(rThrone)

  if (!options) {
    options = {
      strategy: 'compound', // compound, takeProfit (not implemented), balanced (not implemented)
      targetNodeId: 4,
      targetNodeQty: null,
      priceOption: 'current', // current, future
    }
  }

  const price = options.priceOption === 'current' ? cPrice : fPrice

  let data = []
  let nodesData = nodesInfoData.map((n) => {
    return {
      id: n.id,
      nName: n.nName,
      nQty: n.nQty,
      tReward: n.tReward,
      tPerDay: n.nThronePerDay,
      tCost: n.tCost,
    }
  })

  const _get_throne_delta = function (nodesData, bonus) {
    return nodesData.reduce((a, b) => a + (b['tReward'] || 0), 0) * bonus
  }

  const _update_nodes_rewards = function (nodesData) {
    for (let i = 0; i < nodesData.length; i++) {
      nodesData[i].tReward = nodesData[i].nQty * nodesData[i].tPerDay
    }
    return nodesData
  }

  const _sort_nodes = function (nodes, dir = 'asc') {
    let sNodes = [...nodesData].sort((a, b) => (a.id > b.id ? 1 : -1))

    if (dir === 'desc') {
      sNodes.reverse()
    }

    return sNodes
  }

  const _get_upgraded_nodes = function (nodesData) {
    let nodes = _sort_nodes(nodesData)
    let upgraded = false

    if (nodes[0].nQty >= 5) {
      nodes[0].nQty -= 5
      nodes[1].nQty += 1
      upgraded = true
    }
    if (nodes[1].nQty >= 5) {
      nodes[1].nQty -= 5
      nodes[2].nQty += 1
      upgraded = true
    }
    if (nodes[2].nQty >= 2) {
      nodes[2].nQty -= 2
      nodes[3].nQty += 1
      upgraded = true
    }
    if (nodes[2].nQty >= 1 && nodes[3].nQty >= 1) {
      nodes[2].nQty -= 1
      nodes[3].nQty -= 1
      nodes[4].nQty += 1
      upgraded = true
    }

    return { nodes: nodes, upgraded: upgraded }
  }

  const _get_nodes_added = function (aThrone, nodesData, options) {
    let thrones = aThrone
    let nodes = _sort_nodes(nodesData, 'desc')
    let claimed = false
    let upgraded = false

    for (let i = 0; i < nodes.length; i++) {
      const smallestNodeId = nodes.length
        ? Math.min.apply(
            null,
            nodes.filter((n) => n.nQty > 0).map((n) => n.id)
          )
        : -1

      // If you have 1 athena and 0 ares, go ahead and grab an ares; otherise, check if it's an upgrade
      const isUpgrade =
        nodes[i].id == 2 && nodes[i].nQty == 0 && nodes[1].nQty == 1
          ? true
          : nodes[i].id >= smallestNodeId

      if (thrones >= nodes[i].tCost && isUpgrade) {
        // Buy new node (skip smaller nodes unless is compounding target)
        const qtyAfford = Math.floor(thrones / nodes[i].tCost)
        thrones = qtyAfford > 0 ? thrones - qtyAfford * nodes[i].tCost : thrones
        nodes[i].nQty += qtyAfford
        claimed = true
      } else {
        // Upgrades
        const upgradeData = _get_upgraded_nodes(nodesData)
        nodes = [...upgradeData.nodes]
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .reverse()
        upgraded = upgradeData.upgraded
      }
    }

    nodes = _sort_nodes(nodes)
    claimed = claimed || upgraded

    return { nodes: nodes, balance: thrones, claimed: claimed }
  }

  const _get_profit = function (nodesData, options) {
    const targetNode = _get_node_by_id(options.targetNodeId, nodesData)

    if (options.targetNodeQty && targetNode.nQty >= options.targetNodeQty) {
      return true
    }

    return false
  }

  const _formated_nodes_data = function (nodesData) {
    return [...nodesData].map((n) => {
      return {
        id: n.id,
        name: n.name,
        qty: n.nQty,
      }
    })
  }

  let hasClaimed = false
  let day = 1
  let bDay = 1
  let bonus = 1.0
  let index = cIndex
  let tDelta = _get_throne_delta(nodesData, bonus)
  let aThrone = tDelta + rThrone
  let dailyReward = tDelta * index * price
  let totalReward = dailyReward
  let profit = 0
  let totalProfit = 0

  data.push({
    day: day,
    bonus: bonus.toFixed(2),
    delta: tDelta.toFixed(3),
    aThrone: aThrone.toFixed(3),
    dailyReward: dailyReward.toFixed(2),
    totalReward: totalReward.toFixed(2),
    profit: profit.toFixed(2),
    totalProfit: totalProfit.toFixed(2),
    nodesData: _formated_nodes_data(nodesData),
  })

  for (let i = 1; i < 360; i++) {
    day = i + 1
    bDay = hasClaimed ? 0 : bDay + 1
    bonus = _get_bonus_rate(bDay)
    index = _get_new_index(index, eAPY)
    tDelta = _get_throne_delta(nodesData, bonus)
    aThrone = aThrone + tDelta
    profit = 0
    const compound = !_get_profit(nodesData, options)

    if (compound) {
      const nodesAdded = _get_nodes_added(aThrone, nodesData, options)
      nodesData = nodesAdded.nodes
      aThrone = nodesAdded.balance
      hasClaimed = nodesAdded.claimed

      if (hasClaimed) {
        // Update data if rewards are claimed
        bDay = hasClaimed ? 0 : bDay + 1
        bonus = _get_bonus_rate(bDay)
        nodesData = _update_nodes_rewards(nodesData)
        tDelta = _get_throne_delta(nodesData, bonus)
        totalReward = 0
      }
    }

    dailyReward = price * tDelta * index
    totalReward += dailyReward

    if (_get_profit(nodesData, options)) {
      profit = dailyReward
      totalReward = dailyReward
      totalProfit += dailyReward
      aThrone = 0
    }

    data.push({
      day: day,
      bonus: bonus.toFixed(2),
      delta: tDelta.toFixed(3),
      aThrone: aThrone.toFixed(3),
      dailyReward: dailyReward.toFixed(2),
      totalReward: totalReward.toFixed(2),
      profit: profit.toFixed(2),
      totalProfit: totalProfit.toFixed(2),
      nodesData: _formated_nodes_data(nodesData),
    })
  }

  return data
}
