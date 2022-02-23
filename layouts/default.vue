<template>
  <div :class="themeClass()">
    <NavBar />
    <b-container>
      <Nuxt />
    </b-container>
    <Footer :class="footerClass" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      themeClass: 'getThemeClass',
    }),
    footerClass: function () {
      return this.themeClass(true) + ' mt-5'
    },
  },
}
</script>
