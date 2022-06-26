<template>
	<view>
		<view class="goods-item">
			<!-- 左 -->
			<view class="goods-item-left">
				<radio :checked="good.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
				<image :src="good.goods_small_logo || defaultPic" class="goods-pic"></image>
			</view>
			<!-- 右 --> 
			<view class="goods-item-right">
				<view class="goods-name">{{good.goods_name}}</view>
				<view class="goods-info-box">
					<view class="goods-price">￥{{good.goods_price | tofixed}}</view>
					<uni-number-box :min="1" :value="good.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name:"my-goods",
		props:{
			good:{
				type:Object,
				default:{}
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				defaultPic:'http://image2.suning.cn/uimg/b2c/newcatentries/0070078057-000000000634917020_1_400x400.jpg'
			};
		},
		methods:{
			radioClickHandler(){
				this.$emit('radio-change',{
					goods_id:this.good.goods_id,
					goods_state:!this.good.goods_state
				})
			},
			numChangeHandler(e){
				this.$emit('num-change',{
					goods_id:this.good.goods_id,
					goods_count:+e
				})
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2); 
			}
		}
	}
</script>

<style lang="scss">
	  .goods-item{
		  display: flex;
		  padding: 10px 5px;
		  border-bottom: 1px solid #DDDDDD;
		  
		  .goods-item-left{
			  margin-right: 5px;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  image{
				  width: 100px;
				  height: 100px;
				  display: block;
				  
			  }
		  }
		  .goods-item-right{
			  display: flex;
			  flex-direction: column;
			  justify-content: space-between;
			  .goods-name{
				  font-size: 13px;
			  }
			  .goods-info-box{
				  display: flex;
				  justify-content: space-between;
				  .goods-price{
					  color: #C00000;
					  font-size: 16px;
				  }
			  }
		  }
	  }
</style>