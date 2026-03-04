<script setup>
import { computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const defaultCluster = {
  name: "美妆美业",
  companies: "3000 家入驻企业",
  heat: "95%",
  description: "涵盖研发、生产、包装、销售全产业链的美妆生态集群。",
  totalValue: "800 亿",
  growth: "15.5%",
  icon: "/static/icons/industry/sparkles.png",
};

const cluster = ref({ ...defaultCluster });

const decode = (value, fallback = "") => {
  if (!value) {
    return fallback;
  }
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
};

onLoad((query) => {
  cluster.value = {
    name: decode(query?.name, defaultCluster.name),
    companies: decode(query?.companies, defaultCluster.companies),
    heat: decode(query?.heat, defaultCluster.heat),
    description: decode(query?.description, defaultCluster.description),
    totalValue: decode(query?.totalValue, defaultCluster.totalValue),
    growth: decode(query?.growth, defaultCluster.growth),
    icon: decode(query?.icon, defaultCluster.icon),
  };
});

const companyCount = computed(() => {
  const match = cluster.value.companies.match(/\d+/);
  return match ? match[0] : "3000";
});

const tabs = [
  { key: "upstream", label: "上游", tags: ["原材料供应", "包装设计", "配方研发"] },
  { key: "midstream", label: "中游", tags: ["成品加工", "品牌运营", "质量检测"] },
  { key: "downstream", label: "下游", tags: ["线上电商", "线下连锁", "跨境贸易"] },
];

const activeTab = ref("upstream");
const activeTags = computed(() => tabs.find((item) => item.key === activeTab.value)?.tags ?? []);

const parks = [
  {
    name: "张江科学城",
    desc: "生物医药产业集聚区，政策覆盖面广",
    location: "上海·浦东",
    enterprises: "入驻企业：1200",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/786dfee5-022b-4ccb-973b-aca9a39da113.png",
  },
  {
    name: "东方美谷",
    desc: "打造中国化妆品产业之都，产业链健全",
    location: "上海·奉贤",
    enterprises: "入驻企业：580",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/344dd861-ca1a-4892-a037-51d8af9dc648.png",
  },
  {
    name: "闵行智能装备园",
    desc: "上海南部科创中心重要承载区",
    location: "上海·闵行",
    enterprises: "入驻企业：420",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/d49488e5-c1af-4f06-8e4a-c77c6dccac92.png",
  },
  {
    name: "苏州工业园区·纳米城",
    desc: "全球最具活力的纳米技术产业集聚区",
    location: "江苏·苏州",
    enterprises: "入驻企业：850",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/e5d4c3de-0172-4da1-9a35-ccf6424c3d40.png",
  },
  {
    name: "深圳湾科技生态园",
    desc: "南山区核心科创高地，名企云集",
    location: "广东·深圳",
    enterprises: "入驻企业：1500",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/9c09af10-709e-4fa6-b14e-1b8a5c2b7f13.png",
  },
  {
    name: "杭州未来科技城",
    desc: "阿里系生态创业热土，资本活跃",
    location: "浙江·杭州",
    enterprises: "入驻企业：2200",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/dbc6be55-a455-4af6-80b9-7b5c9fd36d9a.png",
  },
];

const parkCurrent = ref(0);

const onParkChange = (event) => {
  const next = Number(event.detail?.current ?? 0);
  if (!Number.isInteger(next)) {
    return;
  }
  if (next < 0 || next >= parks.length) {
    return;
  }
  parkCurrent.value = next;
};

const goPrevPark = () => {
  parkCurrent.value = (parkCurrent.value - 1 + parks.length) % parks.length;
};

const goNextPark = () => {
  parkCurrent.value = (parkCurrent.value + 1) % parks.length;
};

const openParkDetail = (park) => {
  const query = [
    `name=${encodeURIComponent(park.name)}`,
    `desc=${encodeURIComponent(park.desc)}`,
    `location=${encodeURIComponent(park.location)}`,
    `image=${encodeURIComponent(park.image)}`,
  ].join("&");

  uni.navigateTo({
    url: `/package-invest/pages/park-detail/index?${query}`,
  });
};

const brands = [
  { name: "品牌A", image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/371b3aad-30ce-4731-9917-a5b1e3028340.png" },
  { name: "品牌B", image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/e1102c20-635f-46cf-81fc-ffbe678933f5.png" },
  { name: "品牌C", image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/244a30f8-c94b-4213-a5e6-4206353e6264.png" },
  { name: "品牌D", image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/a16d608d-208f-4a95-b5c0-3d2a986ec725.png" },
  { name: "品牌E", image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/4fe03010-c89a-4563-8d4d-2ea3941df0d5.png" },
  { name: "品牌F", image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/eeba6cbe-ac9a-409c-b92b-24721240dd96.png" },
];

const activities = [
  {
    title: "2025年美妆产业交流会",
    type: "交流会",
    date: "03/15 14:00-17:00",
    location: "上海·东方美谷",
  },
  {
    title: "美妆品牌创新展览会",
    type: "展会",
    date: "04/20 09:00-18:00",
    location: "上海·浦东新区",
  },
  {
    title: "化妆品企业融资对接会",
    type: "对接会",
    date: "05/10 13:00-16:00",
    location: "线上直播",
  },
];
</script>

<template>
  <view class="page">
    <view class="header-block">
      <view class="header-inner">
        <view class="header-icon-wrap">
          <image
            class="header-icon"
            :src="'/package-invest/static/icons/industry-cluster-detail/sparkles-white.png'"
            mode="aspectFit"
          />
        </view>
        <text class="header-title">{{ cluster.name }}</text>
        <text class="header-desc">{{ cluster.description }}</text>
        <view class="header-heat-pill">
          <text class="header-heat-label">🔥 热度</text>
          <text class="header-heat-value">{{ cluster.heat }}</text>
        </view>
      </view>
    </view>

    <view class="section section-space">
      <text class="section-title">产业数据</text>
      <view class="data-grid">
        <view class="data-card">
          <view class="data-card-content">
            <image class="data-icon" :src="'/package-invest/static/icons/park-stats/trending-up.png'" mode="aspectFit" />
            <text class="data-label">产业总值</text>
            <text class="data-value">{{ cluster.totalValue }}</text>
          </view>
        </view>
        <view class="data-card">
          <view class="data-card-content">
            <image class="data-icon" :src="'/package-invest/static/icons/park-stats/building-2.png'" mode="aspectFit" />
            <text class="data-label">入驻企业</text>
            <text class="data-value">{{ companyCount }}</text>
          </view>
        </view>
        <view class="data-card">
          <view class="data-card-content">
            <image
              class="data-icon"
              :src="'/package-invest/static/icons/industry-cluster-detail/arrow-up-right-accent.png'"
              mode="aspectFit"
            />
            <text class="data-label">增长率</text>
            <text class="data-value">{{ cluster.growth }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section section-space">
      <text class="section-title">产业链全景</text>
      <view class="tabs-wrap">
        <view class="tabs-list">
          <view
            v-for="item in tabs"
            :key="item.key"
            class="tab-item"
            :class="{ 'tab-item-active': activeTab === item.key }"
            @tap="activeTab = item.key"
          >
            <text class="tab-text">{{ item.label }}</text>
          </view>
        </view>
        <view class="tabs-content">
          <view class="tag-list" v-if="activeTags.length">
            <view v-for="tag in activeTags" :key="tag" class="tag-item">
              <text>{{ tag }}</text>
            </view>
          </view>
          <view class="tag-empty" v-else />
        </view>
      </view>
    </view>

    <view class="section section-space">
      <view class="section-head">
        <text class="section-title">合作园区</text>
        <button class="more-btn">查看全部 →</button>
      </view>

      <view class="park-carousel">
        <view class="park-track">
          <swiper
            class="park-swiper"
            :current="parkCurrent"
            :duration="300"
            :circular="true"
            :autoplay="true"
            :interval="4000"
            :indicator-dots="false"
            previous-margin="0rpx"
            next-margin="128rpx"
            easing-function="easeOutCubic"
            @change="onParkChange"
          >
            <swiper-item v-for="park in parks" :key="park.name" class="park-swiper-item">
              <view class="park-card" @tap="openParkDetail(park)">
                <view class="park-card-content">
                  <view class="park-image-wrap">
                    <image class="park-image" :src="park.image" mode="aspectFill" />
                  </view>
                  <text class="park-title">{{ park.name }}</text>
                  <text class="park-meta">{{ park.enterprises }}</text>
                </view>
              </view>
            </swiper-item>
          </swiper>

          <view class="park-nav-overlay">
            <button class="nav-btn" aria-label="上一个" @tap="goPrevPark">
              <image class="nav-icon" src="/static/icons/chevron-left.png" mode="aspectFit" />
            </button>
            <button class="nav-btn" aria-label="下一个" @tap="goNextPark">
              <image class="nav-icon" src="/static/icons/chevron-right.png" mode="aspectFit" />
            </button>
          </view>
        </view>

        <view class="park-dots">
          <view
            v-for="(_, index) in parks"
            :key="`park-dot-${index}`"
            class="park-dot"
            :class="{ 'park-dot-active': parkCurrent === index }"
          />
        </view>
      </view>
    </view>

    <view class="section section-space">
      <text class="section-title">入驻品牌</text>
      <view class="brands-grid">
        <view v-for="brand in brands" :key="brand.name" class="brand-item">
          <view class="brand-image-wrap">
            <image class="brand-image" :src="brand.image" mode="aspectFill" />
          </view>
          <text class="brand-name">{{ brand.name }}</text>
        </view>
      </view>
    </view>

    <view class="section section-space section-last">
      <view class="section-head">
        <text class="section-title">产业活动</text>
        <button class="more-btn">查看全部 →</button>
      </view>

      <view class="activities-list">
        <view v-for="activity in activities" :key="activity.title" class="activity-card">
          <view class="activity-card-content">
            <view class="activity-top">
              <view class="activity-title-wrap">
                <text class="activity-title">{{ activity.title }}</text>
              </view>
              <view class="activity-tag">
                <text>{{ activity.type }}</text>
              </view>
            </view>

            <view class="activity-meta-group">
              <view class="activity-meta-row">
                <image
                  class="meta-icon"
                  :src="'/package-invest/static/icons/industry-cluster-detail/calendar-muted.png'"
                  mode="aspectFit"
                />
                <text class="activity-meta-text">{{ activity.date }}</text>
              </view>
              <view class="activity-meta-row">
                <image
                  class="meta-icon"
                  :src="'/package-invest/static/icons/industry-cluster-detail/map-pin-muted.png'"
                  mode="aspectFit"
                />
                <text class="activity-meta-text">{{ activity.location }}</text>
              </view>
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
  background: #ffffff;
}

.header-block {
  padding: 64rpx 32rpx;
  background: linear-gradient(135deg, #003366 0%, #004d99 100%);
  color: #ffffff;
}

.header-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  row-gap: 32rpx;
}

.header-icon-wrap {
  width: 128rpx;
  height: 128rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon {
  width: 64rpx;
  height: 64rpx;
}

.header-title {
  font-size: 48rpx;
  line-height: 1.25;
  font-weight: 700;
}

.header-desc {
  max-width: 640rpx;
  font-size: 28rpx;
  line-height: 1.65;
  opacity: 0.9;
}

.header-heat-pill {
  padding: 8rpx 24rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 8rpx;
}

.header-heat-label {
  font-size: 24rpx;
}

.header-heat-value {
  font-size: 28rpx;
  font-weight: 600;
}

.section {
  padding: 48rpx 32rpx;
}

.section-space {
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.section-last {
  padding-bottom: 64rpx;
}

.section-title {
  font-size: 36rpx;
  line-height: 1.3;
  font-weight: 600;
  color: #111827;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24rpx;
}

.data-card {
  border-radius: 16rpx;
  border: 2rpx solid rgba(226, 232, 240, 0.55);
  background: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(15, 23, 42, 0.05);
}

.data-card-content {
  padding: 32rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16rpx;
}

.data-icon {
  width: 40rpx;
  height: 40rpx;
}

.data-label {
  font-size: 24rpx;
  line-height: 1.3;
  color: #6b7280;
}

.data-value {
  font-size: 36rpx;
  line-height: 1.3;
  font-weight: 700;
  color: #111827;
}

.tabs-wrap {
  width: 100%;
}

.tabs-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8rpx;
  background: #f1f5f9;
  padding: 8rpx;
  border-radius: 12rpx;
}

.tab-item {
  height: 60rpx;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.2s ease;
}

.tab-item-active {
  background: #ffffff;
  color: #111827;
  box-shadow: 0 2rpx 8rpx rgba(15, 23, 42, 0.08);
}

.tab-text {
  font-size: 28rpx;
  line-height: 1;
  font-weight: 500;
}

.tabs-content {
  margin-top: 32rpx;
  min-height: 200rpx;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag-item {
  height: 52rpx;
  padding: 0 24rpx;
  border-radius: 999rpx;
  background: #f59f0a;
  color: #ffffff;
  font-size: 24rpx;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
}

.tag-empty {
  height: 100rpx;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.more-btn {
  height: 72rpx;
  padding: 0 24rpx;
  margin: 0;
  border: 0;
  border-radius: 12rpx;
  background: transparent;
  color: #003367;
  font-size: 24rpx;
  font-weight: 500;
  line-height: 72rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.more-btn::after {
  border: 0;
}

.park-carousel {
  position: relative;
}

.park-track {
  position: relative;
}

.park-swiper {
  height: 266rpx;
}

.park-swiper-item {
  display: flex;
  align-items: stretch;
}

.park-card {
  width: 80%;
  border-radius: 16rpx;
  border: 2rpx solid rgba(226, 232, 240, 0.55);
  background: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(15, 23, 42, 0.05);
}

.park-card-content {
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.park-image-wrap {
  width: 100%;
  height: 160rpx;
  background: #e2e8f0;
  border-radius: 12rpx;
  overflow: hidden;
}

.park-image {
  width: 100%;
  height: 100%;
}

.park-title {
  font-size: 28rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.park-meta {
  font-size: 24rpx;
  line-height: 1.35;
  color: #6b7280;
}

.park-nav-overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16rpx;
  margin: 0 -16rpx;
}

.nav-btn {
  width: 64rpx;
  height: 64rpx;
  margin: 0;
  padding: 0;
  border-radius: 999rpx;
  border: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8rpx);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.nav-btn::after {
  border: 0;
}

.nav-icon {
  width: 28rpx;
  height: 28rpx;
}

.park-dots {
  margin-top: 24rpx;
  display: flex;
  justify-content: center;
  gap: 8rpx;
}

.park-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 999rpx;
  background: #e2e8f0;
  transition: all 0.3s ease;
}

.park-dot-active {
  width: 48rpx;
  background: #003367;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32rpx;
}

.brand-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.brand-image-wrap {
  width: 160rpx;
  height: 160rpx;
  border-radius: 16rpx;
  background: #f1f5f9;
  overflow: hidden;
}

.brand-image {
  width: 100%;
  height: 100%;
}

.brand-name {
  width: 100%;
  text-align: center;
  font-size: 24rpx;
  line-height: 1.35;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.activity-card {
  border-radius: 16rpx;
  border: 2rpx solid rgba(226, 232, 240, 0.55);
  background: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(15, 23, 42, 0.05);
}

.activity-card-content {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.activity-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16rpx;
}

.activity-title-wrap {
  flex: 1;
  min-width: 0;
}

.activity-title {
  font-size: 28rpx;
  line-height: 1.45;
  color: #111827;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.activity-tag {
  height: 40rpx;
  padding: 0 16rpx;
  border-radius: 999rpx;
  background: rgba(0, 51, 103, 0.1);
  color: #003367;
  font-size: 24rpx;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.activity-meta-group {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.activity-meta-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.meta-icon {
  width: 28rpx;
  height: 28rpx;
}

.activity-meta-text {
  font-size: 24rpx;
  line-height: 1.35;
  color: #6b7280;
}
</style>
