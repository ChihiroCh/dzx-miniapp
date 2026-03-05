<script setup>
const parkList = [
  {
    id: "park-1",
    name: "张江科学城",
    status: "咨询中",
    statusType: "blue",
    subtitle: "生物医药产业集聚区",
    companies: "1200家",
    lastContact: "今天 14:30",
    contactPerson: "陈经理",
    image:
      "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/786dfee5-022b-4ccb-973b-aca9a39da113.png",
    phone: "4000000000",
  },
  {
    id: "park-2",
    name: "东方美谷",
    status: "洽谈中",
    statusType: "orange",
    subtitle: "中国化妆品产业之都",
    companies: "580家",
    lastContact: "昨天 10:15",
    contactPerson: "王女士",
    image:
      "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/344dd861-ca1a-4892-a037-51d8af9dc648.png",
    phone: "4000000000",
  },
  {
    id: "park-3",
    name: "临港新片区",
    status: "待回复",
    statusType: "gray",
    subtitle: "新能源产业基地",
    companies: "450家",
    lastContact: "3天前",
    contactPerson: "李总",
    image:
      "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/6d0ee688-e509-4a27-bbf5-c94a606fba71.png",
    phone: "4000000000",
  },
  {
    id: "park-4",
    name: "漕河泾开发区",
    status: "咨询中",
    statusType: "blue",
    subtitle: "集成电路产业园",
    companies: "320家",
    lastContact: "5天前",
    contactPerson: "张经理",
    image:
      "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/499e044e-5844-4894-a16e-9117b9a66713.png",
    phone: "4000000000",
  },
];

const statusClassMap = {
  blue: "status-pill status-blue",
  orange: "status-pill status-orange",
  gray: "status-pill status-gray",
};

const openParkDetail = (park) => {
  const params = [`name=${encodeURIComponent(park.name)}`];
  uni.navigateTo({
    url: `/package-invest/pages/park-detail/index?${params.join("&")}`,
  });
};

const openAiConsult = (park) => {
  const params = [`parkName=${encodeURIComponent(park.name)}`];
  uni.navigateTo({
    url: `/package-invest/pages/ai-chat/index?${params.join("&")}`,
  });
};

const callPark = (park) => {
  uni.makePhoneCall({
    phoneNumber: park.phone || "4000000000",
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
  <view class="chatting-parks-page">
    <view class="list-wrap">
      <view v-for="park in parkList" :key="park.id" class="park-card">
        <view class="park-head">
          <image class="park-cover" :src="park.image" mode="aspectFill" />

          <view class="park-main">
            <view class="park-title-row">
              <text class="park-name">{{ park.name }}</text>
              <text :class="statusClassMap[park.statusType] || statusClassMap.blue">{{ park.status }}</text>
            </view>

            <text class="park-subtitle">{{ park.subtitle }}</text>
            <text class="park-company">入驻企业: {{ park.companies }}</text>
          </view>
        </view>

        <view class="meta-box">
          <view class="meta-row">
            <text class="meta-label">最后沟通:</text>
            <text class="meta-value">{{ park.lastContact }}</text>
          </view>
          <view class="meta-row">
            <text class="meta-label">联系人:</text>
            <text class="meta-value">{{ park.contactPerson }}</text>
          </view>
        </view>

        <view class="action-grid">
          <button class="action-btn" @tap="openParkDetail(park)">
            <image class="action-icon" :src="'/package-mine/static/icons/chatting-parks/eye-muted.png'" mode="aspectFit" />
            <text class="action-text">园区详情</text>
          </button>
          <button class="action-btn" @tap="openAiConsult(park)">
            <image
              class="action-icon"
              :src="'/package-mine/static/icons/chatting-parks/message-circle-muted.png'"
              mode="aspectFit"
            />
            <text class="action-text">AI咨询</text>
          </button>
          <button class="action-btn" @tap="callPark(park)">
            <image class="action-icon" :src="'/package-mine/static/icons/chatting-parks/phone-muted.png'" mode="aspectFit" />
            <text class="action-text">联系</text>
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.chatting-parks-page {
  min-height: 100vh;
  background: #f8fafc;
}

.list-wrap {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
  box-sizing: border-box;
}

.park-card {
  border: 2rpx solid #e5e7eb;
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.06);
  padding: 32rpx;
}

.park-head {
  display: flex;
  align-items: flex-start;
  column-gap: 24rpx;
}

.park-cover {
  width: 128rpx;
  height: 128rpx;
  border-radius: 12rpx;
  flex-shrink: 0;
  background: #f1f5f9;
}

.park-main {
  flex: 1;
  min-width: 0;
}

.park-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 12rpx;
  margin-bottom: 6rpx;
}

.park-name {
  flex: 1;
  min-width: 0;
  font-size: 30rpx;
  line-height: 42rpx;
  font-weight: 600;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-pill {
  flex-shrink: 0;
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  border: 2rpx solid;
  font-size: 20rpx;
  line-height: 28rpx;
  font-weight: 500;
}

.status-blue {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
}

.status-orange {
  background: #fff7ed;
  color: #c2410c;
  border-color: #fed7aa;
}

.status-gray {
  background: #f9fafb;
  color: #374151;
  border-color: #e5e7eb;
}

.park-subtitle {
  display: block;
  font-size: 22rpx;
  line-height: 32rpx;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.park-company {
  display: block;
  margin-top: 4rpx;
  font-size: 22rpx;
  line-height: 32rpx;
  color: #6b7280;
}

.meta-box {
  margin-top: 20rpx;
  background: #f8fafc;
  border-radius: 12rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  row-gap: 10rpx;
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.meta-label {
  font-size: 22rpx;
  line-height: 30rpx;
  color: #6b7280;
}

.meta-value {
  font-size: 22rpx;
  line-height: 30rpx;
  color: #111827;
  font-weight: 500;
}

.action-grid {
  margin-top: 20rpx;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 12rpx;
}

.action-btn {
  margin: 0;
  padding: 0 10rpx;
  height: 72rpx;
  border-radius: 12rpx;
  border: 2rpx solid #d1d5db;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8rpx;
  line-height: 1;
  box-sizing: border-box;
}

.action-btn::after {
  border: 0;
}

.action-icon {
  display: block;
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
}

.action-text {
  display: block;
  font-size: 22rpx;
  line-height: 24rpx;
  color: #374151;
  font-weight: 500;
  white-space: nowrap;
}
</style>
