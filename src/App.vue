<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    const external = wx.getStorageSync('external') || false;
    const equipmentList = wx.getStorageSync('equipmentList') || []
    const equipmentIndex = wx.getStorageSync('equipmentIndex') || null
    const page = wx.getStorageSync('page') || null
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('equipmentList', equipmentList);
    wx.setStorageSync('external', external);
    wx.setStorageSync('equipmentIndex', equipmentIndex);
    wx.setStorageSync('page', page);

  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* padding: 200rpx 0; */
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
.nodata{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height:50vh;
}
.modelitem{
  height:4vh;
  line-height: 4vh;
}
</style>
