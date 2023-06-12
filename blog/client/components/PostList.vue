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
 			<li style="width:300px;border:1px solid #000; background:#ccc;float:left;margin:5px;padding:5px;list-style:none;" v-for="post in this.posts">
        <h3>{{ post.title }}</h3>
        <CommentList :postId="post.id"/>
        <CommentCreate :postId="post.id"/>
      </li>
 		</ul>
 	</div>
</template>