<template>
  <div>
    <div class="d-flex tool-row">
      <label for="input-ttc-usd" class="tool-input-label">USD Quanity:</label>
      <b-input
        name="input-ttc-usd"
        type="number"
        class="tool-input"
        v-model.number="usd"
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
      <label for="output-ttc-crown" class="tool-input-label"
        >Crown Quanity:</label
      >
      <span name="output-ttc-crown" class="tool-output">{{
        numberFormatter(crown)
      }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatNumber } from '~/lib/utils'

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
    },
    convert: function () {
      this.crown = this.usd / this.price
      this.throne = this.crown / this.index
    },
    numberFormatter: function (value) {
      return formatNumber(value)
    },
  },
}
</script>
