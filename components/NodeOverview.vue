<template>
  <div>
    <b-table-simple small responsive class="info-table" :dark="darkMode">
      <b-thead>
        <b-tr>
          <b-th></b-th>
          <b-th
            v-for="node in nodesInfo"
            :key="node.id"
            class="column-header"
            >{{ node.name }}</b-th
          >
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-th class="description-column">Qty</b-th>
          <b-th v-for="node in nodesInfo" :key="node.id">
            <b-form-select
              :name="`input-node-${node.id}-qty`"
              :value="getNodeQty(node.id)"
              @input="updateNodeQty($event, node.id)"
              :options="qtyOptions"
              class="node-qty-input"
            ></b-form-select>
          </b-th>
        </b-tr>
        <b-tr>
          <b-th class="description-column">Cost (Throne)</b-th>
          <b-td v-for="node in nodesInfoData" :key="node.id">{{
            node.tCost
          }}</b-td>
        </b-tr>
        <b-tr>
          <b-th class="description-column">Cost (USD)</b-th>
          <b-td v-for="node in nodesInfoData" :key="node.id">{{
            currencyFormatter(node.nCost)
          }}</b-td>
        </b-tr>
        <b-tr>
          <b-th class="description-column">Reward (%)</b-th>
          <b-td v-for="node in nodesInfoData" :key="node.id">{{
            percentFormatter(node.tYield)
          }}</b-td>
        </b-tr>
        <b-tr>
          <b-th class="description-column">Crown (Day)</b-th>
          <b-td v-for="node in nodesInfoData" :key="node.id">{{
            numberFormatter(node.nCrownPerDay)
          }}</b-td>
        </b-tr>
        <b-tr>
          <b-th class="description-column">Throne (Day)</b-th>
          <b-td v-for="node in nodesInfoData" :key="node.id">{{
            numberFormatter(node.nThronePerDay)
          }}</b-td>
        </b-tr>

        <b-tr>
          <b-th class="description-column">Total Throne (Day)</b-th>
          <b-td v-for="node in nodesInfoData" :key="node.id">{{
            numberFormatter(node.tReward)
          }}</b-td>
        </b-tr>
        <b-tr>
          <b-th class="description-column">Total Throne Invested</b-th>
          <b-td v-for="node in nodesInfoData" :key="node.id">{{
            numberFormatter(node.tInvested)
          }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data: function () {
    return {
      qtyOptions: [...Array(101).keys()],
    }
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme,
      nodesInfo: (state) => state.nodeInfo,
      selectedNodes: (state) => state.selectedNodes,
    }),
    ...mapGetters({
      nodesInfoData: 'getNodesInfoData',
      inputValid: 'inputLoaded',
    }),

    darkMode: function () {
      return this.theme === 'dark'
    },
  },

  methods: {
    ...mapActions(['setTotalThroneInvested']),

    currencyFormatter: function (value) {
      if (typeof value !== 'number') {
        value = Number(value.replace(/[^0-9.-]+/g, ''))
      }

      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    },

    numberFormatter: function (value) {
      if (typeof value !== 'number') {
        return value.toFixed(3)
      }
      return parseFloat(value).toFixed(3)
    },

    percentFormatter: function (value) {
      if (typeof value !== 'number') {
        value = value.toFixed(2)
        return value + '%'
      }
      value = parseFloat(value).toFixed(2)
      return value + '%'
    },
    getNodeQty: function (id) {
      return this.selectedNodes[id]
    },

    updateNodeQty: function (qty, id) {
      qty = parseInt(qty)
      this.$store.commit('setNodeQty', { id: id, qty: qty })
      this.$store.dispatch('setTotalThroneInvested', this.nodesInfoData)
    },
  },
}
</script>

<style scoped>
.node-qty-input {
  float: right;
  max-width: 80px;
}
input.node-qty-input {
  text-align: right;
}
</style>
