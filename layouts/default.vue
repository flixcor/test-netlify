<template>
  <div>
    <div v-show="showNav()" class="container">
      <nav class="navbar" aria-label="main navigation">
        <div class="navbar-brand">
          <nuxt-link class="navbar-item" to="/">Home</nuxt-link>
          <nuxt-link
            v-for="route in $router.options.routes.filter(
              (x) => !x.name.includes('-') && x.name !== 'index'
            )"
            :key="route.path"
            class="navbar-item"
            :to="route.path"
            >{{ route.name }}</nuxt-link
          >
        </div>
      </nav>
    </div>
    <main class="">
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    showNav() {
      const path = this.$nuxt.$route.path
      const excludedRoutes = ['presentation', 'forms']
      return !excludedRoutes.some((r) => path.includes(r))
    }
  }
})
</script>
