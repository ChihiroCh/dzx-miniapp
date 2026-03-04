<script setup>
const props = defineProps({
  park: {
    type: Object,
    default: () => ({
      name: "张江科学城",
      location: "上海·浦东",
      desc: "生物医药产业集聚区，政策覆盖面广",
    }),
  },
});
</script>

<template>
  <view class="detail-content">
    <view class="base-info">
      <view class="title-row">
        <text class="park-title">{{ props.park.name || "张江科学城" }}</text>
        <text class="park-level">国家级</text>
      </view>

      <view class="location-line">
        <image class="location-icon" src="/static/icons/park-detail-content/map-pin.png" mode="aspectFit" />
        <text class="location-text">{{ props.park.location || "上海·浦东" }}</text>
      </view>

      <text class="park-desc">{{ props.park.desc || "生物医药产业集聚区，政策覆盖面广" }}</text>
    </view>

    <view class="rating-row">
      <view class="star-list">
        <image v-for="index in 5" :key="`star-${index}`" class="star-icon" src="/static/icons/park-detail-content/star.png" mode="aspectFit" />
      </view>
      <text class="rating-text">5.0 (1200家企业入驻)</text>
    </view>
  </view>
</template>

<style scoped>
.detail-content {
  margin-top: 24rpx;
  padding: 0 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
  box-sizing: border-box;
}

.base-info {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.park-title {
  font-size: 48rpx;
  line-height: 1.2;
  font-weight: 700;
  color: #0f172a;
}

.park-level {
  padding: 8rpx 16rpx;
  border-radius: 9999rpx;
  background: #003367;
  color: #ffffff;
  font-size: 24rpx;
  line-height: 1.2;
  font-weight: 600;
}

.location-line {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.location-icon {
  width: 32rpx;
  height: 32rpx;
}

.location-text {
  font-size: 28rpx;
  color: #64748b;
  line-height: 1.4;
}

.park-desc {
  font-size: 28rpx;
  color: #111827;
  line-height: 1.6;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.star-list {
  display: flex;
  align-items: center;
  gap: 4rpx;
}

.star-icon {
  width: 32rpx;
  height: 32rpx;
}

.rating-text {
  margin-left: 16rpx;
  font-size: 24rpx;
  color: #64748b;
  line-height: 1.4;
}
</style>
