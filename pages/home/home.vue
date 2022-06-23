<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: []
			};
		},
		onLoad() {
			this.getSwiperList(),
			this.getNavList();
		},
		methods: {
          async getNavList(){
			   const { data:res } = await uni.$http.get('/api/public/v1/home/catitems');
			   if (res.meta.status !== 200) return uni.$showMsg();
			   this.navList = res.message;
			   uni.$showMsg("数据请求成功！");
		   },
			async getSwiperList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMsg();
				this.swiperList = res.message;
				uni.$showMsg("数据请求成功");
			},
			navClickHandler(item){
				console.log(item)
               if (item.name === '分类'){
				   uni.switchTab({
				   	url:'/pages/cate/cate'
				   })
			   }
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
		.nav-img{
			width: 128rpx;
			height: 140rpx;
		}
	}
</style>
