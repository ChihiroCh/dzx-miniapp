<script setup>
import { ref } from "vue";

const partnerLogo =
  "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/b6613bb9-06d7-4475-9dd8-cc27177591c7.png";

const clusters = [
  {
    name: "美妆美业",
    companies: "3000 家入驻企业",
    heat: "95%",
    description: "涵盖研发、生产、包装、销售全产业链的美妆生态集群。",
    totalValue: "800 亿",
    growth: "15.5%",
    icon: "/static/icons/industry/sparkles.png",
  },
  {
    name: "生物医药",
    companies: "1500 家入驻企业",
    heat: "98%",
    description: "专注于生命科学、创新药研发及医疗器械制造。",
    totalValue: "1200 亿",
    growth: "18.2%",
    icon: "/static/icons/industry/stethoscope.png",
  },
  {
    name: "智能制造",
    companies: "2500 家入驻企业",
    heat: "90%",
    description: "工业4.0标杆，涵盖精密机床、重型装备及工业物联网。",
    totalValue: "2100 亿",
    growth: "12.8%",
    icon: "/static/icons/industry/factory.png",
  },
  {
    name: "新能源车",
    companies: "1200 家入驻企业",
    heat: "96%",
    description: "全产业链覆盖，从电池研发到整车制造的绿色动力集群。",
    totalValue: "1800 亿",
    growth: "25.3%",
    icon: "/static/icons/industry/car.png",
  },
  {
    name: "人工智能",
    companies: "1800 家入驻企业",
    heat: "99%",
    description: "专注于计算机视觉、语言处理及AI算力底座。",
    totalValue: "950 亿",
    growth: "30.1%",
    icon: "/static/icons/industry/brain.png",
  },
  {
    name: "数字文创",
    companies: "4500 家入驻企业",
    heat: "85%",
    description: "融合艺术与技术的创意产业，包括游戏、动漫及数字演艺。",
    totalValue: "450 亿",
    growth: "8.5%",
    icon: "/static/icons/industry/palette.png",
  },
  {
    name: "新材料",
    companies: "950 家入驻企业",
    heat: "88%",
    description: "支撑国家战略的基础产业，深耕复合材料与特种合金。",
    totalValue: "720 亿",
    growth: "14.2%",
    icon: "/static/icons/industry/layers.png",
  },
  {
    name: "现代物流",
    companies: "1100 家入驻企业",
    heat: "82%",
    description: "智慧供应链骨干网，专注于自动化仓储与冷链物流。",
    totalValue: "580 亿",
    growth: "11.0%",
    icon: "/static/icons/industry/truck.png",
  },
  {
    name: "无人车",
    companies: "450 家入驻企业",
    heat: "94%",
    description: "专注于自动驾驶算法、激光雷达及商用无人车整车制造。",
    totalValue: "420 亿",
    growth: "22.0%",
    icon: "/static/icons/industry/car-front.png",
  },
  {
    name: "低空经济",
    companies: "280 家入驻企业",
    heat: "97%",
    description: "涵盖无人机、飞行汽车及低空数字化空域管理系统。",
    totalValue: "310 亿",
    growth: "35.5%",
    icon: "/static/icons/industry/wind.png",
  },
  {
    name: "宠物产业",
    companies: "800 家入驻企业",
    heat: "86%",
    description: "消费升级下的蓝海，涵盖宠物食品、医疗及拟人化服务。",
    totalValue: "150 亿",
    growth: "12.3%",
    icon: "/static/icons/industry/dog.png",
  },
  {
    name: "医疗器械",
    companies: "1200 家入驻企业",
    heat: "93%",
    description: "深耕高端影像诊断、植入介入器械及体外诊断(IVD)。",
    totalValue: "660 亿",
    growth: "18.1%",
    icon: "/static/icons/industry/stethoscope.png",
  },
  {
    name: "高端制造",
    companies: "2100 家入驻企业",
    heat: "91%",
    description: "工业基础的脊梁，主攻精密数控、工业机器人及增材制造。",
    totalValue: "1500 亿",
    growth: "10.5%",
    icon: "/static/icons/industry/cog.png",
  },
];

const currentIndex = ref(0);
const parks = [
  { name: "张江科学城", logo: partnerLogo },
  { name: "浦东新区", logo: partnerLogo },
  { name: "虹口区", logo: partnerLogo },
];

const onCarouselChange = (event) => {
  const next = Number(event.detail?.current ?? 0);
  if (!Number.isInteger(next)) {
    return;
  }
  if (next < 0 || next >= clusters.length) {
    return;
  }
  currentIndex.value = next;
};

const goToSlide = (index) => {
  if (index < 0 || index >= clusters.length) {
    return;
  }
  currentIndex.value = index;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % clusters.length;
};

const encode = (value) => encodeURIComponent(value ?? "");

const openClusterDetail = (cluster) => {
  uni.navigateTo({
    url:
      "/package-invest/pages/industry-cluster-detail/index?" +
      `name=${encode(cluster.name)}` +
      `&companies=${encode(cluster.companies)}` +
      `&heat=${encode(cluster.heat)}` +
      `&description=${encode(cluster.description)}` +
      `&totalValue=${encode(cluster.totalValue)}` +
      `&growth=${encode(cluster.growth)}` +
      `&icon=${encode(cluster.icon)}`,
  });
};
</script>

<template>
  <view class="page">
    <view class="page-content">
      <view class="section-block">
        <text class="section-title">热门产业推荐</text>

        <view class="carousel-wrap">
          <swiper
            class="carousel-swiper"
            :current="currentIndex"
            :duration="300"
            :circular="true"
            :indicator-dots="false"
            @change="onCarouselChange"
          >
            <swiper-item
              v-for="item in clusters"
              :key="`hero-${item.name}`"
              class="carousel-slide"
              @tap="openClusterDetail(item)"
            >
              <view class="hero-card">
                <view class="hero-content">
                  <view class="hero-header">
                    <view class="hero-header-left">
                      <view class="hero-icon-wrap">
                        <image class="hero-icon" :src="item.icon" mode="aspectFit" />
                      </view>
                      <view class="hero-title-wrap">
                        <text class="hero-name">{{ item.name }}</text>
                        <text class="hero-heat">🔥 热度 {{ item.heat }}</text>
                      </view>
                    </view>
                  </view>
                  <text class="hero-desc">{{ item.description }}</text>
                </view>
              </view>
            </swiper-item>
          </swiper>

          <view class="carousel-footer">
            <view class="carousel-dots">
              <view
                v-for="(_, index) in clusters"
                :key="`dot-${index}`"
                class="carousel-dot"
                :class="{ 'carousel-dot-active': currentIndex === index }"
                @tap="goToSlide(index)"
              />
            </view>
            <button class="next-btn" @tap="nextSlide">下一个 →</button>
          </view>
        </view>
      </view>

      <view class="section-block">
        <text class="section-title">产业集群</text>

        <view class="cluster-list">
          <view
            v-for="item in clusters"
            :key="`list-${item.name}`"
            class="cluster-card"
            hover-class="cluster-card-active"
            hover-stay-time="80"
            @tap="openClusterDetail(item)"
          >
            <view class="cluster-card-content">
              <view class="cluster-top">
                <view class="cluster-top-icon-wrap">
                  <image class="cluster-top-icon" :src="item.icon" mode="aspectFit" />
                </view>
                <view class="cluster-top-text">
                  <text class="cluster-name">{{ item.name }}</text>
                  <text class="cluster-company">{{ item.companies }}</text>
                </view>
              </view>

              <view class="parks-box">
                <text class="parks-label">合作园区</text>
                <view class="parks-list">
                  <view v-for="park in parks" :key="`${item.name}-${park.name}`" class="park-item">
                    <view class="park-logo-wrap">
                      <image class="park-logo" :src="park.logo" mode="aspectFill" />
                    </view>
                    <text class="park-name">{{ park.name }}</text>
                  </view>
                </view>
              </view>

              <view class="metrics-grid">
                <view class="metric-card metric-card-accent">
                  <text class="metric-label">产业总值</text>
                  <text class="metric-value-accent">{{ item.totalValue }}</text>
                </view>
                <view class="metric-card metric-card-primary">
                  <text class="metric-label">同比增长</text>
                  <text class="metric-value-primary">{{ item.growth }}</text>
                </view>
              </view>

              <button class="detail-btn" @tap.stop="openClusterDetail(item)">
                <text>了解更多</text>
                <image class="detail-btn-icon" src="/static/icons/industry/chevron-right.png" mode="aspectFit" />
              </button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f7fb;
}

.page-content {
  display: flex;
  flex-direction: column;
  gap: 48rpx;
  padding: 48rpx 32rpx;
  box-sizing: border-box;
}

.section-block {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.section-title {
  font-size: 36rpx;
  line-height: 1.3;
  font-weight: 600;
  color: #111827;
}

.carousel-wrap {
  position: relative;
}

.carousel-swiper {
  height: 284rpx;
}

.carousel-slide {
  width: 100%;
}

.hero-card {
  height: 100%;
  border-radius: 16rpx;
  border: 2rpx solid rgba(0, 51, 103, 0.2);
  box-shadow: 0 2rpx 8rpx rgba(15, 23, 42, 0.08);
  background: linear-gradient(135deg, rgba(0, 51, 103, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
  box-sizing: border-box;
}

.hero-content {
  padding: 48rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.hero-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.hero-header-left {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.hero-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  border-radius: 16rpx;
  background: rgba(0, 51, 103, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hero-icon {
  width: 48rpx;
  height: 48rpx;
}

.hero-title-wrap {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.hero-name {
  font-size: 32rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #111827;
}

.hero-heat {
  font-size: 24rpx;
  line-height: 1.35;
  color: #6b7280;
}

.hero-desc {
  font-size: 28rpx;
  line-height: 1.6;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.carousel-footer {
  margin-top: 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.carousel-dots {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.carousel-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 999rpx;
  background: rgba(107, 114, 128, 0.3);
  transition: all 0.3s ease;
}

.carousel-dot-active {
  width: 48rpx;
  background: #003367;
}

.next-btn {
  border: 0;
  background: transparent;
  color: #003367;
  font-size: 28rpx;
  line-height: 1;
  font-weight: 500;
  padding: 0;
  margin: 0;
}

.next-btn::after {
  border: 0;
}

.cluster-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.cluster-card {
  border-radius: 16rpx;
  border: 2rpx solid rgba(148, 163, 184, 0.5);
  background: #ffffff;
  box-shadow: 0 2rpx 8rpx rgba(15, 23, 42, 0.08);
  transition: all 0.25s ease;
}

.cluster-card-active {
  border-color: rgba(0, 51, 103, 0.3);
}

.cluster-card-content {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.cluster-top {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.cluster-top-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  background: rgba(0, 51, 103, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cluster-top-icon {
  width: 40rpx;
  height: 40rpx;
}

.cluster-top-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.cluster-name {
  font-size: 32rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #111827;
}

.cluster-company {
  font-size: 24rpx;
  line-height: 1.35;
  color: #6b7280;
}

.parks-box {
  border-radius: 12rpx;
  background: rgba(148, 163, 184, 0.16);
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.parks-label {
  font-size: 24rpx;
  line-height: 1.35;
  color: #6b7280;
}

.parks-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 32rpx;
  row-gap: 16rpx;
}

.park-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.park-logo-wrap {
  width: 48rpx;
  height: 48rpx;
  border-radius: 999rpx;
  border: 2rpx solid rgba(148, 163, 184, 0.4);
  overflow: hidden;
  flex-shrink: 0;
  background: #ffffff;
}

.park-logo {
  width: 100%;
  height: 100%;
}

.park-name {
  font-size: 28rpx;
  line-height: 1.35;
  color: #111827;
  font-weight: 500;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24rpx;
}

.metric-card {
  border-radius: 12rpx;
  padding: 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
}

.metric-card-accent {
  background: rgba(245, 158, 11, 0.1);
}

.metric-card-primary {
  background: rgba(0, 51, 103, 0.1);
}

.metric-label {
  font-size: 24rpx;
  line-height: 1.35;
  color: #6b7280;
}

.metric-value-accent {
  font-size: 28rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #f59e0b;
}

.metric-value-primary {
  font-size: 28rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #003367;
}

.detail-btn {
  height: 72rpx;
  width: 100%;
  border-radius: 12rpx;
  border: 2rpx solid #d1d5db;
  background: transparent;
  color: #111827;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  font-size: 28rpx;
  line-height: 1;
  font-weight: 500;
}

.detail-btn::after {
  border: 0;
}

.detail-btn-icon {
  width: 32rpx;
  height: 32rpx;
}
</style>
