<template>
  <div>
    <div>
      <simulation-input />
    </div>
    <b-table
      id="simulation-table"
      :items="simData"
      :fields="fields"
      :currentPage="currentPage"
      :per-page="perPage"
      small
      responsive
    ></b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      aria-controls="simulation-table"
    ></b-pagination>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { formatCurrency } from '~/lib/utils'

export default {
  data: function () {
    return {
      perPage: 30,
      currentPage: 1,
      totalRows: 360,
    }
  },

  computed: {
    ...mapState({
      simulationOptions: (state) => state.simulationOptions,
    }),
    ...mapGetters({ simData: 'getSimData' }),
    fields: function () {
      if (this.simulationOptions.viewOption === 'expanded') {
        return [
          'day',
          'hermes',
          'apollo',
          'ares',
          'athena',
          'zeus',
          'bonus',
          'delta',
          'accumulated',
          {
            key: 'dailyReward',
            formatter: 'currencyFormatter',
            class: 'sim-currency-col',
          },
          {
            key: 'dailyProfit',
            formatter: 'currencyFormatter',
            class: 'sim-currency-col',
          },
          {
            key: 'totalReward',
            formatter: 'currencyFormatter',
            class: 'sim-currency-col',
          },
          {
            key: 'lifetimeProfit',
            formatter: 'currencyFormatter',
            class: 'sim-currency-col',
          },
        ]
      }
      return [
        'day',
        'hermes',
        'apollo',
        'ares',
        'athena',
        'zeus',
        'delta',
        {
          key: 'dailyReward',
          formatter: 'currencyFormatter',
          class: 'sim-currency-col',
        },
      ]
    },
  },

  methods: {
    currencyFormatter: function (value) {
      return formatCurrency(value)
    },
  },
}
</script>
