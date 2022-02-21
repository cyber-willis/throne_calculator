<template>
  <div
    class="sim-input-wrapper bg-light border pt-3 pb-2 px-3 mt-2 mb-2 rounded-sm"
  >
    <div class="sim-input-group">
      <label for="input-price-option">Price:</label>
      <b-form-radio-group
        name="input-price-option"
        v-model="priceOption"
        :options="priceOptions"
        button-variant="outline-primary"
        size="sm"
        buttons
      ></b-form-radio-group>
    </div>
    <div class="sim-input-group">
      <label for="input-view-option">View:</label>
      <b-form-radio-group
        name="input-view-option"
        v-model="viewOption"
        :options="viewOptions"
        button-variant="outline-primary"
        size="sm"
        buttons
      ></b-form-radio-group>
    </div>
    <div class="sim-input-text-group">
      <label for="input-target-node-qty" class="sim-input-text-label"
        >Max Zeus Nodes:</label
      >
      <b-form-select
        name="input-target-node-qty"
        class="sim-input-text-input"
        :options="qtyOptions"
        v-model="targetNodeQty"
        size="sm"
      ></b-form-select>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      priceOptions: [
        { value: 'current', text: 'Current' },
        { value: 'future', text: 'Future' },
      ],
      qtyOptions: [],
      viewOptions: [
        { value: 'compact', text: 'Compact' },
        { value: 'expanded', text: 'Expanded' },
      ],
    }
  },

  computed: {
    priceOption: {
      get() {
        return this.$store.state.simulationOptions.priceOption
      },
      set(value) {
        this.$store.commit('setSimulationPriceOption', value)
      },
    },
    targetNodeQty: {
      get() {
        return this.$store.state.simulationOptions.targetNodeQty
      },
      set(value) {
        this.$store.commit('setSimulationTargetNodeQty', value)
      },
    },
    viewOption: {
      get() {
        return this.$store.state.simulationOptions.viewOption
      },
      set(value) {
        this.$store.commit('setSimulationViewOption', value)
      },
    },
  },

  mounted: function () {
    let qOptions = [{ value: null, text: 'No Max' }]
    for (let i = 1; i <= 500; i++) {
      qOptions.push({ value: i, text: i })
    }
    this.qtyOptions = qOptions
  },
}
</script>

<style scoped>
label {
  margin-right: 0.75rem;
  line-height: 30px;
}
.sim-input-wrapper {
  display: flex;
}
.sim-input-group {
  margin-right: 2rem;
}
.sim-input-text-group {
  display: flex;
}
.sim-input-text-label {
  width: 200px;
  text-align: right;
}
.sim-input-text-input {
  width: 120px;
}
</style>
