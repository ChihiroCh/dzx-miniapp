<template>
  <view class="bg-gradient-primary text-primary-foreground pt-8 pb-10 px-4">
    <view class="text-center mb-8">
      <view class="flex items-center justify-center gap-2_5">
        <view class="w-12 h-12 rounded-full bg-primary-foreground-20 flex items-center justify-center shadow-inner">
          <text class="text-2xl">🐘</text>
        </view>
        <view class="text-left">
          <text class="text-2xl font-bold tracking-tight brand-title">大招象</text>
          <text class="text-xs opacity-90 font-medium brand-subtitle">租厂房直接和园区谈</text>
        </view>
      </view>
    </view>

    <view class="grid grid-cols-2 gap-3">
      <view class="rounded-lg border text-card-foreground shadow-sm bg-primary-foreground-10 border-primary-foreground-20 backdrop-blur-sm">
        <view class="p-3 flex items-start gap-2">
          <view class="flex-shrink-0 mt-0_5 text-primary-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
            </svg>
          </view>
          <text class="text-xs text-primary-foreground leading-tight">数字化厂房服务方案提供商</text>
        </view>
      </view>

      <view class="rounded-lg border text-card-foreground shadow-sm bg-primary-foreground-10 border-primary-foreground-20 backdrop-blur-sm">
        <view class="p-3 flex items-start gap-2">
          <view class="flex-shrink-0 mt-0_5 text-primary-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M10 12h4"></path>
              <path d="M10 8h4"></path>
              <path d="M14 21v-3a2 2 0 0 0-4 0v3"></path>
              <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path>
              <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>
            </svg>
          </view>
          <text class="text-xs text-primary-foreground leading-tight">园区直属服务经纪人</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #003366 0%, #004d99 100%);
}

.text-primary-foreground {
  color: #ffffff;
}

.text-card-foreground {
  color: #ffffff;
}

.pt-8 {
  padding-top: 64rpx;
}

.pb-10 {
  padding-bottom: 80rpx;
}

.px-4 {
  padding-left: 32rpx;
  padding-right: 32rpx;
}

.text-center {
  text-align: center;
}

.mb-8 {
  margin-bottom: 64rpx;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.items-start {
  align-items: flex-start;
}

.justify-center {
  justify-content: center;
}

.text-left {
  text-align: left;
}

.gap-2_5 {
  gap: 20rpx;
}

.gap-2 {
  gap: 16rpx;
}

.gap-3 {
  gap: 24rpx;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: 1fr 1fr;
}

.w-12 {
  width: 96rpx;
}

.h-12 {
  height: 96rpx;
}

.rounded-full {
  border-radius: 9999rpx;
}

.bg-primary-foreground-20 {
  background: rgba(255, 255, 255, 0.2);
}

.bg-primary-foreground-10 {
  background: rgba(255, 255, 255, 0.1);
}

.border-primary-foreground-20 {
  border-color: rgba(255, 255, 255, 0.2);
}

.shadow-inner {
  box-shadow: inset 0 4rpx 8rpx rgba(0, 0, 0, 0.06);
}

.rounded-lg {
  border-radius: 16rpx;
}

.border {
  border-width: 2rpx;
  border-style: solid;
}

.shadow-sm {
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
}

.backdrop-blur-sm {
  backdrop-filter: blur(8rpx);
}

.p-3 {
  padding: 24rpx;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.mt-0_5 {
  margin-top: 4rpx;
}

.text-2xl {
  font-size: 48rpx;
}

.text-xs {
  font-size: 24rpx;
}

.font-bold {
  font-weight: 700;
}

.font-medium {
  font-weight: 500;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

.opacity-90 {
  opacity: 0.9;
}

.leading-tight {
  line-height: 1.25;
}

.brand-title,
.brand-subtitle {
  display: block;
}
</style>
