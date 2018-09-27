<template>
    <section class='list-card' >
        <div class="item">
            <div >序列号:<span>{{equipmentItem.equipmentNumber}}</span>  </div>
        </div>
        <div class="item">
            <div class="left">设备状态:<span>{{equipmentItem.equipmentStatusText}}</span></div>
            <div class="right">物联卡状态:<span>{{equipmentItem.iotCardStatusText}}</span></div>
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
                    equipmentNumber:'233232',
                    cardNumber:'2233232',
                    sensorNumber:'sensorNumber'
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

    mounted() {
        
    },

}
</script>

<style  scoped>
    .list-card{
        width: 86%;
        border-radius: 5px;
        padding:15px;
        border: 1px solid #e6e6e6;
        margin: 1vh auto;
        box-shadow:0px 0px 5px #ccc;
        border-left:5px solid #2d8cf0;
    }
    .item{
        width:100%;
        min-height:30px;
        line-height: 30px;
        color:#495060;
    }
    .item span{
        padding:0 2vw;
    }
    .item:first-child{
        font-size: 4.5vmin;
    }
    .item:last-child{
        font-size: 3vmin;
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
