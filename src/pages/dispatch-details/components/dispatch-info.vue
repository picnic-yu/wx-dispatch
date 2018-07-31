<template>
    <section class='dispatch-info' >
        <div class="title">
            基本信息
        </div>
        <i-row class='item'>
            <i-col span="9" i-class="col-class">客户公司:</i-col>
            <i-col span="15" i-class="col-class">{{dispatchInfoData.companyName}}</i-col>
        </i-row>
        <i-row class='item'>
            <i-col span="9" i-class="col-class">派工单编号:</i-col>
            <i-col span="15" i-class="col-class">{{dispatchInfoData.dispatchNumber}}</i-col>
        </i-row>
        <i-row class='item'>
            <i-col span="9" i-class="col-class">派工类型:</i-col>
            <i-col span="15" i-class="col-class">{{dispatchInfoData.dispatchTypeText}}</i-col>
        </i-row>
        <i-row class='item'>
            <i-col span="9" i-class="col-class">订单来源:</i-col>
            <i-col span="15" i-class="col-class">{{dispatchInfoData.fromType}}</i-col>
        </i-row>
        <i-row class='item'>
            <i-col span="9" i-class="col-class">期望派工时间:</i-col>
            <i-col span="15" i-class="col-class">{{dispatchInfoData.fromType}}</i-col>
        </i-row>
        <i-row class='item'>
            <i-col span="9" i-class="col-class">派工地址:</i-col>
            <i-col span="15" i-class="col-class">{{dispatchInfoData.dispatchAddress}}</i-col>
        </i-row>
        <i-row class='item'>
            <i-col span="9" i-class="col-class">安装公司名称:</i-col>
            <i-col span="15" i-class="col-class">{{dispatchInfoData.installCustomer}}</i-col>
        </i-row>
        <i-row class='item'>
            <i-col span="9" i-class="col-class">联系人:</i-col>
            <i-col span="15" i-class="col-class">{{dispatchInfoData.contacts}}</i-col>
        </i-row>
        <i-row class='item'>
            <i-col span="9" i-class="col-class">联系方式:</i-col>
            <i-col span="15" i-class="col-class">{{dispatchInfoData.contactInfo}}</i-col>
        </i-row>
    </section>
</template>

<script>
export default {
    components: {},

    props: {
        dispatchInfoData:{
            type: Object,
            default: function(){
                return{
                    
                };
            }
        }
    },

    data() {
        return {

        }

    },

    watch: {},

    methods: {

        
    },

    mounted() {},

}
</script>

<style  scoped>
    .dispatch-info{
        width: 86%;
        border-radius: 5px;
        padding:15px;
        border: 1px solid #e6e6e6;
        margin: 1vh auto;
        box-shadow:0px 0px 5px #ccc;
    }
    .title{
        border-left:5px solid green;
        height:3.5vh;
        line-height: 3.5vh;
        padding:0 2vw ;
        margin-bottom: 1vh;
    }
    .item{
        height:auto;
        height:6vh;
        line-height: 6vh;
        /* margin: 2vh 0; */
        color:#495060;
    }
</style>
