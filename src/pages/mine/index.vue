<template>
	<div class="counter-warp">
		<i-button @click='handleSignOut' type='primary'>退出登陆</i-button>
	</div>
</template>

<script>

export default {
	computed: {
    	
	},
  	methods: {
		// 退出登陆，页面跳转，清除数据缓存
		handleSignOut(){
			wx.navigateTo({
  				url: '../login/main'
			})
		}
  	}
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 70rpx;
}
</style>
