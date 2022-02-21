<template>
  <div>
    <div class="d-flex tool-row">
      <label for="input-ttc-crown" class="tool-input-label"
        >Crown Quanity:</label
      >
      <b-input
        name="input-ttc-crown"
        type="number"
        class="tool-input"
        v-model.number="crown"
        @input="onInput"
      ></b-input>
    </div>
    <div class="d-flex tool-row">
      <label for="output-ttc-throne" class="tool-input-label"
        >Throne Quanity:</label
      >
      <span name="output-ttc-throne" class="tool-output">{{
        numberFormatter(throne)
      }}</span>
    </div>
    <div class="d-flex tool-row">
      <label for="output-ttc-usd" class="tool-input-label">USD Value:</label>
      <span name="output-ttc-usd" class="tool-output">{{
        currencyFormatter(usd)
      }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatNumber, formatCurrency } from '~/lib/utils'

export default {
  data: function () {
    return {
      throne: 0.0,
      crown: 0.0,
      usd: '$0.00',
    }
  },

  computed: {
    ...mapState({
      index: (state) => state.currentIndex,
      price: (state) => state.currentPrice,
    }),
  },

  methods: {
    onInput: function (value) {
      this.convert()
      this.convertUSD()
    },
    convert: function () {
      this.throne = this.crown / this.index
    },
    convertUSD: function () {
      this.usd = this.crown * this.price
    },
    numberFormatter: function (value) {
      return formatNumber(value)
    },
    currencyFormatter: function (value) {
      return formatCurrency(value)
    },
  },
}
</script>
