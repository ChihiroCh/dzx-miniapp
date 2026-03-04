<script setup>
import { ref } from 'vue'

const parks = [
  {
    name: '张江科学城',
    desc: '生物医药产业集聚区，政策覆盖面广',
    location: '上海·浦东',
    image: 'https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/92268287-7015-4154-aee1-907b9f0ca800.png',
  },
  {
    name: '东方美谷',
    desc: '打造中国化妆品产业之都，产业链健全',
    location: '上海·奉贤',
    image: 'https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/70813eb3-0d30-4574-88d9-bb0365aae525.png',
  },
  {
    name: '闵行智能装备园',
    desc: '上海南部科创中心重要承载区',
    location: '上海·闵行',
    image: 'https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/25c41f4a-c110-4ec3-8a9a-e95dd994221e.png',
  },
  {
    name: '苏州工业园区·纳米城',
    desc: '全球最具活力的纳米技术产业集聚区',
    location: '江苏·苏州',
    image: 'https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/dce5918c-42f5-4558-be47-3822083fdbb5.png',
  },
  {
    name: '深圳湾科技生态园',
    desc: '南山区核心科创高地，名企云集',
    location: '广东·深圳',
    image: 'https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/1b5698ee-be8c-47b2-bc43-80315544ae5f.png',
  },
  {
    name: '杭州未来科技城',
    desc: '阿里系生态创业热土，资本活跃',
    location: '浙江·杭州',
    image: 'https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/0f24fbee-29a7-496a-a80d-ae4d13e526cb.png',
  },
]

const current = ref(1)

const onChange = (e) => {
  current.value = e.detail.current
}

const prev = () => {
  const total = parks.length
  current.value = (current.value - 1 + total) % total
}

const next = () => {
  const total = parks.length
  current.value = (current.value + 1) % total
}

const goTo = (index) => {
  current.value = index
}

const openParkDetail = (park) => {
  const query = [
    `name=${encodeURIComponent(park.name)}`,
    `desc=${encodeURIComponent(park.desc)}`,
    `location=${encodeURIComponent(park.location)}`,
    `image=${encodeURIComponent(park.image)}`,
  ].join('&')

  uni.navigateTo({
    url: `/package-invest/pages/park-detail/index?${query}`,
  })
}
</script>

<template>
  <view class="section">
    <view class="stack">
      <text class="title">热门推荐园区</text>

      <view class="carousel-wrap">
        <view class="carousel-inner">
          <swiper
            class="carousel-swiper"
            :current="current"
            circular
            autoplay
            interval="4000"
            duration="500"
            easing-function="easeOutCubic"
            @change="onChange"
          >
            <swiper-item v-for="item in parks" :key="item.name">
              <view class="slide-card" @tap="openParkDetail(item)">
                <view class="cover-wrap">
                  <image class="cover" :src="item.image" mode="aspectFill" />
                  <view class="cover-mask"></view>
                </view>

                <view class="content">
                  <text class="park-name">{{ item.name }}</text>
                  <text class="park-desc">{{ item.desc }}</text>

                  <view class="location-row">
                    <image class="map-icon" src="/static/icons/map-pin.png" mode="aspectFit" />
                    <text class="location-text">{{ item.location }}</text>
                  </view>
                </view>
              </view>
            </swiper-item>
          </swiper>
        </view>

        <view class="nav-layer">
          <view class="nav-btn" @tap="prev">
            <image class="nav-icon" src="/static/icons/chevron-left.png" mode="aspectFit" />
          </view>
          <view class="nav-btn" @tap="next">
            <image class="nav-icon" src="/static/icons/chevron-right.png" mode="aspectFit" />
          </view>
        </view>

        <view class="dots">
          <view
            v-for="(_, index) in parks"
            :key="index"
            class="dot"
            :class="{ 'dot-active': index === current }"
            @tap="goTo(index)"
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.section {
  padding: 48rpx 32rpx;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.title {
  font-size: 36rpx;
  font-weight: 600;
  color: #0f172a;
}

.carousel-wrap {
  position: relative;
}

.carousel-inner {
  overflow: hidden;
  border-radius: 24rpx;
}

.carousel-swiper {
  height: 520rpx;
}

.slide-card {
  height: 100%;
  border-radius: 16rpx;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.12);
}

.cover-wrap {
  position: relative;
  height: 320rpx;
  background: #e2e8f0;
  overflow: hidden;
}

.cover {
  width: 100%;
  height: 100%;
}

.cover-mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 70%);
}

.content {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.park-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #0f172a;
}

.park-desc {
  font-size: 28rpx;
  color: #667085;
}

.location-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.map-icon {
  width: 28rpx;
  height: 28rpx;
}

.location-text {
  font-size: 24rpx;
  color: #f59e0b;
}

.nav-layer {
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16rpx;
  z-index: 10;
}

.nav-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 9999rpx;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  width: 32rpx;
  height: 32rpx;
}

.dots {
  margin-top: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
}

.dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 9999rpx;
  background: rgba(102, 116, 128, 0.3);
}

.dot-active {
  width: 48rpx;
  background: #003366;
}
</style>
