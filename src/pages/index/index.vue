<template>
	<section>
		<view class="container" style="height:100vh;padding:0rpx">
		<!--垂直滚动，这里必须设置高度-->
			<!-- <i-spin custom v-if='refreshLoading'>
				<i-icon type="refresh" size="20" i-class="icon-load"></i-icon>
				<view>Loading</view>
			</i-spin> -->
			<scroll-view  scroll-y="true" style="height:100vh;width:100%" 
				class="list" @scrolltolower="loadMore" @scrolltoupper="refesh"  bindscroll="scroll">
				
				<section class="item" v-for="(item, index) in dispatchList " :key='index'>
					<dispatch-card :dispatchInfo='item'></dispatch-card>
				</section>
			</scroll-view>
			
			<!-- <i-spin custom v-if='lodemoreLoading'>加载中...</i-spin> -->
			

		</view>
	</section>
</template>

<script>
import { postReq } from '../../utils/request.js';
import dispatchCard from './components/dispatch-card';
import lookupUtils from '../../utils/lookupUtils';
import { lookUpdata } from '../../utils/lookup'
const url = `dispatch/order/mine/pg`;
const transformListData = (item) => {
		//DispatchTypeLookup 派工类型
		lookupUtils.transformData(
			item,
			lookUpdata.DispatchTypeLookup,
			'dispatchType', 
			'dispatchTypeText'
		);
	};
export default {
	data () {
		return {
			refreshLoading:false,
			lodemoreLoading:false,
			dispatchList:[
				
			],
			postParam:{
				pageNumber:0,
				pageSize:10
			}
		}
	},
	components: {
		dispatchCard
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
		// flag == 1 加载更多
		getList(flag){
			const self =this;
			if(flag){
				this.postParam.pageNumber +=1;
			}else{
				this.postParam.pageNumber = 0;
			}
			postReq(url,self.postParam,(data)=> {
				if(flag){
					this.dispatchList.push(...data.content.data);
				}else{
					this.dispatchList = data.content.data;
				}
				
				console.log(this.dispatchList)
				console.log(data);
				this.dispatchList.forEach((item) => {
					item.dispatchType = item.application.dispatchType;
					transformListData(item);
				});
			});
		},
		loadMore(){
			this.lodemoreLoading = true;
			this.getList(1)
			console.log('jiazai')
		}
	}
}
</script>

<style scoped>
.item{
	width:100%;
}
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
