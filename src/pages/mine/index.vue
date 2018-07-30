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
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
