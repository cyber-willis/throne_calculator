<template>
  <b-button-group size="sm">
    <b-button
      v-for="option in options"
      :key="option.value"
      :disabled="option.disabled"
      :variant="option.variant"
      @click="onClick(option)"
      ><BIcon :icon="option.icon" class="mr-2" />{{ option.text }}</b-button
    >
  </b-button-group>
</template>

<script>
import { BIcon, BIconBrightnessHighFill, BIconMoon } from 'bootstrap-vue'
export default {
  components: { BIcon, BIconBrightnessHighFill, BIconMoon },
  data: function () {
    return {
      selected: 'light',
      options: [
        {
          text: 'Light',
          value: 'light',
          icon: 'brightness-high-fill',
          disabled: true,
          variant: 'light',
        },
        {
          text: 'Dark',
          value: 'dark',
          icon: 'moon',
          disabled: false,
          variant: 'secondary',
        },
      ],
      variant: 'secondary',
    }
  },
  methods: {
    getThemeClass: function (option) {
      console.log('getVariant', option)
      return option.value === this.selected ? 'light' : 'secondary'
    },
    isDisabled: function (option) {
      return option.value === this.selected
    },
    onClick: function (option) {
      this.selected = option.value
      this.$store.commit('setTheme', this.selected)
      let selectedOption =
        this.selected === 'light' ? this.options[0] : this.options[1]
      let otherOption =
        this.selected === 'light' ? this.options[1] : this.options[0]
      selectedOption.disabled = true
      selectedOption.variant = 'light'
      otherOption.disabled = false
      otherOption.variant = 'secondary'
    },
  },

  created: function () {
    console.log('Theme:', this.$store.state.theme)
    this.selected = this.$store.state.theme
    this.options[0].disabled = this.selected === 'light'
    this.options[0].variant = this.selected === 'light' ? 'light' : 'secondary'
    this.options[1].disabled = this.selected === 'dark'
    this.options[1].variant = this.selected === 'dark' ? 'light' : 'secondary'
  },
}
</script>
