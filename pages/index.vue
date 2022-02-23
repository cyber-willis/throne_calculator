<template>
  <div>
    <b-row>
      <b-col sm="12" class="mb-5">
        <b-card title="Input" :class="themeClass(true)">
          <Inputs />
        </b-card>
      </b-col>
      <b-col sm="12">
        <b-card title="Nodes" :class="themeClass(true)">
          <NodeOverview />
        </b-card>
      </b-col>
    </b-row>
    <div class="spacer"></div>
    <b-tabs content-class="mt-6" pills>
      <b-tab title="Overview" class="mt-4" active>
        <b-card title="Earnings Breakdown" :class="themeClass(true)">
          <b-row class="mt-4">
            <b-col>
              <EarningsRecap />
            </b-col>
          </b-row>
        </b-card>
        <div class="mt-5">
          <b-card title="Tools" :class="themeClass(true)">
            <b-row class="mt-4">
              <b-col cols="12" lg="4" class="mb-sm-5">
                <div class="tool-card">
                  <b-card
                    title="Throne to Crown"
                    title-tag="h6"
                    :class="themeClass()"
                  >
                    <ThroneToCrown />
                  </b-card>
                </div>
              </b-col>
              <b-col cols="12" lg="4" class="mb-sm-5">
                <div class="tool-card">
                  <b-card
                    title="Crown to Throne"
                    title-tag="h6"
                    :class="themeClass()"
                  >
                    <CrownToThrone />
                  </b-card>
                </div>
              </b-col>
              <b-col cols="12" lg="4" class="mb-sm-5">
                <div class="tool-card">
                  <b-card
                    title="USD to Throne/Crown"
                    title-tag="h6"
                    :class="themeClass()"
                  >
                    <UsdToThrone />
                  </b-card>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </div>
      </b-tab>

      <b-tab title="Simulation" class="mt-4">
        <b-card title="Simulation" :class="themeClass(true)">
          <Simulation />
        </b-card>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'
import { mapGetters } from 'vuex'

export default {
  components: { ThemeSwitcher },

  name: 'IndexPage',

  computed: {
    ...mapGetters({
      themeClass: 'getThemeClass',
    }),
  },

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
