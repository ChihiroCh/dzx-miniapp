<script setup>
const goProjectList = () => {
  uni.navigateTo({
    url: '/package-invest/pages/project-list/index',
  })
}
</script>

<template>
  <view class="page">
    <view class="header">
      <text class="title">产业招商</text>
      <text class="sub-title">查看重点招商方向与项目清单</text>
    </view>

    <view class="card">
      <text class="card-title">招商项目库</text>
      <text class="card-desc">按产业方向、投资规模、园区区域筛选项目。</text>
      <button class="btn-primary" @tap="goProjectList">进入项目列表</button>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 24rpx;
  background: #f5f7fb;
  box-sizing: border-box;
}

.header {
  padding: 24rpx 8rpx;
}

.title {
  display: block;
  color: #1f2430;
  font-size: 38rpx;
  font-weight: 600;
}

.sub-title {
  display: block;
  margin-top: 8rpx;
  color: #6c7480;
  font-size: 26rpx;
}

.card {
  margin-top: 16rpx;
  padding: 28rpx;
  border-radius: 20rpx;
  background: #ffffff;
}

.card-title {
  display: block;
  font-size: 32rpx;
  color: #1f2430;
  font-weight: 500;
}

.card-desc {
  display: block;
  margin-top: 10rpx;
  font-size: 26rpx;
  line-height: 1.5;
  color: #6c7480;
}

.btn-primary {
  margin-top: 22rpx;
  background: #003367;
  color: #fff;
  border-radius: 12rpx;
  font-size: 28rpx;
}
</style>
