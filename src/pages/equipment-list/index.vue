<template>
	<section>
		<section v-show='!external'>
			<section class="item" v-for="(item, index) in equipmentList " @click='handleToDispatchDetails(index)' :key='index'>
				<equipment-card :equipmentItem='item' ></equipment-card>
			</section>
			
		</section>
		<section v-show='external'>
			<section class="item" v-for="item in externaleQuipmentList " :key="item.id">
				<list-card :equipmentItem='item'></list-card>
			</section>
			
			<section >
				<i-page :current="externalParam.pageNumber+1" total="5" @change="handleChange">
					<view slot="prev">
						<i-icon type="return"></i-icon>
						上一页
					</view>
					<view slot="next">
						下一页
						<i-icon type="enter"></i-icon>
					</view>
				</i-page>
			</section>
		</section>
		
		
	</section>
</template>

<script>
import { postReq } from '../../utils/request.js';
import equipmentCard from './components/equipment-card';
import listCard from './components/list-card';
export default {
	data () {
		return {
			equipmentList:[
	
			],
			external:false,
			externaleQuipmentList:[],
			externalParam:{
				pageSize: 10,
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
		getList(){
			const url = 'external/pg'
			postReq(url,this.externalParam,(data)=> {
				if(data.code==200){
					this.externaleQuipmentList = data.content.data;
					this.total = data.content.rowCount;
				}
			});
		},
		handleChange(){

		}
	}
}
</script>

<style >
.item{
	width:100%;
}


</style>
