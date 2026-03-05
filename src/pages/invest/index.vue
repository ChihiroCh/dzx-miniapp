<script setup>
import { onShow } from "@dcloudio/uni-app";

let isJumping = false;

const openIndustryHighlights = () => {
  if (isJumping) {
    return;
  }

  isJumping = true;
  uni.navigateTo({
    url: "/package-invest/pages/industry-highlights/index",
    complete: () => {
      isJumping = false;
    },
  });
};

onShow(() => {
  openIndustryHighlights();
});
</script>

<template>
  <view class="invest-redirect-page">
    <text class="invest-redirect-text">正在打开产业招商集锦...</text>
  </view>
</template>

<style scoped>
.invest-redirect-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fb;
}

.invest-redirect-text {
  color: #6b7280;
  font-size: 28rpx;
}
</style>
