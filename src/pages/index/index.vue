<template>
	<section>
		<section v-if='external'>
			<div class='add-wrap' @click='handleAdd'>
				<span><i-icon type="add" size="28" color="#2d8cf0" /></span>
				<span>添加设备信息</span>
			</div>
			<section class="item" v-for="item in externaleQuipmentList " :key="item.id" @click='handleToEditForm(item)' >
				<list-card :equipmentItem='item'></list-card>
			</section>
		</section>
		<view  v-if='!external' class="container" style="height:100vh;padding:0rpx">
			<!-- 外部用户显示内容 -->
			
			<section>
				<!--垂直滚动，这里必须设置高度-->
				<!-- <i-spin custom v-if='refreshLoading'>
					<i-icon type="refresh" size="20" i-class="icon-load"></i-icon>
					<view>Loading</view>
				</i-spin> -->
				<scroll-view  scroll-y="true" style="height:100vh;width:100vw" 
					class="list" @scrolltolower="loadMore" @scrolltoupper="refesh"  bindscroll="scroll">
					
					<section class="item" v-for="(item, index) in dispatchList " :key='index'>
						<div class="w" @click='handleToDispatchDetails(item)'>
							<dispatch-card :dispatchInfo='item' ></dispatch-card>
						</div>
						
					</section>
				</scroll-view>
				
				<!-- <i-spin custom v-if='lodemoreLoading'>加载中...</i-spin> -->
			</section>
		
			

		</view>
	</section>
</template>

<script>
import { postReq } from '../../utils/request.js';
import dispatchCard from './components/dispatch-card';
import lookupUtils from '../../utils/lookupUtils';
import { lookUpdata } from '../../utils/lookup';

import listCard from '../equipment-list/components/list-card';

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

const transformExternalListData = (item) => {
	//设备状态equipmentStatusLookup
	lookupUtils.transformData(
		item,
		lookUpdata.equipmentStatusLookup,
		'equipmentStatus', 
		'equipmentStatusText'
	);
	// 传感器状态sensorStatusLookup
	lookupUtils.transformData(
		item,
		lookUpdata.sensorStatusLookup,
		'iotCardStatus', 
		'iotCardStatusText'
	);
};
export default {
	data () {
		return {
			refreshLoading:false,
			lodemoreLoading:false,
			dispatchList:[
				
			],
			externaleQuipmentList:[],//外部人员设备信息list
			postParam:{
				pageNumber:0,
				pageSize:10
			},
			externalParam:{
				pageSize: 100,
  				pageNumber: 0,
			},//外部人员 dto
			external:false,
		}
	},
	components: {
		dispatchCard,
		listCard
	},
	mounted(){
		
	},
	onShow:function(option){
		this.external = wx.getStorageSync('external');
		if(!this.external){
			this.getList();
		}else{
			this.getExternalList();
		}
	},
	onHide:() => {
	},
	methods: {
		refesh(){

			this.refreshLoading = true;
			this.getList();
		},
		handleToEditForm(item){
			// 查看页面
			wx.setStorageSync('page', 'index');
			wx.navigateTo({
  				url: `../equipment-info/main?equipmentId=${item.id}`
            })
            // wx.navigateTo({
  			// 	url: `../edit-equipment/main?equipmentId=${item.id}`
            // })
		},
		handleAdd(){
			wx.navigateTo({
  				url: `../equipmentfom-external/main`
            })
		},
		getExternalList(){
			const url = 'external/pg'
			postReq(url,this.externalParam,(data)=> {
				if(data.code==200){
					this.externaleQuipmentList = data.content.data;
					this.externaleQuipmentList.forEach((item) => {
						transformExternalListData(item);
					});
					this.total = data.content.rowCount;
	
				}
			});
		},
		handleToDispatchDetails(item){
			wx.setStorageSync('equipmentIndex', null);
            wx.navigateTo({
  				url: `../dispatch-details/main?id=${item.id}&dispatchNumber=${item.dispatchNumber}`
            })
            
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
				this.dispatchList.forEach((item) => {
					item.dispatchType = item.application.dispatchType;
					transformListData(item);
				});
			});
		},
		loadMore(){
			this.lodemoreLoading = true;
			this.getList(1)
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



/* 外部人员新增样式 */
.add-wrap{
	width: 86%;
	border-radius: 5px;
	padding:15px;
	border: 1px solid #e6e6e6;
	margin: 1vh auto;
	box-shadow:0px 0px 5px #ccc;
	border-left:5px solid #2d8cf0;
}
.add-wrap span:last-child{
	padding:0 0 0 4vw;
}

</style>
