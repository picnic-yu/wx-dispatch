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
			<section >
				<i-page :current="externalParam.pageNumber+1" :total="total" @change="handleChange">
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
		handleToEditForm(item){
			
            wx.navigateTo({
  				url: `../edit-equipment/main?equipmentId=${item.id}`
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
		handleChange (detail ) {
			console.log(detail)
			const type = detail.target.type;
			if (type === 'next') {
				this.externalParam.pageNumber +=1 ;
				this.getList();
			} else if (type === 'prev') {
				this.externalParam.pageNumber -=1 ;
				this.getList();
			}
		}
	}
}
</script>


