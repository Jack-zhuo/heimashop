<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserProfile">登录</button>
		<text class="tips-text">首单免费，最高可享10元优惠</text>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['redirectInfo']),
		},
		methods: {
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			async getUserProfile() {
				const [err,res] = await uni.getUserProfile({desc: '登录'});
				
				if (!res) return uni.$showMsg('你取消了授权');
				
				this.updateUserInfo(res);
				
				this.getToken(res);
			},
			async getToken(info){
				console.log(info);
				const [err,res] = await uni.login().catch(err => err);
				
				if (err || res.errMsg !== 'login:ok') return uni.$showMsg('login fail！！')
				console.log(res.code);
				const query = {
					code: res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:JSON.stringify(info.rawData),
					signature:info.signature
				}
				const { data:loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin',query);
				console.log(loginResult);
				if (loginResult.meta.status === 200) return uni.$showMsg('登录失败！')
				this.updateToken('monitokenvalue')
			    this.navigateBack()
			},
			navigateBack(){
				if (this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
					uni.switchTab({
			            url:this.redirectInfo.from,
			            complete:() => {
				            this.updateRedirectInfo(null);
			            }
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
		position: relative;
		overflow: hidden;

		&::after {
			position: absolute;
			content: ' ';
			width: 100%;
			height: 40px;
			background-color: #f8f8f8;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			transform: translateY(50%);

		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
