<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler()">
		<view class="my-search-box" :style="{'border-radius':radius+'px'}">搜索</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		props:{
			bgcolor:{
				type:String,
				default:'#C00000'
			},
			radius:{
				type:Number,
				default:18
			}
		},
		methods:{
			searchBoxHandler(){
				console.log('component');
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
  .my-search-container{
	  height: 50px;
	  
	  display: flex;
	  align-items: center;
	  padding: 0 10px;
	  .my-search-box{
		  height: 36px;
		  background-color: #FFFFFF;
		  
		  width: 100%;
		  display: flex;
		  justify-content: center;
		  align-items: center;
	  }
  }
</style>