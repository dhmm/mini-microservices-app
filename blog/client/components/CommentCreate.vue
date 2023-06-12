<script>
import axios from "axios";
export default {
  	data() {
		return {
			content: ''
		}
	},
  props: [ 'postId' ],	
	methods: {
		createComment() {      
			axios.post('http://localhost:4001/posts/'+this.postId+'/comments', {
				headers: {
					'Content-Type': 'application/json',
          'id' : this.postId
				},
        
				content: this.content
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
    <label for="content">Comment : </label><br>
    <input type="text" v-model="content" name="content"/><br>
    <input @click="createComment" type="button" value="Add comment"/>
  </div>
</template>