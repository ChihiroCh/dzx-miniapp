<script setup>
import { computed, ref } from "vue";

const messages = ref([
  {
    id: "m1",
    role: "assistant",
    type: "text",
    text: "【温馨提示】Hi，我是厂房租赁帮手，大招象。我们只和政府园区合作...继续使用表示您同意《用户协议》等。",
  },
  {
    id: "m2",
    role: "user",
    type: "text",
    text: "我想在上海找一个适合做化妆品研发的厂房，面积800平左右。",
  },
  {
    id: "m3",
    role: "assistant",
    type: "text",
    text: "为您搜索到相关化妆品产业园区，推荐以下房源：",
  },
  {
    id: "m4",
    role: "assistant",
    type: "factory",
    card: {
      name: "东方美谷·美妆研发中心 - 2号楼",
      location: "奉贤区金海公路",
      image:
        "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/0922814d-15c5-4670-b83f-fe74a17057fd.png",
      price: "¥38/㎡/月",
      stats: [
        { label: "面积", value: "850㎡" },
        { label: "层高", value: "4.5m" },
        { label: "配电", value: "150KVA" },
      ],
      industries: ["化妆品", "生物医药"],
      advantages: ["10万级洁净间"],
    },
  },
  {
    id: "m5",
    role: "user",
    type: "text",
    text: "这个园区的政策支持怎么样？周边配套设施齐全吗？",
  },
  {
    id: "m6",
    role: "assistant",
    type: "text",
    text: "【政策支持】东方美谷针对化妆品企业有专项扶持： 1. 租金补贴：高新企业最高可获50%租金减免。 2. 研发奖励：对新落户的研发中心给予最高200万元一次性奖励。 3. 税收优惠：符合条件的总部企业可享受“三免三减半”政策。",
  },
  {
    id: "m7",
    role: "assistant",
    type: "text",
    text: "【周边配套】该园区配有： 1. 硬件设施：统一的集中污水处理系统，支持专业环评报批。 2. 生活配套：园区内即有“美谷领寓”人才公寓，步行5分钟可达。 3. 商业：配套5000平米综合商业街，含员工餐厅、健身房及咖啡厅。",
  },
]);

const quickQuestionGroups = [
  ["美妆产业有哪些政策支持？", "1000平研发厂房有吗？", "附近有哪些新能源厂房？"],
  ["800平左右的高标厂房推荐", "支持环评报批的园区有哪些？", "租金减免政策如何申请？"],
  ["有洁净车间的厂房吗？", "离地铁近的园区有哪些？", "配电150KVA以上的房源推荐"],
];

const quickGroupIndex = ref(0);
const quickQuestions = computed(() => quickQuestionGroups[quickGroupIndex.value]);

const rotateQuickQuestions = () => {
  quickGroupIndex.value = (quickGroupIndex.value + 1) % quickQuestionGroups.length;
};

const chatInput = ref("");

const askQuickQuestion = (question) => {
  messages.value.push({
    id: `u-${Date.now()}`,
    role: "user",
    type: "text",
    text: question,
  });
};

const openFactoryDetail = () => {
  uni.navigateTo({
    url: "/package-invest/pages/factory-detail/index",
  });
};

const onTapVoice = () => {
  uni.showToast({
    title: "语音输入开发中",
    icon: "none",
  });
};

const onTapMore = () => {
  uni.showToast({
    title: "更多功能开发中",
    icon: "none",
  });
};

const onTapSend = () => {
  const text = chatInput.value.trim();
  if (!text) {
    return;
  }
  askQuickQuestion(text);
  chatInput.value = "";
};
</script>

<template>
  <view class="ai-chat-page">
    <view class="chat-main">
      <scroll-view class="chat-scroll" scroll-y>
        <view class="chat-list">
          <view
            v-for="item in messages"
            :key="item.id"
            class="msg-row"
            :class="item.role === 'user' ? 'msg-row-user' : 'msg-row-assistant'"
          >
            <view v-if="item.role === 'assistant'" class="assistant-wrap">
              <view class="assistant-avatar">
                <text class="assistant-avatar-text">🐘</text>
              </view>
              <view class="assistant-content">
                <view v-if="item.type === 'text'" class="assistant-bubble">
                  <text class="assistant-text">{{ item.text }}</text>
                </view>

                <view v-if="item.type === 'factory'" class="factory-card">
                  <view class="factory-image-wrap">
                    <image class="factory-image" :src="item.card.image" mode="aspectFill" />
                    <view class="factory-price-badge">
                      <text class="factory-price-text">{{ item.card.price }}</text>
                    </view>
                  </view>

                  <view class="factory-body">
                    <view class="factory-head">
                      <text class="factory-title">{{ item.card.name }}</text>
                      <text class="factory-location">{{ item.card.location }}</text>
                    </view>

                    <view class="factory-stats-grid">
                      <view v-for="stat in item.card.stats" :key="stat.label" class="factory-stat-item">
                        <text class="factory-stat-label">{{ stat.label }}</text>
                        <text class="factory-stat-value">{{ stat.value }}</text>
                      </view>
                    </view>

                    <view class="factory-tag-row">
                      <text v-for="tag in item.card.industries" :key="tag" class="factory-tag factory-tag-accent">{{ tag }}</text>
                    </view>

                    <view class="factory-tag-row">
                      <text v-for="tag in item.card.advantages" :key="tag" class="factory-tag factory-tag-primary">{{ tag }}</text>
                    </view>

                    <view class="factory-detail-btn" @tap="openFactoryDetail">
                      <text class="factory-detail-btn-text">查看详情</text>
                    </view>
                  </view>
                </view>
              </view>
            </view>

            <view v-else class="user-bubble">
              <text class="user-text">{{ item.text }}</text>
            </view>
          </view>
        </view>
      </scroll-view>

      <view class="quick-panel">
        <view class="quick-head">
          <text class="quick-title">猜你想问</text>
          <view class="quick-refresh" @tap="rotateQuickQuestions">
            <image class="quick-refresh-icon" :src="'/package-invest/static/icons/ai-chat/rotate-cw.png'" mode="aspectFit" />
            <text class="quick-refresh-text">换一批</text>
          </view>
        </view>

        <scroll-view class="quick-scroll" scroll-x :show-scrollbar="false" enhanced>
          <view class="quick-row">
            <view
              v-for="question in quickQuestions"
              :key="question"
              class="quick-chip"
              @tap="askQuickQuestion(question)"
            >
              <text class="quick-chip-text">{{ question }}</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <view class="chat-input-panel">
        <view class="chat-input-row">
          <view class="icon-btn icon-btn-plain" @tap="onTapVoice">
            <image class="icon-btn-image" :src="'/package-invest/static/icons/ai-chat/mic.png'" mode="aspectFit" />
          </view>
          <input
            class="chat-text-input"
            v-model="chatInput"
            placeholder="找厂房直接问我"
            placeholder-class="chat-text-input-placeholder"
            confirm-type="send"
            @confirm="onTapSend"
          />
          <view
            class="icon-btn icon-btn-send"
            :class="{ 'icon-btn-send-disabled': !chatInput.trim() }"
            @tap="onTapSend"
          >
            <image class="icon-btn-image" :src="'/package-invest/static/icons/ai-chat/send.png'" mode="aspectFit" />
          </view>
          <view class="icon-btn icon-btn-plain" @tap="onTapMore">
            <image class="icon-btn-image" :src="'/package-invest/static/icons/ai-chat/plus.png'" mode="aspectFit" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.ai-chat-page {
  min-height: 100vh;
  background: #ffffff;
}

.chat-main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: calc(128rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.chat-scroll {
  flex: 1;
  min-height: 0;
}

.chat-list {
  padding: 32rpx 32rpx 16rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
  opacity: 1;
}

.msg-row {
  display: flex;
}

.msg-row-assistant {
  justify-content: flex-start;
}

.msg-row-user {
  justify-content: flex-end;
}

.assistant-wrap {
  display: flex;
  gap: 16rpx;
  max-width: 560rpx;
}

.assistant-avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 999rpx;
  background: rgba(0, 51, 103, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.assistant-avatar-text {
  font-size: 34rpx;
  line-height: 1;
}

.assistant-content {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
  min-width: 0;
}

.assistant-bubble {
  background: #f1f5f9;
  border-radius: 16rpx;
  padding: 16rpx 24rpx;
}

.assistant-text {
  font-size: 24rpx;
  line-height: 1.6;
  color: #111827;
}

.user-bubble {
  max-width: 560rpx;
  background: #003367;
  border-radius: 16rpx;
  padding: 16rpx 24rpx;
}

.user-text {
  font-size: 24rpx;
  line-height: 1.6;
  color: #ffffff;
}

.factory-card {
  width: 100%;
  border-radius: 16rpx;
  border: 2rpx solid #e5e7eb;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 6rpx 16rpx rgba(15, 23, 42, 0.08);
}

.factory-image-wrap {
  position: relative;
  width: 100%;
  height: 320rpx;
  background: #f1f5f9;
  overflow: hidden;
}

.factory-image {
  width: 100%;
  height: 100%;
}

.factory-price-badge {
  position: absolute;
  top: 16rpx;
  right: 16rpx;
  height: 44rpx;
  border-radius: 10rpx;
  background: #003367;
  padding: 0 16rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.factory-price-text {
  font-size: 20rpx;
  line-height: 1;
  color: #ffffff;
  font-weight: 600;
}

.factory-body {
  padding: 24rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;
}

.factory-head {
  display: flex;
  flex-direction: column;
  row-gap: 8rpx;
}

.factory-title {
  font-size: 26rpx;
  line-height: 1.4;
  color: #111827;
  font-weight: 600;
}

.factory-location {
  font-size: 22rpx;
  line-height: 1.4;
  color: #6b7280;
}

.factory-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12rpx;
}

.factory-stat-item {
  background: #f1f5f9;
  border-radius: 10rpx;
  padding: 12rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 6rpx;
  align-items: center;
  justify-content: center;
}

.factory-stat-label {
  font-size: 20rpx;
  line-height: 1.2;
  color: #6b7280;
}

.factory-stat-value {
  font-size: 24rpx;
  line-height: 1.2;
  color: #111827;
  font-weight: 600;
}

.factory-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}

.factory-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8rpx 12rpx;
  border-radius: 10rpx;
  font-size: 20rpx;
  line-height: 1;
}

.factory-tag-accent {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  font-weight: 500;
}

.factory-tag-primary {
  background: rgba(0, 51, 103, 0.1);
  color: #003367;
}

.factory-detail-btn {
  width: 100%;
  height: 80rpx;
  border-radius: 12rpx;
  background: #003367;
  display: flex;
  align-items: center;
  justify-content: center;
}

.factory-detail-btn-text {
  font-size: 26rpx;
  line-height: 1;
  color: #ffffff;
  font-weight: 500;
}

.quick-panel {
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 24rpx 32rpx;
  box-sizing: border-box;
}

.quick-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16rpx;
}

.quick-title {
  font-size: 22rpx;
  line-height: 1.2;
  color: #6b7280;
  font-weight: 500;
}

.quick-refresh {
  height: 56rpx;
  border-radius: 12rpx;
  padding: 0 16rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
}

.quick-refresh-icon {
  width: 24rpx;
  height: 24rpx;
}

.quick-refresh-text {
  font-size: 22rpx;
  line-height: 1;
  color: #6b7280;
}

.quick-scroll {
  width: 100%;
}

.quick-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding-bottom: 4rpx;
}

.quick-chip {
  flex-shrink: 0;
  padding: 12rpx 24rpx;
  border-radius: 999rpx;
  border: 1px solid #e5e7eb;
  background: rgba(241, 245, 249, 0.7);
}

.quick-chip-text {
  white-space: nowrap;
  font-size: 22rpx;
  line-height: 1.2;
  color: #111827;
}

.chat-input-panel {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 24rpx 32rpx calc(24rpx + env(safe-area-inset-bottom));
  margin-bottom: 0;
  box-sizing: border-box;
  box-shadow: 0 -6rpx 20rpx rgba(15, 23, 42, 0.06);
}

.chat-input-row {
  display: flex;
  align-items: flex-end;
  gap: 16rpx;
}

.icon-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 12rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-btn-plain {
  background: transparent;
}

.icon-btn-send {
  background: #003367;
}

.icon-btn-send-disabled {
  opacity: 0.5;
}

.icon-btn-image {
  width: 40rpx;
  height: 40rpx;
}

.chat-text-input {
  flex: 1;
  height: 80rpx;
  border-radius: 12rpx;
  border: 1px solid #d1d5db;
  background: #ffffff;
  padding: 0 24rpx;
  box-sizing: border-box;
  font-size: 24rpx;
  color: #111827;
}

.chat-text-input-placeholder {
  color: #9ca3af;
}
</style>
