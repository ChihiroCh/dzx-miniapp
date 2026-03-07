<script setup>
import { computed, ref } from "vue";

const keyword = ref("");
const activeCategory = ref("全部");

const categories = ["全部", "标准规范", "参数知识", "类型知识", "施工工艺", "其他"];

const wikiItems = [
  {
    id: 1,
    title: "什么是工业厂房的“丙类”与“丁类”？",
    category: "标准规范",
    summary: "详细讲解消防等级划分对企业入驻与报捕的影响。",
    views: "2500",
    date: "2026/02/10",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/f2a1a25b-e213-4e4b-b323-fe7108a0233e.png",
  },
  {
    id: 2,
    title: "厂房承重1.5t/㎡意味着什么？",
    category: "参数知识",
    summary: "解读地面承重参数对重型设备摆放的重要性。",
    views: "1890",
    date: "2026/01/20",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/c63d4ed1-e4d8-4e6f-aa43-752ed4ce6219.png",
  },
];

const filteredItems = computed(() => {
  const query = keyword.value.trim().toLowerCase();

  return wikiItems.filter((item) => {
    const categoryMatch = activeCategory.value === "全部" || item.category === activeCategory.value;
    if (!categoryMatch) {
      return false;
    }
    if (!query) {
      return true;
    }
    return item.title.toLowerCase().includes(query) || item.summary.toLowerCase().includes(query);
  });
});

const onCardTap = (item) => {
  uni.navigateTo({
    url: `/package-invest/pages/factory-wiki-detail/index?id=${encodeURIComponent(String(item.id))}`,
  });
};

const onFeedbackTap = () => {
  uni.showToast({
    title: "感谢反馈，我们会尽快完善",
    icon: "none",
  });
};
</script>

<template>
  <view class="wiki-page">
    <view class="search-filter-wrap">
      <view class="search-input-wrap">
        <image class="search-icon" src="../../static/icons/factory-wiki/search-muted.png" mode="aspectFit" />
        <input v-model="keyword" class="search-input" type="text" placeholder="搜索知识词条..." />
      </view>

      <scroll-view class="category-scroll" scroll-x enable-flex show-scrollbar="false">
        <view class="category-row">
          <view
            v-for="item in categories"
            :key="item"
            class="category-pill"
            :class="{ 'category-pill-active': item === activeCategory }"
            @tap="activeCategory = item"
          >
            <text class="category-pill-text" :class="{ 'category-pill-text-active': item === activeCategory }">
              {{ item }}
            </text>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="wiki-list">
      <view v-for="item in filteredItems" :key="item.id" class="wiki-card" hover-class="wiki-card-hover" @tap="onCardTap(item)">
        <view class="wiki-card-main">
          <view class="wiki-cover-wrap">
            <image class="wiki-cover" :src="item.image" mode="aspectFill" />
          </view>

          <view class="wiki-content">
            <view class="wiki-top">
              <text class="wiki-title">{{ item.title }}</text>
              <view class="wiki-badge">
                <text class="wiki-badge-text">{{ item.category }}</text>
              </view>
            </view>

            <view class="wiki-bottom">
              <text class="wiki-summary">{{ item.summary }}</text>
              <view class="wiki-meta">
                <view class="wiki-meta-item">
                  <image class="wiki-meta-icon" src="../../static/icons/factory-wiki/eye-muted.png" mode="aspectFit" />
                  <text class="wiki-meta-text">{{ item.views }}</text>
                </view>
                <view class="wiki-meta-item">
                  <image class="wiki-meta-icon" src="../../static/icons/factory-wiki/calendar-muted.png" mode="aspectFit" />
                  <text class="wiki-meta-text">{{ item.date }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="wiki-count-wrap">
        <text class="wiki-count-text">共 {{ filteredItems.length }} 条知识词条</text>
      </view>
    </view>

    <view class="feedback-wrap">
      <view class="feedback-btn" hover-class="feedback-btn-hover" @tap="onFeedbackTap">
        <image class="feedback-icon" src="../../static/icons/factory-wiki/message-square-primary.png" mode="aspectFit" />
        <text class="feedback-text">没找到需要的知识？反馈给我们</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.wiki-page {
  min-height: 100vh;
  background: #ffffff;
  padding-bottom: 220rpx;
  box-sizing: border-box;
}

.search-filter-wrap {
  position: sticky;
  top: 0;
  z-index: 40;
  background: #ffffff;
  border-bottom: 2rpx solid #e2e8f0;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.search-input-wrap {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 24rpx;
  top: 50%;
  width: 36rpx;
  height: 36rpx;
  transform: translateY(-50%);
}

.search-input {
  width: 100%;
  height: 80rpx;
  border-radius: 999rpx;
  background: #f1f5f9;
  border: 0;
  padding: 0 24rpx 0 76rpx;
  font-size: 28rpx;
  color: #0f172a;
  box-sizing: border-box;
}

.category-scroll {
  width: 100%;
  white-space: nowrap;
}

.category-row {
  display: inline-flex;
  column-gap: 16rpx;
  padding-right: 16rpx;
}

.category-pill {
  flex-shrink: 0;
  padding: 12rpx 24rpx;
  border-radius: 999rpx;
  background: #f1f5f9;
}

.category-pill-active {
  background: #003367;
}

.category-pill-text {
  font-size: 24rpx;
  line-height: 1.3;
  color: #64748b;
  font-weight: 500;
}

.category-pill-text-active {
  color: #ffffff;
}

.wiki-list {
  padding: 48rpx 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.wiki-card {
  border-radius: 20rpx;
  border: 2rpx solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.08);
  overflow: hidden;
}

.wiki-card-hover {
  opacity: 0.92;
}

.wiki-card-main {
  display: flex;
  column-gap: 24rpx;
}

.wiki-cover-wrap {
  width: 160rpx;
  height: 160rpx;
  border-radius: 16rpx;
  overflow: hidden;
  background: #f1f5f9;
  flex-shrink: 0;
  margin: 12rpx;
}

.wiki-cover {
  width: 100%;
  height: 100%;
}

.wiki-content {
  flex: 1;
  min-width: 0;
  padding: 24rpx 24rpx 24rpx 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 16rpx;
}

.wiki-top {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.wiki-title {
  font-size: 28rpx;
  line-height: 1.45;
  color: #0f172a;
  font-weight: 600;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.wiki-badge {
  align-self: flex-start;
  min-height: 36rpx;
  padding: 0 18rpx;
  border-radius: 999rpx;
  background: #f59f0a;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.wiki-badge-text {
  display: block;
  text-align: center;
  font-size: 20rpx;
  line-height: 1;
  color: #ffffff;
  font-weight: 600;
}

.wiki-bottom {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.wiki-summary {
  font-size: 22rpx;
  line-height: 1.45;
  color: #64748b;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.wiki-meta {
  display: flex;
  align-items: center;
  column-gap: 24rpx;
}

.wiki-meta-item {
  display: flex;
  align-items: center;
  column-gap: 8rpx;
}

.wiki-meta-icon {
  width: 24rpx;
  height: 24rpx;
}

.wiki-meta-text {
  font-size: 20rpx;
  line-height: 1.3;
  color: #64748b;
}

.wiki-count-wrap {
  padding-top: 8rpx;
  text-align: center;
}

.wiki-count-text {
  font-size: 22rpx;
  line-height: 1.45;
  color: #64748b;
}

.feedback-wrap {
  position: fixed;
  left: 32rpx;
  right: 32rpx;
  bottom: calc(env(safe-area-inset-bottom) + 80rpx);
  z-index: 40;
}

.feedback-btn {
  height: 80rpx;
  border: 2rpx solid #003367;
  border-radius: 12rpx;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 12rpx;
}

.feedback-btn-hover {
  background: rgba(0, 51, 103, 0.05);
}

.feedback-icon {
  width: 32rpx;
  height: 32rpx;
}

.feedback-text {
  font-size: 26rpx;
  line-height: 1.35;
  color: #003367;
  font-weight: 500;
}
</style>
