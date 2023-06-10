<script>
import axios from "axios";
export default {
	data() {
		return {
			title: ''
		}
	},
	props: [ ],	
	methods: {
		createPost() {
			axios.post('http://localhost:4000/posts', {
				headers: {
					'Content-Type': 'application/json',
				},
				title: this.title
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
			
		}
	}
}
</script>

<template>
  <div>
    <h1>Create Post</h1>
		<p>
			<label>Title</label>
		</p>
		<p>		
			<input v-model="title" type="text" name="title"/>
		</p>
		<p>
			<input @click="createPost" type="submit"/>
		</p>
		<hr>
  </div>
</template>