<script setup>
import { ref } from 'vue'

const tabs = ['视频', '图片', '航拍']
const currentTab = ref(0)
const current = ref(0)

const banners = [
  'https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/92268287-7015-4154-aee1-907b9f0ca800.png',
  'https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/a79a884f-7039-40cf-b829-dc8f11a3d252.png',
  'https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/a55a0dea-ae75-4286-990b-8b02ac7a632e.png',
]

const logo = 'https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/786dfee5-022b-4ccb-973b-aca9a39da113.png'

const onBannerChange = (event) => {
  current.value = event.detail.current
}

const setTab = (index) => {
  currentTab.value = index
}
</script>

<template>
  <view class="park-banner">
    <view class="tab-group">
      <button class="tab-btn" :class="{ 'tab-btn-active': currentTab === 0 }" @tap="setTab(0)">
        <image class="tab-icon" src="/static/icons/park-banner/play.png" mode="aspectFit" />
        <text>视频</text>
      </button>

      <button class="tab-btn" :class="{ 'tab-btn-active': currentTab === 1 }" @tap="setTab(1)">
        <image class="tab-icon" src="/static/icons/park-banner/image.png" mode="aspectFit" />
        <text>图片</text>
      </button>

      <button class="tab-btn" :class="{ 'tab-btn-active': currentTab === 2 }" @tap="setTab(2)">
        <image class="tab-icon" src="/static/icons/park-banner/wind.png" mode="aspectFit" />
        <text>航拍</text>
      </button>
    </view>

    <swiper class="banner-swiper" :current="current" circular autoplay interval="3500" duration="400" @change="onBannerChange">
      <swiper-item v-for="(image, index) in banners" :key="`banner-${index}`">
        <image class="banner-image" :src="image" mode="aspectFill" />
      </swiper-item>
    </swiper>

    <view class="banner-mask" />

    <view class="logo-card">
      <image class="logo-image" :src="logo" mode="aspectFit" />
    </view>
  </view>
</template>

<style scoped>
.park-banner {
  position: relative;
  width: 100%;
  height: 512rpx;
  background: #e2e8f0;
  overflow: hidden;
}

.tab-group {
  position: absolute;
  left: 32rpx;
  top: 32rpx;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 8rpx;
  border-radius: 9999rpx;
  background: rgba(0, 0, 0, 0.3);
  border: 2rpx solid rgba(255, 255, 255, 0.1);
}

.tab-btn {
  height: 48rpx;
  padding: 0 24rpx;
  border: 0;
  border-radius: 9999rpx;
  background: transparent;
  color: #ffffff;
  font-size: 22rpx;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
}

.tab-btn::after {
  border: 0;
}

.tab-btn-active {
  background: #003367;
  color: #ffffff;
}

.tab-icon {
  width: 24rpx;
  height: 24rpx;
}

.banner-swiper {
  width: 100%;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
}

.banner-mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.5) 100%);
}

.logo-card {
  position: absolute;
  left: 32rpx;
  bottom: 32rpx;
  z-index: 10;
  width: 128rpx;
  height: 128rpx;
  border-radius: 24rpx;
  background: #ffffff;
  padding: 20rpx;
  box-sizing: border-box;
  border: 2rpx solid rgba(148, 163, 184, 0.28);
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  width: 100%;
  height: 100%;
}
</style>
