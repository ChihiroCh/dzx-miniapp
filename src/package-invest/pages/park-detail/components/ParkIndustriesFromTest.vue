<script setup>
import { computed, ref } from "vue";

const positioningList = ["化妆品", "生物医药", "新材料", "无人车", "低空经济", "现代服务业"];
const leadIndustries = ["生命科学", "集成电路", "人工智能"];
const tabList = ["上游", "中游", "下游"];
const activeTab = ref(1);

const tabTagsMap = {
  0: ["原料供应商", "包装材料", "生产设备", "质检仪器"],
  1: ["生产制造", "代工厂", "品牌方", "研发中心"],
  2: ["经销商", "零售商", "电商平台", "物流配送"],
};

const currentTabTags = computed(() => tabTagsMap[activeTab.value] || []);

const setActiveTab = (index) => {
  activeTab.value = index;
};
</script>

<template>
  <view class="park-industries-wrap">
    <text class="industries-title">产业全景</text>

    <view class="position-card">
      <view class="position-content">
        <view class="position-header">
          <view class="position-icon-wrap">
            <image class="position-icon" :src="'/package-invest/static/icons/park-industries/target.png'" mode="aspectFit" />
          </view>
          <text class="position-title">产业定位</text>
        </view>

        <view class="position-grid">
          <view v-for="(item, index) in positioningList" :key="`pos-${index}`" class="position-item">
            <image class="position-item-icon" :src="'/package-invest/static/icons/park-industries/shield-check.png'" mode="aspectFit" />
            <text class="position-item-text">{{ item }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="lead-card">
      <view class="lead-header">
        <text class="lead-title">主导产业</text>
      </view>

      <view class="lead-content">
        <view class="lead-tags">
          <text v-for="(item, index) in leadIndustries" :key="`tag-${index}`" class="lead-tag">
            {{ item }}
          </text>
        </view>

        <view class="tabs-wrap">
          <view class="tabs-list">
            <view
              v-for="(item, index) in tabList"
              :key="`tab-${index}`"
              class="tab-item"
              :class="{ 'tab-item-active': activeTab === index }"
              @tap="setActiveTab(index)"
            >
              <text class="tab-item-text" :class="{ 'tab-item-text-active': activeTab === index }">{{ item }}</text>
            </view>
          </view>
          <view class="tab-tags">
            <view v-for="(tag, tagIndex) in currentTabTags" :key="`tab-tag-${activeTab}-${tagIndex}`" class="tab-muted-tag">
              <text class="tab-muted-tag-text">{{ tag }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.park-industries-wrap {
  margin-top: 32rpx;
  padding: 0 32rpx 40rpx;
  box-sizing: border-box;
}

.industries-title {
  display: block;
  font-size: 36rpx;
  line-height: 1.4;
  font-weight: 600;
  color: #111827;
}

.position-card {
  margin-top: 32rpx;
  border-radius: 16rpx;
  border: 0;
  background: rgba(31, 122, 255, 0.05);
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
}

.position-content {
  padding: 32rpx;
}

.position-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.position-icon-wrap {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  background: #003367;
  display: flex;
  align-items: center;
  justify-content: center;
}

.position-icon {
  width: 36rpx;
  height: 36rpx;
}

.position-title {
  font-size: 28rpx;
  line-height: 1.4;
  font-weight: 700;
  color: #111827;
}

.position-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16rpx;
}

.position-item {
  border-radius: 16rpx;
  border: 2rpx solid rgba(31, 122, 255, 0.1);
  background: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
  min-height: 112rpx;
  padding: 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.position-item-icon {
  width: 32rpx;
  height: 32rpx;
}

.position-item-text {
  margin-top: 8rpx;
  font-size: 20rpx;
  line-height: 1.3;
  font-weight: 500;
  color: #111827;
  white-space: nowrap;
}

.lead-card {
  margin-top: 32rpx;
  border-radius: 16rpx;
  border: 2rpx solid #e9edf3;
  background: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
}

.lead-header {
  padding: 48rpx 48rpx 24rpx;
}

.lead-title {
  display: block;
  font-size: 32rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #111827;
}

.lead-content {
  padding: 0 48rpx 48rpx;
}

.lead-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.lead-tag {
  padding: 12rpx 24rpx;
  border-radius: 9999rpx;
  border: 1px solid rgba(0, 51, 103, 0.2);
  background: rgba(0, 51, 103, 0.1);
  font-size: 24rpx;
  line-height: 1.3;
  font-weight: 500;
  color: #003367;
}

.tabs-wrap {
  margin-top: 24rpx;
}

.tabs-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  justify-content: center;
  border-radius: 12rpx;
  background: #f1f5f9;
  padding: 8rpx;
  box-sizing: border-box;
  gap: 8rpx;
}

.tab-item {
  min-height: 52rpx;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12rpx 24rpx;
}

.tab-item-active {
  background: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
}

.tab-item-text {
  font-size: 28rpx;
  line-height: 1.3;
  font-weight: 500;
  color: #64748b;
}

.tab-item-text-active {
  color: #111827;
}

.tab-tags {
  margin-top: 24rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tab-muted-tag {
  padding: 8rpx 20rpx;
  border-radius: 12rpx;
  background: #f1f5f9;
}

.tab-muted-tag-text {
  font-size: 24rpx;
  line-height: 1.3;
  color: #6c7480;
}
</style>
