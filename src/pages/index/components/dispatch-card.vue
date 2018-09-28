<template>
    <section class='dispatch-card' >
        <i-row class='item'>
            <i-col span="8" i-class="col-class">派工单编号:</i-col>
            <i-col span="16" i-class="col-class">{{dispatchInfo.dispatchNumber}}</i-col>
        </i-row>
        <i-row class='item'>
            <i-col span="8" i-class="col-class">派工类型:</i-col>
            <i-col span="16" i-class="col-class">{{dispatchInfo.dispatchTypeText}}</i-col>
        </i-row>
        <i-row class='item'>
            <i-col span="8" i-class="col-class">派工地址:</i-col>
            <i-col span="16" i-class="col-class">{{dispatchInfo.dispatchAddress}}</i-col>
        </i-row>
    </section>
</template>

<script>
export default {
    components: {},

    props: {
        dispatchInfo:{
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
    .dispatch-card{
        width: 86%;
        border-radius: 5px;
        padding:15px;
        border: 1px solid #e6e6e6;
        margin: 10px auto;
        box-shadow:0px 0px 5px #ccc;
        border-left:5px solid #2d8cf0;
    }
    .item{
        height:30px;
        line-height: 30px;
        color:#495060;
    }
</style>
