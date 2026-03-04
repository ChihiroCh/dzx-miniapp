<script setup>
import FactoryListContentFromTestV2 from "./components/FactoryListContentFromTestV2.vue";

const factories = [
  {
    id: "F001",
    name: "张江集成电路产业园 - A3栋标准厂房",
    image:
      "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/873dac6c-b82d-4ef0-9948-88d88e7cb90f.png",
    spec: "1200㎡ | 层高 6m",
    power: "配电 200KVA",
    price: "¥45/㎡/月",
  },
  {
    id: "F002",
    name: "张江科学城 - B5栋生产车间",
    image:
      "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/0d86c67f-f5b4-49ad-89b9-e842de805e66.png",
    spec: "2500㎡ | 层高 8m",
    power: "配电 500KVA",
    price: "¥42/㎡/月",
  },
  {
    id: "F003",
    name: "张江高科园 - C1栋研发厂房",
    image:
      "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/a79a884f-7039-40cf-b829-dc8f11a3d252.png",
    spec: "1800㎡ | 层高 5.5m",
    power: "配电 300KVA",
    price: "¥48/㎡/月",
  },
  {
    id: "F004",
    name: "浦东智造谷 - D2栋独栋厂房",
    image:
      "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/a55a0dea-ae75-4286-990b-8b02ac7a632e.png",
    spec: "3200㎡ | 层高 9m",
    power: "配电 800KVA",
    price: "¥40/㎡/月",
  },
];
</script>

<template>
  <view class="page">
    <!-- <view v-for="item in factories" :key="item.id" class="factory-card">
      <view class="factory-body">
        <view class="factory-image-wrap">
          <image class="factory-image" :src="item.image" mode="aspectFill" />
        </view>

        <view class="factory-info">
          <text class="factory-name">{{ item.name }}</text>
          <view class="factory-meta">
            <view class="meta-row">
              <image
                class="meta-icon"
                src="/static/icons/park-factories/maximize-2.png"
                mode="aspectFit"
              />
              <text>{{ item.spec }}</text>
            </view>
            <view class="meta-row">
              <image
                class="meta-icon"
                src="/static/icons/park-factories/zap.png"
                mode="aspectFit"
              />
              <text>{{ item.power }}</text>
            </view>
          </view>

          <view class="factory-footer">
            <text class="factory-price">{{ item.price }}</text>
            <view class="detail-btn">
              <text class="detail-btn-text">查看详情</text>
              <image
                class="detail-btn-icon"
                src="/static/icons/park-factories/chevron-right.png"
                mode="aspectFit"
              />
            </view>
          </view>
        </view>
      </view>
    </view> -->

    <FactoryListContentFromTestV2 />
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 24rpx;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
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
</style>
