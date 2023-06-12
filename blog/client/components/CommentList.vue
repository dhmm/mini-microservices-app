<script>
export default {
  data() {
    return {
      comments: []
    }
  },
  props: [ 'postId' ],	
  methods: {
    async getData() {
      const res = await fetch("http://localhost:4001/posts/"+this.postId+"/comments");
      const finalRes = await res.json();
      this.comments = finalRes;
    }
  },
  mounted() {
    this.getData()
  }	
}
</script>

<template>
  <div>
    <ul>
      <li v-for="comment in this.comments">{{comment.content}}</li>
    </ul>
  </div>
</template>