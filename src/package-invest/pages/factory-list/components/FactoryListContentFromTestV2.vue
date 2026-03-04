<script setup>
import { computed, ref } from "vue";

const propertyTypes = ["全部", "厂房", "办公室", "仓库"];
const selectedType = ref("全部");

const allFeatures = ["带装修", "双路供电", "卸货平台", "环氧地坪", "货梯直达", "重载地坪"];
const selectedFeatures = ref([]);

const factoryCards = [
  {
    id: "F001-T",
    name: "张江集成电路产业园 - A3栋标准厂房",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/873dac6c-b82d-4ef0-9948-88d88e7cb90f.png",
    area: "1200㎡",
    height: "6m",
    power: "200KVA",
    rent: "45",
    tags: ["带装修", "双路供电", "卸货平台"],
  },
  {
    id: "F002-T",
    name: "张江科学城 - B5栋生产车间",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/0d86c67f-f5b4-49ad-89b9-e842de805e66.png",
    area: "2500㎡",
    height: "8m",
    power: "500KVA",
    rent: "42",
    tags: ["重载地坪", "超高层高", "双路供电"],
  },
];

const resultCount = computed(() => factoryCards.length);

const toggleFeature = (feature) => {
  const exists = selectedFeatures.value.includes(feature);
  if (exists) {
    selectedFeatures.value = selectedFeatures.value.filter((item) => item !== feature);
    return;
  }
  selectedFeatures.value = [...selectedFeatures.value, feature];
};

const openFactoryDetail = (item) => {
  const tags = item.tags?.join("|") || "";
  const params = [
    `id=${encodeURIComponent(item.id || "")}`,
    `name=${encodeURIComponent(item.name || "")}`,
    `image=${encodeURIComponent(item.image || "")}`,
    `area=${encodeURIComponent(item.area || "")}`,
    `height=${encodeURIComponent(item.height || "")}`,
    `power=${encodeURIComponent(item.power || "")}`,
    `rent=${encodeURIComponent(item.rent || "")}`,
    `tags=${encodeURIComponent(tags)}`,
  ].join("&");

  uni.navigateTo({
    url: `/package-invest/pages/factory-detail/index?${params}`,
  });
};
</script>

<template>
  <view class="factory-list-from-test">
    <view class="section-block">
      <text class="section-title">物业类型</text>
      <scroll-view scroll-x class="type-scroll" :show-scrollbar="false">
        <view class="type-row">
          <view
            v-for="type in propertyTypes"
            :key="type"
            class="type-chip"
            :class="{ 'type-chip-active': selectedType === type }"
            @tap="selectedType = type"
          >
            <text class="type-chip-text">{{ type }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="section-block">
      <view class="feature-title-row">
        <text class="section-title">厂房特性</text>
      </view>
      <view class="feature-row">
        <view
          v-for="feature in allFeatures"
          :key="feature"
          class="feature-chip"
          :class="{ 'feature-chip-active': selectedFeatures.includes(feature) }"
          @tap="toggleFeature(feature)"
        >
          <text class="feature-chip-text">{{ feature }}</text>
        </view>
      </view>
    </view>

    <view class="result-row">
      <text class="result-text">
        找到
        <text class="result-text-count">{{ resultCount }}</text>
        个厂房
      </text>
      <view class="filter-btn">
        <image class="filter-icon" :src="'/package-invest/static/icons/factory-list/list-filter.png'" mode="aspectFit" />
      </view>
    </view>

    <view class="cards-wrap">
      <view
        v-for="item in factoryCards"
        :key="item.id"
        class="factory-card"
        @tap="openFactoryDetail(item)"
      >
        <view class="card-image-wrap">
          <image class="card-image" :src="item.image" mode="aspectFill" />
          <view class="card-status-badge">
            <text class="card-status-text">可租</text>
          </view>
        </view>

        <view class="card-content">
          <text class="card-title">{{ item.name }}</text>

          <view class="spec-grid">
            <view class="spec-item">
              <image class="spec-icon" :src="'/package-invest/static/icons/factory-list/maximize-2.png'" mode="aspectFit" />
              <text class="spec-text">{{ item.area }}</text>
            </view>
            <view class="spec-item">
              <image class="spec-icon" :src="'/package-invest/static/icons/factory-list/layers.png'" mode="aspectFit" />
              <text class="spec-text">{{ item.height }}</text>
            </view>
            <view class="spec-item">
              <image class="spec-icon" :src="'/package-invest/static/icons/factory-list/zap.png'" mode="aspectFit" />
              <text class="spec-text">{{ item.power }}</text>
            </view>
          </view>

          <view class="tag-row">
            <view v-for="tag in item.tags.slice(0, 2)" :key="tag" class="tag-chip">
              <text class="tag-chip-text">{{ tag }}</text>
            </view>
            <view v-if="item.tags.length > 2" class="tag-chip">
              <text class="tag-chip-text">+{{ item.tags.length - 2 }}</text>
            </view>
          </view>

          <view class="card-footer">
            <view class="rent-block">
              <text class="rent-label">租金</text>
              <text class="rent-value">
                ¥{{ item.rent }}
                <text class="rent-unit">/㎡/月</text>
              </text>
            </view>

            <view class="consult-btn" @tap.stop>
              <image class="consult-icon" :src="'/package-invest/static/icons/factory-list/message-circle.png'" mode="aspectFit" />
              <text class="consult-text">咨询</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.factory-list-from-test {
  margin-top: 24rpx;
  padding: 32rpx;
  background: #ffffff;
  border-radius: 24rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.section-block {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.section-title {
  display: block;
  font-size: 28rpx;
  line-height: 1.3;
  font-weight: 500;
  color: #111827;
}

.type-scroll {
  width: 100%;
  white-space: nowrap;
}

.type-row {
  display: inline-flex;
  align-items: center;
  gap: 16rpx;
}

.type-chip {
  height: 72rpx;
  padding: 0 24rpx;
  box-sizing: border-box;
  border-radius: 12rpx;
  border: 1px solid #d1d5db;
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.type-chip-active {
  border-color: #003367;
  background: #003367;
}

.type-chip-text {
  font-size: 28rpx;
  line-height: 1.2;
  color: #111827;
  font-weight: 500;
}

.type-chip-active .type-chip-text {
  color: #ffffff;
}

.feature-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.feature-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.feature-chip {
  height: 48rpx;
  padding: 0 20rpx;
  border-radius: 9999rpx;
  border: 1px solid #d1d5db;
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.feature-chip-active {
  border-color: #003367;
  background: rgba(0, 51, 103, 0.06);
}

.feature-chip-text {
  font-size: 24rpx;
  line-height: 1.2;
  color: #111827;
  font-weight: 600;
}

.result-row {
  padding-top: 16rpx;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.result-text {
  font-size: 28rpx;
  line-height: 1.4;
  color: #6b7280;
}

.result-text-count {
  margin: 0 8rpx;
  color: #111827;
  font-weight: 600;
}

.filter-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-icon {
  width: 32rpx;
  height: 32rpx;
}

.cards-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
  padding-bottom: 8rpx;
}

.factory-card {
  border-radius: 16rpx;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.06);
  overflow: hidden;
}

.card-image-wrap {
  position: relative;
  width: 100%;
  height: 320rpx;
  background: #eef2f7;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
}

.card-status-badge {
  position: absolute;
  top: 16rpx;
  right: 16rpx;
  height: 44rpx;
  padding: 0 20rpx;
  border-radius: 9999rpx;
  background: rgba(0, 51, 103, 0.9);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.card-status-text {
  font-size: 22rpx;
  line-height: 1;
  color: #ffffff;
  font-weight: 600;
}

.card-content {
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.card-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 28rpx;
  line-height: 1.35;
  color: #111827;
  font-weight: 600;
}

.spec-grid {
  display: flex;
  align-items: center;
  column-gap: 16rpx;
}

.spec-item {
  width: calc((100% - 32rpx) / 3);
  display: flex;
  align-items: center;
  column-gap: 8rpx;
  min-width: 0;
}

.spec-icon {
  width: 28rpx;
  height: 28rpx;
  flex-shrink: 0;
}

.spec-text {
  flex: 1;
  font-size: 24rpx;
  line-height: 1.2;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}

.tag-chip {
  height: 44rpx;
  border-radius: 9999rpx;
  border: 1px solid #d1d5db;
  padding: 0 20rpx;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tag-chip-text {
  font-size: 22rpx;
  line-height: 1;
  color: #111827;
  font-weight: 600;
}

.card-footer {
  padding-top: 16rpx;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rent-block {
  display: flex;
  flex-direction: column;
  row-gap: 4rpx;
}

.rent-label {
  font-size: 22rpx;
  line-height: 1.2;
  color: #6b7280;
}

.rent-value {
  font-size: 32rpx;
  line-height: 1.2;
  color: #003367;
  font-weight: 600;
}

.rent-unit {
  font-size: 22rpx;
  color: #6b7280;
  font-weight: 400;
}

.consult-btn {
  height: 72rpx;
  padding: 0 24rpx;
  border-radius: 12rpx;
  background: #003367;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.consult-icon {
  width: 28rpx;
  height: 28rpx;
}

.consult-text {
  margin-left: 8rpx;
  font-size: 24rpx;
  line-height: 1.2;
  color: #ffffff;
  font-weight: 500;
}
</style>
