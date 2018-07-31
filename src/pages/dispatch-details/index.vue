<template>
    <section class='dispatch-details'>
        <div class="details-wrap">
            <dispatch-info :dispatchInfoData='dispatchInfoData' ></dispatch-info>
            <shipment-details  ></shipment-details>
        </div>
        <div class="btn-wrap">
            <i-button @click='handleAddEquipment' type='primary'>添加设备</i-button>
        </div>
    </section>
</template>

<script >
import { getReq, postReq } from '../../utils/request.js';
import dispatchInfo from './components/dispatch-info';
import shipmentDetails from './components/shipment-details';
import lookupUtils from '../../utils/lookupUtils';
import { lookUpdata } from '../../utils/lookup'

const transformListData = (item) => {
		//DispatchTypeLookup 派工类型
    lookupUtils.transformData(
        item,
        lookUpdata.DispatchTypeLookup,
        'dispatchType', 
        'dispatchTypeText'
    );
    // fromType
    lookupUtils.transformData(
        item,
        lookUpdata.ShipmentFromTypeLookup,
        'fromType', 
        'fromType'
    );
};
export default {
    components: {
        dispatchInfo,       //基本信息组件
        shipmentDetails,    //领料明细组件
    },

    props: {},

    data() {
        return {
            dispatchInfoData:{},        //基本信息数据
        }

    },

    watch: {},

    methods: {
        handleAddEquipment() {
            wx.navigateTo({
  				url: '../equipment-form/main'
			})
            console.log('添加设备')
        }
    },

    mounted() {},
    onLoad: function (options) {
        // ID查询派工单
        // /dispatch/order/{dispatchOrderId}
        const url = `dispatch/order/${options.id}`; 
        const shipmentDetailsUrl = `dispatch/order/info`
        const dispatchNumber = options.dispatchNumber;
        console.log(options);
        getReq(url, (data) => {
            transformListData(data.content);
            data.code == 200 ? this.dispatchInfoData = data.content: this.dispatchInfoData = {}
            
            console.log(data);
        });
        postReq(shipmentDetailsUrl,{dispatchNumber:dispatchNumber},(data) => {
            console.log(data)
        });
    }
}
</script>

<style  scoped>
.details-wrap{
    height:88vh;
    overflow-y: scroll;
    overflow-x: hidden;
}
.btn-wrap{
    height:10vh;
}
</style>
