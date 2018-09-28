<template>
	<section>
		<section v-if='!external'>
			<section class="item" v-for="(item, index) in equipmentList " @click='handleToDispatchDetails(index)' :key='index'>
				<equipment-card :equipmentItem='item' ></equipment-card>
			</section>
			<section class='nodata' v-show='!equipmentList.length'>
				暂无数据
			</section>
		</section>
		<section v-if='external'>
			<section class="item" v-for="item in externaleQuipmentList " :key="item.id" @click='handleToEditForm(item)' >
				<list-card :equipmentItem='item'></list-card>
			</section>
			<section class='nodata' v-show='!externaleQuipmentList.length'>
				暂无数据
			</section>
		</section>
		
		
	</section>
</template>

<script>
import { postReq } from '../../utils/request.js';
import equipmentCard from './components/equipment-card';
import listCard from './components/list-card';
import lookupUtils from '../../utils/lookupUtils';
import { lookUpdata } from '../../utils/lookup'
const url = `dispatch/order/mine/pg`;
const transformListData = (item) => {
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
			equipmentList:[
	
			],
			external:false,
			externaleQuipmentList:[],
			externalParam:{
				pageSize: 100,
  				pageNumber: 0,
			},
			total:0
		}
	},

	components: {
		equipmentCard,
		listCard
	},
	mounted(){
		
	},
	
	onShow:function (options){
		this.external = wx.getStorageSync('external');
		if(this.external){
			this.getList();
		}
		this.equipmentList = wx.getStorageSync('equipmentList') || [];
    },
	methods: {
		handleToDispatchDetails(index){
			wx.setStorageSync('equipmentIndex', index);
            wx.navigateTo({
  				url: `../equipment-form/main`
            })
		},
		handleToEditForm(item){
			// 查看页面
			wx.setStorageSync('page', 'equipment-list');
			wx.navigateTo({
  				url: `../equipment-info/main?equipmentId=${item.id}`
            })
            // wx.navigateTo({
  			// 	url: `../edit-equipment/main?equipmentId=${item.id}`
            // })
		},
		getList(){
			const url = 'external/his/pg'
			postReq(url,this.externalParam,(data)=> {
				if(data.code==200){
					this.externaleQuipmentList = data.content.data;
					this.externaleQuipmentList.forEach((item) => {
						transformListData(item);
					});
					this.total = data.content.rowCount;
	
				}
			});
		}
	}
}
</script>


