<template>
	<section>
		<view class="container" style="height:100vh;padding:0rpx">
		<!--垂直滚动，这里必须设置高度-->
			<i-spin custom v-if='refreshLoading'>
				<i-icon type="refresh" size="20" i-class="icon-load"></i-icon>
				<view>Loading</view>
				</i-spin>
			<scroll-view  scroll-y="true" style="height:100vh;" 
				class="list" @scrolltolower="loadMore" @scrolltoupper="refesh"  bindscroll="scroll">
				<section class="item" v-for="(item, index) in dispatchList " :key='index'>
					<div class="text">
						<p class="title">{{item.dec}}</p>
						<p class="description">{{item.dec}}</p>
					</div>
				</section>
			</scroll-view>
			
			<i-spin custom v-if='lodemoreLoading'>加载中...</i-spin>
			

		</view>
	</section>
</template>

<script>
import { postReq } from '../../utils/request.js';
const url = `dispatch/order/mine/pg`;

export default {
	data () {
		return {
			refreshLoading:false,
			lodemoreLoading:false,
			dispatchList:[
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
				{dec:'333'},
			],
			postParam:{
				pageNumber:0,
				pageSize:10
			}
		}
	},
	components: {
	
	},
	mounted(){
		this.getList();
		
		const self = this;
		
	},
	methods: {
		refesh(){
			console.log('refresh')

			this.refreshLoading = true;
			this.getList();
		},
		getList(){
			const self =this;
			postReq(url,self.postParam,(data)=> {
				console.log(data);
			});
		},
		loadMore(){
			this.lodemoreLoading = true;
			console.log('jiazai')
		}
	}
}
</script>

<style scoped>
  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  .loading {
    display: inline-block;
    margin-right: 12px;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    background: transparent;
    border-radius: 50%;
    border: 2px solid #2d8cf0;
    border-color: #2d8cf0 #2d8cf0 #2d8cf0 transparent;
    animation: loading-spin 0.6s linear;
    animation-iteration-count: infinite;
  }

  @keyframes loading-spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
