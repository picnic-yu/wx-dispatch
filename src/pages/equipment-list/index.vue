<template>
<section class="page">
<section>
   
    <canvas canvas-id="photo_canvas" style="position: absolute;left:-300px;top:-300px;"></canvas>
    <button @click ='dealImage'>dianji </button>
    <image :src='image'/>
</section>
</section>
</template>

<script >
 export default {
 components: {},

 props: {},

 data() {
 return {
    imgViewList:[],
    image:'',
    canvasWidth:'',
    canvasHeight:''
 }
 
 },

 watch: {},

    methods: {
        dealImage(){
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
                            var ratio = 2;
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
                            self.canvasWidth = canvasWidth;
                            self.canvasHeight = canvasHeight;
                            ctx.drawImage(photo.tempFilePaths[0], 0, 0, canvasWidth, canvasHeight)
                            ctx.draw()
                            //下载canvas图片
                            setTimeout(function(){
                            wx.canvasToTempFilePath({
                                canvasId: 'photo_canvas',
                                success: function (res) {
                                console.log(res.tempFilePath)
                                self.image = res.tempFilePath;
                                console.log(self.image,'image')
                                },
                                fail: function (error) {
                                console.log(error)
                                }
                            })
                            },100)
                        }
                    })

                }
            })
        },
    },

 mounted() {},

 }
</script>

<style  scoped>
 
</style>
