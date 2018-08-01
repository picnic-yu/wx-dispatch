<template>
	<section class="counter-warp">
        <div class="form-wrap">
            <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        设备序列号:
                        <span class='required-icon'>*</span>
                    </i-col>
                    <i-col span="16">
                        <i-input 
                            :value="saveParam.equipmentNumber" 
                            mode="wrapped" 
                            @change='equipmentNumberChange'
                            placeholder="请输入设备序列号" 
                        />
                    </i-col>
                </i-row>
            </div>
             <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        设备制造商:
                        <span class='required-icon'>*</span>
                    </i-col>
                    <i-col span="16" >
                        <i-input 
                            :value="saveParam.manufacturerName" 
                            mode="wrapped" 
                            @change = 'manufacturerNameChange'
                            placeholder="请输入设备制造商" 
                        />
                    </i-col>
                </i-row>
            </div>
            <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        制造商简称:
                        <span class='required-icon'>*</span>
                    </i-col>
                    <i-col span="16" >
                        <i-input 
                            :value="saveParam.manufacturerSimpleName" 
                            mode="wrapped"
                            @change='manufacturerSimpleNameChange' 
                            placeholder="请输入制造商简称" 
                        />
                    </i-col>
                </i-row>
            </div>
             <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        传感器编号:
                        <span class='required-icon'>*</span>
                    </i-col>
                    <i-col span="16" >
                        <i-input @click='handleSearch(1)'
                            :value="saveParam.sensorNumber" 
                            mode="wrapped"
                            placeholder="请选择传感器编号" 
                        />
                    </i-col>
                </i-row>
            </div>
            <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        物联卡编号:
                        <span class='required-icon'>*</span>
                    </i-col>
                    <i-col span="16" >
                        <i-input 
                            :value="saveParam.sensorNumber" 
                            mode="wrapped"
                            placeholder="请选择物联卡编号" 
                        />
                    </i-col>
                </i-row>
            </div>
            <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        工厂名称:
                    </i-col>
                    <i-col span="16" >
                        <i-input 
                            :value="saveParam.factoryName" 
                            mode="wrapped" 
                            @change='factoryNameChange'
                            placeholder="请输入工厂名称" 
                        />
                    </i-col>
                </i-row>
            </div>
           
            <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        设备名称:
                    </i-col>
                    <i-col span="16" >
                        <i-input 
                            :value="saveParam.equipmentName" 
                            mode="wrapped"
                            @change='equipmentNameChange' 
                            placeholder="请输入设备名称" 
                        />
                    </i-col>
                </i-row>
            </div>
            <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        设备型号:
                    </i-col>
                    <i-col span="16" >
                        <i-input 
                            :value="saveParam.equipmentModel" 
                            mode="wrapped"
                            @change='equipmentModelChange' 
                            placeholder="请输入设备型号" 
                        />
                    </i-col>
                </i-row>
            </div>
            <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        系统厂牌:
                        <span class='required-icon'>*</span>
                    </i-col>
                    <i-col span="16" >
                        <i-input 
                            :value="saveParam.systemLabel" 
                            mode="wrapped"
                            @change='systemLabelChange' 
                            placeholder="请输入系统厂牌" 
                        />
                    </i-col>
                </i-row>
            </div>
            <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        系统版本:
                    </i-col>
                    <i-col span="16" >
                        <i-input 
                            :value="saveParam.systemVersion" 
                            mode="wrapped"
                            @change='systemVersionChange' 
                            placeholder="请输入系统版本" 
                        />
                    </i-col>
                </i-row>
            </div>
           
            <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        IP地址:
                    </i-col>
                    <i-col span="16" >
                        <i-input 
                            :value="saveParam.ipAddress" 
                            mode="wrapped"
                            @change='ipAddressChange' 
                            placeholder="请输入IP地址" 
                        />
                    </i-col>
                </i-row>
            </div>
            <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        端口号:
                    </i-col>
                    <i-col span="16" >
                        <i-input 
                            :value="saveParam.portNumber" 
                            mode="wrapped"
                            @change='portNumberChange' 
                            placeholder="请输入端口号" 
                        />
                    </i-col>
                </i-row>
            </div>
            <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        用户:
                    </i-col>
                    <i-col span="16" >
                        <i-input 
                            :value="saveParam.userName" 
                            mode="wrapped"
                            @change='userNameChange' 
                            placeholder="请输入用户" 
                        />
                    </i-col>
                </i-row>
            </div>
            <div class='item-wrap'>
                <i-row class="input-item">
                    <i-col span="8" i-class="col-class">
                        密码:
                    </i-col>
                    <i-col span="16" >
                        <i-input 
                            :value="saveParam.userPassword" 
                            mode="wrapped"
                            @change='userPasswordChange' 
                            placeholder="请输入密码" 
                        />
                    </i-col>
                </i-row>
            </div>
        </div>
        <div class="submit-btn">
            <i-button @click='handleSubmit' type='primary'>提交</i-button>
        </div>
		
	</section>
</template>

<script>

export default {
	computed: {
    	
    },
    data:{
        saveParam: {
            equipmentNumber:'',//设备序列号
            factoryName:'',//工厂名称
            manufacturerName:'',//设备制造商
            manufacturerSimpleName:'',//制造商简称
            equipmentName:'001',
            equipmentModel: '',//设备型号
            systemLabel:'',//系统厂牌
            systemVersion:'',//系统版本
            sensorNumber:'',//传感器编号
            cardNumber:'',//物联卡编号
            ipAddress:'',//IP地址
            portNumber:'',//端口号
            userName:'',//用户
            userPassword:'',//密码
            
            image:{},//图片文件对象
            equipmentImage:'',
        },
    },
  	methods: {
		// 退出登陆，页面跳转，清除数据缓存
		handleSubmit(){
			console.log(this.saveParam)
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
        equipmentNameChange(e){
            this.saveParam.equipmentName = e.target.detail.value;
        },
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
        handleSearch(flag){
            wx.navigateTo({
  				url: `../search/main?type=${flag}`
			})
        }
  	}
}
</script>

<style>
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
    padding-left:3vw;
}
.required-icon{
    height:8.5vh;
    line-height: 8.5vh;
    color:red;
}

</style>
