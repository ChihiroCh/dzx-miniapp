<script setup>
import { ref } from "vue";

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

const goToSlide = (index) => {
  const next = Number(index);
  if (!Number.isInteger(next)) {
    return;
  }
  if (next < 0 || next >= slides.length) {
    return;
  }
  currentIndex.value = next;
};

const onDotTap = (event) => {
  const index = Number(event.currentTarget.dataset.index);
  goToSlide(index);
};

const onSwiperChange = (event) => {
  const next = Number(event.detail?.current ?? 0);
  if (Number.isInteger(next) && next >= 0 && next < slides.length) {
    currentIndex.value = next;
  }
};

const goToIndustryHighlights = () => {
  uni.navigateTo({
    url: "/package-invest/pages/industry-highlights/index",
  });
};
</script>

<template>
  <view class="industry-section">
    <view class="industry-content">
      <view class="industry-header">
        <text class="industry-title">热门产业集群</text>
        <view class="more-btn" @tap="goToIndustryHighlights">
          <text class="more-text">更多</text>
          <image class="more-icon" src="/static/icons/industry/chevron-right.png" mode="aspectFit" />
        </view>
      </view>

      <view class="industry-slider-wrap">
        <swiper
          class="industry-swiper"
          :current="currentIndex"
          :autoplay="true"
          :interval="3200"
          :duration="300"
          :circular="true"
          :indicator-dots="false"
          @change="onSwiperChange"
        >
          <swiper-item v-for="(page, pageIndex) in slides" :key="`page-${pageIndex}`" class="industry-swiper-item">
            <view class="industry-page">
              <view
                v-for="item in page"
                :key="item.name"
                class="industry-card-hit"
                hover-class="industry-card-hit-active"
                hover-stay-time="80"
              >
                <view class="industry-card">
                  <view class="industry-icon-wrap">
                    <image class="industry-icon" :src="item.icon" mode="aspectFit" />
                  </view>
                  <view class="industry-text-wrap">
                    <text class="industry-name">{{ item.name }}</text>
                    <text class="industry-count">{{ item.count }}</text>
                  </view>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>

        <view class="industry-dots">
          <view
            v-for="(_, index) in slides"
            :key="`dot-${index}`"
            class="industry-dot"
            :class="{ 'industry-dot-active': currentIndex === index }"
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

.industry-content {
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
  line-height: 1.3;
  font-weight: 600;
  color: #111827;
}

.more-btn {
  height: 72rpx;
  padding: 0 24rpx;
  border-radius: 12rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  color: #003367;
}

.more-text {
  font-size: 28rpx;
  line-height: 1;
  font-weight: 500;
}

.more-icon {
  width: 32rpx;
  height: 32rpx;
}

.industry-slider-wrap {
  position: relative;
  overflow: hidden;
  padding: 0 8rpx;
}

.industry-swiper {
  width: 100%;
  height: 432rpx;
}

.industry-swiper-item {
  overflow: hidden;
}

.industry-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  column-gap: 24rpx;
  row-gap: 24rpx;
  overflow: hidden;
}

.industry-card-hit {
  width: calc((100% - 24rpx) / 2);
  transition: transform 0.2s ease;
}

.industry-card-hit-active {
  transform: scale(0.95);
}

.industry-card {
  height: 100%;
  min-height: 128rpx;
  border-radius: 16rpx;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 6rpx 16rpx rgba(16, 24, 40, 0.06);
  padding: 24rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.industry-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  background: rgba(0, 51, 103, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.industry-icon {
  width: 40rpx;
  height: 40rpx;
}

.industry-text-wrap {
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 4rpx;
}

.industry-name {
  font-size: 28rpx;
  line-height: 1.3;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.industry-count {
  font-size: 20rpx;
  line-height: 1.3;
  color: #6b7280;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.industry-dots {
  margin-top: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
}

.industry-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 999rpx;
  background: rgba(107, 114, 128, 0.3);
  transition: all 0.3s ease;
}

.industry-dot-active {
  width: 48rpx;
  background: #003367;
}
</style>
