

<template>
    <section>
        <div class='search-wrap'>
            <div class="input-wrap">
                <i-input  
                    :value="companyName"  
                    autofocus 
                    @change='changecompanyName'
                    :placeholder="placeholder" 
                />
            </div>
        </div>
        <div class='list-wrap' >
            <i-cell-group>
                <i-cell  
                    v-for="item in customerList " 
                    @click='selectContent(item)' 
                    :key='item.id'>{{item.companyName}}</i-cell>
                
            </i-cell-group>
        </div>
        
    </section>
</template>
<script >
import { postReq } from '../../../utils/request.js';
const customerListUrl = 'external/company/list';
export default {
    components: {},

    props: {
        customerName:{
            type:String,
            default:''
        }
    },

    data() {
        return {
            placeholder:'输入客户',
            companyName:'',
            customerList:[],//  传感器数据
        }

    },
   
    watch: {},

    methods: {
        
        
        getcustomerList(){
            postReq(customerListUrl, {companyName:this.companyName}, (data) => {
                data.code == 200 ? this.customerList = data.content : [];
            }, true);
        },
        
        changecompanyName(e){
            this.companyName = e.target.detail.value;
            this.getcustomerList();
           
        },
        selectContent(item){
            this.companyName = item.companyName;
            this.$emit('selectCompanyName',item);
        }
        
    },

    mounted() {
        this.companyName = this.customerName;
    },

}
</script>

<style scoped>
.list-wrap{
    height:90vh;
    overflow-y: scroll;
    overflow-x: hidden;
}
.input-wrap{
    width:95%;
    margin: 0 auto;
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
