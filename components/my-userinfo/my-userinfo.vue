<template>
	<view class="my-userinfo-container">
		<view class="top-box">
			<image class="avatar" :src="userinfo.userInfo.avatarUrl"></image>
			<view class="nickname">{{userinfo.userInfo.nickName}}</view>
		</view>
		<!-- 面板列表 -->
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>9</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- the second panel -->
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon2.png"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- the third panel -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="right" size="15"></uni-icons> 
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="right" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="right" size="15"></uni-icons>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['userinfo']),
		},
		methods:{
			...mapMutations('m_user',['updateAddress','updateToken','updateUserInfo']),
			async logout(){
				const [err,succ] = await uni.showModal({
					title:'提示',
					content:'确定要退出吗？'
				}).catch(err => err )
				console.log(succ) 
				if(succ && succ.confirm){
					this.updateAddress({})
					this.updateUserInfo({})
					this.updateToken('')
				}
			
			},
			
		}
	}
</script>

<style lang="scss">
 .my-userinfo-container{
	 background-color: #f4f4f4;
	 height: 100%;
	 .top-box{
		 height: 400rpx;
		 background-color: #C00000;
		 display: flex;
		 flex-direction: column;
		 align-items: center;
		 justify-content: center;
		 
		 .avatar{
			 width: 90px;
			 height: 90px;
			 border-radius: 45px;
			 border:2px solid white;
			 box-shadow: 0 1px 5px black;
		 }
		 .nickname{
			 font-size: 16px;
			 font-weight: bold;
			 color: white;
			 margin-top: 10px;
		 }
	 }
 }
 .panel-list{
	 padding: 0 10px;
	 position: relative;
	 top: -10px;
	 .panel{
		 background-color: white;
		 border-radius: 3px;
		 margin-bottom: 8px;
		 .panel-title{
			 line-height: 45px;
			 padding-left: 10px;
			 font-size: 15px;
			 border-bottom: 1px solid #f4f4f4;
		 }
		 .panel-body{
			 display: flex;
			 justify-content: space-around;
			 .panel-item{
				 display: flex;
				 flex-direction: column;
				 justify-content: space-around;
				 align-items: center;
				 padding: 10px 0;
				 font-size: 13px;
				 image{
					 width: 35px;
					 height: 35px;
				 }
			 }
		 }
	 }
 }
 .panel-list-item{
	 display: flex;
	 justify-content: space-between;
	 align-items: center;
	 font-size: 15px;
	 padding: 0 10px;
	 line-height: 45px;
 }
 
</style>