<template>
  <div>
    <b-row>
      <b-col sm="12" class="mb-5">
        <b-card title="Input" bg-variant="dark" text-variant="white">
          <Inputs />
        </b-card>
      </b-col>
      <b-col sm="12">
        <b-card title="Nodes">
          <NodeOverview />
        </b-card>
      </b-col>
    </b-row>
    <div class="spacer"></div>
    <b-tabs content-class="mt-6" pills>
      <b-tab title="Overview" active>
        <b-card title="Earnings Breakdown" class="mt-4">
          <b-row class="mt-4">
            <b-col>
              <EarningsRecap />
            </b-col>
          </b-row>
        </b-card>
        <b-card title="Tools" class="mt-5">
          <b-row class="mt-4">
            <b-col cols="12" lg="4" class="mb-sm-5">
              <b-card title="Throne to Crown" title-tag="h6" class="tool-card">
                <ThroneToCrown />
              </b-card>
            </b-col>
            <b-col cols="12" lg="4" class="mb-sm-5">
              <b-card title="Crown to Throne" title-tag="h6" class="tool-card">
                <CrownToThrone />
              </b-card>
            </b-col>
            <b-col cols="12" lg="4" class="mb-sm-5">
              <b-card
                title="USD to Throne/Crown"
                title-tag="h6"
                class="tool-card"
              >
                <UsdToThrone />
              </b-card>
            </b-col>
          </b-row>
        </b-card>
      </b-tab>

      <b-tab title="Simulation">
        <b-card title="Simulation" class="mt-4">
          <Simulation />
        </b-card>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  mounted: async function () {
    this.$store.dispatch('fetchInitialData')
  },
}
</script>

<style scoped>
.spacer {
  margin: 2rem 0 2rem 0;
}
</style>
