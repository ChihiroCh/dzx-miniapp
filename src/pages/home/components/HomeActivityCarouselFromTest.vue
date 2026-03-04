<script setup>
import { ref } from "vue";

const slides = [
  {
    title: "大招象园区巡礼 - 走进张江科学城",
    tag: "园区活动",
    image: "/static/home-activity/activity-1.jpg",
  },
  {
    title: "2025制造业选址峰会高峰论坛",
    tag: "园区活动",
    image: "/static/home-activity/activity-2.jpg",
  },
  {
    title: "东方美谷产业对接洽谈会",
    tag: "园区活动",
    image: "/static/home-activity/activity-3.jpg",
  },
];

const currentIndex = ref(0);

const onSwiperChange = (event) => {
  currentIndex.value = event.detail.current;
};

const onDotTap = (event) => {
  const index = Number(event.currentTarget.dataset.index);
  if (Number.isInteger(index)) {
    currentIndex.value = index;
  }
};
</script>

<template>
  <view class="activity-section">
    <view class="activity-shell">
      <swiper
        class="activity-swiper"
        :current="currentIndex"
        :autoplay="true"
        :interval="3200"
        :duration="500"
        :circular="true"
        @change="onSwiperChange"
      >
        <swiper-item v-for="item in slides" :key="item.title">
          <view class="activity-item">
            <image class="activity-image" :src="item.image" mode="aspectFill" />
            <view class="activity-overlay">
              <text class="activity-title">{{ item.title }}</text>
            </view>
            <view class="activity-tag">
              <text class="activity-tag-text">{{ item.tag }}</text>
            </view>
          </view>
        </swiper-item>
      </swiper>

      <view class="indicator-wrap">
        <view
          v-for="(_, index) in slides"
          :key="`activity-dot-${index}`"
          class="indicator-dot"
          :class="{ 'indicator-dot-active': currentIndex === index }"
          :data-index="index"
          @tap="onDotTap"
        />
      </view>
    </view>
  </view>
</template>

<style scoped>
.activity-section {
  padding: 32rpx;
}

.activity-shell {
  position: relative;
  overflow: hidden;
  border-radius: 24rpx;
  height: 224rpx;
  box-shadow: 0 12rpx 32rpx rgba(15, 23, 42, 0.16);
}

.activity-swiper {
  width: 100%;
  height: 100%;
}

.activity-item {
  width: 100%;
  height: 100%;
  position: relative;
}

.activity-image {
  width: 100%;
  height: 100%;
}

.activity-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24rpx;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
}

.activity-title {
  display: block;
  color: #ffffff;
  font-size: 24rpx;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-tag {
  position: absolute;
  top: 16rpx;
  right: 16rpx;
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  background: #f59e0b;
}

.activity-tag-text {
  display: block;
  color: #ffffff;
  font-size: 20rpx;
  font-weight: 700;
  line-height: 1.4;
}

.indicator-wrap {
  position: absolute;
  right: 24rpx;
  bottom: 16rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.indicator-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.indicator-dot-active {
  width: 32rpx;
  background: #ffffff;
}
</style>
