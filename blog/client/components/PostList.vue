<script>
	export default {
		data() 
		{
			return {
				posts : []
			}
		},
		methods: {
			async getData() {
				const res = await fetch("http://localhost:4000/posts");
				const finalRes = await res.json();
				this.posts = finalRes;
			}
		},
    mounted() {
      this.getData()
    }	
	}
</script>

<template>
 	<div>
 		Post List 
 		<ul>
 			<li v-for="post in this.posts">{{ post.title }}</li>
 		</ul>
 	</div>
</template>