<template>
    <section>
        <section class="counter-warp">
            <div class='image-wrap'>
                <div class="text">检测PING</div>
                
                <image @click='handlePing' src='/static/images/step1.png'/>
            </div>
            <div class="arrow">
                <image src='/static/images/arrow1.png'/>
            </div>
            <div class='image-wrap'>
                <div class="text">检测TELNET</div>
                <image src='/static/images/step2.png'/>
            </div>
            <div class="arrow">
                <image src='/static/images/arrow2.png'/>
            </div>
            <div class='image-wrap'>
                <div class="text">设备参数回传</div>
                <image @click='handleSnapshot' src='/static/images/step3.jpg'/>
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
        console.log(this.equipmentIndex)
        const searchNumber = this.equipmentList[this.equipmentIndex].sensorNumber;
        const cardIp = this.equipmentList[this.equipmentIndex].ipAddress;
        this.pingUrl = `sensors/ping/${searchNumber}/${cardIp}`;
    },
    data(){
        return{
            pingUrl:'',
            equipmentList:[],
            equipmentIndex:null
        }
    },
  	methods: {
		// 退出登陆，页面跳转，清除数据缓存
		handleSubmit(){
            const url = `equipmentInfo/`
            postReq(url,this.equipmentList[this.equipmentIndex],(data) => {
                console.log(data);
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
                console.log(data)
                // data.code == 200 ? this.dispatchInfoData = data.content: this.dispatchInfoData = {};
            });
        },
        handleSnapshot(){
            const url =`equipmentInfo/${this.equipmentList[this.equipmentIndex].equipmentNumber}/snapshot`;
            getReq(url, (data) => {
                console.log(data)
                // data.code == 200 ? this.dispatchInfoData = data.content: this.dispatchInfoData = {};
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
</style>
