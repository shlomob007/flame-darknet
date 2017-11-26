import axios from '~/plugins/axios'

export const strict = false

export const state = () => ({
  posts: [
    {
      id: 0,
      topic_content: 'topic_content',
      post_content: 'post_content',
      post_authar: 'post_content'
    }
  ]
})

export const mutations = {
  setPosts (state, posts) {
    state.posts = posts
  },

  async updatePost (state, data) {
    await axios.put(`posts/${data.id}`, data)
    const response = await axios.get('posts/one')
    const post = response.data
    console.log(post)

    const index = state.posts.findIndex((post) => {
      return post.id === data.id
    })
    state.posts.splice(index, 1)

    state.posts.push(post)
  }
}
export const actions = {
  async nuxtServerInit ({commit}) {
    const response = await axios.get('posts/top')
    const posts = response.data

    commit('setPosts', posts)
  }
}
