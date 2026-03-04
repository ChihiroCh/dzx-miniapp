<template>
  <view class="bottom-actions-wrap">
    <view class="bottom-actions-inner">
      <view class="ai-btn">
        <image
          class="ai-btn-icon"
          src="/static/icons/park-bottom-actions/message-circle.png"
          mode="aspectFit"
        />
        <text class="ai-btn-text">咨询 AI 选址</text>
      </view>

      <view class="sub-btn-row">
        <view class="sub-btn">
          <image
            class="sub-btn-icon"
            src="/static/icons/park-bottom-actions/phone.png"
            mode="aspectFit"
          />
          <text class="sub-btn-text">联系招商</text>
        </view>
        <view class="sub-btn sub-btn-secondary">
          <image
            class="sub-btn-icon sub-btn-icon-strong"
            src="/static/icons/park-bottom-actions/clipboard-pen.png"
            mode="aspectFit"
          />
          <text class="sub-btn-text sub-btn-text-strong">项目入驻</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.bottom-actions-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  padding: 32rpx 32rpx calc(48rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.95);
  border-top: 1px solid #e5e7eb;
  box-sizing: border-box;
}

.bottom-actions-inner {
  width: 100%;
  max-width: 896rpx;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.ai-btn {
  height: 96rpx;
  border-radius: 12rpx;
  padding: 0 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #003367 0%, #4aa3ff 100%);
  box-shadow: 0 8rpx 20rpx rgba(0, 51, 103, 0.18);
}

.ai-btn-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 16rpx;
}

.ai-btn-text {
  font-size: 28rpx;
  line-height: 1.3;
  font-weight: 500;
  color: #ffffff;
}

.sub-btn-row {
  width: 100%;
  display: flex;
  gap: 16rpx;
}

.sub-btn {
  flex: 1;
  height: 96rpx;
  border-radius: 12rpx;
  border: 1px solid #d7dde8;
  background: #ffffff;
  padding: 0 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.sub-btn-secondary {
  background: #f59f0b;
  border-color: #e4e9f1;
}

.sub-btn-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 16rpx;
}

.sub-btn-text {
  font-size: 28rpx;
  line-height: 1.3;
  color: #111827;
  font-weight: 500;
}

.sub-btn-text-strong {
  color: #ffffff;
  font-weight: 600;
}

.sub-btn-icon-strong {
  filter: brightness(0) invert(1);
}
</style>
