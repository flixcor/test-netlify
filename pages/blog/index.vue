<template>
  <div>
    <h1 class="title">Blog posts</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="blogPost in blogPosts" :key="blogPost.slug">
          <td>
            <nuxt-link :to="`/blog/${blogPost.slug}`">{{
              blogPost.title
            }}</nuxt-link>
          </td>
          <td>{{ blogPost.description }}</td>
          <td>{{ blogPost.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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
