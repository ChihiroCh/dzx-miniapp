<script setup>
const completionPercent = 80

const completionItems = [
  { name: '基本信息', weight: '20%', done: true },
  { name: '面积需求', weight: '20%', done: true },
  { name: '预算信息', weight: '20%', done: true },
  { name: '物理参数', weight: '15%', done: true },
  { name: '产业政策', weight: '25%', done: false },
]

const infoItems = [
  { icon: 'building-2-primary.png', label: '项目名称', value: '高端面膜生产线项目' },
  { icon: 'tag-primary.png', label: '所属产业', value: '美妆美业' },
  { icon: 'map-pin-primary.png', label: '面积需求', value: '1000-1500 ㎡' },
  { icon: 'dollar-sign-primary.png', label: '预算范围', value: '200-300万元/年' },
  { icon: 'calendar-primary.png', label: '入驻时间', value: '2026年Q2前' },
  { icon: 'user-primary.png', label: '联系人', value: '陈先生' },
]

const physicalItems = [
  { icon: 'layers-primary.png', label: '层高要求', value: '≥5米', done: true },
  { icon: 'zap-primary.png', label: '配电容量', value: '≥500kW', done: true },
  { icon: 'droplet-primary.png', label: '用水需求', value: '工业用水', done: true },
  { icon: 'wind-primary.png', label: '通风要求', value: '良好通风', done: true },
  { icon: 'flame-primary.png', label: '消防等级', value: '一级', done: false },
  { icon: 'truck-primary.png', label: '物流条件', value: '靠近高速', done: false },
  { icon: 'hammer-primary.png', label: '装修状态', value: '毛坯/精装', done: true },
  { icon: 'shield-primary.png', label: '环保等级', value: '达到环评标准', done: true },
]

const industryCards = [
  {
    icon: 'briefcase-primary.png',
    title: '产业定位',
    subtitle: '企业主要经营的产业方向',
    tags: ['美妆美业', '高端护肤', '生物科技'],
  },
  {
    icon: 'file-text-primary.png',
    title: '政策需求',
    subtitle: '企业关注的政策扶持方向',
    tags: ['高新技术企业认定', '研发费用加计扣除', '产业补贴'],
  },
  {
    icon: 'link-2-primary.png',
    title: '产业链需求',
    subtitle: '企业需要的上下游配套',
    tags: ['原料供应商', '包装材料商', '物流配送'],
  },
]

const iconPath = (name) => `/package-mine/static/icons/factory-demand-detail/${name}`
</script>

<template>
  <view class="detail-page">
    <view class="content-wrap">
      <view class="card card-gradient">
        <view class="card-header">
          <view>
            <text class="card-title-lg">需求卡完整度</text>
            <text class="card-subtitle">根据填写进度自动计算</text>
          </view>
          <view class="score-wrap">
            <text class="score-value">80</text>
            <text class="score-level">优秀</text>
          </view>
        </view>

        <view class="progress-wrap">
          <view class="progress-top-row">
            <text class="progress-label">完整度进度</text>
            <text class="progress-percent">{{ completionPercent }}%</text>
          </view>
          <view class="progress-track">
            <view class="progress-fill" :style="{ width: `${completionPercent}%` }" />
          </view>
        </view>

        <view class="completion-list">
          <view v-for="item in completionItems" :key="item.name" class="completion-item">
            <view class="completion-left">
              <view :class="item.done ? 'completion-icon-wrap completion-icon-ok' : 'completion-icon-wrap completion-icon-miss'">
                <image
                  class="completion-icon"
                  :src="iconPath(item.done ? 'check-green.png' : 'x-gray.png')"
                  mode="aspectFit"
                />
              </view>
              <text class="completion-name">{{ item.name }}</text>
            </view>
            <text class="completion-weight">{{ item.weight }}</text>
          </view>
        </view>
      </view>

      <view class="card">
        <view class="card-header card-header-space">
          <text class="card-title-lg">需求基本信息</text>
          <text class="status-badge">跟进中</text>
        </view>

        <view class="info-list">
          <view v-for="item in infoItems" :key="item.label" class="info-item">
            <view class="info-icon-wrap">
              <image class="info-icon" :src="iconPath(item.icon)" mode="aspectFit" />
            </view>
            <view class="info-text-wrap">
              <text class="info-label">{{ item.label }}</text>
              <text class="info-value">{{ item.value }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="card">
        <view class="card-header">
          <text class="card-title-lg">物理参数需求</text>
        </view>

        <view class="physical-grid">
          <view v-for="item in physicalItems" :key="item.label" class="physical-item">
            <view class="physical-top">
              <image class="physical-icon" :src="iconPath(item.icon)" mode="aspectFit" />
              <text class="physical-label">{{ item.label }}</text>
            </view>
            <text class="physical-value">{{ item.value }}</text>
            <text :class="item.done ? 'filled-tag' : 'unfilled-tag'">{{ item.done ? '已填写' : '未填写' }}</text>
          </view>
        </view>
      </view>

      <view class="industry-section">
        <view v-for="card in industryCards" :key="card.title" class="card">
          <view class="industry-header">
            <view class="industry-icon-wrap">
              <image class="industry-icon" :src="iconPath(card.icon)" mode="aspectFit" />
            </view>
            <view class="industry-text-wrap">
              <text class="industry-title">{{ card.title }}</text>
              <text class="industry-subtitle">{{ card.subtitle }}</text>
            </view>
          </view>

          <view class="tag-list">
            <text v-for="tag in card.tags" :key="`${card.title}-${tag}`" class="tag-item">{{ tag }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: #f8fafc;
}

.content-wrap {
  padding: 48rpx 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
  box-sizing: border-box;
}

.card {
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.06);
  padding: 28rpx;
}

.card-gradient {
  background-image: linear-gradient(135deg, rgba(0, 51, 103, 0.06), rgba(255, 153, 51, 0.08));
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 16rpx;
}

.card-header-space {
  margin-bottom: 14rpx;
}

.card-title-lg {
  display: block;
  font-size: 34rpx;
  line-height: 48rpx;
  color: #111827;
  font-weight: 600;
}

.card-subtitle {
  display: block;
  margin-top: 4rpx;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #6b7280;
}

.score-wrap {
  text-align: right;
  color: #16a34a;
}

.score-value {
  display: block;
  font-size: 58rpx;
  line-height: 62rpx;
  font-weight: 700;
}

.score-level {
  display: block;
  margin-top: 2rpx;
  font-size: 22rpx;
  line-height: 30rpx;
  font-weight: 500;
}

.progress-wrap {
  margin-top: 20rpx;
}

.progress-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.progress-label,
.progress-percent {
  font-size: 24rpx;
  line-height: 34rpx;
}

.progress-label {
  color: #6b7280;
}

.progress-percent {
  color: #111827;
  font-weight: 500;
}

.progress-track {
  margin-top: 10rpx;
  height: 16rpx;
  border-radius: 999rpx;
  background: #e5e7eb;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 999rpx;
  background: #f59f0a;
}

.completion-list {
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  row-gap: 10rpx;
}

.completion-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14rpx;
  border-radius: 12rpx;
  background: rgba(255, 255, 255, 0.75);
}

.completion-left {
  display: flex;
  align-items: center;
  column-gap: 12rpx;
}

.completion-icon-wrap {
  width: 40rpx;
  height: 40rpx;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.completion-icon-ok {
  background: #dcfce7;
}

.completion-icon-miss {
  background: #f3f4f6;
}

.completion-icon {
  width: 26rpx;
  height: 26rpx;
}

.completion-name {
  font-size: 24rpx;
  line-height: 34rpx;
  color: #111827;
}

.completion-weight {
  font-size: 22rpx;
  line-height: 30rpx;
  color: #6b7280;
}

.status-badge {
  flex-shrink: 0;
  margin-top: 2rpx;
  padding: 6rpx 18rpx;
  border-radius: 999rpx;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 22rpx;
  line-height: 30rpx;
  font-weight: 500;
}

.info-list {
  display: flex;
  flex-direction: column;
  row-gap: 10rpx;
}

.info-item {
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
  padding: 18rpx;
  border-radius: 12rpx;
  background: #f8fafc;
}

.info-icon-wrap {
  width: 48rpx;
  height: 48rpx;
  border-radius: 12rpx;
  background: rgba(0, 51, 103, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon {
  width: 30rpx;
  height: 30rpx;
}

.info-text-wrap {
  flex: 1;
  min-width: 0;
}

.info-label {
  display: block;
  font-size: 22rpx;
  line-height: 30rpx;
  color: #6b7280;
  font-weight: 500;
}

.info-value {
  display: block;
  margin-top: 2rpx;
  font-size: 26rpx;
  line-height: 36rpx;
  color: #111827;
  font-weight: 500;
}

.physical-grid {
  margin-top: 8rpx;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14rpx;
}

.physical-item {
  padding: 20rpx;
  border-radius: 12rpx;
  background: #f8fafc;
}

.physical-top {
  display: flex;
  align-items: flex-start;
  column-gap: 8rpx;
  margin-bottom: 10rpx;
}

.physical-icon {
  width: 30rpx;
  height: 30rpx;
  margin-top: 2rpx;
  flex-shrink: 0;
}

.physical-label {
  flex: 1;
  min-width: 0;
  font-size: 22rpx;
  line-height: 30rpx;
  color: #6b7280;
  font-weight: 500;
}

.physical-value {
  display: block;
  margin-bottom: 10rpx;
  font-size: 26rpx;
  line-height: 36rpx;
  color: #111827;
  font-weight: 500;
}

.filled-tag,
.unfilled-tag {
  display: inline-block;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  font-size: 20rpx;
  line-height: 28rpx;
}

.filled-tag {
  background: #dcfce7;
  color: #15803d;
}

.unfilled-tag {
  background: #ffedd5;
  color: #c2410c;
}

.industry-section {
  display: flex;
  flex-direction: column;
  row-gap: 14rpx;
}

.industry-header {
  display: flex;
  align-items: center;
  column-gap: 12rpx;
}

.industry-icon-wrap {
  width: 48rpx;
  height: 48rpx;
  border-radius: 12rpx;
  background: rgba(0, 51, 103, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.industry-icon {
  width: 30rpx;
  height: 30rpx;
}

.industry-text-wrap {
  flex: 1;
  min-width: 0;
}

.industry-title {
  display: block;
  font-size: 30rpx;
  line-height: 42rpx;
  color: #111827;
  font-weight: 600;
}

.industry-subtitle {
  display: block;
  margin-top: 2rpx;
  font-size: 22rpx;
  line-height: 30rpx;
  color: #6b7280;
}

.tag-list {
  margin-top: 14rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}

.tag-item {
  display: inline-block;
  padding: 6rpx 18rpx;
  border-radius: 999rpx;
  background: #f59f0a;
  color: #ffffff;
  font-size: 20rpx;
  line-height: 28rpx;
  font-weight: 500;
}
</style>
