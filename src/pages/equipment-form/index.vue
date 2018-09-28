<template>
	<section class="counter-warp">
        <div class="form-wrap">
            <i-input 
                title="设备序列号" 
                :value="saveParam.equipmentNumber" 
                @change='equipmentNumberChange' 
                placeholder="请输入设备序列号"  
            />
            <i-input 
                title="设备制造商" 
                :value="saveParam.manufacturerName" 
                @change = 'manufacturerNameChange'
                placeholder="请输入设备制造商"   
            />
            <i-input 
                title="制造商简称" 
                :value="saveParam.manufacturerSimpleName" 
                @change='manufacturerSimpleNameChange' 
                placeholder="请输入制造商简称"    
            />
            <i-input 
                title="传感器编号" 
                :value="saveParam.sensorNumber" 
                disabled='false'
                @click='handleSearch(1,saveParam.sensorNumber)'
                placeholder="请选择传感器编号"    
            />
            <i-input 
                title="物联卡编号" 
                @click='handleSearch(2,saveParam.cardNumber)'
                :value="saveParam.cardNumber" 
                disabled='false'
                placeholder="请选择物联卡编号"     
            />
            <i-input 
                title="工厂名称" 
                :value="saveParam.factoryName" 
                @change='factoryNameChange'
                placeholder="请输入工厂名称"      
            />
            <i-input 
                title="设备名称" 
                @click='openEquipmentnameModel'
                :value="saveParam.equipmentNameText" 
                disabled='false'
                placeholder="请输入设备名称"      
            />
            <i-input 
                title="设备型号" 
                :value="saveParam.equipmentModel" 
                @change='equipmentModelChange' 
                placeholder="请输入设备型号"       
            />
            <i-input 
                title="系统厂牌" 
                :value="saveParam.systemLabel" 
                @change='systemLabelChange' 
                placeholder="请输入系统厂牌"        
            />
            <i-input 
                title="系统版本" 
                :value="saveParam.systemVersion" 
                @change='systemVersionChange' 
                placeholder="请输入系统版本"        
            />
            <i-input 
                title="IP地址" 
                :value="saveParam.ipAddress" 
                @change='ipAddressChange' 
                placeholder="请输入IP地址"         
            />
            <i-input 
                title="端口号" 
                :value="saveParam.portNumber" 
                @change='portNumberChange' 
                placeholder="请输入端口号"         
            />
            <i-input 
                title="用户" 
                :value="saveParam.userName" 
                @change='userNameChange' 
                placeholder="请输入用户"        
            />
            <i-input 
                title="密码" 
                :value="saveParam.userPassword" 
                @change='userPasswordChange' 
                placeholder="请输入密码"         
            />
            <div class='item-wrap'>
                <i-row >
                    <!-- <i-col span="4" class='upload-title'>
                        图片
                    </i-col> -->
                    <i-col span="24" >
                        <image 
                            @click='choseImage'
                            class='upload-image' 
                            :src='saveParam.equipmentImage'></image>
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
        <canvas canvas-id="photo_canvas" style="position: absolute;left:-300px;top:-300px;"></canvas>
	</section>
</template>

<script>
import lookupUtils from '../../utils/lookupUtils';
import { lookUpdata } from '../../utils/lookup';
import {rootDocment, rootUrl} from '../../utils/request.js';
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
            saveParam: {
                equipmentNumber:'',//设备序列号
                factoryName:'',//工厂名称
                manufacturerName:'',//设备制造商
                manufacturerSimpleName:'',//制造商简称
                equipmentName:'001',//设备名称code
                equipmentNameText:'CNC加工中心',//设备名称
                equipmentModel: '',//设备型号
                systemLabel:'',//系统厂牌
                systemVersion:'',//系统版本
                sensorNumber:'',//传感器编号
                cardNumber:'1',//物联卡编号
                ipAddress:'',//IP地址
                portNumber:'',//端口号
                userName:'',//用户
                userPassword:'',//密码
                equipmentImage:'/static/images/upload.png',
            },
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
                            var ctx = wx.createCanvasContext('photo_canvas');
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
                            ctx.draw()
                            //下载canvas图片
                            setTimeout(function(){
                            wx.canvasToTempFilePath({
                                canvasId: 'photo_canvas',
                                success: function (res) {
                                
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
                    data.code == 200 ? self.saveParam.equipmentImage = `${rootUrl}${data.content}`:'/static/images/upload.png';
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
            this.saveParam.equipmentName = item.code;
            this.saveParam.equipmentNameText = item.value;
        },
		// 提交设备信息到本地
		handleSubmit(){
            if(!this.saveParam.equipmentNumber){
				return wx.showToast({
					title: '请输入设备序列号',
					duration: 2000,
					icon:'none'
				})
            }
            if(!this.saveParam.manufacturerName){
				return wx.showToast({
					title: '请输入设备制造商',
					duration: 2000,
					icon:'none'
				})
            }
            if(!this.saveParam.manufacturerSimpleName){
				return wx.showToast({
					title: '请输入制造商简称',
					duration: 2000,
					icon:'none'
				})
            }
            if(!this.saveParam.sensorNumber){
				return wx.showToast({
					title: '请选择传感器编号',
					duration: 2000,
					icon:'none'
				})
            }
            if(!this.saveParam.cardNumber){
				return wx.showToast({
					title: '请选择物联卡编号',
					duration: 2000,
					icon:'none'
				})
            }
            if(!this.saveParam.systemLabel){
				return wx.showToast({
					title: '请输入系统厂牌',
					duration: 2000,
					icon:'none'
				})
            }

            // 下面处理本地设备列表数据
            if( this.equipmentIndex !== null ){
                this.equipmentList[this.equipmentIndex] = this.saveParam;
            }else{
                this.equipmentList.push(this.saveParam); 
                this.equipmentIndex = this.equipmentList.length - 1;
            }
            wx.setStorageSync('equipmentList', this.equipmentList);
            wx.setStorageSync('equipmentIndex', this.equipmentIndex);
            wx.navigateTo({
  				url: '../parameter-detection/main'
			})
        },
        // 制造商简称
        manufacturerSimpleNameChange(e){
            this.saveParam.manufacturerSimpleName = e.target.detail.value;
        },
        // 设备序列号
        equipmentNumberChange(e){
            this.saveParam.equipmentNumber = e.target.detail.value;
        },
        // 工厂名称
        factoryNameChange(e){
            this.saveParam.factoryName = e.target.detail.value;
        },
        // 设备制造商
        manufacturerNameChange(e){
            this.saveParam.manufacturerName = e.target.detail.value;
        },
        // 设备名称
        // equipmentNameChange(e){
        //     this.saveParam.equipmentName = e.target.detail.value;
        // },
        // 设备型号
        equipmentModelChange(e){
            this.saveParam.equipmentModel = e.target.detail.value;
        },
        // 系统厂牌
        systemLabelChange(e){
            this.saveParam.systemLabel = e.target.detail.value;
        },
        // 系统版本
        systemVersionChange(e){
            this.saveParam.systemVersion = e.target.detail.value;
        },
        // ip地址
        ipAddressChange(e) {
            this.saveParam.ipAddress = e.target.detail.value;
        },
        portNumberChange(e){
            this.saveParam.portNumber = e.target.detail.value;
        },
        // 用户
        userNameChange(e){
            this.saveParam.userName = e.target.detail.value;
        },
        userPasswordChange(e){
            this.saveParam.userPasswordChange = e.target.detail.value;
        },
        // flag 1代表传感器搜索页面 2代表物联卡搜索页面
        handleSearch(flag,searchValue){
            wx.navigateTo({
  				url: `../search/main?type=${flag}&searchValue=${searchValue}`
			})
        }
    },
    onLoad:function (options){
        this.equipmentList = wx.getStorageSync('equipmentList');
        this.equipmentIndex = wx.getStorageSync('equipmentIndex');
        try{
            if(this.equipmentIndex !== null){
                Object.assign(this.saveParam,this.equipmentList[this.equipmentIndex]);
            }else{
                if(!options.sensorNumber && !options.cardNumber) {
                    this.saveParam =  {
                        equipmentNumber:'',//设备序列号
                        factoryName:'',//工厂名称
                        manufacturerName:'',//设备制造商
                        manufacturerSimpleName:'',//制造商简称
                        equipmentName:'001',//设备名称code
                        equipmentNameText:'CNC加工中心',//设备名称
                        equipmentModel: '',//设备型号
                        systemLabel:'',//系统厂牌
                        systemVersion:'',//系统版本
                        sensorNumber:'',//传感器编号
                        cardNumber:'',//物联卡编号
                        ipAddress:'',//IP地址
                        portNumber:'',//端口号
                        userName:'',//用户
                        userPassword:'',//密码
                        equipmentImage:'/static/images/upload.png',
                    }
                }
            }
        }catch(e){
            console.log(e);
        }
        if(options.sensorNumber){
            this.saveParam.sensorNumber = options.sensorNumber;
        }
        if(options.cardNumber){
            this.saveParam.cardNumber = options.cardNumber;
        }

    }
}
</script>

<style>
.input-wrap{
    padding-right:10px;
}
.iview-input{
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
.input-item{
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
    width:150px !important;
    height:150px !important;
    margin:0 auto;
    display:block;
    margin-top:10px;
}
.upload-title{
    color:#495060
}
</style>
