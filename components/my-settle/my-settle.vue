<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullChecked" /><text>全选</text>
		</label>

		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{totalPrice}}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">结算（{{checkedCount}}）</view>

	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
               second:3,
			   timer:null
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total','totalPrice']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token']),
			

			isFullChecked() {
				return this.checkedCount === this.total;
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			...mapMutations('m_user',['updateRedirectInfo']),
			changeAllState(){
				this.updateAllGoodsState(!this.isFullChecked);
			},
			settlement(){
				if (this.checkedCount === 0) return uni.$showMsg('请选择要结算的商品！');
				if (!this.addstr) return uni.$showMsg('请选择收获地址！');
				if (!this.token) return this.delayNavigate(); 
			},
			delayNavigate(){
				this.showTips(this.second)
				
				this.timer = setInterval(() => {
					this.second--;
					
					if (this.second <= 0){	
						clearInterval(this.timer)
						uni.switchTab({
							url:'/pages/my/my',
							success:()=>{
								this.updateRedirectInfo({
									openType:'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
						return
					}
                    this.showTips(this.second)
				},1000)
			},
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请登录后再结算！'+n+'秒后，自动跳转到登录页面',
					mask:true,
					duration:1500
				})
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 50px;
		width: 100%;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: space-between;

		font-size: 14px;
		padding-left: 5px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #c00000;
			}
		}

		.btn-settle {
			background-color: #c00000;
			color: white;
			height: 50px;
			min-width: 100px;
			line-height: 50px;
			text-align: center;

		}
	}
</style>
