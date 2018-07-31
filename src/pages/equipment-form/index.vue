<template>
	<section class="counter-warp">
        <div class="form-wrap">

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

    },
  	methods: {
		// 退出登陆，页面跳转，清除数据缓存
		handleSubmit(){
			
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
    height:10vh;
}

</style>
