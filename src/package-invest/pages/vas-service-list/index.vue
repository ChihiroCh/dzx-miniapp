<script setup>
import { computed, ref } from "vue";

const categories = ["全部", "资质认定", "企业服务", "人才服务", "知识产权", "资金支持", "贸易服务", "融资服务"];

const activeCategory = ref("全部");

const services = [
  {
    id: "service-1",
    title: "高新技术企业认定",
    description: "协助企业申报高新技术企业资质，享受税收优惠政策",
    category: "资质认定",
    icon: "/package-invest/static/icons/vas-service-list/zap-primary.png",
    iconBg: "#eff6ff",
  },
  {
    id: "service-2",
    title: "专精特新申请",
    description: "帮助企业获得专精特新\"小巨人\"企业认定，获得政策支持",
    category: "资质认定",
    icon: "/package-invest/static/icons/vas-service-list/star-primary.png",
    iconBg: "#faf5ff",
  },
  {
    id: "service-3",
    title: "财税法律服务",
    description: "提供企业财务规划、税务筹划、法律咨询等全方位服务",
    category: "企业服务",
    icon: "/package-invest/static/icons/vas-service-list/file-text-primary.png",
    iconBg: "#f0fdf4",
  },
  {
    id: "service-4",
    title: "人才引进政策申报",
    description: "协助企业申报人才引进补贴，吸引优秀人才加入",
    category: "人才服务",
    icon: "/package-invest/static/icons/vas-service-list/users-primary.png",
    iconBg: "#fff7ed",
  },
  {
    id: "service-5",
    title: "知识产权保护",
    description: "专利申请、商标注册、版权保护等知识产权全套服务",
    category: "知识产权",
    icon: "/package-invest/static/icons/vas-service-list/shield-primary.png",
    iconBg: "#fef2f2",
  },
  {
    id: "service-6",
    title: "研发创新补贴",
    description: "申报研发投入补贴、创新基金等政府扶持资金",
    category: "资金支持",
    icon: "/package-invest/static/icons/vas-service-list/lightbulb-primary.png",
    iconBg: "#fefce8",
  },
  {
    id: "service-7",
    title: "进出口贸易服务",
    description: "协助企业办理进出口权、报关、通关等贸易手续",
    category: "贸易服务",
    icon: "/package-invest/static/icons/vas-service-list/globe-primary.png",
    iconBg: "#ecfeff",
  },
  {
    id: "service-8",
    title: "融资对接服务",
    description: "连接金融机构，帮助企业获得贷款、融资等资金支持",
    category: "融资服务",
    icon: "/package-invest/static/icons/vas-service-list/trending-up-primary.png",
    iconBg: "#eef2ff",
  },
];

const filteredServices = computed(() => {
  if (activeCategory.value === "全部") {
    return services;
  }
  return services.filter((item) => item.category === activeCategory.value);
});

const selectCategory = (category) => {
  activeCategory.value = category;
};

const onCardTap = (item) => {
  const query = [
    `title=${encodeURIComponent(item.title)}`,
    `category=${encodeURIComponent(item.category)}`,
    `description=${encodeURIComponent(item.description)}`,
  ].join("&");

  uni.navigateTo({
    url: `/package-invest/pages/vas-service-detail/index?${query}`,
  });
};
</script>

<template>
  <view class="vas-page">
    <view class="category-bar">
      <scroll-view class="category-scroll" scroll-x enable-flex show-scrollbar="false">
        <view class="category-list">
          <view
            v-for="category in categories"
            :key="`category-${category}`"
            class="category-item"
            :class="{ 'category-item-active': activeCategory === category }"
            @tap="selectCategory(category)"
          >
            <text class="category-text" :class="{ 'category-text-active': activeCategory === category }">{{ category }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="service-list">
      <view
        v-for="item in filteredServices"
        :key="item.id"
        class="service-card"
        hover-class="service-card-hover"
        hover-stay-time="100"
        @tap="onCardTap(item)"
      >
        <view class="service-card-body">
          <view class="service-icon-wrap" :style="{ backgroundColor: item.iconBg }">
            <image class="service-icon" :src="item.icon" mode="aspectFit" />
          </view>

          <view class="service-main">
            <view class="service-head">
              <text class="service-title">{{ item.title }}</text>
              <image class="service-arrow" :src="'/package-invest/static/icons/vas-service-list/chevron-right-muted.png'" mode="aspectFit" />
            </view>

            <text class="service-desc">{{ item.description }}</text>

            <view class="service-tag-wrap">
              <text class="service-tag">{{ item.category }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.vas-page {
  min-height: 100vh;
  background: #ffffff;
}

.category-bar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: #ffffff;
  border-bottom: 2rpx solid #e2e8f0;
  padding: 24rpx 32rpx;
}

.category-scroll {
  width: 100%;
}

.category-list {
  display: flex;
  align-items: center;
  column-gap: 16rpx;
  white-space: nowrap;
  padding-bottom: 4rpx;
}

.category-item {
  flex-shrink: 0;
  padding: 12rpx 32rpx;
  border-radius: 999rpx;
  background: #f1f5f9;
}

.category-item-active {
  background: #003367;
}

.category-text {
  font-size: 26rpx;
  font-weight: 500;
  color: #64748b;
  line-height: 1.2;
}

.category-text-active {
  color: #ffffff;
}

.service-list {
  padding: 48rpx 32rpx;
}

.service-card {
  border-radius: 16rpx;
  border: 2rpx solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.04);
}

.service-card + .service-card {
  margin-top: 32rpx;
}

.service-card-hover {
  border-color: rgba(0, 51, 103, 0.28);
}

.service-card-body {
  display: flex;
  align-items: flex-start;
  column-gap: 24rpx;
  padding: 32rpx;
}

.service-icon-wrap {
  width: 112rpx;
  height: 112rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.service-icon {
  width: 56rpx;
  height: 56rpx;
  display: block;
}

.service-main {
  flex: 1;
  min-width: 0;
}

.service-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 16rpx;
  margin-bottom: 8rpx;
}

.service-title {
  flex: 1;
  min-width: 0;
  font-size: 30rpx;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.service-arrow {
  width: 40rpx;
  height: 40rpx;
  flex-shrink: 0;
  margin-top: 2rpx;
}

.service-desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 16rpx;
  font-size: 26rpx;
  line-height: 1.5;
  color: #64748b;
}

.service-tag-wrap {
  display: inline-flex;
}

.service-tag {
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  background: #f1f5f9;
  font-size: 22rpx;
  line-height: 1.2;
  color: #64748b;
}
</style>
