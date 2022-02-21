import {
  nodesInfoData,
  nodesEarningsData,
  grandTotalThroneInvested,
  simData,
} from '~/lib/thrones'
import {
  getCROWNv2PriceDexScreener,
  getCurrentIndex,
  getTHRONETokenBalance,
} from '~/lib/contract'

export const state = () => ({
  currentPrice: null,
  futurePrice: null,
  currentIndex: null,
  currentThrone: 0,
  estimatedAPY: 700,
  totalThroneInvested: 0,
  nodeInfo: [
    { id: 0, name: 'Hermes', tCost: 2.0, tYield: 0.65 },
    { id: 1, name: 'Apollo', tCost: 10.0, tYield: 0.85 },
    { id: 2, name: 'Ares', tCost: 50.0, tYield: 1.0 },
    { id: 3, name: 'Athena', tCost: 100.0, tYield: 1.3 },
    { id: 4, name: 'Zeus', tCost: 150.0, tYield: 1.7 },
  ],
  bonusInfo: {
    5: 1.05,
    10: 1.15,
    20: 1.3,
    30: 1.5,
  },
  selectedNodes: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  },
  simulationOptions: {
    priceOption: 'current',
    targetNodeId: 4,
    targetNodeQty: null,
    viewOption: 'compact',
  },
})

export const getters = {
  getNodeByID: (state) => (id) => {
    return state.nodeInfo.find((node) => node.id === id)
  },

  getNodesInfoData: (state) => {
    return nodesInfoData(
      state.nodeInfo,
      state.selectedNodes,
      state.currentIndex,
      state.currentPrice
    )
  },

  getNodesEarningsData: (state, getters) => {
    const nodesInfoData = getters.getNodesInfoData
    return nodesEarningsData(
      nodesInfoData,
      state.currentIndex,
      state.currentPrice,
      state.futurePrice
    )
  },

  inputLoaded: (state) => {
    return (
      state.currentPrice &&
      state.futurePrice &&
      state.currentIndex &&
      state.currentThrone >= 0 &&
      state.estimatedAPY
    )
  },

  getThroneRemaining: (state) => {
    const value = state.currentThrone - state.totalThroneInvested
    return parseFloat(value).toFixed(3)
  },

  getSimData: (state, getters) => {
    const nodesInfoData = getters.getNodesInfoData
    const remainingThrone = getters.getThroneRemaining
    const rawData = simData(
      nodesInfoData,
      state.currentIndex,
      state.currentPrice,
      state.futurePrice,
      state.estimatedAPY,
      remainingThrone,
      state.simulationOptions
    )
    const qtyByID = function (id, data) {
      return data.find((n) => n.id === id).qty
    }

    return rawData.map((row) => {
      return {
        day: row.day,
        hermes: qtyByID(0, row.nodesData),
        apollo: qtyByID(1, row.nodesData),
        ares: qtyByID(2, row.nodesData),
        athena: qtyByID(3, row.nodesData),
        zeus: qtyByID(4, row.nodesData),
        delta: row.delta,
        bonus: row.bonus,
        accumulated: row.aThrone,
        dailyReward: row.dailyReward,
        dailyProfit: row.profit,
        totalReward: row.totalReward,
        lifetimeProfit: row.totalProfit,
      }
    })
  },
}

export const actions = {
  fetchInitialData: async function ({ commit, state }) {
    const initialPrice = await getCROWNv2PriceDexScreener()
    const initialIndex = await getCurrentIndex()

    commit('setCurrentPrice', initialPrice)
    commit('setFuturePrice', initialPrice)
    commit('setCurrentIndex', initialIndex)
  },

  refreshData: async function ({ commit, state }) {
    const initialPrice = await getCROWNv2PriceDexScreener()
    const initialIndex = await getCurrentIndex()

    commit('setCurrentPrice', initialPrice)
    commit('setCurrentIndex', initialIndex)
  },

  setThroneBalanceFromAddress: async function ({ commit, state }, address) {
    const balance = await getTHRONETokenBalance(address)
    commit('setCurrentThrone', balance)
  },

  setTotalThroneInvested: function ({ commit, state }, nodesInfoData) {
    const total = grandTotalThroneInvested(nodesInfoData)
    commit('setTotalThroneInvested', total)
  },
}

export const mutations = {
  setCurrentPrice(state, price) {
    state.currentPrice = parseFloat(price)
  },
  setFuturePrice(state, price) {
    state.futurePrice = parseFloat(price)
  },
  setCurrentIndex(state, index) {
    state.currentIndex = parseFloat(index)
  },
  setCurrentThrone(state, throne) {
    state.currentThrone = parseFloat(throne)
  },
  setEstimatedAPY(state, apy) {
    state.estimatedAPY = parseFloat(apy)
  },
  setTotalThroneInvested(state, balance) {
    state.totalThroneInvested = parseFloat(balance)
  },
  setNodeQty(state, payload) {
    state.selectedNodes[payload.id] = parseFloat(payload.qty)
  },
  setSimulationPriceOption(state, value) {
    state.simulationOptions.priceOption = value
  },
  setSimulationTargetNodeId(state, value) {
    state.simulationOptions.targetNodeId = value
  },
  setSimulationTargetNodeQty(state, value) {
    const fValue = parseInt(value) ? parseInt(value) : null
    state.simulationOptions.targetNodeQty = fValue
  },
  setSimulationViewOption(state, value) {
    state.simulationOptions.viewOption = value
  },
  clearNodeQty(state, id) {
    state.selectedNodes[id] = 0
  },
}
