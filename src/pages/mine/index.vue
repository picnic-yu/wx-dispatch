<template>
    <section>
        <section class="counter-warp">
            
        </section>
        <section class="submit-btn">
		    <i-button @click='handleSignOut' type='primary'>退出登陆</i-button>
	    </section>
    </section>
	
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
.submit-btn{
    height:8.5vh;
}
.counter-warp {
    height:88vh;
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>
