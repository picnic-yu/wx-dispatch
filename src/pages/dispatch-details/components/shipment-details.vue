<template>
    <section class='dispatch-info' >
        <div class="title">
            领料明细
        </div>
        <i-row class='item'>
            <i-col span="4" i-class="col-class">序号</i-col>
            <i-col span="6" i-class="col-class">库存类型</i-col>
            <i-col span="14" i-class="col-class">库存编号</i-col>
        </i-row>
        <!-- <i-row class='item'>
            <i-col span="9" i-class="col-class">派工单编号:</i-col>
            <i-col span="15" i-class="col-class">{{dispatchInfoData.dispatchNumber}}</i-col>
        </i-row> -->
        
    </section>
</template>

<script>
export default {
    components: {},

    props: {
        shipmentDetailsData:{
            type: Array,
            default: function(){
                return [];
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
