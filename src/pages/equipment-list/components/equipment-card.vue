<template>
    <section class='equipment-card' >
        <div class="item">
            <div class="left">设备序列号:</div>
            <div class="right">{{equipmentItem.equipmentNumber}}</div>
        </div>
        <div class="item">
            <div class="left">物联卡编号:</div>
            <div class="right">{{equipmentItem.cardNumber}}</div>
        </div>
        <div class="item">
            <div class="left">传感器编号:</div>
            <div class="right">{{equipmentItem.sensorNumber}}</div>
        </div>
    </section>
</template>

<script>
export default {
    components: {},

    props: {
        equipmentItem:{
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
    .equipment-card{
        width: 86%;
        border-radius: 5px;
        padding:15px;
        border: 1px solid #e6e6e6;
        margin: 1vh auto;
        box-shadow:0px 0px 5px #ccc;
    }
    .item{
        width:100%;
        height:30px;
        line-height: 30px;
        color:#495060;
    }
    .item .left{
        width:40%;
        display: inline-block;
        vertical-align: middle;
    }
    .item .right{
        width:50%;
        display: inline-block;
        vertical-align: middle;
    }
</style>
