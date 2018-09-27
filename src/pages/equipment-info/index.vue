<template>
    <section class='card-wrap'>
        <section class='info-wrap'>
            <i-row class='item'>
                <i-col span="8" i-class="col-class">设备序列号:</i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.equipmentNumber}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class">客户名称:</i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.factoryName}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class">设备名称:</i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.equipmentNameText}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class">IMEI:</i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.imei}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class">设备型号:</i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.equipmentModel}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class">系统厂牌:</i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.systemLabel}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class">系统版本:</i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.systemVersion}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class">IP地址:</i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.ip}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class">端口号:</i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.port}}</i-col>
            </i-row>
        </section>
        
        <section  >
            <div class='img-title'>图片信息</div>
            <image :src='equipmentInfo.equipmentImage' alt="图片丢失"></image>
            <i-row class='item'>
                <i-col span="12" i-class="col-class">
                    <i-button @click='handleDelete' type='error '>删除</i-button>
                </i-col>
                <i-col span="12" i-class="col-class">
                    <i-button @click='handleUpdate' type='primary'>修改</i-button>
                </i-col>
            </i-row>
            
           
        </section>
    </section>
</template>

<script>
import lookupUtils from '../../utils/lookupUtils.js';
import { lookUpdata } from '../../utils/lookup.js';
import {rootDocment, rootUrl,putReq,getReq,deleteReq} from '../../utils/request.js';

const transformData = (item) => {
		//DispatchTypeLookup 派工类型
    lookupUtils.transformData(
        item,
        lookUpdata.EquipmentNameLookup,
        'equipmentName', 
        'equipmentNameText'
    );
};

export default {
	computed: {
    	
    },
    onLoad: function (options) {
        if(options.equipmentId){
            const url = `external/${options.equipmentId}`
            getReq(url, (data) => {
                if(data.code == 200){
                    const id = data.content.id;
                    Object.assign(this.equipmentInfo,data.content.customerCompany,data.content,{id});
                    this.equipmentInfo.customerCompanyId = data.content.customerCompany.id;
                    
                    transformData(this.equipmentInfo);
                    if(!this.equipmentInfo.equipmentImage){
                        this.equipmentInfo.equipmentImage = '/static/images/upload.png';
                    }else{
                        this.equipmentInfo.equipmentImage = `${rootUrl}${data.content.equipmentImage}`;
                    }
                    
                    console.log(this.equipmentInfo,'equipment-input')
                }else{

                }
                    console.log(data)
                    
            })
        }
        
    },
    data() {
        return {
            equipmentList:[],
            equipmentIndex:null,
            equipmentInfo: {
                equipmentNumber:'',//设备序列号
                companyName:'',//客户名称
                customerCompanyId:'',//客户id
                equipmentName:'001',//设备名称code
                equipmentNameText:'CNC加工中心',//设备名称
                equipmentModel: '',//设备型号
                systemLabel:'',//系统厂牌
                systemVersion:'',//系统版本
                imei:'',//IMEI
                ip:'',//IP地址
                port:'',//端口号
               
                equipmentImage:'/static/images/upload.png',
            },
        }

    },
    mounted(){
        
    },
    props: {
        
    },
  	methods: {
        handleDelete(){
            if(this.equipmentInfo.equipmentStatus =='PENDING' && this.equipmentInfo.iotCardStatus == 'PENDING'){
                const url = `/external/${this.equipmentInfo.id}`;
                deleteReq(url, (data) => {
                    console.log(data)
                    if(data.code == 204){
                        wx.showToast({
                            title: '删除成功',
                            duration: 2000,
                            icon:'none'
                        })
                        wx.switchTab({
                            url:'../index/main'
                        })
                    }else{
                        wx.showToast({
                            title: '删除失败',
                            duration: 2000,
                            icon:'none'
                        })
                    }
                    
                        
                })
            }else{
                wx.showToast({
                    title: '正在审核中,不能删除',
                    duration: 2000,
                    icon:'none'
                })
            }

        },
        handleUpdate(){
            wx.navigateTo({
  				url: `../edit-equipment/main?equipmentId=${this.equipmentInfo.id}`
            })
        }
    },
    components: {
		
	},
    watch:{
        
    }
}
</script>

<style scoped>

    .card-wrap{
        width: 86%;
        border-radius: 5px;
        padding:15px;
        border: 1px solid #e6e6e6;
        margin: 10px auto;
        box-shadow:0px 0px 5px #ccc;
    }
    .item{
        line-height: 15vmin;
        color:#495060;
    }
    .info-wrap{
        padding-bottom:3vh;
        border-bottom: 1px dashed #e6e6e6;
    }
    .img-title{
        text-align: center;
        height:10vh;
        line-height: 10vh;

    }
    image{
        display: block;
        margin:0 auto;
    }
    

</style>
