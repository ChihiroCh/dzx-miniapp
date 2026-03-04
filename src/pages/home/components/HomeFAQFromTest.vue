<script setup>
import { ref } from "vue";

const faqs = ref([
  {
    question: "什么是AI智能匹配？",
    answer: "我们的AI大脑会根据您的产业类型、面积要求及预算，自动扫描全国3000+园区政策，为您匹配最优性价比的方案。",
  },
  {
    question: "如何确保房源真实？",
    answer: "所有房源均来自政府备案园区和园区招商方直连，平台进行资质核验与动态巡检，确保信息真实有效。",
  },
  {
    question: "直接联系园区有什么好处？",
    answer: "直接对接园区招商负责人，减少中间沟通环节，响应更快、信息更透明、价格与政策细节更准确。",
  },
]);

const openIndex = ref(0);

const toggleItem = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index;
};

const refreshFaq = () => {
  if (!faqs.value.length) {
    return;
  }
  const first = faqs.value.shift();
  if (first) {
    faqs.value.push(first);
  }
  openIndex.value = 0;
};
</script>

<template>
  <view class="faq-section">
    <view class="faq-wrap">
      <view class="faq-head">
        <text class="faq-title">您可能关心的问题</text>
        <button class="faq-refresh-btn" @tap="refreshFaq">
          <image class="faq-refresh-icon" src="/static/icons/home-faq/rotate-cw.png" mode="aspectFit" />
          <text class="faq-refresh-text">换一批</text>
        </button>
      </view>

      <view class="faq-list">
        <view v-for="(item, index) in faqs" :key="item.question" class="faq-item" :class="{ 'faq-item-open': openIndex === index }">
          <button class="faq-trigger" @tap="toggleItem(index)">
            <text class="faq-question">{{ item.question }}</text>
            <image
              class="faq-chevron"
              :class="{ 'faq-chevron-open': openIndex === index }"
              src="/static/icons/home-faq/chevron-down.png"
              mode="aspectFit"
            />
          </button>

          <view class="faq-content-wrap" :class="{ 'faq-content-wrap-open': openIndex === index && item.answer }">
            <view class="faq-content">
              <text class="faq-answer">{{ item.answer }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.faq-section {
  padding: 48rpx 32rpx;
}

.faq-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.faq-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.faq-title {
  color: #0f172a;
  font-size: 36rpx;
  font-weight: 600;
  line-height: 1.35;
}

.faq-refresh-btn {
  height: 64rpx;
  padding: 0 24rpx;
  border: 0;
  border-radius: 12rpx;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
}

.faq-refresh-btn::after {
  border: 0;
}

.faq-refresh-icon {
  width: 28rpx;
  height: 28rpx;
  margin-right: 8rpx;
}

.faq-refresh-text {
  font-size: 24rpx;
  line-height: 1;
}

.faq-list {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.faq-item {
  border-radius: 16rpx;
  border: 2rpx solid rgba(148, 163, 184, 0.35);
  background: #ffffff;
  padding: 0 32rpx;
  transition: background-color 0.25s ease;
}

.faq-item-open {
  background: rgba(241, 245, 249, 0.6);
}

.faq-trigger {
  width: 100%;
  min-height: 88rpx;
  padding: 24rpx 0;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.faq-trigger::after {
  border: 0;
}

.faq-question {
  flex: 1;
  text-align: left;
  color: #0f172a;
  font-size: 28rpx;
  font-weight: 500;
  line-height: 1.35;
}

.faq-chevron {
  width: 32rpx;
  height: 32rpx;
  margin-left: 16rpx;
  transition: transform 0.32s ease;
}

.faq-chevron-open {
  transform: rotate(180deg);
}

.faq-content-wrap {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, opacity 0.28s ease;
}

.faq-content-wrap-open {
  max-height: 240rpx;
  opacity: 1;
}

.faq-content {
  padding-bottom: 24rpx;
  transform: translateY(-8rpx);
  transition: transform 0.35s ease;
}

.faq-content-wrap-open .faq-content {
  transform: translateY(0);
}

.faq-answer {
  display: block;
  color: #64748b;
  font-size: 24rpx;
  line-height: 1.45;
}
</style>
