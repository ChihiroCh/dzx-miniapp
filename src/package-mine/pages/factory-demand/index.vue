<script setup>
const cards = [
  {
    id: 'req-1',
    title: '高端面膜生产线项目',
    status: '跟进中',
    statusType: 'progress',
    area: '1000-1500 ㎡',
    industry: '美妆美业',
    createdAt: '2026-02-24',
    showAiAction: true,
  },
  {
    id: 'req-2',
    title: '研发实验中心',
    status: '已签约',
    statusType: 'signed',
    area: '500 ㎡',
    industry: '生物医药',
    createdAt: '2025-12-15',
    showAiAction: false,
  },
]

const goAiChat = () => {
  uni.navigateTo({
    url: '/package-invest/pages/ai-chat/index',
  })
}

const onCardTap = () => {
  uni.navigateTo({
    url: '/package-mine/pages/factory-demand-detail/index',
  })
}

const getStatusClass = (item) => {
  return item.statusType === 'signed' ? 'status-pill status-pill-green' : 'status-pill status-pill-blue'
}

const getCardClass = (item) => {
  return item.statusType === 'signed' ? 'requirement-card card-green' : 'requirement-card card-blue'
}

const getStatusIcon = (item) => {
  return item.statusType === 'signed'
    ? '/package-mine/static/icons/factory-demand/circle-check-green.png'
    : '/package-mine/static/icons/factory-demand/clock-blue.png'
}
</script>

<template>
  <view class="factory-demand-page">
    <view class="content-wrap">
      <view class="card-list">
        <view v-for="item in cards" :key="item.id" :class="getCardClass(item)" @tap="onCardTap">
          <view class="card-head">
            <text class="card-title">{{ item.title }}</text>

            <view :class="getStatusClass(item)">
              <image class="status-icon" :src="getStatusIcon(item)" mode="aspectFit" />
              <text class="status-text">{{ item.status }}</text>
            </view>
          </view>

          <view class="spec-grid">
            <view class="spec-item">
              <image class="spec-icon" :src="'/package-mine/static/icons/factory-demand/maximize-muted.png'" mode="aspectFit" />
              <view class="spec-text-wrap">
                <text class="spec-label">所需面积</text>
                <text class="spec-value">{{ item.area }}</text>
              </view>
            </view>

            <view class="spec-item">
              <image class="spec-icon" :src="'/package-mine/static/icons/factory-demand/building-muted.png'" mode="aspectFit" />
              <view class="spec-text-wrap">
                <text class="spec-label">产业类型</text>
                <text class="spec-value">{{ item.industry }}</text>
              </view>
            </view>
          </view>

          <view v-if="item.showAiAction" class="ai-action-wrap">
            <button class="ai-action-btn" @tap.stop="goAiChat">AI沟通补全厂房需求</button>
          </view>

          <view class="card-footer">
            <text class="created-text">创建于 {{ item.createdAt }}</text>
            <image class="footer-arrow" :src="'/package-mine/static/icons/factory-demand/chevron-right-muted.png'" mode="aspectFit" />
          </view>
        </view>
      </view>

      <view class="tip-box">
        <text class="tip-text"><text class="tip-strong">💡 提示：</text>您可以在这里查看所有的选址需求卡片。点击卡片可以查看相关的沟通进展或签约信息。</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.factory-demand-page {
  min-height: 100vh;
  background: #f8fafc;
}

.content-wrap {
  padding: 48rpx 32rpx;
  box-sizing: border-box;
}

.card-list {
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.requirement-card {
  padding: 32rpx;
  border-width: 2rpx;
  border-style: solid;
  border-radius: 16rpx;
  box-sizing: border-box;
}

.card-blue {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.card-green {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.card-head {
  margin-bottom: 24rpx;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 24rpx;
}

.card-title {
  flex: 1;
  min-width: 0;
  font-size: 30rpx;
  line-height: 42rpx;
  color: #0f172a;
  font-weight: 600;
}

.status-pill {
  padding: 8rpx 20rpx;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  column-gap: 8rpx;
  flex-shrink: 0;
}

.status-pill-blue {
  background: #dbeafe;
}

.status-pill-green {
  background: #dcfce7;
}

.status-icon {
  width: 28rpx;
  height: 28rpx;
}

.status-text {
  font-size: 22rpx;
  line-height: 30rpx;
  font-weight: 500;
}

.status-pill-blue .status-text {
  color: #1d4ed8;
}

.status-pill-green .status-text {
  color: #15803d;
}

.spec-grid {
  margin-bottom: 24rpx;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24rpx;
}

.spec-item {
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
}

.spec-icon {
  width: 32rpx;
  height: 32rpx;
  margin-top: 2rpx;
  flex-shrink: 0;
}

.spec-text-wrap {
  flex: 1;
  min-width: 0;
}

.spec-label {
  display: block;
  font-size: 22rpx;
  line-height: 30rpx;
  color: #6b7280;
}

.spec-value {
  display: block;
  margin-top: 2rpx;
  font-size: 28rpx;
  line-height: 38rpx;
  color: #0f172a;
  font-weight: 500;
}

.ai-action-wrap {
  margin-bottom: 32rpx;
}

.ai-action-btn {
  margin: 0;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 16rpx;
  border: 0;
  background: #f97316;
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 500;
}

.ai-action-btn::after {
  border: 0;
}

.card-footer {
  padding-top: 24rpx;
  border-top: 2rpx solid rgba(100, 116, 139, 0.16);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.created-text {
  font-size: 22rpx;
  line-height: 30rpx;
  color: #6b7280;
}

.footer-arrow {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
}

.tip-box {
  margin-top: 48rpx;
  padding: 32rpx;
  border-radius: 16rpx;
  background: #eff6ff;
  border: 2rpx solid #bfdbfe;
}

.tip-text {
  font-size: 22rpx;
  line-height: 36rpx;
  color: #1d4ed8;
}

.tip-strong {
  font-weight: 700;
}
</style>
