<script setup>
import { computed, ref } from "vue";
import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";

const calcMode = ref("monthly");

const area = ref(1000);
const monthlyPrice = ref(45.5);
const months = ref(12);

const dailyPrice = ref(1.6);
const days = ref(30);

const includeFitout = ref(false);
const fitoutPrice = ref(200);

const fitoutBreakdownConfig = [
  { label: "地坪处理", ratio: 0.3 },
  { label: "墙面装修", ratio: 0.2 },
  { label: "照明系统", ratio: 0.2 },
  { label: "消防设施", ratio: 0.15 },
  { label: "其他", ratio: 0.15 },
];

const safeNumber = (value, fallback = 0) => {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return fallback;
  }
  return num;
};

const rentCost = computed(() => {
  const validArea = Math.max(0, safeNumber(area.value));
  if (calcMode.value === "daily") {
    return validArea * Math.max(0, safeNumber(dailyPrice.value)) * Math.max(0, safeNumber(days.value));
  }
  return validArea * Math.max(0, safeNumber(monthlyPrice.value)) * Math.max(0, safeNumber(months.value));
});

const fitoutCost = computed(() => {
  if (!includeFitout.value) {
    return 0;
  }
  return Math.max(0, safeNumber(area.value)) * Math.max(0, safeNumber(fitoutPrice.value));
});

const totalCost = computed(() => rentCost.value + fitoutCost.value);

const fitoutBreakdownItems = computed(() => {
  const total = Math.max(0, Math.round(safeNumber(fitoutCost.value)));
  if (total === 0) {
    return fitoutBreakdownConfig.map((item) => ({ label: item.label, amount: 0 }));
  }

  let used = 0;
  return fitoutBreakdownConfig.map((item, index) => {
    if (index === fitoutBreakdownConfig.length - 1) {
      return {
        label: item.label,
        amount: Math.max(0, total - used),
      };
    }
    const amount = Math.max(0, Math.round(total * item.ratio));
    used += amount;
    return {
      label: item.label,
      amount,
    };
  });
});

const avgCostText = computed(() => {
  if (calcMode.value === "daily") {
    const value = Math.max(0, safeNumber(days.value));
    if (value === 0) {
      return "¥0";
    }
    return formatCurrency(totalCost.value / value, false);
  }
  const value = Math.max(0, safeNumber(months.value));
  if (value === 0) {
    return "¥0";
  }
  return formatCurrency(totalCost.value / value, false);
});

const rentTitle = computed(() => {
  if (calcMode.value === "daily") {
    return `${Math.max(0, safeNumber(days.value))}天租金`;
  }
  return `${Math.max(0, safeNumber(months.value))}个月租金`;
});

const avgTitle = computed(() => (calcMode.value === "daily" ? "平均日租" : "平均月租"));

const formatCurrency = (value, withDecimals = false) => {
  const num = Math.max(0, safeNumber(value));
  return `¥${num.toLocaleString("zh-CN", {
    minimumFractionDigits: withDecimals ? 2 : 0,
    maximumFractionDigits: withDecimals ? 2 : 0,
  })}`;
};

const switchMode = (mode) => {
  calcMode.value = mode;
};

const resetForm = () => {
  calcMode.value = "monthly";
  area.value = 1000;
  monthlyPrice.value = 45.5;
  months.value = 12;
  dailyPrice.value = 1.6;
  days.value = 30;
  includeFitout.value = false;
  fitoutPrice.value = 200;
};

const goAiChat = () => {
  uni.navigateTo({
    url: "/package-invest/pages/ai-chat/index",
  });
};

const toNumberOr = (value, fallback) => {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return fallback;
  }
  return num;
};

onLoad((query) => {
  if (query?.mode === "daily" || query?.mode === "monthly") {
    calcMode.value = query.mode;
  }

  area.value = Math.max(0, toNumberOr(query?.area, area.value));
  monthlyPrice.value = Math.max(0, toNumberOr(query?.monthlyPrice, monthlyPrice.value));
  months.value = Math.max(0, toNumberOr(query?.months, months.value));
  dailyPrice.value = Math.max(0, toNumberOr(query?.dailyPrice, dailyPrice.value));
  days.value = Math.max(0, toNumberOr(query?.days, days.value));
  fitoutPrice.value = Math.max(0, toNumberOr(query?.fitoutPrice, fitoutPrice.value));
  includeFitout.value = query?.includeFitout === "1";
});

onShareAppMessage(() => {
  const shareTitle = `厂房${Math.round(safeNumber(area.value))}㎡，总成本${formatCurrency(totalCost.value, true)}，快来试试租金计算器`;

  const params = [
    `mode=${encodeURIComponent(calcMode.value)}`,
    `area=${encodeURIComponent(String(area.value))}`,
    `monthlyPrice=${encodeURIComponent(String(monthlyPrice.value))}`,
    `months=${encodeURIComponent(String(months.value))}`,
    `dailyPrice=${encodeURIComponent(String(dailyPrice.value))}`,
    `days=${encodeURIComponent(String(days.value))}`,
    `includeFitout=${includeFitout.value ? "1" : "0"}`,
    `fitoutPrice=${encodeURIComponent(String(fitoutPrice.value))}`,
  ].join("&");

  return {
    title: shareTitle,
    path: `/package-invest/pages/rent-calculator/index?${params}`,
  };
});
</script>

<template>
  <view class="page">
    <view class="setup-card card">
      <view class="card-head">
        <text class="card-title">计算器设置</text>
        <text class="card-subtitle">输入厂房参数进行成本估算</text>
      </view>

      <view class="card-body">
        <view class="mode-tabs">
          <view class="mode-tab" :class="{ 'mode-tab-active': calcMode === 'monthly' }" @tap="switchMode('monthly')">
            <text class="mode-tab-text" :class="{ 'mode-tab-text-active': calcMode === 'monthly' }">按月计算</text>
          </view>
          <view class="mode-tab" :class="{ 'mode-tab-active': calcMode === 'daily' }" @tap="switchMode('daily')">
            <text class="mode-tab-text" :class="{ 'mode-tab-text-active': calcMode === 'daily' }">按天计算</text>
          </view>
        </view>

        <view class="form-block">
          <text class="field-label">厂房面积 (㎡)</text>
          <view class="field-input-wrap">
            <input v-model="area" class="field-input" type="digit" />
            <text class="field-unit">㎡</text>
          </view>
        </view>

        <view v-if="calcMode === 'monthly'" class="form-block">
          <text class="field-label">月租单价 (元/㎡/月)</text>
          <view class="field-input-wrap">
            <input v-model="monthlyPrice" class="field-input" type="digit" />
            <text class="field-unit">元/㎡/月</text>
          </view>
        </view>

        <view v-if="calcMode === 'monthly'" class="form-block">
          <text class="field-label">租赁期限 (月)</text>
          <view class="field-input-wrap">
            <input v-model="months" class="field-input" type="number" />
            <text class="field-unit">月</text>
          </view>
        </view>

        <view v-if="calcMode === 'daily'" class="form-block">
          <text class="field-label">日租单价 (元/㎡/天)</text>
          <view class="field-input-wrap">
            <input v-model="dailyPrice" class="field-input" type="digit" />
            <text class="field-unit">元/㎡/天</text>
          </view>
        </view>

        <view v-if="calcMode === 'daily'" class="form-block">
          <text class="field-label">租赁期限 (天)</text>
          <view class="field-input-wrap">
            <input v-model="days" class="field-input" type="number" />
            <text class="field-unit">天</text>
          </view>
        </view>

        <view class="divider" />

        <view class="toggle-row">
          <text class="field-label">是否包含装修成本</text>
          <checkbox :checked="includeFitout" color="#003366" @tap="includeFitout = !includeFitout" />
        </view>

        <view v-if="includeFitout" class="form-block fitout-block">
          <text class="field-label">装修成本 (元/㎡)</text>
          <view class="field-input-wrap">
            <input v-model="fitoutPrice" class="field-input" type="digit" />
            <text class="field-unit">元/㎡</text>
          </view>
        </view>
      </view>
    </view>

    <view class="detail-card card">
      <view class="card-head cost-head">
        <text class="card-title">成本明细</text>
      </view>

      <view class="card-body cost-body">
        <view class="cost-row">
          <view class="cost-row-left">
            <image class="cost-icon" :src="'/package-invest/static/icons/rent-calculator/house-primary.png'" mode="aspectFit" />
            <text class="cost-row-label">{{ rentTitle }}</text>
          </view>
          <text class="cost-row-value cost-row-value-primary">{{ formatCurrency(rentCost) }}</text>
        </view>

        <view v-if="includeFitout" class="fitout-cost-group">
          <view class="cost-row">
            <view class="cost-row-left">
              <image class="cost-icon" :src="'/static/icons/industry/palette.png'" mode="aspectFit" />
              <text class="cost-row-label">装修成本</text>
            </view>
            <text class="cost-row-value cost-row-value-secondary">{{ formatCurrency(fitoutCost) }}</text>
          </view>

          <view class="fitout-breakdown">
            <view v-for="item in fitoutBreakdownItems" :key="item.label" class="fitout-breakdown-row">
              <text class="fitout-breakdown-label">{{ item.label }}</text>
              <text class="fitout-breakdown-value">{{ formatCurrency(item.amount) }}</text>
            </view>
          </view>
        </view>

        <view class="divider" />

        <view class="total-row">
          <text class="total-title">总成本</text>
          <text class="total-value">{{ formatCurrency(totalCost) }}</text>
        </view>

        <view class="avg-row">
          <text class="avg-title">{{ avgTitle }}</text>
          <text class="avg-value">{{ avgCostText }}</text>
        </view>
      </view>
    </view>

    <view class="action-row">
      <view class="action-btn action-btn-reset" @tap="resetForm">
        <image class="action-icon" :src="'/package-invest/static/icons/rent-calculator/rotate-ccw-muted.png'" mode="aspectFit" />
        <text class="action-text">重置</text>
      </view>
      <button class="action-btn action-btn-share action-btn-share-native" open-type="share">
        <image class="action-icon" :src="'/package-invest/static/icons/rent-calculator/share-2-white.png'" mode="aspectFit" />
        <text class="action-text action-text-white">分享结果</text>
      </button>
    </view>

    <view class="tip-card">
      <view class="tip-row">
        <image class="tip-icon" :src="'/package-invest/static/icons/rent-calculator/circle-alert-blue.png'" mode="aspectFit" />
        <view class="tip-content">
          <text class="tip-title">计算器说明</text>
          <view class="tip-list">
            <text class="tip-item">• 以上计算仅供参考，实际成本可能因园区政策、装修标准等因素有所差异</text>
            <text class="tip-item">• 装修成本为平均估算，具体需根据实际装修方案确定</text>
            <text class="tip-item">• 建议咨询大招象顾问获取更精准的成本评估</text>
          </view>
        </view>
      </view>
    </view>

    <view class="cta-card">
      <text class="cta-title">需要更详细的成本分析？</text>
      <view class="cta-btn" @tap="goAiChat">
        <image class="cta-icon" :src="'/package-invest/static/icons/rent-calculator/message-circle-white.png'" mode="aspectFit" />
        <text class="cta-btn-text">咨询AI助手</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, rgba(241, 245, 249, 0.35) 100%);
  padding: 48rpx 32rpx 64rpx;
  box-sizing: border-box;
}

.card {
  border-radius: 20rpx;
  border: 2rpx solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(10, 46, 90, 0.12);
}

.setup-card {
  margin-bottom: 24rpx;
}

.card-head {
  padding: 48rpx 48rpx 32rpx;
}

.card-title {
  display: block;
  font-size: 34rpx;
  font-weight: 600;
  line-height: 1.35;
  color: #0f172a;
}

.card-subtitle {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  line-height: 1.45;
  color: #64748b;
}

.card-body {
  padding: 0 48rpx 48rpx;
}

.mode-tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-radius: 12rpx;
  background: #e9eef5;
  padding: 8rpx;
}

.mode-tab {
  height: 64rpx;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mode-tab-active {
  background: #ffffff;
  box-shadow: 0 2rpx 10rpx rgba(15, 23, 42, 0.08);
}

.mode-tab-text {
  font-size: 24rpx;
  color: #64748b;
  line-height: 1.2;
}

.mode-tab-text-active {
  color: #0f172a;
  font-weight: 500;
}

.form-block {
  margin-top: 24rpx;
}

.fitout-block {
  position: relative;
  padding-left: 24rpx;
}

.fitout-block::before {
  content: "";
  position: absolute;
  left: 0;
  top: 8rpx;
  bottom: 8rpx;
  width: 4rpx;
  border-radius: 999rpx;
  background: #f59f0b;
}

.field-label {
  display: block;
  font-size: 24rpx;
  color: #0f172a;
  font-weight: 500;
  line-height: 1.3;
}

.field-input-wrap {
  margin-top: 12rpx;
  height: 80rpx;
  border: 2rpx solid #dbe3ef;
  border-radius: 12rpx;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  box-sizing: border-box;
  column-gap: 12rpx;
}

.field-input {
  flex: 1;
  height: 100%;
  font-size: 26rpx;
  color: #0f172a;
}

.field-unit {
  font-size: 22rpx;
  color: #64748b;
  flex-shrink: 0;
}

.divider {
  height: 2rpx;
  background: #e2e8f0;
  margin-top: 24rpx;
}

.toggle-row {
  margin-top: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-card {
  margin-bottom: 24rpx;
  border-color: rgba(245, 159, 10, 0.2);
  background: linear-gradient(135deg, rgba(245, 159, 10, 0.08) 0%, rgba(255, 255, 255, 0.95) 45%);
}

.cost-head {
  padding-bottom: 24rpx;
}

.cost-body {
  padding-top: 0;
}

.cost-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx;
  border-radius: 14rpx;
  background: #ffffff;
}

.cost-row + .cost-row {
  margin-top: 16rpx;
}

.cost-row-left {
  display: flex;
  align-items: center;
  column-gap: 10rpx;
}

.cost-icon {
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
}

.cost-row-label {
  font-size: 24rpx;
  color: #0f172a;
  line-height: 1.3;
}

.cost-row-value {
  font-size: 28rpx;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.2;
}

.cost-row-value-primary {
  color: #003366;
}

.cost-row-value-secondary {
  color: #f59f0a;
}

.fitout-cost-group {
  margin-top: 16rpx;
}

.fitout-breakdown {
  margin-top: 12rpx;
  padding-left: 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 8rpx;
}

.fitout-breakdown-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.fitout-breakdown-label,
.fitout-breakdown-value {
  font-size: 24rpx;
  color: #64748b;
  line-height: 1.35;
}

.total-row {
  margin-top: 24rpx;
  border-radius: 14rpx;
  background: linear-gradient(135deg, #003366 0%, #004d99 100%);
  padding: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.total-title {
  font-size: 28rpx;
  color: #ffffff;
  font-weight: 600;
}

.total-value {
  font-size: 42rpx;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
}

.avg-row {
  margin-top: 16rpx;
  border-radius: 14rpx;
  background: #e9eef5;
  padding: 20rpx 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avg-title {
  font-size: 22rpx;
  color: #64748b;
}

.avg-value {
  font-size: 28rpx;
  color: #0f172a;
  font-weight: 600;
}

.action-row {
  display: flex;
  gap: 16rpx;
  margin-bottom: 24rpx;
}

.action-btn {
  height: 80rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10rpx;
  flex: 1;
}

.action-btn-reset {
  border: 2rpx solid #dbe3ef;
  background: #ffffff;
}

.action-btn-share {
  background: linear-gradient(135deg, #003366 0%, #004d99 100%);
}

.action-btn-share-native {
  padding: 0;
  margin: 0;
  border: 0;
  line-height: normal;
}

.action-btn-share-native::after {
  border: 0;
}

.action-icon {
  width: 32rpx;
  height: 32rpx;
}

.action-text {
  font-size: 24rpx;
  color: #334155;
  font-weight: 500;
}

.action-text-white {
  color: #ffffff;
}

.tip-card {
  border-radius: 20rpx;
  border: 2rpx solid #bfdbfe;
  background: #eff6ff;
  padding: 28rpx;
}

.tip-row {
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
}

.tip-icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
  margin-top: 3rpx;
}

.tip-content {
  flex: 1;
  min-width: 0;
}

.tip-title {
  display: block;
  font-size: 22rpx;
  color: #1e3a8a;
  font-weight: 600;
}

.tip-list {
  margin-top: 8rpx;
  display: flex;
  flex-direction: column;
  row-gap: 8rpx;
}

.tip-item {
  font-size: 20rpx;
  color: #1e3a8a;
  line-height: 1.5;
}

.cta-card {
  margin-top: 24rpx;
  padding: 28rpx;
  border-radius: 16rpx;
  background: linear-gradient(90deg, rgba(0, 51, 102, 0.1) 0%, rgba(245, 159, 10, 0.12) 100%);
  border: 2rpx solid rgba(0, 51, 102, 0.2);
}

.cta-title {
  display: block;
  font-size: 24rpx;
  color: #0f172a;
  margin-bottom: 16rpx;
}

.cta-btn {
  width: 100%;
  height: 80rpx;
  border-radius: 12rpx;
  background: linear-gradient(135deg, #003366 0%, #004d99 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10rpx;
}

.cta-icon {
  width: 32rpx;
  height: 32rpx;
}

.cta-btn-text {
  font-size: 24rpx;
  color: #ffffff;
  font-weight: 600;
}
</style>
