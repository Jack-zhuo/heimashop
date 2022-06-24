<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<view class="sugg-list">
			<view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="30"></uni-icons>
			</view>
		</view>
		<view class="history-box">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean()"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				searchResults: [],
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]');
		}, 
		computed: {
			histories() {
				return [...this.historyList].reverse();
			}
		},
		methods: {
			input(e) {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => { 
					this.kw = e;
					this.getSearchList();
				}, 500)
			},
			async getSearchList() {
				if (this.kw.length === 0) {
					this.searchResults = [];
					return
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.kw
				});
				if (res.meta.status !== 200) return uni.$showMsg();
				console.log(res)
				this.searchResults = res.message;
				this.saveSearchHistory();
			},
			gotoDetail(e) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + e.goods_id
				})
			},
			saveSearchHistory() {
				const set = new Set(this.historyList);
				set.delete(this.kw);
				set.add(this.kw);
				this.historyList = Array.from(set);
				
				uni.setStorageSync('kw',JSON.stringify(this.historyList));
			},
			clean(){
				this.historyList = [];
				uni.setStorageSync('kw','[]');
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+item
				})
			}
		}
	}
</script>

<style lang="scss">
	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid gray;
		}

		.history-list {
			.uni-tag {
				margin: 4px;
			}
		}
	}
</style>
