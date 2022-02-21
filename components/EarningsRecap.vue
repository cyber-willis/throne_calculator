<template>
  <b-table-simple small responsive class="info-table">
    <b-thead>
      <b-tr>
        <b-th></b-th>
        <b-th
          v-for="row in nodesEarningsData"
          :key="row.header"
          class="column-header"
          >{{ row.header }}</b-th
        >
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr>
        <b-th class="description-column">Per Day</b-th>
        <b-td v-for="row in nodesEarningsData" :key="row.header">{{
          valueFormatter(row.perDay)
        }}</b-td>
      </b-tr>
      <b-tr>
        <b-th class="description-column">Per Day (5 day bonus)</b-th>
        <b-td v-for="row in nodesEarningsData" :key="row.header">{{
          valueFormatter(row.perDay5)
        }}</b-td>
      </b-tr>
      <b-tr>
        <b-th class="description-column">Per Day (10 day bonus)</b-th>
        <b-td v-for="row in nodesEarningsData" :key="row.header">{{
          valueFormatter(row.perDay10)
        }}</b-td>
      </b-tr>
      <b-tr>
        <b-th class="description-column">Per Day (20 day bonus)</b-th>
        <b-td v-for="row in nodesEarningsData" :key="row.header">{{
          valueFormatter(row.perDay20)
        }}</b-td>
      </b-tr>
      <b-tr>
        <b-th class="description-column">Per Day (30 day bonus)</b-th>
        <b-td v-for="row in nodesEarningsData" :key="row.header">{{
          valueFormatter(row.perDay30)
        }}</b-td>
      </b-tr>
      <b-tr>
        <b-th class="description-column">Per Week (with bonus)</b-th>
        <b-td v-for="row in nodesEarningsData" :key="row.header">{{
          valueFormatter(row.perWeek)
        }}</b-td>
      </b-tr>
      <b-tr>
        <b-th class="description-column">Per Month (with bonus)</b-th>
        <b-td v-for="row in nodesEarningsData" :key="row.header">{{
          valueFormatter(row.perMonth)
        }}</b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatNumber, formatCurrency } from '~/lib/utils'

export default {
  computed: {
    ...mapGetters({
      nodesEarningsData: 'getNodesEarningsData',
      inputValid: 'inputLoaded',
    }),
  },

  methods: {
    valueFormatter: function (valueObj) {
      switch (valueObj.format) {
        case 'number': {
          return formatNumber(valueObj.value)
        }
        case 'currency': {
          return formatCurrency(valueObj.value)
        }
        default: {
          return valueObj.value
        }
      }
    },
  },
}
</script>
