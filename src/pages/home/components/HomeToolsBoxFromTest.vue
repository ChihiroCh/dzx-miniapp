<script setup>
const tools = [
  { name: "发布项目", icon: "/static/icons/home-tools/square-plus.png" },
  { name: "委托选址", icon: "/static/icons/home-tools/map-pin.png" },
  { name: "租金计算器", icon: "/static/icons/home-tools/calculator.png" },
  { name: "厂房需求卡", icon: "/static/icons/home-tools/credit-card.png" },
  { name: "增值服务", icon: "/static/icons/home-tools/briefcase.png" },
  { name: "选址指南", icon: "/static/icons/home-tools/compass.png" },
  { name: "厂房百科", icon: "/static/icons/home-tools/book-open.png" },
  { name: "文档下载", icon: "/static/icons/home-tools/download.png" },
];

const onToolTap = (item) => {
  if (item.name === "发布项目") {
    uni.navigateTo({
      url: "/package-invest/pages/project-entrust/index",
    });
    return;
  }

  uni.showToast({
    title: `${item.name} 开发中`,
    icon: "none",
  });
};
</script>

<template>
  <view class="tools-section">
    <view class="tools-wrap">
      <text class="tools-title">厂房百宝箱</text>
      <view class="tools-grid">
        <view
          v-for="item in tools"
          :key="item.name"
          class="tool-item"
          hover-class="tool-item-active"
          hover-stay-time="90"
          @tap="onToolTap(item)"
        >
          <view class="tool-card">
            <view class="tool-card-content">
              <view class="tool-icon-wrap">
                <image class="tool-icon" :src="item.icon" mode="aspectFit" />
              </view>
              <text class="tool-name">{{ item.name }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.tools-section {
  padding: 48rpx 32rpx;
}

.tools-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.tools-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.35;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24rpx;
}

.tool-item {
  min-height: 0;
  transition: transform 0.2s ease;
}

.tool-item-active {
  transform: scale(1.04);
}

.tool-card {
  height: 100%;
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.08);
}

.tool-card-content {
  height: 100%;
  padding: 32rpx 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 16rpx;
  box-sizing: border-box;
}

.tool-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  background: rgba(0, 51, 103, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.tool-icon {
  width: 40rpx;
  height: 40rpx;
  display: block;
  margin: 0 auto;
  object-fit: contain;
  object-position: center center;
}

.tool-name {
  font-size: 24rpx;
  font-weight: 500;
  color: #0f172a;
  text-align: center;
  line-height: 1.25;
}
</style>
