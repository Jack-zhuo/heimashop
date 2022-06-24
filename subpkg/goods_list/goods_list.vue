<template>
	<view>
		<view class="goods-list">
			<view v-for="(good,i) in goodsList" :key="i" @click="gotoDetail(good)">
				<my-goods :good="good"></my-goods>
			</view>
		</view>
	</view>
</template>
    
<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10 
				},
				goodsList:[],
				total:0,
				isloading:false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || '';
			this.queryObj.cid = options.cid || '';
			
			this.getGoodsList();
		},
		onReachBottom() {
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg("我是有底线的！！")
			if(this.isloading) return;
			this.queryObj.pagenum++;
			this.getGoodsList(); 
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1;
			this.total = 0;
			this.isloading = false;
			this.goodsList = [];
			
			this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		methods:{
			async getGoodsList(cb){
				this.isloading = true;
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj);
				this.isloading = false;
				cb && cb();
				console.log(res); 
				if (res.meta.status !== 200) return uni.$showMsg();
				this.goodsList = [...this.goodsList,...res.message.goods];
				this.total = res.message.total;
			},
			gotoDetail(e){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+e.goods_id      
				})  
			}
		} 
	}
</script>

<style lang="scss">
  
</style>
