<script setup>
const stats = [
  {
    label: "产业总值",
    value: "2025年 xxx亿元",
    icon: "/package-invest/static/icons/park-stats/trending-up.png",
  },
  {
    label: "产业企业",
    value: "1200+ 家",
    icon: "/package-invest/static/icons/park-stats/building-2.png",
  },
  {
    label: "同比增长",
    value: "+18%",
    icon: "/package-invest/static/icons/park-stats/chart-column.png",
  },
  {
    label: "从业人数",
    value: "5万+ 人",
    icon: "/package-invest/static/icons/park-stats/users.png",
  },
];
</script>

<template>
  <view class="park-stats-wrap">
    <view class="park-stats-grid">
      <view v-for="(item, index) in stats" :key="`stat-${index}`" class="park-stats-card">
        <view class="park-stats-content">
          <view class="park-stats-icon-box">
            <image class="park-stats-icon" :src="item.icon" mode="aspectFit" />
          </view>
          <view class="park-stats-text">
            <text class="park-stats-label">{{ item.label }}</text>
            <text class="park-stats-value">{{ item.value }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.park-stats-wrap {
  margin-top: 24rpx;
  padding: 0 32rpx 40rpx;
  box-sizing: border-box;
}

.park-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24rpx;
}

.park-stats-card {
  border-radius: 16rpx;
  border: 2rpx solid rgba(31, 122, 255, 0.1);
  background-color: #ffffff;
  background-image: linear-gradient(
    to bottom right,
    rgba(31, 122, 255, 0.05) 0%,
    rgba(245, 158, 11, 0.05) 100%
  );
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
}

.park-stats-content {
  padding: 24rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.park-stats-icon-box {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  background: rgba(31, 122, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.park-stats-icon {
  width: 40rpx;
  height: 40rpx;
}

.park-stats-text {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
  flex: 1;
}

.park-stats-label {
  font-size: 20rpx;
  line-height: 1.3;
  color: #6b7280;
}

.park-stats-value {
  margin-top: 4rpx;
  font-size: 24rpx;
  line-height: 1.3;
  font-weight: 700;
  color: #111827;
}
</style>
