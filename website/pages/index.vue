<template>
  <div>
    <div class="code" v-for="post in posts" :key="post.id">
      {{post.id}}<br/>
      {{post.topic_content}}<br/>
      {{post.post_content}}<br/>
      {{post.post_authar}}<br/>
      {{post.url}}
      <button @click="$store.commit('updatePost', {id: post.id, flag: 1})">Like</button>
      <button @click="$store.commit('updatePost', {id: post.id, flag: 0})">Not Like</button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: mapState(['posts'])
}
</script>

