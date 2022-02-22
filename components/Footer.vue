<template>
  <div class="footer-wrapper border-top bg-light">
    <b-container class="my-5">
      <b-row>
        <b-col>
          <p class="lead">
            This unofficial tool is presented for the sole purpose of creating
            rough estimates of how your Throne nodes may perform over time. This
            is not financial advice. Warning: take simulations over longer
            periods of time with an extreme amount of salt!
          </p>
        </b-col>
        <b-col>
          <p class="ml-3 lead">
            Created with love by Willis.
            <span class="font-italic">Version {{ version }}</span>
          </p>
          <b-nav>
            <b-nav-item
              ><a href="https://github.com/cyber-willis/throne_calculator"
                ><BIconGithub class="mr-2" />Source Code</a
              ></b-nav-item
            >
            <b-nav-item
              ><a href="https://discord.gg/midasdao"
                ><BIconDiscord class="mr-2" />Midas Discord</a
              ></b-nav-item
            >
            <b-nav-item
              ><a href="https://twitter.com/Midas_DAO"
                ><BIconTwitter class="mr-2" />Midas Twitter</a
              ></b-nav-item
            >
          </b-nav>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { BIconDiscord, BIconTwitter, BIconGithub } from 'bootstrap-vue'
import { version } from '~/package'
export default {
  components: { BIconDiscord, BIconTwitter, BIconGithub },

  data: function () {
    return {
      version: version,
    }
  },
}
</script>

<style scoped>
.footer-wrapper {
  min-height: 240px;
}
</style>
