

<template>
    <section  >
        <div class='search-wrap'>
            <div class="input-wrap">
                <i-input  
                    :value="searchValue"  
                    autofocus 
                    @change='changeSearchValue'
                    :placeholder="placeholder" 
                />
            </div>
            <div class="icon-wrap">
                <i-icon 
                    @click='handleScan'
                    type="scan" 
                    size="30"
                /> 
                <span style='margin-left:5px;'>确定 </span>
            </div>
        </div>
        <div class='list-wrap' v-if='searchType==1'>
            <i-cell-group>
                <i-cell  v-for="(item) in serialNumberList " :key='item.id'>2222</i-cell>
                
            </i-cell-group>
        </div>
         <div class='list-wrap' v-if='searchType==2'>
            <i-cell-group>
                <i-cell  v-for="(item) in serialNumberList " :key='item.id'>2222</i-cell>
                
            </i-cell-group>
        </div>
    </section>
</template>
<script >
import {  postReq } from '../../utils/request.js';
const serialNumberListUrl = 'sensors/list';
export default {
    components: {},

    props: {},

    data() {
        return {
            placeholder:'输入传感器编号',
            searchValue:'',
            searchType:'',//1传感器2物联卡
            serialNumberJson :{
                keyWords:'equipment_info',
                serialNumber:'',
                stockState:'DELIVERY'
            },
            serialNumberList:[],//  传感器数据
        }

    },
    onLoad: function (options) {
        console.log(options.type);
        this.searchType = options.type;
        if(this.searchType == 1 && !this.searchValue){
            this.getSerialNumberList();
        }
    },
    watch: {},

    methods: {
        handleSubmit() {
           
        },
        getSerialNumberList(){
            postReq(serialNumberListUrl, this.serialNumberJson, (data) => {
                console.log(data)
            })
        },
        handleScan(){
            wx.scanCode({
                success: (res) => {
                    // 扫码成功后获取数据返回
                    this.searchValue = res.result;
                }
            })
        },
        changeSearchValue(e){
            this.searchValue = e.target.detail.value;
            // 传感器编号
            if(this.searchType == 1) {
                this.serialNumberJson.serialNumber = this.searchValue;
                this.getSerialNumberList();
            }
            // 物联卡编号
        },
    },

    mounted() {},

}
</script>

<style scoped>
.list-wrap{
    height:90vh;
    overflow-y: scroll;
    overflow-x: hidden;
}
.input-wrap{
    width:75%;
    display:inline-block;
    border:1px solid #e6e6e6;
    /* margin-left:3px; */
    border-radius: 5px;
}
.icon-wrap{
    width:20%;
    display:inline-block;
}



.search-wrap{
    padding:5px 5px 0 ;
    line-height: 30px;
    /* height:30px; */
    color:#1296db;
}

</style>
