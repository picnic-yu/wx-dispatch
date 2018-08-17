<template>
    <section class='list-card' >
        <div class="item">
            <div class="left">设备序列号:</div>
            <div class="right">{{equipmentItem.equipmentNumber}}</div>
        </div>
        <!-- <div class="item">
            <div class="left">客户名称:</div>
            <div class="right">{{equipmentItem.customerCompany.companyName}}</div>
        </div> -->
        <div class="item">
            <div class="left">设备型号:</div>
            <div class="right">{{equipmentItem.equipmentModel}}</div>
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
        console.log(this.equipmentItem,'equipmentItem')
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
    }
    .item{
        width:100%;
        min-height:30px;
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
