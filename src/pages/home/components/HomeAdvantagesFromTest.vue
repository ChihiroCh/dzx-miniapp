<script setup>
const advantages = [
  {
    title: "真实房源",
    desc: "所有厂房信息均来自政府备案园区，官方认证。",
    icon: "/static/icons/home-advantages/shield-check.png",
  },
  {
    title: "AI智能匹配",
    desc: "AI大模型深度分析需求，精准推荐产业生态环境。",
    icon: "/static/icons/home-advantages/cpu.png",
  },
  {
    title: "直连园区",
    desc: "去除中介，直接与园区招商负责人沟通。",
    icon: "/static/icons/home-advantages/zap.png",
  },
  {
    title: "全程顾问",
    desc: "1对1专属顾问，提供从选房到政策申报的支持。",
    icon: "/static/icons/home-advantages/user-check.png",
  },
];
</script>

<template>
  <view class="advantages-section">
    <view class="advantages-wrap">
      <text class="advantages-title">我们的核心优势</text>

      <view class="advantages-grid">
        <view v-for="item in advantages" :key="item.title" class="advantages-card">
          <view class="advantages-card-content">
            <view class="advantages-head">
              <view class="advantages-icon-wrap">
                <image class="advantages-icon" :src="item.icon" mode="aspectFit" />
              </view>
              <text class="advantages-item-title">{{ item.title }}</text>
            </view>
            <text class="advantages-desc">{{ item.desc }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.advantages-section {
  padding: 48rpx 32rpx;
}

.advantages-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.advantages-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.35;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24rpx;
}

.advantages-card {
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.08);
  min-height: 0;
}

.advantages-card-content {
  padding: 24rpx;
  box-sizing: border-box;
}

.advantages-head {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 16rpx;
}

.advantages-icon-wrap {
  width: 72rpx;
  height: 72rpx;
  border-radius: 16rpx;
  background: rgba(245, 158, 11, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.advantages-icon {
  width: 36rpx;
  height: 36rpx;
  display: block;
  object-fit: contain;
  object-position: center center;
}

.advantages-item-title {
  font-size: 28rpx;
  line-height: 1.25;
  font-weight: 600;
  color: #0f172a;
}

.advantages-desc {
  font-size: 22rpx;
  line-height: 1.45;
  color: #64748b;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
