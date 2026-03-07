<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const articleMap = {
  "1": {
    id: "1",
    title: "什么是工业厂房的“丙类”与“丁类”？",
    category: "标准规范",
    views: "2500次阅读",
    date: "2026/02/10",
    summary: "详细讲解消防等级划分对企业入驻与报捕的影响。",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/f2a1a25b-e213-4e4b-b323-fe7108a0233e.png",
    content: "消防等级决定了能够入驻的企业类型。丙类厂房适合大多数化妆品及电子生产...",
  },
  "2": {
    id: "2",
    title: "厂房承重1.5t/㎡意味着什么？",
    category: "参数知识",
    views: "1890次阅读",
    date: "2026/01/20",
    summary: "解读地面承重参数对重型设备摆放的重要性。",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/c63d4ed1-e4d8-4e6f-aa43-752ed4ce6219.png",
    content: "厂房承重参数决定了地面可承载设备的上限。若需要放置冲压机、注塑机等重型设备，应重点核实承重数据...",
  },
};

const article = ref(articleMap["1"]);

onLoad((query) => {
  const id = String(query?.id || "1");
  article.value = articleMap[id] || articleMap["1"];
});

const onFavorite = () => {
  uni.showToast({
    title: "已加入收藏",
    icon: "none",
  });
};

const onShare = () => {
  uni.showToast({
    title: "分享功能开发中",
    icon: "none",
  });
};
</script>

<template>
  <view class="wiki-detail-page">
    <view class="wiki-detail-content">
      <view class="card card-header">
        <view class="header-main">
          <text class="article-title">{{ article.title }}</text>
          <view class="meta-row">
            <view class="meta-left">
              <view class="meta-item">
                <image class="meta-icon" src="../../static/icons/factory-wiki-detail/eye-muted.png" mode="aspectFit" />
                <text class="meta-text">{{ article.views }}</text>
              </view>
              <view class="meta-item">
                <image class="meta-icon" src="../../static/icons/factory-wiki-detail/calendar-muted.png" mode="aspectFit" />
                <text class="meta-text">{{ article.date }}</text>
              </view>
            </view>
            <view class="meta-tag">
              <text class="meta-tag-text">{{ article.category }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="card card-brief">
        <text class="brief-text">{{ article.summary }}</text>
      </view>

      <view class="hero-image-wrap">
        <image class="hero-image" :src="article.image" mode="aspectFill" />
      </view>

      <view class="card card-content">
        <text class="article-content-text">{{ article.content }}</text>
      </view>

      <view class="action-row">
        <view class="action-btn" hover-class="action-btn-hover" @tap="onFavorite">
          <image class="action-icon" src="../../static/icons/factory-wiki-detail/heart-muted.png" mode="aspectFit" />
          <text class="action-text">收藏</text>
        </view>
        <view class="action-btn" hover-class="action-btn-hover" @tap="onShare">
          <image class="action-icon" src="../../static/icons/factory-wiki-detail/share-2-muted.png" mode="aspectFit" />
          <text class="action-text">分享</text>
        </view>
      </view>

      <view class="card card-tip">
        <view class="tip-row">
          <image class="tip-icon" src="../../static/icons/factory-wiki-detail/lightbulb-accent.png" mode="aspectFit" />
          <text class="tip-text">如果您对其他厂房知识感兴趣，可以返回百科首页继续浏览或搜索相关内容。</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.wiki-detail-page {
  min-height: 100vh;
  background: #ffffff;
}

.wiki-detail-content {
  padding: 48rpx 32rpx 120rpx;
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.card {
  border-radius: 20rpx;
  background: #ffffff;
  box-shadow: 0 6rpx 20rpx rgba(15, 23, 42, 0.08);
}

.card-header {
  padding: 32rpx 32rpx 24rpx;
}

.header-main {
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.article-title {
  font-size: 40rpx;
  line-height: 1.35;
  color: #0f172a;
  font-weight: 700;
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 16rpx;
}

.meta-left {
  display: flex;
  align-items: center;
  column-gap: 24rpx;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  column-gap: 8rpx;
}

.meta-icon {
  width: 24rpx;
  height: 24rpx;
}

.meta-text {
  font-size: 22rpx;
  line-height: 1.3;
  color: #64748b;
}

.meta-tag {
  padding: 8rpx 16rpx;
  border-radius: 8rpx;
  background: #f1f5f9;
  flex-shrink: 0;
}

.meta-tag-text {
  font-size: 20rpx;
  line-height: 1.3;
  color: #64748b;
  font-weight: 500;
}

.card-brief {
  padding: 24rpx 32rpx;
}

.brief-text {
  font-size: 26rpx;
  line-height: 1.7;
  color: #64748b;
}

.hero-image-wrap {
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 6rpx 20rpx rgba(15, 23, 42, 0.08);
}

.hero-image {
  width: 100%;
  height: 384rpx;
}

.card-content {
  padding: 32rpx;
}

.article-content-text {
  font-size: 28rpx;
  line-height: 1.8;
  color: #0f172a;
}

.action-row {
  display: flex;
  align-items: center;
  column-gap: 16rpx;
  padding-top: 8rpx;
}

.action-btn {
  height: 72rpx;
  border-radius: 12rpx;
  border: 2rpx solid #dbe3ef;
  background: #ffffff;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10rpx;
}

.action-btn-hover {
  background: #f8fafc;
}

.action-icon {
  width: 32rpx;
  height: 32rpx;
}

.action-text {
  font-size: 26rpx;
  line-height: 1.35;
  color: #334155;
}

.card-tip {
  padding: 24rpx 32rpx;
  background: rgba(241, 245, 249, 0.8);
}

.tip-row {
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
}

.tip-icon {
  width: 28rpx;
  height: 28rpx;
  margin-top: 4rpx;
  flex-shrink: 0;
}

.tip-text {
  font-size: 22rpx;
  line-height: 1.6;
  color: #64748b;
}
</style>
