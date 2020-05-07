<template>
  <table>
    <tr v-for="blogPost in blogPosts" :key="blogPost.slug">
      <td>
        <nuxt-link :to="`/blog/${blogPost.slug}`">{{ blogPost }}</nuxt-link>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts
    }
  }
}
</script>
