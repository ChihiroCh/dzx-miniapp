<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import ParkBannerFromTest from "./components/ParkBannerFromTest.vue";
import ParkDetailContentFromTest from "./components/ParkDetailContentFromTest.vue";
import ParkStatsFromTest from "./components/ParkStatsFromTest.vue";
import ParkIndustriesFromTest from "./components/ParkIndustriesFromTest.vue";
import ParkFactoriesFromTest from "./components/ParkFactoriesFromTest.vue";
import ParkEnterpriseServicesFromTest from "./components/ParkEnterpriseServicesFromTest.vue";
import ParkPoliciesFromTest from "./components/ParkPoliciesFromTest.vue";
import ParkIntroCardFromTest from "./components/ParkIntroCardFromTest.vue";
import ParkHonorsFromTest from "./components/ParkHonorsFromTest.vue";
import ParkContactFromTest from "./components/ParkContactFromTest.vue";
import ParkBottomActionsFromTest from "./components/ParkBottomActionsFromTest.vue";

const park = ref({
  name: "园区详情",
  desc: "暂无园区简介",
  location: "未知地区",
  image: "",
});

const decode = (value) => {
  if (!value) {
    return "";
  }
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
};

onLoad((query) => {
  park.value = {
    name: decode(query?.name) || "园区详情",
    desc: decode(query?.desc) || "暂无园区简介",
    location: decode(query?.location) || "未知地区",
    image: decode(query?.image) || "",
  };
});
</script>

<template>
  <view class="page">
    <ParkBannerFromTest />
    <ParkDetailContentFromTest :park="park" />
    <ParkStatsFromTest />
    <ParkIndustriesFromTest />
    <ParkFactoriesFromTest />
    <ParkEnterpriseServicesFromTest />
    <ParkPoliciesFromTest />
    <ParkIntroCardFromTest />
    <ParkHonorsFromTest />
    <ParkContactFromTest />
    <ParkBottomActionsFromTest />
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  /* padding: 24rpx; */
  box-sizing: border-box;
  background: #f5f7fb;
  padding-bottom: 320rpx;
}

.hero-card {
  position: relative;
  height: 420rpx;
  border-radius: 24rpx;
  overflow: hidden;
  background: #dbe3ef;
}

.hero-image {
  width: 100%;
  height: 100%;
}

.hero-mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.08) 0%,
    rgba(15, 23, 42, 0.65) 100%
  );
}

.hero-content {
  position: absolute;
  left: 24rpx;
  right: 24rpx;
  bottom: 24rpx;
}

.park-name {
  display: block;
  font-size: 40rpx;
  line-height: 1.25;
  font-weight: 600;
  color: #ffffff;
}

.location-row {
  margin-top: 16rpx;
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.location-icon {
  width: 28rpx;
  height: 28rpx;
}

.location-text {
  font-size: 24rpx;
  color: #ffd89a;
}

.info-card {
  margin-top: 24rpx;
  padding: 28rpx;
  border-radius: 20rpx;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.08);
}

.section-title {
  display: block;
  font-size: 30rpx;
  color: #111827;
  font-weight: 600;
}

.section-desc {
  margin-top: 16rpx;
  display: block;
  font-size: 26rpx;
  color: #5b6472;
  line-height: 1.65;
}

.advantage-list {
  margin-top: 16rpx;
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.advantage-item {
  font-size: 26rpx;
  color: #5b6472;
  line-height: 1.65;
}
</style>
