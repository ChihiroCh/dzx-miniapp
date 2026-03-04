<script setup>
const services = [
  { name: "企业登记", icon: "/static/icons/park-enterprise-services/user-plus.png" },
  { name: "银行开户", icon: "/static/icons/park-enterprise-services/credit-card.png" },
  { name: "人才服务", icon: "/static/icons/park-enterprise-services/user-check.png" },
  { name: "环评服务", icon: "/static/icons/park-enterprise-services/leaf.png" },
  { name: "政策解答", icon: "/static/icons/park-enterprise-services/circle-question-mark.png" },
  { name: "产业推荐", icon: "/static/icons/park-enterprise-services/zap.png" },
  { name: "融资租赁", icon: "/static/icons/park-enterprise-services/coins.png" },
  { name: "知识产权", icon: "/static/icons/park-enterprise-services/file-text.png" },
  { name: "法律服务", icon: "/static/icons/park-enterprise-services/scale.png" },
];
</script>

<template>
  <view class="enterprise-wrap">
    <view class="enterprise-head">
      <text class="enterprise-title">配套企服</text>
      <view class="head-more-btn">
        <text class="head-more-text">查看全部</text>
        <image class="head-more-icon" src="/static/icons/park-enterprise-services/chevron-right.png" mode="aspectFit" />
      </view>
    </view>

    <view class="enterprise-carousel">
      <scroll-view scroll-x class="enterprise-scroll" show-scrollbar="false" enhanced>
        <view class="enterprise-row">
          <view v-for="(item, index) in services" :key="`service-${index}`" class="service-col">
            <view class="service-item">
              <view class="service-icon-box">
                <image class="service-icon" :src="item.icon" mode="aspectFit" />
              </view>
              <text class="service-name">{{ item.name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style scoped>
.enterprise-wrap {
  margin-top: 24rpx;
  padding: 0 32rpx 40rpx;
  box-sizing: border-box;
}

.enterprise-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.enterprise-title {
  display: block;
  font-size: 36rpx;
  line-height: 1.4;
  font-weight: 600;
  color: #111827;
}

.head-more-btn {
  display: inline-flex;
  align-items: center;
}

.head-more-text {
  font-size: 24rpx;
  line-height: 1.3;
  color: #6c7480;
}

.head-more-icon {
  margin-left: 4rpx;
  width: 24rpx;
  height: 24rpx;
}

.enterprise-carousel {
  margin-top: 12rpx;
  width: 100%;
  position: relative;
}

.enterprise-scroll {
  width: 100%;
  white-space: nowrap;
}

.enterprise-row {
  display: flex;
  margin-left: -16rpx;
}

.service-col {
  min-width: 20%;
  flex: 0 0 20%;
  padding-left: 16rpx;
  box-sizing: border-box;
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  padding: 8rpx 0;
}

.service-icon-box {
  width: 96rpx;
  height: 96rpx;
  border-radius: 32rpx;
  background: rgba(241, 245, 249, 0.75);
  border: 1px solid rgba(226, 232, 240, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon {
  width: 48rpx;
  height: 48rpx;
  opacity: 0.8;
}

.service-name {
  font-size: 22rpx;
  line-height: 1.35;
  color: #6c7480;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
}
</style>
