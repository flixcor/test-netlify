export const state = () => ({
  blogPosts: [],
  presentationPageCount: 0
})

export const mutations = {
  setBlogPosts(state, list) {
    state.blogPosts = list
  },
  setPresentationPageCount(state, count) {
    state.presentationPageCount = count
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const blogFiles = await require.context(
      '~/assets/content/blog/',
      false,
      /\.json$/
    )
    const blogPosts = blogFiles.keys().map((key) => {
      const res = blogFiles(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setBlogPosts', blogPosts)
  }
}
