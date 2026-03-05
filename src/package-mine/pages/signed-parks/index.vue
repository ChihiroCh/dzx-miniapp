<script setup>
const signedParks = [
  {
    id: "park-1",
    name: "张江科学城",
    location: "上海·浦东",
    level: "国家级",
    levelType: "national",
    image:
      "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/786dfee5-022b-4ccb-973b-aca9a39da113.png",
    enterprises: "1200",
    rating: "5",
    industriesCount: "3",
    highlight: "✨ 生物医药产业集聚区，政策覆盖面广",
    advisorName: "陈经理",
    advisorTitle: "招商总监",
    industries: ["生命科学", "集成电路", "人工智能"],
    policies: ["租金补贴", "人才公寓", "研发投入奖励"],
  },
  {
    id: "park-2",
    name: "东方美谷",
    location: "上海·奉贤",
    level: "省级",
    levelType: "province",
    image:
      "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/344dd861-ca1a-4892-a037-51d8af9dc648.png",
    enterprises: "580",
    rating: "5",
    industriesCount: "3",
    highlight: "✨ 打造中国化妆品产业之都，产业链健全",
    advisorName: "王女士",
    advisorTitle: "资深招商顾问",
    industries: ["美妆美业", "食品/药品", "生物科技"],
    policies: ["上市挂牌奖补", "高新企业认定奖励"],
  },
];

const openParkDetail = (park) => {
  const query = `name=${encodeURIComponent(park.name)}`;
  uni.navigateTo({
    url: `/package-invest/pages/park-detail/index?${query}`,
  });
};

const contactAdvisor = (park) => {
  const query = `parkName=${encodeURIComponent(park.name)}`;
  uni.navigateTo({
    url: `/package-invest/pages/ai-chat/index?${query}`,
  });
};

const getLevelClass = (item) => {
  if (item.levelType === "national") {
    return "level-badge level-national";
  }
  return "level-badge level-province";
};
</script>

<template>
  <view class="signed-parks-page">
    <view class="content-wrap">
      <view class="top-header">
        <text class="header-title">已签约园区 ({{ signedParks.length }})</text>
        <text class="header-subtitle">以下是您已成交入驻的园区记录</text>
      </view>

      <view class="card-list">
        <view v-for="park in signedParks" :key="park.id" class="park-card">
          <view class="park-card-head">
            <view class="park-head-left">
              <image class="park-cover" :src="park.image" mode="aspectFill" />
              <view class="park-basic">
                <text class="park-name">{{ park.name }}</text>
                <text class="park-location">{{ park.location }}</text>
              </view>
            </view>
            <text :class="getLevelClass(park)">{{ park.level }}</text>
          </view>

          <view class="stats-grid">
            <view class="stats-cell">
              <text class="stats-value">{{ park.enterprises }}</text>
              <text class="stats-label">入驻企业</text>
            </view>
            <view class="stats-cell">
              <view class="score-row">
                <text class="stats-value">{{ park.rating }}</text>
                <image class="star-icon" :src="'/package-mine/static/icons/signed-parks/star-yellow.png'" mode="aspectFit" />
              </view>
              <text class="stats-label">园区评分</text>
            </view>
            <view class="stats-cell">
              <text class="stats-value">{{ park.industriesCount }}</text>
              <text class="stats-label">主导产业</text>
            </view>
          </view>

          <view class="highlight-box">
            <text class="highlight-text">{{ park.highlight }}</text>
          </view>

          <view class="advisor-box">
            <image class="advisor-icon" :src="'/package-mine/static/icons/signed-parks/user-muted.png'" mode="aspectFit" />
            <text class="advisor-name">{{ park.advisorName }}</text>
            <text class="advisor-title">{{ park.advisorTitle }}</text>
          </view>

          <view class="tag-block">
            <text class="tag-block-title">主导产业</text>
            <view class="tag-row">
              <text v-for="tag in park.industries" :key="`${park.id}-industry-${tag}`" class="industry-tag">{{ tag }}</text>
            </view>
          </view>

          <view class="tag-block">
            <text class="tag-block-title">优惠政策</text>
            <view class="tag-row">
              <text v-for="tag in park.policies" :key="`${park.id}-policy-${tag}`" class="policy-tag">{{ tag }}</text>
            </view>
          </view>

          <view class="action-row">
            <button class="outline-btn" @tap="openParkDetail(park)">
              <image class="btn-icon" :src="'/package-mine/static/icons/signed-parks/eye-muted.png'" mode="aspectFit" />
              <text class="outline-btn-text">查看详情</text>
            </button>

            <button class="primary-btn" @tap="contactAdvisor(park)">
              <image
                class="btn-icon"
                :src="'/package-mine/static/icons/signed-parks/message-circle-white.png'"
                mode="aspectFit"
              />
              <text class="primary-btn-text">联系顾问</text>
            </button>
          </view>
        </view>
      </view>

      <view class="tip-box">
        <text class="tip-text"><text class="tip-strong">💡 提示：</text>如需修改入驻信息或咨询后续服务，请联系您的专属顾问或直接与园区招商负责人沟通。</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.signed-parks-page {
  min-height: 100vh;
  background: #f8fafc;
}

.content-wrap {
  padding: 48rpx 32rpx;
  box-sizing: border-box;
}

.top-header {
  margin-bottom: 24rpx;
}

.header-title {
  display: block;
  font-size: 34rpx;
  line-height: 48rpx;
  color: #111827;
  font-weight: 600;
}

.header-subtitle {
  display: block;
  margin-top: 4rpx;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #6b7280;
}

.card-list {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.park-card {
  border: 2rpx solid #e5e7eb;
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.06);
  padding: 28rpx;
}

.park-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 16rpx;
}

.park-head-left {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
}

.park-cover {
  width: 96rpx;
  height: 96rpx;
  border-radius: 12rpx;
  background: #f1f5f9;
  flex-shrink: 0;
}

.park-basic {
  flex: 1;
  min-width: 0;
}

.park-name {
  display: block;
  font-size: 30rpx;
  line-height: 42rpx;
  color: #111827;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.park-location {
  display: block;
  margin-top: 4rpx;
  font-size: 22rpx;
  line-height: 30rpx;
  color: #6b7280;
}

.level-badge {
  flex-shrink: 0;
  padding: 4rpx 14rpx;
  border-radius: 8rpx;
  font-size: 20rpx;
  line-height: 28rpx;
  font-weight: 500;
}

.level-national {
  background: #fee2e2;
  color: #b91c1c;
}

.level-province {
  background: #dbeafe;
  color: #1d4ed8;
}

.stats-grid {
  margin-top: 20rpx;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12rpx;
}

.stats-cell {
  border-radius: 12rpx;
  background: #f8fafc;
  padding: 12rpx 8rpx;
  text-align: center;
}

.stats-value {
  display: block;
  font-size: 36rpx;
  line-height: 44rpx;
  color: #003367;
  font-weight: 600;
}

.score-row {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 6rpx;
}

.star-icon {
  width: 26rpx;
  height: 26rpx;
}

.stats-label {
  display: block;
  margin-top: 4rpx;
  font-size: 20rpx;
  line-height: 28rpx;
  color: #6b7280;
}

.highlight-box {
  margin-top: 14rpx;
  padding: 14rpx;
  border-radius: 12rpx;
  background: rgba(245, 159, 10, 0.12);
  border: 2rpx solid rgba(245, 159, 10, 0.24);
}

.highlight-text {
  font-size: 24rpx;
  line-height: 34rpx;
  color: #111827;
  font-weight: 500;
}

.advisor-box {
  margin-top: 14rpx;
  padding: 14rpx;
  border-radius: 12rpx;
  background: rgba(148, 163, 184, 0.12);
  display: flex;
  align-items: center;
  column-gap: 8rpx;
}

.advisor-icon {
  width: 26rpx;
  height: 26rpx;
  flex-shrink: 0;
}

.advisor-name {
  font-size: 24rpx;
  line-height: 34rpx;
  color: #111827;
  font-weight: 500;
}

.advisor-title {
  font-size: 20rpx;
  line-height: 28rpx;
  color: #6b7280;
}

.tag-block {
  margin-top: 14rpx;
}

.tag-block-title {
  display: block;
  font-size: 20rpx;
  line-height: 28rpx;
  color: #6b7280;
  font-weight: 500;
}

.tag-row {
  margin-top: 8rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}

.industry-tag,
.policy-tag {
  display: inline-block;
  padding: 4rpx 14rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  line-height: 28rpx;
}

.industry-tag {
  background: rgba(0, 51, 103, 0.1);
  color: #003367;
}

.policy-tag {
  background: rgba(245, 159, 10, 0.12);
  color: #b77900;
}

.action-row {
  margin-top: 14rpx;
  display: flex;
  column-gap: 10rpx;
}

.outline-btn,
.primary-btn {
  flex: 1;
  margin: 0;
  height: 72rpx;
  border-radius: 12rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 6rpx;
  padding: 0 12rpx;
}

.outline-btn {
  border: 2rpx solid #d1d5db;
  background: #ffffff;
}

.outline-btn::after {
  border: 0;
}

.primary-btn {
  border: 0;
  background: linear-gradient(135deg, #003367, #0a4a88);
}

.primary-btn::after {
  border: 0;
}

.btn-icon {
  width: 28rpx;
  height: 28rpx;
  flex-shrink: 0;
}

.outline-btn-text,
.primary-btn-text {
  font-size: 24rpx;
  line-height: 30rpx;
  font-weight: 500;
}

.outline-btn-text {
  color: #374151;
}

.primary-btn-text {
  color: #ffffff;
}

.tip-box {
  margin-top: 24rpx;
  padding: 20rpx;
  border-radius: 12rpx;
  border: 2rpx solid #e5e7eb;
  background: rgba(148, 163, 184, 0.1);
}

.tip-text {
  font-size: 20rpx;
  line-height: 32rpx;
  color: #6b7280;
}

.tip-strong {
  font-weight: 600;
}
</style>
