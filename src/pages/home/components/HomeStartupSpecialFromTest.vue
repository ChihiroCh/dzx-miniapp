<template>
  <view class="startup-section">
    <view class="startup-card">
      <view class="startup-content">
        <view class="startup-top">
          <view class="startup-title-row">
            <view class="startup-badge">
              <text class="startup-badge-text">SPECIAL</text>
            </view>
            <text class="startup-title">初创企业服务专题</text>
          </view>

          <view class="startup-desc-row">
            <view class="startup-icon-wrap">
              <image class="startup-icon" src="/static/icons/home-startup/rocket.png" mode="aspectFit" />
            </view>
            <text class="startup-desc">
              专为初创企业提供一站式选址、政策申报、产业对接服务，助力企业快速起步。
            </text>
          </view>
        </view>

        <button class="startup-btn">
          <text class="startup-btn-text">立即查看</text>
          <image class="startup-btn-icon" src="/static/icons/home-startup/arrow-right.png" mode="aspectFit" />
        </button>
      </view>
    </view>
  </view>
</template>

<style scoped>
.startup-section {
  padding: 48rpx 32rpx;
}

.startup-card {
  overflow: hidden;
  border-radius: 16rpx;
  border: 2rpx solid rgba(233, 237, 243, 0.6);
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 6rpx 16rpx rgba(16, 24, 40, 0.06);
  transition: all 0.3s ease;
}

.startup-content {
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.startup-top {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.startup-title-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.startup-badge {
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  background: rgba(0, 51, 103, 0.1);
}

.startup-badge-text {
  display: block;
  color: #003367;
  font-size: 20rpx;
  font-weight: 700;
  line-height: 1.3;
}

.startup-title {
  color: #111827;
  font-size: 36rpx;
  font-weight: 700;
  line-height: 1.35;
}

.startup-desc-row {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
}

.startup-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  border-radius: 999rpx;
  background: rgba(245, 158, 11, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.startup-icon {
  width: 48rpx;
  height: 48rpx;
}

.startup-desc {
  flex: 1;
  color: #6b7280;
  font-size: 28rpx;
  line-height: 1.625;
}

.startup-btn {
  width: 100%;
  height: 80rpx;
  border-radius: 12rpx;
  border: 0;
  background: #003367;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  font-size: 28rpx;
  font-weight: 600;
  box-shadow: 0 2rpx 8rpx rgba(15, 23, 42, 0.08);
  transition: all 0.3s ease;
}

.startup-btn::after {
  border: 0;
}

.startup-btn-text {
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1;
}

.startup-btn-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 6rpx;
}
</style>
