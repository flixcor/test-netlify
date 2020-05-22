<template>
  <div>
    <logo />
    <h1 class="title">
      test-netlify
    </h1>
    <h2 class="subtitle">
      Test for Netlify
    </h2>
    <div class="links">
      <a href="https://nuxtjs.org/" target="_blank" class="button--green">
        Documentation
      </a>
      <a
        href="https://github.com/nuxt/nuxt.js"
        target="_blank"
        class="button--grey"
      >
        GitHub
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'
import { test } from '~/forms/test'

export default Vue.extend({
  components: {
    Logo
  },
  mounted() {
    console.log(test() ? 'test passed' : 'test failed')
  },
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    }
  }
})
</script>
