<script setup>
const honors = [
  {
    title: "国家级科技企业孵化器",
    dept: "科技部",
    date: "2022-10",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/7935f58e-bf88-448f-b06f-bdc8a2849732.png",
  },
  {
    title: "中国生物医药园区竞争力前三",
    dept: "中国生物技术发展中心",
    date: "2023-05",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/808f0863-1f37-4af3-8045-e13ecb953191.png",
  },
  {
    title: "上海市品牌园区",
    dept: "上海市经信委",
    date: "2021-08",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/654d7e2c-f7fa-41e4-9c0f-da5a0b2661c8.png",
  },
  {
    title: "数字化转型示范园区",
    dept: "浦东新区政府",
    date: "2023-11",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/f9944686-8215-4b21-a676-713ac6a7ca4f.png",
  },
  {
    title: "绿色低碳示范园区",
    dept: "环境部",
    date: "2022-03",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/ca00758a-718a-41f2-9112-df901e15ed19.png",
  },
];
</script>

<template>
  <view class="honors-wrap">
    <text class="honors-title">园区荣誉</text>

    <view class="honors-carousel">
      <scroll-view scroll-x class="honors-scroll" show-scrollbar="false" enhanced>
        <view class="honors-row">
          <view v-for="(item, index) in honors" :key="`honor-${index}`" class="honor-col">
            <view class="honor-card">
              <view class="honor-image-box">
                <image class="honor-image" :src="item.image" mode="aspectFill" />
              </view>
              <view class="honor-content">
                <text class="honor-name">{{ item.title }}</text>
                <view class="honor-meta">
                  <text class="honor-dept">{{ item.dept }}</text>
                  <text class="honor-date">{{ item.date }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style scoped>
.honors-wrap {
  margin-top: 24rpx;
  padding: 0 32rpx 40rpx;
  box-sizing: border-box;
}

.honors-title {
  display: block;
  font-size: 36rpx;
  line-height: 1.4;
  font-weight: 600;
  color: #111827;
}

.honors-carousel {
  margin-top: 24rpx;
  width: 100%;
}

.honors-scroll {
  width: 100%;
  white-space: nowrap;
}

.honors-row {
  display: flex;
  margin-left: -24rpx;
}

.honor-col {
  min-width: 85%;
  flex: 0 0 85%;
  padding-left: 24rpx;
  box-sizing: border-box;
}

.honor-card {
  border-radius: 16rpx;
  overflow: hidden;
  background: rgba(241, 245, 249, 0.3);
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
}

.honor-image-box {
  width: 100%;
  height: 340rpx;
  overflow: hidden;
}

.honor-image {
  width: 100%;
  height: 100%;
}

.honor-content {
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  row-gap: 8rpx;
}

.honor-name {
  font-size: 28rpx;
  line-height: 1.35;
  font-weight: 700;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.honor-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 22rpx;
  line-height: 1.3;
  color: #6c7480;
  column-gap: 16rpx;
}

.honor-dept {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.honor-date {
  flex-shrink: 0;
}
</style>
