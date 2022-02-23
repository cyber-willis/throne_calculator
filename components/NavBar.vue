<template>
  <div class="nav-container">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="dark"
      :class="themeClass(true)"
    >
      <b-navbar-brand href="#"
        ><MidasLogo />Throne Calculator
        <span class="subtitle">by Willis</span></b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            href="https://github.com/cyber-willis/throne_calculator/releases/"
            target="_blank"
            ><BIconNewspaper /> Release Notes</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <theme-switcher class="mr-2" />
        <b-nav-item @click="onRefreshClick"
          ><BIconArrowClockwise /> Refresh Data</b-nav-item
        >
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { BIconArrowClockwise, BIconNewspaper } from 'bootstrap-vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import { mapGetters } from 'vuex'

export default {
  components: { BIconArrowClockwise, BIconNewspaper, ThemeSwitcher },

  computed: {
    ...mapGetters({ themeClass: 'getThemeClass' }),
  },

  methods: {
    onRefreshClick: async function () {
      await this.$store.dispatch('refreshData')
    },
  },
}
</script>

<style scoped>
.nav-container {
  margin-bottom: 2.5rem;
}
.subtitle {
  font-weight: lighter;
  font-size: 0.8em;
}
</style>
