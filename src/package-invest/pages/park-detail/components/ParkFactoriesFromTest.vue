<script setup>
const factories = [
  {
    name: "张江集成电路产业园 - A3栋标准厂房",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/873dac6c-b82d-4ef0-9948-88d88e7cb90f.png",
    spec: "1200㎡ | 层高 6m",
    power: "配电 200KVA",
    price: "¥45/㎡/月",
  },
  {
    name: "张江科学城 - B5栋生产车间",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/0d86c67f-f5b4-49ad-89b9-e842de805e66.png",
    spec: "2500㎡ | 层高 8m",
    power: "配电 500KVA",
    price: "¥42/㎡/月",
  },
];

const openFactoryList = () => {
  uni.navigateTo({
    url: "/package-invest/pages/factory-list/index",
  });
};
</script>

<template>
  <view class="park-factories-wrap">
    <text class="factories-title">园区厂房</text>

    <view class="factories-list">
      <view v-for="(factory, index) in factories" :key="`factory-${index}`" class="factory-item">
        <view class="factory-card">
          <view class="factory-body">
            <view class="factory-image-wrap">
              <image class="factory-image" :src="factory.image" mode="aspectFill" />
            </view>

            <view class="factory-info">
              <text class="factory-name">{{ factory.name }}</text>

              <view class="factory-meta">
                <view class="meta-row">
                  <image class="meta-icon" src="/static/icons/park-factories/maximize-2.png" mode="aspectFit" />
                  <text>{{ factory.spec }}</text>
                </view>
                <view class="meta-row">
                  <image class="meta-icon" src="/static/icons/park-factories/zap.png" mode="aspectFit" />
                  <text>{{ factory.power }}</text>
                </view>
              </view>

              <view class="factory-footer">
                <text class="factory-price">{{ factory.price }}</text>
                <view class="detail-btn">
                  <text class="detail-btn-text">查看详情</text>
                  <image class="detail-btn-icon" src="/static/icons/park-factories/chevron-right.png" mode="aspectFit" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="all-btn" @tap="openFactoryList">
        <text class="all-btn-text">查看全部厂房</text>
        <image class="all-btn-icon" src="/static/icons/park-factories/chevron-right.png" mode="aspectFit" />
      </view>
    </view>
  </view>
</template>

<style scoped>
.park-factories-wrap {
  margin-top: 24rpx;
  padding: 0 32rpx 40rpx;
  box-sizing: border-box;
}

.factories-title {
  display: block;
  font-size: 36rpx;
  line-height: 1.4;
  font-weight: 600;
  color: #111827;
}

.factories-list {
  margin-top: 24rpx;
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.factory-item {
  width: 100%;
}

.factory-card {
  border-radius: 16rpx;
  border: 1px solid #e9edf3;
  background: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.factory-body {
  display: flex;
  gap: 24rpx;
  padding: 24rpx;
}

.factory-image-wrap {
  width: 192rpx;
  height: 192rpx;
  border-radius: 16rpx;
  overflow: hidden;
  background: #f1f5f9;
  flex-shrink: 0;
}

.factory-image {
  width: 100%;
  height: 100%;
}

.factory-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.factory-name {
  display: block;
  font-size: 28rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.factory-meta {
  display: flex;
  flex-direction: column;
  row-gap: 4rpx;
  color: #6c7480;
  font-size: 24rpx;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
  line-height: 1.35;
}

.meta-icon {
  width: 28rpx;
  height: 28rpx;
  flex-shrink: 0;
}

.factory-footer {
  margin-top: 8rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.factory-price {
  font-size: 28rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #003367;
}

.detail-btn {
  height: 48rpx;
  padding: 0 16rpx;
  border-radius: 12rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.detail-btn-text {
  font-size: 24rpx;
  line-height: 1.2;
  color: #111827;
}

.detail-btn-icon {
  margin-left: 8rpx;
  width: 28rpx;
  height: 28rpx;
}

.all-btn {
  width: 100%;
  height: 80rpx;
  padding: 0 32rpx;
  border-radius: 12rpx;
  border: 1px solid #d7dde8;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.all-btn-text {
  font-size: 28rpx;
  line-height: 1.3;
  color: #111827;
}

.all-btn-icon {
  margin-left: 16rpx;
  width: 32rpx;
  height: 32rpx;
}
</style>
