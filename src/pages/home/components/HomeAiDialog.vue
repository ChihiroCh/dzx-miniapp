<script setup>
const questions = [
  "附近有哪些新能源厂房？",
  "美妆行业有政策优惠吗？",
  "张江目前租金水平如何？",
]
</script>

<template>
  <view class="ai-section">
    <view class="ai-card">
      <view class="ai-header">
        <view class="ai-title-row">
          <view class="ai-title-icon-wrap">
            <image class="ai-title-icon" src="/static/icons/ai-sparkles.png" mode="aspectFit" />
          </view>
          <text class="ai-title-text">AI智能经纪人大招象</text>
        </view>
      </view>

      <view class="ai-input-row">
        <input class="ai-input" placeholder="找厂房直接问我" />
        <view class="ai-send-btn">
          <image class="ai-send-icon" src="/static/icons/ai-send.png" mode="aspectFit" />
        </view>
      </view>

      <view class="ai-recommend-wrap">
        <view class="ai-recommend-head">
          <text class="ai-recommend-label">推荐问题</text>
          <view class="ai-refresh-btn">
            <image class="ai-refresh-icon" src="/static/icons/ai-refresh.png" mode="aspectFit" />
            <text>换一批</text>
          </view>
        </view>

        <view class="ai-question-list">
          <view v-for="item in questions" :key="item" class="ai-question-btn">
            {{ item }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.ai-section {
  padding: 48rpx 32rpx;
}

.ai-card {
  padding: 48rpx;
  border-radius: 32rpx;
  border: 2rpx solid rgba(0, 51, 102, 0.1);
  background: linear-gradient(135deg, rgba(0, 51, 102, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%);
}

.ai-header {
  margin-bottom: 32rpx;
}

.ai-title-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.ai-title-icon-wrap {
  width: 48rpx;
  height: 48rpx;
  border-radius: 9999rpx;
  background: rgba(0, 51, 102, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-title-icon {
  width: 28rpx;
  height: 28rpx;
}

.ai-title-text {
  font-size: 28rpx;
  font-weight: 600;
  color: #003366;
}

.ai-input-row {
  display: flex;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.ai-input {
  flex: 1;
  height: 80rpx;
  padding: 16rpx 24rpx;
  border-radius: 12rpx;
  border: 2rpx solid rgba(0, 51, 102, 0.2);
  background: rgba(255, 255, 255, 0.5);
  font-size: 28rpx;
  box-sizing: border-box;
}

.ai-send-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 12rpx;
  background-color: #f97316;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-send-icon {
  width: 36rpx;
  height: 36rpx;
}

.ai-recommend-wrap {
  margin-top: 24rpx;
}

.ai-recommend-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
}

.ai-recommend-label {
  font-size: 24rpx;
  color: #667085;
}

.ai-refresh-btn {
  height: 48rpx;
  padding: 0 16rpx;
  border-radius: 12rpx;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  color: #667085;
  font-size: 24rpx;
}

.ai-refresh-icon {
  width: 24rpx;
  height: 24rpx;
}

.ai-question-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.ai-question-btn {
  width: 100%;
  text-align: left;
  padding: 24rpx;
  border-radius: 16rpx;
  border: 2rpx solid rgba(228, 234, 243, 0.6);
  background: rgba(255, 255, 255, 0.5);
  font-size: 28rpx;
  color: rgba(15, 23, 42, 0.8);
  line-height: 1.5;
  box-sizing: border-box;
}
</style>
