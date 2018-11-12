<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
	import test from './components/Test'
	
export default {
  name: 'app',
	components: {
		test
	},
  data () {
    return {
      
    }
  }
}
</script>

<style lang="stylus">
	@import './stylus/media'

  
</style>
