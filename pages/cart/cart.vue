<template>
	<view>
		<view v-if="cart.length === 0" class="cart-empty">购物车空空如也~~</view>
		<view class="cart-content" v-else>
			<my-address></my-address>
			<view class="cart-title">
				<uni-icons type="shop" size="18"></uni-icons>
				<text class="cart-title-text">购物车</text>
			</view>
			
			<uni-swipe-action>
				<block v-for="(item,i) in cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
						<my-goods :good="item" :showRadio="true" :showNum="true" @radio-change='radioChangeHandler' @num-change='numChangeHandler'></my-goods>
					</uni-swipe-action-item>
				</block> 
			</uni-swipe-action>      
			
			<my-settle></my-settle>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				options:[{
					text:'删除',
					style:{
						backgroundColor:'#c00000'
					}
				}]
                 
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState','updateGoodsNum','removeGoodsById']),
			radioChangeHandler(e) {
				console.log(e);
				this.updateGoodsState(e);
			},
			numChangeHandler(e) {
				console.log(e);
				this.updateGoodsNum(e);
			},
			swipeActionClickHandler(e){
				this.removeGoodsById(e);
			}
		},
		computed: {
			...mapState('m_cart', ['cart'])
		},
		


	}
</script>

<style lang="scss">
	.cart-empty{
		display: flex;
		justify-content: center;
		padding-top: 150px;
	}
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
	.cart-content{
		padding-bottom: 50px;
	}
</style>
