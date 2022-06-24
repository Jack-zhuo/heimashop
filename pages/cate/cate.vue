<template>
	<view>
        <my-search :bgcolor="'green'" :radius="10" @click="gotoSearch()"></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滚动区 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh +'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-scroll-item',i === active?'active':'']" @click="changedClick(i)" >{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧滚动区 -->
			<scroll-view scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrollTop">
				<view v-for="(item2,i2) in cateLevel2" :key="i2">
					<view class="title">{{item2.cat_name}}</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
               wh:0,
			   cateList:[],
			   active:0,
			   cateLevel2:[],
			   scrollTop:0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync();
			this.wh = sysInfo.windowHeight - 50;
			this.getCateList();
		},
		methods:{ 
			async getCateList(){
				const { data: res } = await uni.$http.get('/api/public/v1/categories');
				console.log(res); 
				if (res.meta.status !== 200) return uni.$showMsg();
				this.cateList = res.message; 
				this.cateLevel2 = res.message[0].children;
				uni.$showMsg('数据请求成功'); 
			},
			changedClick(i){
				this.active = i;
				this.cateLevel2 = this.cateList[i].children;
			    this.scrollTop = this.scrollTop === 0?1:0;
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?cid='+item.cat_id 
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search' 
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
		
		.left-scroll-view{
			width: 120px;
			.left-scroll-item{
				line-height: 60px;
				text-align: center;
				font-size: 12px;
				&.active{
					background-color: red;
				    color: white;
				}
			}
		}
	}
	.title{
		font-size: 12px;
		text-align: center;
		padding:15px 0;
	}
	.cate-lv3-list{
		display: flex;
		flex-wrap: wrap;
		.cate-lv3-item{
			width: 33.33%;
			display: flex;
			flex-direction:column;
			justify-content: center;
			align-items: center;
			image{
				width: 60px;
				height: 60px;
			}
			text{
				font-size: 12px;
			}
		}
	}
</style>
