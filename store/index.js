export const state = () => ({
  blogPosts: [],
  presentations: []
})

export const mutations = {
  setBlogPosts(state, list) {
    state.blogPosts = list
  },
  setPresentations(state, list) {
    state.presentations = list
  }
}

const blog = async (commit) => {
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

const pres = async (commit) => {
  const presentationFiles = await require.context(
    '~/assets/content/presentation/',
    false,
    /\.json$/
  )

  const presentations = presentationFiles.keys().map((key) => {
    const res = presentationFiles(key)
    res.slug = key.slice(2, -5)
    return res
  })

  await commit('setPresentations', presentations)
}

export const actions = {
  async nuxtServerInit({ commit }) {
    await blog(commit)
    await pres(commit)
  }
}
