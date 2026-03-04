<script setup>
const goSettings = () => {
  uni.navigateTo({
    url: '/package-mine/pages/settings/index',
  })
}
</script>

<template>
  <view class="page">
    <view class="profile">
      <view class="avatar">我</view>
      <view class="profile-info">
        <text class="name">未登录用户</text>
        <text class="hint">登录后可查看收藏项目与跟进记录</text>
      </view>
    </view>

    <view class="menu">
      <view class="menu-item" @tap="goSettings">
        <text class="menu-text">设置</text>
        <text class="arrow">></text>
      </view>
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

.profile {
  display: flex;
  align-items: center;
  padding: 28rpx;
  border-radius: 20rpx;
  background: #ffffff;
}

.avatar {
  width: 88rpx;
  height: 88rpx;
  border-radius: 44rpx;
  line-height: 88rpx;
  text-align: center;
  color: #fff;
  background: #003367;
}

.profile-info {
  margin-left: 20rpx;
}

.name {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #1f2430;
}

.hint {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #6c7480;
}

.menu {
  margin-top: 20rpx;
  border-radius: 20rpx;
  background: #ffffff;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx;
}

.menu-text {
  font-size: 28rpx;
  color: #1f2430;
}

.arrow {
  font-size: 28rpx;
  color: #9aa3b2;
}
</style>
