<template>
	<div class="counter-warp">
		<section class='login-wrap'>
			<image class='login-bg' src='../../static/images/login-bg.jpg'/>
		</section>
		<section class='login-form'>
			<i-input 
				placeholder='请输入用户名' 
				title="用户"
				@change='userNameChange'
				i-class='userInput' 
				:value='userName'
			/>
			<i-input 
				placeholder='请输入密码' 
				title="密码"
				@change='pwdChange'
				type='password'
				i-class='userInput' 
				:value='passWord'
			/>
			
		</section>
		<i-button @click='handleLogin' type='primary'>登陆</i-button>
	</div>
</template>

<script>
import { getReq } from '../../utils/request.js';
export default {
	computed: {

	},
	data(){
		return {
			userName:'',
			passWord:''
		}
	},
	created(){
		wx.getStorage({
			key: 'token',
			success: function(res) {
				console.log(res.data)
				if(res.data){
					wx.switchTab({
						url:'../index/main'
					})
				}
			} 
		})
	},
	methods: {
		pwdChange(e){
			this.passWord = e.target.detail.value;
			console.log(e.target.detail.value)
		},
		userNameChange(e){
			this.userName = e.target.detail.value;
		},
		handleLogin(){
			const self =this;
			if(!this.userName){
				return wx.showToast({
					title: '请输入用户名',
					duration: 2000,
					icon:'none'
				})
			}
			if(!this.passWord){
				return wx.showToast({
					title: '请输入密码',
					duration: 2000,
					icon:'none'
				})
			}
			
			const url = `tokens/login?username=${this.userName}&password=${this.passWord}`;
			getReq(url, (data) => {
				console.log(data)
				// 用户名或者密码错误处理
				if(data.code == -1001){
					return wx.showToast({
						title: "用户名或密码错误",
						duration: 2000,
						icon:'none'
					})
				}
				if(data.code == 200){
					const token = `${data.content.userId}_${data.content.token}`
					wx.setStorage({
						key:"token",
						data:token
					})
					wx.switchTab({
						url:'../index/main'
					})
				}
			})
		}
	}
}
</script>

<style scoped>
.login-wrap{
	height:190px;
}
.login-bg{
	height:100%;
	width:100%;
}
.userInput{
	border-bottom:1px solid #ccc;
}
.login-form{
	margin-top:20px;
	padding:10px;
}
</style>
