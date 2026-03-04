<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const slides = [
  [
    { name: "美妆美业", count: "3000家企业", icon: "/static/icons/industry/sparkles.png" },
    { name: "生物医药", count: "1500家企业", icon: "/static/icons/industry/stethoscope.png" },
    { name: "智能制造", count: "2500家企业", icon: "/static/icons/industry/factory.png" },
    { name: "新能源车", count: "1200家企业", icon: "/static/icons/industry/car.png" },
    { name: "人工智能", count: "1800家企业", icon: "/static/icons/industry/brain.png" },
    { name: "数字文创", count: "4500家企业", icon: "/static/icons/industry/palette.png" },
  ],
  [
    { name: "新材料", count: "950家企业", icon: "/static/icons/industry/layers.png" },
    { name: "现代物流", count: "1100家企业", icon: "/static/icons/industry/truck.png" },
    { name: "无人车", count: "450家企业", icon: "/static/icons/industry/car-front.png" },
    { name: "低空经济", count: "280家企业", icon: "/static/icons/industry/wind.png" },
    { name: "宠物产业", count: "800家企业", icon: "/static/icons/industry/dog.png" },
    { name: "医疗器械", count: "1200家企业", icon: "/static/icons/industry/stethoscope.png" },
  ],
  [{ name: "高端制造", count: "2100家企业", icon: "/static/icons/industry/cog.png" }],
];

const currentIndex = ref(0);
const slideCount = slides.length;
let autoplayTimer = null;

const onSwiperChange = (event) => {
  currentIndex.value = event.detail.current;
};

const goToSlide = (index) => {
  if (!Number.isInteger(index)) {
    return;
  }
  currentIndex.value = index;
};

const onDotTap = (event) => {
  const index = Number(event.currentTarget.dataset.index);
  goToSlide(index);
  restartAutoplay();
};

const startAutoplay = () => {
  if (autoplayTimer) {
    return;
  }
  autoplayTimer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slideCount;
  }, 3200);
};

const stopAutoplay = () => {
  if (!autoplayTimer) {
    return;
  }
  clearInterval(autoplayTimer);
  autoplayTimer = null;
};

const restartAutoplay = () => {
  stopAutoplay();
  startAutoplay();
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<template>
  <view class="industry-section">
    <view class="industry-wrap">
      <view class="industry-header">
        <text class="industry-title">热门产业集群</text>
        <button class="more-btn">
          <text class="more-text">更多</text>
          <image class="more-icon" src="/static/icons/industry/chevron-right.png" mode="aspectFit" />
        </button>
      </view>

      <view class="slider-wrap">
        <swiper
          class="industry-swiper"
          :current="currentIndex"
          :duration="300"
          :circular="true"
          @change="onSwiperChange"
        >
          <swiper-item v-for="(page, pageIndex) in slides" :key="pageIndex">
            <view class="cluster-grid">
              <view
                v-for="item in page"
                :key="item.name"
                class="cluster-item"
                hover-class="cluster-item-active"
                hover-stay-time="80"
              >
                <view class="cluster-card">
                  <view class="cluster-icon-wrap">
                    <image class="cluster-icon" :src="item.icon" mode="aspectFit" />
                  </view>
                  <view class="cluster-content">
                    <text class="cluster-name">{{ item.name }}</text>
                    <text class="cluster-count">{{ item.count }}</text>
                  </view>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>

        <view class="indicator-row">
          <view
            v-for="(_, index) in slides"
            :key="`dot-${index}`"
            class="indicator-dot"
            :class="{ 'indicator-dot-active': currentIndex === index }"
            :data-index="index"
            @tap="onDotTap"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.industry-section {
  padding: 48rpx 32rpx;
  overflow: hidden;
}

.industry-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.industry-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8rpx;
}

.industry-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #111827;
  line-height: 1.3;
}

.more-btn {
  height: 72rpx;
  padding: 0 24rpx;
  border-radius: 12rpx;
  background: transparent;
  border: 0;
  color: #2563eb;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.more-btn::after {
  border: 0;
}

.more-text {
  font-size: 28rpx;
  font-weight: 500;
  line-height: 1;
}

.more-icon {
  margin-left: 8rpx;
  width: 32rpx;
  height: 32rpx;
}

.slider-wrap {
  padding: 0 8rpx;
}

.industry-swiper {
  width: 100%;
  height: 472rpx;
}

.cluster-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24rpx;
}

.cluster-item {
  transition: transform 0.2s ease;
}

.cluster-item-active {
  transform: scale(0.97);
}

.cluster-card {
  height: 100%;
  border-radius: 16rpx;
  padding: 24rpx;
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  gap: 24rpx;
  box-sizing: border-box;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.08);
}

.cluster-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  background: rgba(37, 99, 235, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cluster-icon {
  width: 40rpx;
  height: 40rpx;
}

.cluster-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  row-gap: 4rpx;
}

.cluster-name {
  font-size: 28rpx;
  font-weight: 700;
  color: #111827;
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cluster-count {
  font-size: 20rpx;
  color: rgba(100, 116, 139, 0.9);
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.indicator-row {
  margin-top: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 12rpx;
}

.indicator-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 999rpx;
  background: rgba(100, 116, 139, 0.3);
  transition: all 0.3s ease;
}

.indicator-dot-active {
  width: 48rpx;
  background: #2563eb;
}
</style>
