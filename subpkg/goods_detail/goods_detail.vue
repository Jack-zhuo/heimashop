<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区 -->
		<view class="goods-info-box">
			<view class="price"><text>￥{{goods_info.goods_price}}</text></view>
			<view class="goods-info-body">
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<text class="yf">运费：免运费</text>
		</view>
		<!-- 详情页 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 底部导航栏 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>  

<script>
	import { mapState,mapMutations,mapGetters } from 'vuex'
	export default {
		computed: {
			...mapGetters('m_cart',['total'])
			// total(state){
			// 	let c = 0;
			// 	state.cart.forEach(x => c += x.goods_count);
			// 	return c;
			// }
		},
		watch:{
			// total(newValue){
			// const findResult = this.options.find(x => x.text === '购物车');
			// if (findResult){
			// 	findResult.info = newValue
			// }	
			// }
			total:{
				handler(newValue){
					const findResult = this.options.find(x => x.text === '购物车');
					if (findResult){
						findResult.info = newValue
					}	
				},
				immediate:true
			}
		},
		data() {
			return {
				goods_info:{},
				 options: [{
							icon: 'headphones',
							text: '客服'
						}, {
							icon: 'shop',
							text: '店铺',
							info: 2,
							// infoBackgroundColor:'#007aff',
							// infoColor:"red"
						}, {
							icon: 'cart',
							text: '购物车',
							info: 0
						}],
					    buttonGroup: [{
					      text: '加入购物车',
					      backgroundColor: '#ff0000',
					      color: '#fff'
					    },
					    {
					      text: '立即购买',
					      backgroundColor: '#ffa200',
					      color: '#fff'
					    }
					    ]
			}
		},
		onLoad(options) {
		const goods_id = options.goods_id;
		this.getGoodsDetail(goods_id);
		},
		methods: {
			...mapMutations('m_cart',['addToCart']),
			async getGoodsDetail(goods_id){
				const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id});
				if (res.meta.status !== 200) return uni.$showMsg();
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,'<img style="display:block;"').replace(/webp/g,'jpg')
				this.goods_info = res.message;
			},
			preview(i){
				uni.previewImage({
					current:i,
					urls:this.goods_info.pics.map(x => x.pics_big)
				})
			},
			onClick(e){
				console.log(e);
				if (e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e){
				if (e.index === 0){
					const goods = {
						goods_id:this.goods_info.goods_id,
						goods_name:this.goods_info.goods_name,
						goods_price:this.goods_info.goods_price,
						goods_count:1,
						goods_small_logo:this.goods_info.goods_small_logo,
						goods_state:true
					}
					
					
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
  swiper{
	  height: 750rpx;
	  image{
		  height: 100%;
		  width: 100%;
	  }
  }
  .goods-info-box{
	  padding: 10px; 
	
	  .price{
		  color: #C00000;  
		  font-size: 18px;
		  margin: 10px 0;
	  }
	  .goods-info-body{
		  display: flex;
		  justify-content: space-between;
		  .goods-name{ 
			  font-size: 13px;
			  margin-right: 10px;
		  }
		  .favi{
			  width: 120px;
			  font-size: 12px;
			  display: flex;
			  flex-direction: column;
			  align-items: center;
			  justify-content: center;
			  border-left: 1px solid #000000;
			  color: gray;
		  }
	  }
	  .yf{
		  font-size: 12px;
		  color: gray;
		  margin: 10px 0;
	  }
  }
  .goods_nav{
	  position: fixed;
	  bottom: 0;
	  left: 0;
	  width: 100%;
  }
  .goods-detail-container{
	  padding-bottom: 50px;
  }
</style>
