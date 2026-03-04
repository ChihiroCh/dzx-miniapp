<script setup>
const contact = {
  name: "陈经理",
  role: "招商总监",
  wechat: "微信: dazhaoxiang_service",
  phone: "电话: 400-xxx-xxxx",
  worktime: "工作时间：周一至周五 9:00-18:00",
};
</script>

<template>
  <view class="contact-wrap">
    <text class="contact-title">联系招商</text>

    <view class="contact-card">
      <view class="contact-header">
        <view class="manager-row">
          <view class="avatar-box">
            <image class="avatar-icon" src="/static/icons/park-contact/user.png" mode="aspectFit" />
          </view>
          <view class="manager-info">
            <text class="manager-name">{{ contact.name }}</text>
            <text class="manager-role">{{ contact.role }}</text>
          </view>
        </view>
      </view>

      <view class="contact-content">
        <view class="contact-btn-list">
          <view class="contact-btn">
            <image class="btn-icon" src="/static/icons/park-contact/message-circle.png" mode="aspectFit" />
            <text class="btn-text">{{ contact.wechat }}</text>
          </view>
          <view class="contact-btn">
            <image class="btn-icon" src="/static/icons/park-contact/phone.png" mode="aspectFit" />
            <text class="btn-text">{{ contact.phone }}</text>
          </view>
        </view>

        <text class="worktime-text">{{ contact.worktime }}</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.contact-wrap {
  margin-top: 24rpx;
  padding: 0 32rpx 40rpx;
  box-sizing: border-box;
}

.contact-title {
  display: block;
  font-size: 36rpx;
  line-height: 1.4;
  font-weight: 600;
  color: #111827;
}

.contact-card {
  margin-top: 24rpx;
  border-radius: 16rpx;
  border: 1px solid rgba(0, 51, 103, 0.1);
  background-color: #ffffff;
  background-image: linear-gradient(
    to bottom right,
    rgba(0, 51, 103, 0.05) 0%,
    rgba(245, 158, 11, 0.05) 100%
  );
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
}

.contact-header {
  padding: 48rpx 48rpx 24rpx;
}

.manager-row {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.avatar-box {
  width: 96rpx;
  height: 96rpx;
  border-radius: 9999rpx;
  background: rgba(0, 51, 103, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  width: 48rpx;
  height: 48rpx;
}

.manager-info {
  display: flex;
  flex-direction: column;
  row-gap: 6rpx;
}

.manager-name {
  font-size: 32rpx;
  line-height: 1.4;
  font-weight: 600;
  color: #111827;
}

.manager-role {
  font-size: 24rpx;
  line-height: 1.3;
  color: #6c7480;
}

.contact-content {
  padding: 0 48rpx 48rpx;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.contact-btn-list {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.contact-btn {
  height: 80rpx;
  width: 100%;
  padding: 0 32rpx;
  border-radius: 12rpx;
  border: 1px solid #d7dde8;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}

.btn-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 16rpx;
  flex-shrink: 0;
}

.btn-text {
  font-size: 28rpx;
  line-height: 1.3;
  color: #111827;
}

.worktime-text {
  display: block;
  text-align: center;
  font-size: 24rpx;
  line-height: 1.4;
  color: #6c7480;
}
</style>
