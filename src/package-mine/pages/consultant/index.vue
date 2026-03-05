<script setup>
const avatar =
  "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/c3e31090-88e5-4645-b8ef-1b9226631f36.png";

const wechatId = "dazhaoxiang001";
const phoneNumber = "400-888-9999";

const skillTags = ["生物医药", "宠物经济", "美妆"];

const serviceItems = [
  "根据您的需求进行产业分析和园区匹配",
  "协助您与园区招商负责人直接沟通",
  "提供从选房到政策申报的全流程支持",
  "解答厂房租赁相关的所有问题",
];

const openAiAssistant = () => {
  uni.navigateTo({
    url: "/package-invest/pages/ai-chat/index",
  });
};

const copyWechat = () => {
  uni.setClipboardData({
    data: wechatId,
    success: () => {
      uni.showToast({
        title: "已复制微信号",
        icon: "none",
      });
    },
  });
};

const callNow = () => {
  uni.makePhoneCall({
    phoneNumber: phoneNumber.replace(/[^\d+]/g, ""),
    fail: () => {
      uni.showToast({
        title: "拨号失败",
        icon: "none",
      });
    },
  });
};
</script>

<template>
  <view class="consultant-page">
    <view class="content-wrap">
      <view class="card consultant-card">
        <view class="hero-wrap">
          <view class="avatar-wrap">
            <image class="avatar-img" :src="avatar" mode="aspectFill" />
          </view>
          <text class="consultant-name">小象助手</text>
          <text class="consultant-role">高级选址顾问</text>
        </view>

        <view class="card-body">
          <button class="ai-entry-btn" @tap="openAiAssistant">
            <view class="ai-entry-left">
              <view class="ai-entry-icon-wrap">
                <image class="ai-entry-icon" :src="'/package-mine/static/icons/consultant/message-square-white.png'" mode="aspectFit" />
              </view>
              <text class="ai-entry-text">您可以先同我的AI助手发起提问</text>
            </view>
            <image class="ai-entry-arrow" :src="'/package-mine/static/icons/consultant/chevron-right-white.png'" mode="aspectFit" />
          </button>

          <view class="contact-list">
            <view class="contact-item">
              <view class="contact-left">
                <view class="contact-icon-wrap">
                  <image class="contact-icon" :src="'/package-mine/static/icons/consultant/message-circle-primary.png'" mode="aspectFit" />
                </view>
                <view>
                  <text class="contact-label">微信号</text>
                  <text class="contact-value">{{ wechatId }}</text>
                </view>
              </view>
              <button class="contact-action-btn" @tap="copyWechat">
                <image class="contact-action-icon" :src="'/package-mine/static/icons/consultant/copy-primary.png'" mode="aspectFit" />
                <text class="contact-action-text">复制</text>
              </button>
            </view>

            <view class="contact-item">
              <view class="contact-left">
                <view class="contact-icon-wrap">
                  <image class="contact-icon" :src="'/package-mine/static/icons/consultant/phone-primary.png'" mode="aspectFit" />
                </view>
                <view>
                  <text class="contact-label">电话</text>
                  <text class="contact-value">{{ phoneNumber }}</text>
                </view>
              </view>
              <button class="contact-action-btn" @tap="callNow">
                <image class="contact-action-icon" :src="'/package-mine/static/icons/consultant/phone-primary.png'" mode="aspectFit" />
                <text class="contact-action-text">拨打</text>
              </button>
            </view>
          </view>

          <view class="service-wrap">
            <text class="service-title">服务内容</text>
            <view class="service-list">
              <view v-for="item in serviceItems" :key="item" class="service-item">
                <image class="service-icon" :src="'/package-mine/static/icons/consultant/circle-check-primary.png'" mode="aspectFit" />
                <text class="service-text">{{ item }}</text>
              </view>
            </view>
          </view>

          <view class="bottom-action-row">
            <button class="solid-btn" @tap="copyWechat">
              <image class="solid-btn-icon" :src="'/package-mine/static/icons/consultant/copy-white.png'" mode="aspectFit" />
              <text class="solid-btn-text">复制微信</text>
            </button>
            <button class="outline-btn" @tap="callNow">
              <image class="outline-btn-icon" :src="'/package-mine/static/icons/consultant/phone-muted.png'" mode="aspectFit" />
              <text class="outline-btn-text">立即拨打</text>
            </button>
          </view>
        </view>
      </view>

      <view class="card section-card">
        <text class="section-title">擅长产业</text>
        <view class="tag-row">
          <text v-for="tag in skillTags" :key="tag" class="skill-tag">{{ tag }}</text>
        </view>
      </view>

      <view class="card section-card">
        <text class="section-title">工作时间</text>
        <view class="work-text-wrap">
          <text class="work-text">周一至周五：09:00 - 18:00</text>
          <text class="work-text">周六至周日：10:00 - 17:00</text>
          <text class="work-note">如遇非工作时间，请留言或发送邮件，我们会尽快回复</text>
        </view>
      </view>

      <view class="tip-box">
        <view class="tip-row">
          <image class="tip-icon" :src="'/package-mine/static/icons/consultant/lightbulb-accent.png'" mode="aspectFit" />
          <view class="tip-text-wrap">
            <text class="tip-title">小贴士</text>
            <text class="tip-text">联系顾问前，建议您先在AI助手中描述您的需求，这样顾问可以更快地为您提供精准的服务</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.consultant-page {
  min-height: 100vh;
  background: #fff;
}

.content-wrap {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
  box-sizing: border-box;
}

.card {
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.06);
}

.consultant-card {
  overflow: hidden;
}

.hero-wrap {
  background: linear-gradient(135deg, #003367, #0c4f92);
  color: #ffffff;
  text-align: center;
  padding: 48rpx 32rpx;
}

.avatar-wrap {
  width: 192rpx;
  height: 192rpx;
  margin: 0 auto 20rpx;
  border-radius: 999rpx;
  border: 8rpx solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.12);
}

.avatar-img {
  width: 100%;
  height: 100%;
}

.consultant-name {
  display: block;
  font-size: 40rpx;
  line-height: 52rpx;
  font-weight: 700;
}

.consultant-role {
  display: block;
  margin-top: 4rpx;
  font-size: 26rpx;
  line-height: 36rpx;
  opacity: 0.92;
}

.card-body {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.ai-entry-btn {
  margin: 0;
  width: 100%;
  min-height: 112rpx;
  padding: 0 24rpx;
  border: 0;
  border-radius: 20rpx;
  background: #ff6b35;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 8rpx 18rpx rgba(255, 107, 53, 0.28);
}

.ai-entry-btn::after {
  border: 0;
}

.ai-entry-left {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  column-gap: 12rpx;
}

.ai-entry-icon-wrap {
  width: 52rpx;
  height: 52rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ai-entry-icon {
  width: 30rpx;
  height: 30rpx;
}

.ai-entry-text {
  font-size: 24rpx;
  line-height: 32rpx;
  text-align: left;
  font-weight: 500;
}

.ai-entry-arrow {
  width: 28rpx;
  height: 28rpx;
  opacity: 0.7;
  margin-left: 10rpx;
  flex-shrink: 0;
}

.contact-list {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.contact-item {
  padding: 20rpx;
  border-radius: 14rpx;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 12rpx;
}

.contact-left {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  column-gap: 12rpx;
}

.contact-icon-wrap {
  width: 64rpx;
  height: 64rpx;
  border-radius: 999rpx;
  background: rgba(0, 51, 103, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.contact-icon {
  width: 32rpx;
  height: 32rpx;
}

.contact-label {
  display: block;
  font-size: 20rpx;
  line-height: 28rpx;
  color: #6b7280;
}

.contact-value {
  display: block;
  margin-top: 2rpx;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #111827;
  font-weight: 600;
}

.contact-action-btn {
  margin: 0;
  height: 56rpx;
  padding: 0 16rpx;
  border: 0;
  border-radius: 10rpx;
  background: rgba(0, 51, 103, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 6rpx;
  flex-shrink: 0;
}

.contact-action-btn::after {
  border: 0;
}

.contact-action-icon {
  width: 24rpx;
  height: 24rpx;
}

.contact-action-text {
  font-size: 22rpx;
  line-height: 28rpx;
  color: #003367;
  font-weight: 500;
}

.service-wrap {
  padding-top: 10rpx;
  border-top: 2rpx solid #e5e7eb;
}

.service-title {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
  font-weight: 600;
}

.service-list {
  margin-top: 10rpx;
  display: flex;
  flex-direction: column;
  row-gap: 10rpx;
}

.service-item {
  display: flex;
  align-items: flex-start;
  column-gap: 10rpx;
}

.service-icon {
  width: 24rpx;
  height: 24rpx;
  margin-top: 4rpx;
  flex-shrink: 0;
}

.service-text {
  flex: 1;
  min-width: 0;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #4b5563;
}

.bottom-action-row {
  padding-top: 8rpx;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12rpx;
}

.solid-btn,
.outline-btn {
  margin: 0;
  height: 72rpx;
  border-radius: 12rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 8rpx;
}

.solid-btn {
  border: 0;
  background: #003367;
}

.solid-btn::after {
  border: 0;
}

.outline-btn {
  border: 2rpx solid #d1d5db;
  background: #ffffff;
}

.outline-btn::after {
  border: 0;
}

.solid-btn-icon,
.outline-btn-icon {
  width: 24rpx;
  height: 24rpx;
}

.solid-btn-text,
.outline-btn-text {
  font-size: 24rpx;
  line-height: 30rpx;
  font-weight: 500;
}

.solid-btn-text {
  color: #ffffff;
}

.outline-btn-text {
  color: #374151;
}

.section-card {
  padding: 24rpx 32rpx 28rpx;
}

.section-title {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
  font-weight: 600;
}

.tag-row {
  margin-top: 14rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}

.skill-tag {
  display: inline-block;
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  background: rgba(0, 51, 103, 0.06);
  border: 2rpx solid rgba(0, 51, 103, 0.12);
  color: #003367;
  font-size: 20rpx;
  line-height: 28rpx;
  font-weight: 500;
}

.work-text-wrap {
  margin-top: 10rpx;
  display: flex;
  flex-direction: column;
  row-gap: 8rpx;
}

.work-text {
  font-size: 24rpx;
  line-height: 34rpx;
  color: #4b5563;
}

.work-note {
  margin-top: 4rpx;
  font-size: 20rpx;
  line-height: 30rpx;
  color: #9ca3af;
}

.tip-box {
  border-radius: 14rpx;
  background: rgba(245, 159, 10, 0.1);
  border: 2rpx solid rgba(245, 159, 10, 0.22);
  padding: 20rpx;
}

.tip-row {
  display: flex;
  align-items: flex-start;
  column-gap: 10rpx;
}

.tip-icon {
  width: 24rpx;
  height: 24rpx;
  margin-top: 2rpx;
  flex-shrink: 0;
}

.tip-text-wrap {
  flex: 1;
  min-width: 0;
}

.tip-title {
  display: block;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #111827;
  font-weight: 600;
}

.tip-text {
  display: block;
  margin-top: 2rpx;
  font-size: 20rpx;
  line-height: 30rpx;
  color: #6b7280;
}
</style>
