<template>
    <section class='card-wrap'>
        <section class='info-wrap'>
            <i-row class='item'>
                <i-col span="8" i-class="col-class "><span class='item-title'>设备序列号:</span></i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.equipmentNumber}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class "><span class='item-title'>客户名称:</span></i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.factoryName}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class "><span class='item-title'>设备名称:</span></i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.equipmentNameText}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class "><span class='item-title'>IMEI:</span></i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.imei}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class "><span class='item-title'>设备型号:</span></i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.equipmentModel}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class "><span class='item-title'>系统厂牌:</span></i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.systemLabel}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class "><span class='item-title'>系统版本:</span></i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.systemVersion}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class "><span class='item-title'>IP地址:</span></i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.ip}}</i-col>
            </i-row>
            <i-row class='item'>
                <i-col span="8" i-class="col-class "><span class='item-title'>端口号:</span></i-col>
                <i-col span="16" i-class="col-class">{{equipmentInfo.port}}</i-col>
            </i-row>
        </section>
        
        <section  >
             <i-row class='image-item'>
                <i-col span="8" i-class="col-class "><span class='item-title img-info'>图片信息</span></i-col>
                <i-col span="16" i-class="col-class">
                    
                    <image :src='equipmentInfo.equipmentImage' :mode='imageMode' class='in-image'   ></image>
                </i-col>
            </i-row>

            <i-row class='item' v-if='operateBtnStatus'>
                <i-col span="12" i-class="col-class">
                    <div @click='handleDelete' class='delete-btn'>删除</div>
                </i-col>
                <i-col span="12" i-class="col-class">
                    <div @click='handleUpdate' class='update-btn'>修改</div>
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
                    if(this.equipmentInfo.equipmentStatus == "CONFIRMED" && this.equipmentInfo.iotCardStatus == "CONFIRMED"){
                        this.operateBtnStatus = false;
                        
                    }else{
                        this.operateBtnStatus = true;
                    }
                }else{

                }
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
            operateBtnStatus:true,
            imageMode:'aspectFit'
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
        line-height: 30px;
        color:#495060;
    }
    .info-wrap{
        padding-bottom:3vh;
        margin-bottom:10px ;
        border-bottom: 1px dashed #e6e6e6;
    }
    .img-title{
        text-align: center;
        height:10vh;
        line-height: 10vh;

    }
    .img-info{
        line-height: 200px;
    }
    .item-title{
        color:#999 ;
    }
    /* image{
        display: block;
        width: 200px; height: 200px;
        margin:0 auto;
    } */
   
    .imagesize{
        display:flex;                       
        justify-content: center;            
    }
    image { 
        height:200px;
        width:50vw !important;
        line-height: 200px;
    }
    .image-item{
        /* height:200px; */
        padding-top:2vh;
        
    }
    .delete-btn{
        width:80%;
        height:40px;
        margin:2vh auto;
        line-height: 40px;
        border:1px solid #e6e6e6;
        border-radius: 3px;
        text-align: center;
    }
    .update-btn{
        width:80%;
        height:40px;
        margin:2vh auto;
        line-height: 40px;
        border:1px solid #2d8cf0;
        color:#2d8cf0;
        border-radius: 3px;
        text-align: center;
    }

</style>
