<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const projectId = ref('')

onLoad((query) => {
  projectId.value = query?.id || ''
})
</script>

<template>
  <view class="page">
    <view class="card">
      <text class="title">招商项目详情</text>
      <text class="info">项目编号：{{ projectId || '未提供' }}</text>
      <text class="desc">这里预留项目详情数据展示区域，可接入请求封装拉取后端数据。</text>
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
  padding: 28rpx;
  border-radius: 20rpx;
  background: #fff;
}

.title {
  display: block;
  font-size: 32rpx;
  color: #1f2430;
  font-weight: 600;
}

.info {
  display: block;
  margin-top: 16rpx;
  font-size: 26rpx;
  color: #1f2430;
}

.desc {
  display: block;
  margin-top: 14rpx;
  font-size: 24rpx;
  color: #6c7480;
  line-height: 1.6;
}
</style>
