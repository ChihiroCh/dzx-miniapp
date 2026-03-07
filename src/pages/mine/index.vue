<script setup>
const USER_AVATAR =
  "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/213baf09-6139-4df2-8e14-02821d04605d.png";
const ASSISTANT_AVATAR =
  "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/c3e31090-88e5-4645-b8ef-1b9226631f36.png";

const functionCards = [
  {
    key: "publish",
    title: "发布项目",
    icon: "/static/icons/mine-page/plus-primary.png",
  },
  {
    key: "site",
    title: "我的选址",
    icon: "/static/icons/mine-page/map-pin-primary.png",
    badge: "2",
  },
  {
    key: "talking",
    title: "沟通中的园区",
    icon: "/static/icons/mine-page/message-square-primary.png",
  },
  {
    key: "signed",
    title: "签约园区",
    icon: "/static/icons/mine-page/circle-check-big-primary.png",
  },
];

const favoriteCards = [
  {
    key: "parks",
    title: "园区",
    icon: "/static/icons/mine-page/building-2-primary.png",
    badge: "5",
  },
  {
    key: "factory",
    title: "厂房",
    icon: "/static/icons/mine-page/house-primary.png",
    badge: "3",
  },
  {
    key: "policy",
    title: "政策",
    icon: "/static/icons/mine-page/file-text-primary.png",
    badge: "8",
  },
  {
    key: "encyclopedia",
    title: "百科",
    icon: "/static/icons/mine-page/book-open-primary.png",
    badge: "2",
  },
];

const menuList = [
  {
    key: "consultant",
    title: "大招象顾问",
    subtitle: "1对1专属顾问支持",
    icon: "/static/icons/mine-page/users-muted.png",
  },
  {
    key: "about",
    title: "关于大招象",
    subtitle: "品牌故事与使命",
    icon: "/static/icons/mine-page/info-muted.png",
  },
  {
    key: "business",
    title: "商务合作",
    subtitle: "合作机会与方案",
    icon: "/static/icons/mine-page/handshake-muted.png",
  },
  {
    key: "privacy",
    title: "服务隐私与条款",
    subtitle: "用户协议与隐私政策",
    icon: "/static/icons/mine-page/file-text-muted.png",
  },
];

const openPublishProject = () => {
  uni.navigateTo({
    url: "/package-invest/pages/project-entrust/index",
  });
};

const openAiChat = () => {
  uni.navigateTo({
    url: "/package-invest/pages/ai-chat/index",
  });
};

const openMyFactoryDemand = () => {
  uni.navigateTo({
    url: "/package-mine/pages/factory-demand/index",
  });
};

const openChattingParks = () => {
  uni.navigateTo({
    url: "/package-mine/pages/chatting-parks/index",
  });
};

const openSignedParks = () => {
  uni.navigateTo({
    url: "/package-mine/pages/signed-parks/index",
  });
};

const openConsultantPage = () => {
  uni.navigateTo({
    url: "/package-mine/pages/consultant/index",
  });
};

const openBusinessCooperationPage = () => {
  uni.navigateTo({
    url: "/package-mine/pages/business-cooperation/index",
  });
};

const openAboutPage = () => {
  uni.navigateTo({
    url: "/package-mine/pages/about/index",
  });
};

const callAdvisor = () => {
  uni.makePhoneCall({
    phoneNumber: "4000000000",
    fail: () => {
      uni.showToast({
        title: "拨号失败",
        icon: "none",
      });
    },
  });
};

const onFunctionTap = (card) => {
  if (card.key === "publish") {
    openPublishProject();
    return;
  }

  if (card.key === "site") {
    openMyFactoryDemand();
    return;
  }

  if (card.key === "talking") {
    openChattingParks();
    return;
  }

  if (card.key === "signed") {
    openSignedParks();
    return;
  }

  uni.showToast({
    title: "功能开发中",
    icon: "none",
  });
};

const onFavoriteTap = () => {
  uni.showToast({
    title: "功能开发中",
    icon: "none",
  });
};

const onMenuTap = (item) => {
  if (item?.key === "consultant") {
    openConsultantPage();
    return;
  }

  if (item?.key === "business") {
    openBusinessCooperationPage();
    return;
  }

  if (item?.key === "about") {
    openAboutPage();
    return;
  }

  uni.showToast({
    title: "功能开发中",
    icon: "none",
  });
};
</script>

<template>
  <view class="mine-page">
    <view class="profile-card card-base">
      <view class="profile-content">
        <image class="profile-avatar" :src="USER_AVATAR" mode="aspectFill" />

        <view class="profile-main">
          <text class="profile-name">陈先生</text>

          <view class="tag-row">
            <text class="profile-tag">化妆品</text>
            <text class="profile-tag">生物医药</text>
          </view>

          <view class="stats-row">
            <view class="stat-item">
              <text class="stat-value">2</text>
              <text class="stat-label">个需求卡</text>
            </view>
            <view class="stat-item">
              <text class="stat-value">2</text>
              <text class="stat-label">个进行中</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="function-grid section-gap">
      <view
        v-for="item in functionCards"
        :key="item.key"
        class="function-card card-base"
        @tap="onFunctionTap(item)"
      >
        <text v-if="item.badge" class="corner-badge">{{ item.badge }}</text>

        <view class="function-icon-wrap">
          <image class="function-icon" :src="item.icon" mode="aspectFit" />
        </view>

        <text class="function-title">{{ item.title }}</text>
      </view>
    </view>

    <view class="assistant-card card-base section-gap">
      <image
        class="assistant-avatar"
        :src="ASSISTANT_AVATAR"
        mode="aspectFill"
      />

      <view class="assistant-main">
        <text class="assistant-title">小象助手</text>
        <text class="assistant-subtitle">高级选址顾问</text>

        <view class="assistant-actions">
          <button class="assistant-btn" @tap="openAiChat">
            <image
              class="assistant-btn-icon"
              :src="'/static/icons/mine-page/message-circle-primary.png'"
              mode="aspectFit"
            />
            <text class="assistant-btn-text">联系顾问</text>
          </button>

          <button class="assistant-btn" @tap="callAdvisor">
            <image
              class="assistant-btn-icon"
              :src="'/static/icons/mine-page/phone-primary.png'"
              mode="aspectFit"
            />
            <text class="assistant-btn-text">拨打电话</text>
          </button>
        </view>
      </view>
    </view>

    <view class="section-gap">
      <view class="favorite-header">
        <text class="favorite-title">我的收藏</text>
      </view>

      <view class="favorite-grid">
        <view
          v-for="item in favoriteCards"
          :key="item.key"
          class="favorite-card card-base"
          @tap="onFavoriteTap"
        >
          <text class="favorite-badge">{{ item.badge }}</text>

          <view class="favorite-icon-wrap">
            <image class="favorite-icon" :src="item.icon" mode="aspectFit" />
          </view>

          <text class="favorite-name">{{ item.title }}</text>
        </view>
      </view>
    </view>

    <view class="menu-list section-gap">
      <view
        v-for="item in menuList"
        :key="item.key"
        class="menu-item card-base"
        @tap="onMenuTap(item)"
      >
        <view class="menu-left">
          <view class="menu-icon-wrap">
            <image class="menu-icon" :src="item.icon" mode="aspectFit" />
          </view>

          <view class="menu-texts">
            <text class="menu-title">{{ item.title }}</text>
            <text class="menu-subtitle">{{ item.subtitle }}</text>
          </view>
        </view>

        <image
          class="menu-arrow"
          :src="'/static/icons/mine-page/chevron-right-muted.png'"
          mode="aspectFit"
        />
      </view>
    </view>
  </view>
</template>

<style scoped>
.mine-page {
  min-height: 100vh;
  box-sizing: border-box;
  padding: 32rpx;
  padding-bottom: 120rpx;
  background: #fff;
}

.section-gap {
  margin-top: 24rpx;
}

.card-base {
  border: 2rpx solid #e7edf4;
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0 6rpx 20rpx rgba(12, 33, 62, 0.04);
  box-sizing: border-box;
}

.profile-card {
  padding: 32rpx;
  background-image: linear-gradient(
    135deg,
    rgba(0, 51, 103, 0.1),
    rgba(255, 155, 66, 0.12)
  );
}

.profile-content {
  display: flex;
  align-items: flex-start;
  column-gap: 32rpx;
}

.profile-avatar {
  width: 128rpx;
  height: 128rpx;
  border-radius: 64rpx;
  border: 4rpx solid rgba(0, 51, 103, 0.2);
  flex-shrink: 0;
}

.profile-main {
  flex: 1;
  min-width: 0;
}

.profile-name {
  display: block;
  font-size: 36rpx;
  line-height: 50rpx;
  font-weight: 700;
  color: #1f2937;
}

.tag-row {
  margin-top: 16rpx;
  display: flex;
  flex-wrap: wrap;
  column-gap: 16rpx;
  row-gap: 16rpx;
}

.profile-tag {
  padding: 4rpx 20rpx;
  border-radius: 999rpx;
  border: 2rpx solid transparent;
  font-size: 24rpx;
  line-height: 32rpx;
  font-weight: 600;
  color: #ffffff;
  background: #f59f0a;
}

.stats-row {
  margin-top: 20rpx;
  display: flex;
  align-items: center;
  column-gap: 40rpx;
}

.stat-item {
  display: flex;
  align-items: baseline;
  column-gap: 6rpx;
}

.stat-value {
  font-size: 28rpx;
  line-height: 40rpx;
  font-weight: 700;
  color: #111827;
}

.stat-label {
  font-size: 22rpx;
  line-height: 32rpx;
  color: #6b7280;
}

.function-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24rpx;
}

.function-card {
  position: relative;
  padding: 30rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 16rpx;
  text-align: center;
}

.corner-badge {
  position: absolute;
  top: 16rpx;
  right: 16rpx;
  min-width: 36rpx;
  height: 36rpx;
  padding: 0 8rpx;
  border-radius: 999rpx;
  background: #f59f0a;
  color: #ffffff;
  font-size: 20rpx;
  line-height: 36rpx;
  text-align: center;
  font-weight: 700;
  box-sizing: border-box;
}

.function-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  margin: 0 auto;
  border-radius: 16rpx;
  background: rgba(0, 51, 103, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.function-icon {
  display: block;
  width: 40rpx;
  height: 40rpx;
  margin: 0 auto;
}

.function-title {
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
  font-weight: 500;
}

.assistant-card {
  padding: 32rpx;
  display: flex;
  align-items: flex-start;
  column-gap: 24rpx;
  border-color: rgba(0, 51, 103, 0.2);
  background-image: linear-gradient(
    135deg,
    rgba(0, 51, 103, 0.06),
    rgba(255, 155, 66, 0.08)
  );
}

.assistant-avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 48rpx;
  flex-shrink: 0;
}

.assistant-main {
  flex: 1;
  min-width: 0;
}

.assistant-title {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  font-weight: 600;
  color: #111827;
}

.assistant-subtitle {
  display: block;
  margin-top: 6rpx;
  font-size: 22rpx;
  line-height: 32rpx;
  color: #6b7280;
}

.assistant-actions {
  margin-top: 16rpx;
  display: flex;
  column-gap: 16rpx;
}

.assistant-btn {
  margin: 0;
  padding: 0 22rpx;
  height: 56rpx;
  border-radius: 12rpx;
  border: 2rpx solid #d8dee7;
  background: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.assistant-btn::after {
  border: 0;
}

.assistant-btn-icon {
  width: 28rpx;
  height: 28rpx;
  margin-right: 8rpx;
}

.assistant-btn-text {
  font-size: 22rpx;
  line-height: 28rpx;
  color: #374151;
}

.favorite-header {
  padding: 0 8rpx;
}

.favorite-title {
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
  font-weight: 600;
}

.favorite-grid {
  margin-top: 12rpx;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12rpx;
}

.favorite-card {
  position: relative;
  padding: 24rpx 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 12rpx;
}

.favorite-badge {
  position: absolute;
  top: -8rpx;
  right: -6rpx;
  min-width: 36rpx;
  height: 36rpx;
  padding: 0 8rpx;
  border-radius: 999rpx;
  background: #f59f0a;
  color: #ffffff;
  font-size: 18rpx;
  line-height: 36rpx;
  text-align: center;
  font-weight: 700;
}

.favorite-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  background: rgba(0, 51, 103, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.favorite-icon {
  width: 40rpx;
  height: 40rpx;
}

.favorite-name {
  font-size: 22rpx;
  line-height: 30rpx;
  color: #6b7280;
  font-weight: 500;
  white-space: nowrap;
}

.menu-list {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.menu-item {
  padding: 24rpx 28rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-left {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  column-gap: 20rpx;
}

.menu-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  background: #f1f4f8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.menu-icon {
  display: block;
  width: 36rpx;
  height: 36rpx;
  margin: 0 auto;
}

.menu-texts {
  flex: 1;
  min-width: 0;
}

.menu-title {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
  font-weight: 500;
}

.menu-subtitle {
  display: block;
  margin-top: 4rpx;
  font-size: 22rpx;
  line-height: 32rpx;
  color: #6b7280;
}

.menu-arrow {
  display: block;
  width: 28rpx;
  height: 28rpx;
  margin-left: 16rpx;
  margin-right: 0;
  flex-shrink: 0;
}
</style>
