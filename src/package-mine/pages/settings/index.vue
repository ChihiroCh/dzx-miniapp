<template>
  <view class="page">
    <view class="card">
      <view class="row">
        <text class="label">消息通知</text>
        <switch />
      </view>
      <view class="row">
        <text class="label">隐私设置</text>
        <text class="arrow">></text>
      </view>
      <view class="row">
        <text class="label">关于我们</text>
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

.card {
  border-radius: 20rpx;
  background: #fff;
  overflow: hidden;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 24rpx;
  border-bottom: 1px solid #f1f3f7;
}

.row:last-child {
  border-bottom: 0;
}

.label {
  font-size: 28rpx;
  color: #1f2430;
}

.arrow {
  font-size: 28rpx;
  color: #9aa3b2;
}
</style>
