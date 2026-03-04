<script setup>
import BrandHeader from "./components/BrandHeader.vue";
import HomeAiDialog from "./components/HomeAiDialog.vue";
import HomeActivityCarouselFromTest from "./components/HomeActivityCarouselFromTest.vue";
import HomeAdvantagesFromTest from "./components/HomeAdvantagesFromTest.vue";
import HomeFAQFromTest from "./components/HomeFAQFromTest.vue";
import HomeCommonFooterFromTest from "./components/HomeCommonFooterFromTest.vue";
import HomeIndustryClusterFromTest from "./components/HomeIndustryClusterFromTest.vue";
import HomeStartupSpecialFromTest from "./components/HomeStartupSpecialFromTest.vue";
import HomeToolsBoxFromTest from "./components/HomeToolsBoxFromTest.vue";
import HomeTestSection from "./components/HomeTestSection.vue";

const openInvestList = () => {
  uni.navigateTo({
    url: "/package-invest/pages/project-list/index",
  });
};
</script>

<template>
  <view class="page">
    <BrandHeader />
    <HomeAiDialog />
    <home-test-section />
    <HomeIndustryClusterFromTest />
    <HomeActivityCarouselFromTest />
    <HomeStartupSpecialFromTest />
    <HomeToolsBoxFromTest />
    <HomeAdvantagesFromTest />
    <HomeFAQFromTest />
    <HomeCommonFooterFromTest />
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f7fb;
  box-sizing: border-box;
  padding-bottom: 62rpx;
}

.panel {
  margin-top: 24rpx;
  margin-left: 24rpx;
  margin-right: 24rpx;
  padding: 28rpx;
  border-radius: 20rpx;
  background: #fff;
}

.panel-title {
  display: block;
  font-size: 30rpx;
  color: #1f2430;
  font-weight: 500;
}

.btn-primary {
  margin-top: 20rpx;
  background: #003367;
  color: #fff;
  border-radius: 12rpx;
  font-size: 28rpx;
}
</style>
