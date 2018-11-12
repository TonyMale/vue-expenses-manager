<template>
	<div id="test">
	<span>{{message}}</span>
	<span>{{reverseMessage}}</span>
		
		
	</div>
</template>


<script>
	export default {
		name: 'test',
		data(){
			return{
				message: 'Hello!'
			}	
		},
		computed:{
			reverseMessage(){
				return this.message.split('').reverse().join('')
			}
		}
	}
</script>


<style>
	#test{
		color:red;
	}
</style>