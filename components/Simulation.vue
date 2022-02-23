<template>
  <div>
    <div :class="themeClass()">
      <simulation-input />
    </div>
    <b-table
      id="simulation-table"
      :items="simData"
      :fields="fields"
      :currentPage="currentPage"
      :per-page="perPage"
      :dark="darkMode"
      small
      responsive
    ></b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      aria-controls="simulation-table"
      :ellipsis-class="paginationButtonClass"
      :first-class="paginationButtonClass"
      :last-class="paginationButtonClass"
      :next-class="paginationButtonClass"
      :page-class="paginationButtonClass"
      :prev-class="paginationButtonClass"
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
      theme: (state) => state.theme,
      simulationOptions: (state) => state.simulationOptions,
    }),

    ...mapGetters({ simData: 'getSimData', themeClass: 'getThemeClass' }),

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

    darkMode: function () {
      return this.theme === 'dark'
    },

    paginationButtonClass: function () {
      return this.theme === 'dark' ? 'theme-dark-pagination' : ''
    },
  },

  methods: {
    currencyFormatter: function (value) {
      return formatCurrency(value)
    },
  },
}
</script>
