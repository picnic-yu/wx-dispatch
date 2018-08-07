<template>
    <section>
        <section class="counter-warp">
            <div class='image-wrap' @click='handlePing'>
                <div class="text">{{pingText}}</div>
                
                <image  src='/static/images/step1.png'/>
            </div>
            <div class="arrow">
                <image src='/static/images/arrow1.png'/>
            </div>
            <div class='image-wrap' @click='handleTelnet'>
                <div class="text">{{pingText}}</div>
                <image  src='/static/images/step2.png'/>
            </div>
            <div class="arrow">
                <image src='/static/images/arrow2.png'/>
            </div>
            <div class='image-wrap' @click='handleSnapshot'>
                <div class="text">设备参数回传</div>
                <image  src='/static/images/step3.jpg'/>
            </div>
            <div class='text-wrap'>
                {{snapShotData}}
            </div>
        </section>
        <section class="submit-btn">
		    <i-button @click='handleSubmit' type='primary'>提交</i-button>
	    </section>
    </section>
	
</template>

<script>
import { getReq, postReq } from '../../utils/request.js';
export default {
	computed: {
    	
    },
    onLoad:function (options){
        this.equipmentList = wx.getStorageSync('equipmentList');
        this.equipmentIndex = wx.getStorageSync('equipmentIndex');
        const sensorNumber = this.equipmentList[this.equipmentIndex].sensorNumber;
        const cardNumber = this.equipmentList[this.equipmentIndex].cardNumber;
        this.pingUrl = `sensors/ping/${sensorNumber}/${cardNumber}`;
        this.telnetUrl = `sensors/telnet/${sensorNumber}/${cardNumber}`;
    },
    data(){
        return{
            pingUrl:'',
            telnetUrl:'',
            equipmentList:[],
            equipmentIndex:null,
            stepStatus:0,
            pingText:'检测PING',
            telnetText:'检测TELNET',
            snapShotData:''
        }
    },
  	methods: {
		// 退出登陆，页面跳转，清除数据缓存
		handleSubmit(){
            if(this.stepStatus !== 2 ){
                return wx.showToast({
                    title: "PING和TELNET后才可提交",
                    duration: 2000,
                    icon:'none'
                })
            }
            const url = `equipmentInfo/`
            postReq(url,this.equipmentList[this.equipmentIndex],(data) => {
                if(data.code == 201){
                    wx.showToast({
                        title: '请求成功',
                        duration: 2000,
                        icon:'none'
                    })
                    this.equipmentList.splice(this.equipmentIndex,1);
                    wx.setStorageSync('equipmentList', this.equipmentList);
                    wx.setStorageSync('equipmentIndex', null);
                    wx.switchTab({
                        url:'../equipment-list/main',
                        success: function (e) {
                            var page = getCurrentPages().pop();
                            if (page == undefined || page == null) return;
                            page.onShow();
                        }
					})
                }else{
                    wx.showToast({
                        title: '请求失败',
                        duration: 2000,
                        icon:'none'
                    })
                }
            });
        },
        handlePing(){
            getReq(this.pingUrl, (data) => {
                console.log(data,'ping')
                // success
                if(data.code == 100){
                    this.stepStatus = 1;
                    this.pingText = '检测PING成功';
                }else{
                    this.stepStatus = 0;
                    this.pingText = '检测PING失败';
                }
            });
        },
        handleTelnet(){
            if(this.stepStatus !== 1) return;
            getReq(this.telnetUrl, (data) => {
                console.log(data,'telnet')
                if(data.code == 100){
                    this.telnetText = '检测TELNET成功';
                    this.stepStatus = 2;
                }else{
                    this.telnetText = '检测TELNET失败';
                    this.stepStatus = 1;
                }
            });
        },
        handleSnapshot(){
            const url =`equipmentInfo/${this.equipmentList[this.equipmentIndex].equipmentNumber}/snapshot`;
            getReq(url, (data) => {
                this.snapShotData =  JSON.stringify(data);
                console.log(data)
            });
		}
  	}
}
</script>

<style>
.submit-btn{
    height:8.5vh;
}
.counter-warp {
    height:88vh;
    overflow-x: hidden;
    overflow-y: scroll;
}
.image-wrap{
    width:200px;
    height:200px;
    position: relative;
    text-align: center;
    line-height: 200px;
}
.text{
    position: absolute;
    top: 0;
    left:0;
    color:#fff;
    text-align: center;
    line-height: 200px;
    width:200px;
    height:200px;
}
.image-wrap image{
    width:200px;
    height:200px;
    margin:15px;
}
.arrow{
    width:200px;
    height:100px;
}
.arrow image{
    width:100px;
    height:100px;
    margin:15px 50px;;
}
.text-wrap{
    padding-top:30px;
}
</style>
