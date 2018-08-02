<template>
	<section>
		<section class="item" v-for="(item, index) in equipmentList " @click='handleToDispatchDetails(index)' :key='index'>
			<equipment-card :equipmentItem='item' ></equipment-card>
		</section>
	</section>
</template>

<script>
import equipmentCard from './components/equipment-card';
export default {
	data () {
		return {
			equipmentList:[
				{
					equipmentNumber:'232332342323232323',
					cardNumber:'2232232323323232',
					sensorNumber:'32123233232323232'
					
				}
			],
		}
	},
	components: {
		equipmentCard
	},
	mounted(){
		
	},
	onLoad:function (options){

        wx.getStorage({
            key: 'equipmentList',
            success: (res) => {
				this.equipmentList = res.data;
				console.log(this.equipmentList);
            } 
        })
    },
	methods: {
		handleToDispatchDetails(index){
			wx.setStorageSync('equipmentIndex', index);
            wx.navigateTo({
  				url: `../equipment-form/main`
            })
        },
	}
}
</script>

<style scoped>
.item{
	width:100%;
}


</style>
