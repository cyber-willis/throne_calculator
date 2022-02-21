<template>
  <b-modal
    id="import-wallet-address"
    title="Import Throne Balance from Wallet Address"
    :ok-disabled="okButtonDisabled"
    @ok="onOkClick"
  >
    <p class="mb-4">
      This app will never store or log your wallet address. This is solely used
      for retrieving your Throne balance from the contract.
    </p>
    <b-input
      v-model="walletAddress"
      class="mt-3 mb-3"
      placeholder="Enter wallet address..."
    ></b-input>
  </b-modal>
</template>

<script>
export default {
  data: function () {
    return {
      walletAddress: null,
    }
  },
  computed: {
    okButtonDisabled: function () {
      return !Boolean(this.walletAddress)
    },
  },
  methods: {
    onOkClick: async function () {
      await this.$store.dispatch(
        'setThroneBalanceFromAddress',
        this.walletAddress
      )
    },
  },
}
</script>
