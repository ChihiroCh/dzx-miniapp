<script setup>
const intro = {
  image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/ca9774c0-dc91-4a6c-b4f2-46e975b886a9.png",
  title: "园区介绍",
  desc: "张江科学城位于上海浦东新区中部，是上海张江综合性国家科学中心的核心承载区。",
};
</script>

<template>
  <view class="intro-wrap">
    <view class="intro-card">
      <image class="intro-image" :src="intro.image" mode="aspectFill" />

      <view class="intro-header">
        <text class="intro-title">{{ intro.title }}</text>
      </view>

      <view class="intro-content">
        <text class="intro-desc">{{ intro.desc }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.intro-wrap {
  margin-top: 24rpx;
  padding: 0 32rpx 40rpx;
  box-sizing: border-box;
}

.intro-card {
  border-radius: 16rpx;
  border: 1px solid #e9edf3;
  background: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.intro-image {
  width: 100%;
  height: 384rpx;
}

.intro-header {
  padding: 48rpx;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.intro-title {
  display: block;
  font-size: 32rpx;
  line-height: 1.4;
  font-weight: 600;
  color: #111827;
}

.intro-content {
  padding: 48rpx;
  padding-top: 0;
}

.intro-desc {
  display: block;
  font-size: 28rpx;
  line-height: 1.625;
  color: #111827;
}
</style>
