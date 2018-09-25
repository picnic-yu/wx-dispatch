<template>
    <section>
        <section class="counter-warp" >
            <div class="form-wrap">
                <div class='item-wrap'>
                    <i-row class="equipment-item">
                        <i-col span="8" i-class="col-class">
                            设备序列号:
                            <span class='required-icon'>*</span>
                        </i-col>
                        <i-col span="16" i-class="input-wrap">
                            <i-input 
                                :value="equipmentInfo.equipmentNumber" 
                                i-class='equipment-input' 
                                @change='equipmentNumberChange'
                                placeholder="请输入设备序列号" 
                            />
                        </i-col>
                    </i-row>
                </div>
                <div class='item-wrap'>
                    <i-row class="equipment-item">
                        <i-col span="8" i-class="col-class">
                            客户名称:
                            <span class='required-icon'>*</span>
                        </i-col>
                        <i-col span="16" i-class="input-wrap">
                             <i-input 
                                :value="equipmentInfo.factoryName" 
                                i-class='equipment-input' 
                                @change='factoryNameChange'
                                placeholder="请输入客户" 
                            />
                        </i-col>
                    </i-row>
                </div>
                <div class='item-wrap'>
                    <i-row class="equipment-item">
                        <i-col span="8" i-class="col-class">
                            设备名称:
                        </i-col>
                        <i-col span="16" i-class="input-wrap">
                            <i-input 
                                @click='openEquipmentnameModel'
                                :value="equipmentInfo.equipmentNameText" 
                                i-class='equipment-input'
                                disabled='false'
                                placeholder="请输入设备名称" 
                            />
                        </i-col>
                    </i-row>
                </div>
                
                
                <div class='item-wrap'>
                    <i-row class="equipment-item">
                        <i-col span="8" i-class="col-class">
                            IMEI:
                            <span class='required-icon'>*</span>
                        </i-col>
                        <i-col span="16" i-class="input-wrap">
                            <i-input @click='handleScan'
                                :value="equipmentInfo.imei" 
                                disabled='false'
                                i-class='equipment-input'
                                placeholder="请扫描IMEI" 
                            />
                        </i-col>
                    </i-row>
                </div>

                <div class='item-wrap'>
                    <i-row class="equipment-item">
                        <i-col span="8" i-class="col-class">
                            设备型号:
                            <span class='required-icon'>*</span>
                        </i-col>
                        <i-col span="16" i-class="input-wrap">
                            <i-input 
                                :value="equipmentInfo.equipmentModel" 
                                i-class='equipment-input'
                                @change='equipmentModelChange' 
                                placeholder="请输入设备型号" 
                            />
                        </i-col>
                    </i-row>
                </div>
                <div class='item-wrap'>
                    <i-row class="equipment-item">
                        <i-col span="8" i-class="col-class">
                            系统厂牌:
                            <span class='required-icon'>*</span>
                        </i-col>
                        <i-col span="16" i-class="input-wrap">
                            <i-input 
                                :value="equipmentInfo.systemLabel" 
                                i-class='equipment-input'
                                @change='systemLabelChange' 
                                placeholder="请输入系统厂牌" 
                            />
                        </i-col>
                    </i-row>
                </div>
                <div class='item-wrap'>
                    <i-row class="equipment-item">
                        <i-col span="8" i-class="col-class">
                            系统版本:
                        </i-col>
                        <i-col span="16" i-class="input-wrap">
                            <i-input 
                                :value="equipmentInfo.systemVersion" 
                                i-class='equipment-input'
                                @change='systemVersionChange' 
                                placeholder="请输入系统版本" 
                            />
                        </i-col>
                    </i-row>
                </div>
            
                <div class='item-wrap'>
                    <i-row class="equipment-item">
                        <i-col span="8" i-class="col-class">
                            IP地址:
                        </i-col>
                        <i-col span="16" i-class="input-wrap">
                            <i-input 
                                :value="equipmentInfo.ip" 
                                i-class='equipment-input'
                                @change='ipChange' 
                                placeholder="请输入IP地址" 
                            />
                        </i-col>
                    </i-row>
                </div>
                <div class='item-wrap'>
                    <i-row class="equipment-item">
                        <i-col span="8" i-class="col-class">
                            端口号:
                        </i-col>
                        <i-col span="16" i-class="input-wrap">
                            <i-input 
                                :value="equipmentInfo.port" 
                                i-class='equipment-input'
                                @change='portChange' 
                                placeholder="请输入端口号" 
                            />
                        </i-col>
                    </i-row>
                </div>
                <div class='item-wrap'>
                    <i-row >
                        <i-col span="8" >
                            图片:
                        </i-col>
                        <i-col span="16" >
                            <image 
                                @click='choseImage'
                                class='upload-image' 
                                :src='equipmentInfo.equipmentImage'></image>
                        </i-col>
                    </i-row>
                </div>
            </div>
            <div class="submit-btn">
                <i-button @click='handleSubmit' type='primary'>提交</i-button>
            </div>
            <section>
                <i-modal  :visible="equipmentnemeModelStatus" :show-ok='false' :show-cancel='false'>
                    <view class='modelitem'
                        @click="handleSelectEquipmentName(item)"
                        v-for="item in equipmentNameList " 
                        :key='item.code'>{{item.value}}</view>
                </i-modal>
            </section>
            <canvas canvas-id="equipmentInfo_canvas" style="position: absolute;left:-300px;top:-300px;"></canvas>
        </section>
    </section>
</template>

<script>
import lookupUtils from '../../../utils/lookupUtils';
import { lookUpdata } from '../../../utils/lookup';
import {rootDocment, rootUrl} from '../../../utils/request.js';
import { postReq } from '../../../utils/request.js';
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
    data() {
        return {
            equipmentList:[],
            equipmentIndex:null,
            equipmentnemeModelStatus:false,
            equipmentNameList:lookUpdata.EquipmentNameLookup,
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
                factoryName:'',//客户
                equipmentImage:'/static/images/upload.png',
            },
        }

    },
    mounted(){
        
    },
    props: {
        hideForm:{
            type:Boolean,
            default:false
        }
    },
  	methods: {
        choseImage(){
            const self =this;
            wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera'],
                success: function (photo) {
                    wx.getImageInfo({
                        src: photo.tempFilePaths[0],
                        success: function(res){
                            var ctx = wx.createCanvasContext('equipmentInfo_canvas');
                            var ratio = 1.5;
                            var canvasWidth = res.width
                            var canvasHeight = res.height;
                            // 保证宽高均在200以内
                            while (canvasWidth > 200 || canvasHeight > 200){
                            //比例取整
                                canvasWidth = Math.trunc(res.width / ratio)
                                canvasHeight = Math.trunc(res.height / ratio)
                            ratio++;
                            }
                            // _this.setData({
                            // canvasWidth: canvasWidth,
                            // canvasHeight: canvasHeight
                            // })//设置canvas尺寸
                            // self.canvasWidth = canvasWidth;
                            // self.canvasHeight = canvasHeight;
                            ctx.drawImage(photo.tempFilePaths[0], 0, 0, 200, 200)
                            console.log(photo.tempFilePaths[0])
                            ctx.draw()
                            //下载canvas图片
                            setTimeout(function(){
                            wx.canvasToTempFilePath({
                                canvasId: 'equipmentInfo_canvas',
                                success: function (res) {
                                
                                console.log(res.tempFilePath)
                                self.uploadImage(res.tempFilePath);
                                },
                                fail: function (error) {
                                }
                            })
                            },100)
                        }
                    })

                }
            })
        },
        uploadImage(path){
            const self = this;
            const token = wx.getStorageSync('token');
            wx.uploadFile({
                url: `${rootDocment}common/uploadFile/upload`,      
                filePath: path,
                name: 'file',
                header: {  
                    "Content-Type": "multipart/form-data",
                    'accept': 'application/json',
                    'path':'img',
                    'authorization': token   
                },
                success: function(res){
                    const data = JSON.parse(res.data);
                    data.code == 200 ? self.equipmentInfo.equipmentImage = `${rootUrl}${data.content}`:'/static/images/upload.png';
                },
                fail: function(res){

                },
            })
        },
        openEquipmentnameModel(){
            this.equipmentnemeModelStatus = true;
        },
        // 选择设备名称
        handleSelectEquipmentName(item){
            this.equipmentnemeModelStatus = false;
            this.equipmentInfo.equipmentName = item.code;
            this.equipmentInfo.equipmentNameText = item.value;
        },
		// 提交设备信息到本地
		handleSubmit(){
            if(!this.equipmentInfo.equipmentNumber){
				return wx.showToast({
					title: '请输入设备序列号',
					duration: 2000,
					icon:'none'
				})
            }
            if(!this.equipmentInfo.factoryName){
				return wx.showToast({
					title: '请输入客户',
					duration: 2000,
					icon:'none'
				})
            }
            if(!this.equipmentInfo.imei){
				return wx.showToast({
					title: '请扫描IMEI',
					duration: 2000,
					icon:'none'
				})
            }
             if(!this.equipmentInfo.equipmentModel){
				return wx.showToast({
					title: '请输入设备型号',
					duration: 2000,
					icon:'none'
				})
            }
            if(!this.equipmentInfo.systemLabel){
				return wx.showToast({
					title: '请输入系统厂牌',
					duration: 2000,
					icon:'none'
				})
            }

            
            const url ='external/';
            postReq(url, this.equipmentInfo, (data) => {
                if(data.code == 200){
                    wx.switchTab({
						url:'../equipment-list/main'
					})
                }else{
                    return wx.showToast({
                        title: '保存失败',
                        duration: 2000,
                        icon:'none'
                    })
                }
            });
        },
       
        // 设备序列号
        equipmentNumberChange(e){
            this.equipmentInfo.equipmentNumber = e.target.detail.value;
        },
       
        
        // 设备型号
        equipmentModelChange(e){
            this.equipmentInfo.equipmentModel = e.target.detail.value;
        },
        // 系统厂牌
        systemLabelChange(e){
            this.equipmentInfo.systemLabel = e.target.detail.value;
        },
        // 系统版本
        systemVersionChange(e){
            this.equipmentInfo.systemVersion = e.target.detail.value;
        },
        // ip地址
        ipChange(e) {
            this.equipmentInfo.ip = e.target.detail.value;
        },
        factoryNameChange(e){
            this.equipmentInfo.factoryName = e.target.detail.value;
        },
        portChange(e){
            this.equipmentInfo.port = e.target.detail.value;
        },
        // 扫描imei
        handleScan(){
            wx.scanCode({
                success: (res) => {
                    // 扫码成功后获取数据返回
                    this.equipmentInfo.imei = res.result;
                    
                }
            })
        }
    },
    components: {
		
	},
    watch:{
        hideForm(val){
            if(val){
                this.equipmentInfo =  {
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
                }
            }
        }
    }
}
</script>

<style >
.input-wrap{
    padding-right:10px;
}
.equipment-input{
    border:1px solid #e6e6e6;
    border-radius:5px;

}



.form-wrap{
    height:88vh;
    overflow-x: hidden;
    overflow-y: scroll;
}
.submit-btn{
    height:8.5vh;
}
.equipment-item{
    height:8.5vh;
    
}
.col-class{
    line-height: 8.5vh;
}
.item-wrap{
    padding:5px 0 5px 3vw;
    /* padding-left:3vw; */
}
.required-icon{
    height:8.5vh;
    line-height: 8.5vh;
    color:red;
}
/* model button hidden */
.i-modal-actions{
    display:none !important;
}
.upload-image{
    width:200px;
    height:200px;
    margin-left:25px;
}
</style>
