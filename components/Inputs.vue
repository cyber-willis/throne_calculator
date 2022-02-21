<template>
  <div>
    <div class="input-wrapper">
      <div>
        <div class="input-row d-flex">
          <label class="lead" for="input-current-price"
            >Current Price (USD):</label
          >
          <b-input-group prepend="$" class="calc-input">
            <b-form-input
              name="input-current-price"
              v-model.number="currentPrice"
            ></b-form-input>
          </b-input-group>
        </div>
      </div>
      <div>
        <div class="input-row d-flex">
          <label class="lead" for="input-future-price"
            >Future Price (USD):</label
          >
          <b-input-group prepend="$" class="calc-input">
            <b-form-input
              name="input-future-price"
              v-model.number="futurePrice"
            ></b-form-input>
          </b-input-group>
        </div>
      </div>
      <div>
        <div class="input-row d-flex">
          <label class="lead" for="input-current-throne">Current Throne:</label>
          <b-input-group class="calc-input">
            <b-form-input
              name="input-current-throne"
              v-model.number="currentThrone"
            ></b-form-input>
            <b-input-group-append>
              <b-button variant="primary" v-b-modal.import-wallet-address
                ><b-icon-download scale="0.8"
              /></b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
      <div>
        <div class="input-row d-flex">
          <label class="lead" for="input-current-index">Current Index:</label>
          <b-form-input
            name="input-current-index"
            v-model.number="currentIndex"
            class="calc-input"
          ></b-form-input>
        </div>
      </div>
      <div>
        <div class="input-row d-flex">
          <label class="lead" for="input-estimated-apy"
            >Estimated APY (%):</label
          >
          <b-input-group append="%" class="calc-input">
            <b-form-input
              name="input-estimated-apy"
              v-model.number="estimatedAPY"
            ></b-form-input>
          </b-input-group>
        </div>
      </div>
      <div>
        <div class="input-row d-flex">
          <label class="lead" for="input-throne-remaining"
            >Throne Remaining:</label
          >
          <span name="input-throne-remaining" :class="throneRemainingClass">{{
            throneRemaining
          }}</span>
        </div>
      </div>
    </div>
    <ImportWalletAddress />
  </div>
</template>

<script>
import { BIconDownload } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: { BIconDownload },

  computed: {
    ...mapGetters(['getThroneRemaining']),
    currentPrice: {
      get() {
        return this.$store.state.currentPrice
      },
      set(value) {
        this.$store.commit('setCurrentPrice', value)
      },
    },
    futurePrice: {
      get() {
        return this.$store.state.futurePrice
      },
      set(value) {
        this.$store.commit('setFuturePrice', value)
      },
    },
    currentThrone: {
      get() {
        return this.$store.state.currentThrone
      },
      set(value) {
        this.$store.commit('setCurrentThrone', value)
      },
    },
    currentIndex: {
      get() {
        return this.$store.state.currentIndex
      },
      set(value) {
        this.$store.commit('setCurrentIndex', value)
      },
    },
    estimatedAPY: {
      get() {
        return this.$store.state.estimatedAPY
      },
      set(value) {
        this.$store.commit('setCurrentPrice', value)
      },
    },
    throneRemainingClass: function () {
      const balance = this.getThroneRemaining
      return balance >= 0
        ? 'throne-remaining'
        : 'throne-remaining throne-remaining-negative'
    },
    throneRemaining: function () {
      return new Intl.NumberFormat('en-US').format(this.getThroneRemaining)
    },
  },

  methods: {
    currencyFormatter: function (value) {
      if (typeof value !== 'number') {
        value = Number(value.replace(/[^0-9.-]+/g, ''))
      }

      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    },
    percentFormatter: function (value) {
      value = value.replace(/%/g, '')
      return value + '%'
    },
  },
}
</script>

<style scoped>
.calc-input {
  width: 120px;
  margin-bottom: 1rem;
  margin-right: 2.4rem;
}
.input-row {
  margin-bottom: 0.1rem;
  min-height: 54px;
}
label {
  min-width: 168px;
  margin-right: 1rem;
  margin-top: 4px;
}
.input-wrapper {
  display: flex;
  flex-wrap: wrap;
}
span.throne-remaining {
  font-size: 24px;
  font-weight: bold;
}
span.throne-remaining-negative {
  color: red;
}
</style>
