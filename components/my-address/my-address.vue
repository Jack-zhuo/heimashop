<template>
	<view>
		<!-- 选择收获地址的盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收获地址+</button>
		</view>
		<!-- 收获地址盒子 -->
		<!-- cityName: "广州市"
		countyName: "海珠区"
		detailInfo: "新港中路397号"
		errMsg: "chooseAddress:ok"
		nationalCode: "510000"
		postalCode: "510000"
		provinceName: "广东省"
		telNumber: "020-81167888"
		userName: "张三" -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：<text>{{address.userName}}</text></view>
				</view>
				<view class="row1-right">
					<view class="phone">手机号：<text>{{address.telNumber}}</text></view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址:</view>
				<view class="row2-right">{{addstr}}</view>
			</view>
			<view class="row2"></view>
		</view>
		<!-- 底部边框线 -->
		<image src="/static/cart_border@2x.png" class="adress-border"></image>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				// address:{}
			};
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addstr'])
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			async chooseAddress(){
				const [err,succ] = await uni.chooseAddress().catch(err => err);
				if (err === null && succ.errMsg === 'chooseAddress:ok'){
					console.log(succ);
					// this.address = succ;
					this.updateAddress(succ);
				}
			}
		}
	}
</script>

<style lang="scss">
	.address-choose-box{
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address-info-box{
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;
		.row1{
			display: flex;
			justify-content: space-between;
			.row1-left{
				.username{
					
				}
			}
			.row1-right{
				display: flex;
				.phone{
					
				}
			}
		}
		.row2{
			display: flex;

			margin-top: 10px;
			margin-bottom: 5px;
			.row2-left{
				white-space: nowrap;
			}
			.row2-right{
				
			}
		}
	}
	.adress-border{
		display: block;
		width: 100%;
		height: 5px;
	}
   
</style>