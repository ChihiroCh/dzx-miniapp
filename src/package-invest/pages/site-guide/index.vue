<script setup>
import { computed, ref } from "vue";

const keyword = ref("");
const activeCategory = ref("全部");

const categories = ["全部", "避坑指南", "预算方案", "政策", "聚集地", "区域"];

const tagMap = {
  "避坑指南": {
    icon: "../../static/icons/site-guide/triangle-alert-red.png",
    bg: "#fee2e2",
    color: "#b91c1c",
  },
  "预算方案": {
    icon: "../../static/icons/site-guide/dollar-sign-green.png",
    bg: "#dcfce7",
    color: "#15803d",
  },
  政策: {
    icon: "../../static/icons/site-guide/file-text-blue.png",
    bg: "#dbeafe",
    color: "#1d4ed8",
  },
  聚集地: {
    icon: "../../static/icons/site-guide/map-pin-purple.png",
    bg: "#f3e8ff",
    color: "#7e22ce",
  },
  区域: {
    icon: "../../static/icons/site-guide/globe-orange.png",
    bg: "#ffedd5",
    color: "#c2410c",
  },
};

const guideItems = [
  {
    id: "1",
    title: "化妆品工厂选址避坑5大关键",
    summary: "除了环评，你还需要关注这几个隐形细节。",
    category: "避坑指南",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/0edb0f3b-9f48-4445-afd3-f012b33dd98c.png",
  },
  {
    id: "2",
    title: "如何低成本扩容企业配电？",
    summary: "针对用电大的企业，通过园区协调省下几十万增容费。",
    category: "预算方案",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/deb81ae0-54aa-4807-9360-2364296db8e9.png",
  },
  {
    id: "3",
    title: "长三角产业转移政策对比",
    summary: "上海、江苏、浙江三地补贴政策全面解读。",
    category: "政策",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/5f7f12c0-c7b2-41c6-abab-e3873ad67c9e.png",
  },
  {
    id: "4",
    title: "新能源汽车产业聚集地排名",
    summary: "2025年全国新能源产业园区TOP10分析。",
    category: "聚集地",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/e282f721-1b95-4de9-90b9-05255e38902c.png",
  },
  {
    id: "5",
    title: "中小企业如何选择产业园区",
    summary: "500万-2000万投资规模企业的最优选择。",
    category: "预算方案",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/60acd730-d7fb-40e5-b3e3-ffad4feeb3ce.png",
  },
  {
    id: "6",
    title: "生物医药产业园区环评要求",
    summary: "从GMP认证到环保达标的完整流程。",
    category: "政策",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/973429ac-898d-4d9d-8d22-b7ca1299e2ba.png",
  },
  {
    id: "7",
    title: "区域选择：一二线城市对比",
    summary: "成本、政策、人才三维度深度分析。",
    category: "区域",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/03c2b729-bf89-4a07-9632-7e0a2a64c351.png",
  },
  {
    id: "8",
    title: "租赁合同中的隐形陷阱",
    summary: "5个常见条款让你多花百万冤枉钱。",
    category: "避坑指南",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/b5f95a47-fc40-4c30-8247-4bc35ca620be.png",
  },
];

const displayItems = computed(() => {
  const query = keyword.value.trim().toLowerCase();
  return guideItems.filter((item) => {
    const categoryOk = activeCategory.value === "全部" || item.category === activeCategory.value;
    if (!categoryOk) {
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
    url: `/package-invest/pages/site-guide-detail/index?id=${item.id}`,
  });
};

const onConsultTap = () => {
  uni.navigateTo({
    url: "/package-invest/pages/project-entrust/index",
  });
};
</script>

<template>
  <view class="page">
    <view class="content">
      <view class="search-row">
        <input v-model="keyword" class="search-input" type="text" placeholder="搜索指南..." />
        <view class="search-btn">
          <image class="search-btn-icon" src="../../static/icons/site-guide/search-muted.png" mode="aspectFit" />
        </view>
      </view>

      <scroll-view class="category-scroll" scroll-x enable-flex show-scrollbar="false">
        <view class="category-row">
          <view
            v-for="item in categories"
            :key="item"
            class="category-btn"
            :class="{ 'category-btn-active': item === activeCategory }"
            @tap="activeCategory = item"
          >
            <text class="category-btn-text" :class="{ 'category-btn-text-active': item === activeCategory }">{{ item }}</text>
          </view>
        </view>
      </scroll-view>

      <view class="card-list">
        <view v-for="item in displayItems" :key="item.id" class="guide-card" hover-class="guide-card-hover" @tap="onCardTap(item)">
          <view class="guide-card-inner">
            <view class="guide-image-wrap">
              <image class="guide-image" :src="item.image" mode="aspectFill" />
            </view>
            <view class="guide-main">
              <view class="guide-title-row">
                <text class="guide-title">{{ item.title }}</text>
                <image class="guide-arrow" src="../../static/icons/site-guide/chevron-right-muted.png" mode="aspectFit" />
              </view>
              <text class="guide-summary">{{ item.summary }}</text>
              <view class="guide-tag" :style="{ background: tagMap[item.category].bg }">
                <image class="guide-tag-icon" :src="tagMap[item.category].icon" mode="aspectFit" />
                <text class="guide-tag-text" :style="{ color: tagMap[item.category].color }">{{ item.category }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="consult-card">
        <view class="consult-main">
          <text class="consult-title">还是不知道怎么选？</text>
          <text class="consult-subtitle">让我们的顾问帮你分析</text>
        </view>
        <view class="consult-btn" @tap="onConsultTap">
          <text class="consult-btn-text">委托选址</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #ffffff;
  padding-bottom: 64rpx;
}

.content {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.search-row {
  display: flex;
  align-items: center;
  column-gap: 16rpx;
}

.search-input {
  flex: 1;
  height: 80rpx;
  border-radius: 12rpx;
  border: 2rpx solid #dbe3ef;
  background: #ffffff;
  padding: 0 24rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  color: #0f172a;
}

.search-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 12rpx;
  border: 2rpx solid #dbe3ef;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn-icon {
  width: 40rpx;
  height: 40rpx;
}

.category-scroll {
  width: 100%;
}

.category-row {
  display: inline-flex;
  column-gap: 16rpx;
  padding-bottom: 8rpx;
}

.category-btn {
  height: 72rpx;
  padding: 0 24rpx;
  border-radius: 12rpx;
  border: 2rpx solid #dbe3ef;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-btn-active {
  border-color: #003367;
  background: #003367;
}

.category-btn-text {
  font-size: 26rpx;
  line-height: 1.3;
  color: #334155;
}

.category-btn-text-active {
  color: #ffffff;
}

.card-list {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.guide-card {
  border-radius: 16rpx;
  border: 2rpx solid #e2e8f0;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 6rpx 18rpx rgba(15, 23, 42, 0.06);
}

.guide-card-hover {
  opacity: 0.92;
}

.guide-card-inner {
  height: 192rpx;
  display: flex;
  column-gap: 24rpx;
}

.guide-image-wrap {
  width: 192rpx;
  height: 192rpx;
  flex-shrink: 0;
  background: #f1f5f9;
}

.guide-image {
  width: 100%;
  height: 100%;
}

.guide-main {
  flex: 1;
  padding: 24rpx 24rpx 24rpx 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.guide-title-row {
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
}

.guide-title {
  flex: 1;
  font-size: 28rpx;
  line-height: 1.4;
  font-weight: 600;
  color: #0f172a;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.guide-arrow {
  width: 36rpx;
  height: 36rpx;
  margin-top: 2rpx;
  flex-shrink: 0;
}

.guide-summary {
  font-size: 22rpx;
  color: #64748b;
  line-height: 1.35;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.guide-tag {
  align-self: flex-start;
  min-height: 36rpx;
  padding: 0 16rpx;
  border-radius: 999rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.guide-tag-icon {
  width: 22rpx;
  height: 22rpx;
  margin-right: 8rpx;
}

.guide-tag-text {
  font-size: 20rpx;
  line-height: 1;
  font-weight: 600;
}

.consult-card {
  margin-top: 24rpx;
  border-radius: 16rpx;
  border: 2rpx solid rgba(0, 51, 103, 0.2);
  background: linear-gradient(90deg, rgba(0, 51, 103, 0.1), rgba(245, 159, 10, 0.1));
  padding: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 16rpx;
}

.consult-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
  row-gap: 8rpx;
}

.consult-title {
  font-size: 28rpx;
  line-height: 1.35;
  color: #0f172a;
  font-weight: 600;
}

.consult-subtitle {
  font-size: 22rpx;
  line-height: 1.35;
  color: #64748b;
}

.consult-btn {
  height: 72rpx;
  padding: 0 24rpx;
  border-radius: 12rpx;
  background: #003367;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.consult-btn-text {
  font-size: 24rpx;
  color: #ffffff;
  font-weight: 600;
}
</style>
