<script setup>
import { computed, ref } from "vue";

const industryOptions = ["全部产业", "美妆美业", "生物医药"];

const selectedIndustry = ref(industryOptions[0]);
const selectedPark = ref("全部园区");
const startDate = ref("");
const endDate = ref("");
const showAdvanced = ref(false);
const showIndustryDropdown = ref(false);

const policyItems = [
  {
    title: "关于支持美妆企业入驻的租金减免办法",
    park: "东方美谷",
    industry: "美妆美业",
    tags: ["租金优惠", "新入驻"],
    amount: "最高50万元",
    deadline: "12/31",
    deadlineDate: "2026-12-31",
    publishDate: "2026-01-10",
    condition: "需在本地注册，年产值达1000万以上。",
  },
  {
    title: "生物医药产业高新技术企业认定补助",
    park: "张江科学城",
    industry: "生物医药",
    tags: ["高新认定", "补助"],
    amount: "最高100万元",
    deadline: "06/30",
    deadlineDate: "2026-06-30",
    publishDate: "2026-02-15",
    condition: "需获得高新技术企业认定，研发投入占比不低于5%。",
  },
  {
    title: "美妆企业研发中心建设补贴",
    park: "东方美谷",
    industry: "美妆美业",
    tags: ["研发补贴", "中心建设"],
    amount: "最高80万元",
    deadline: "09/15",
    deadlineDate: "2026-09-15",
    publishDate: "2026-03-01",
    condition: "需建立独立研发中心，配备专业研发团队。",
  },
  {
    title: "生物医药企业落户奖励政策",
    park: "浦东新区",
    industry: "生物医药",
    tags: ["落户奖励", "新企业"],
    amount: "最高150万元",
    deadline: "12/31",
    deadlineDate: "2026-12-31",
    publishDate: "2026-01-20",
    condition: "新注册企业，注册资本不低于500万元。",
  },
  {
    title: "美妆产业链上下游协作补助",
    park: "东方美谷",
    industry: "美妆美业",
    tags: ["产业链", "协作"],
    amount: "最高60万元",
    deadline: "08/31",
    deadlineDate: "2026-08-31",
    publishDate: "2026-02-05",
    condition: "需与园区内其他企业建立合作关系。",
  },
  {
    title: "生物医药临床试验支持基金",
    park: "张江科学城",
    industry: "生物医药",
    tags: ["临床试验", "基金"],
    amount: "最高200万元",
    deadline: "10/31",
    deadlineDate: "2026-10-31",
    publishDate: "2026-03-12",
    condition: "需进行临床试验，符合相关医学伦理标准。",
  },
];

const parkOptions = computed(() => {
  return ["全部园区", ...Array.from(new Set(policyItems.map((item) => item.park)))];
});

const filteredPolicies = computed(() => {
  return policyItems.filter((item) => {
    if (selectedIndustry.value !== "全部产业" && item.industry !== selectedIndustry.value) {
      return false;
    }
    if (selectedPark.value !== "全部园区" && item.park !== selectedPark.value) {
      return false;
    }
    if (startDate.value && item.publishDate < startDate.value) {
      return false;
    }
    if (endDate.value && item.deadlineDate > endDate.value) {
      return false;
    }
    return true;
  });
});

const toggleIndustryDropdown = () => {
  showIndustryDropdown.value = !showIndustryDropdown.value;
};

const closeIndustryDropdown = () => {
  showIndustryDropdown.value = false;
};

const selectIndustry = (item) => {
  selectedIndustry.value = item;
  closeIndustryDropdown();
};

const choosePark = () => {
  closeIndustryDropdown();
  const options = parkOptions.value;
  uni.showActionSheet({
    itemList: options,
    success: (res) => {
      selectedPark.value = options[res.tapIndex] || "全部园区";
    },
  });
};

const onStartDateChange = (event) => {
  startDate.value = event.detail?.value || "";
};

const onEndDateChange = (event) => {
  endDate.value = event.detail?.value || "";
};

const toggleAdvanced = () => {
  closeIndustryDropdown();
  showAdvanced.value = !showAdvanced.value;
};

const openPolicyDetail = (item) => {
  const query = [
    `title=${encodeURIComponent(item.title)}`,
    `park=${encodeURIComponent(item.park)}`,
    `industry=${encodeURIComponent(item.industry)}`,
    `amount=${encodeURIComponent(item.amount)}`,
    `deadline=${encodeURIComponent(item.deadline)}`,
    `deadlineDate=${encodeURIComponent(item.deadlineDate || "")}`,
    `condition=${encodeURIComponent(item.condition)}`,
    `tags=${encodeURIComponent(item.tags.join(","))}`,
    `publishDate=${encodeURIComponent(item.publishDate)}`,
  ].join("&");

  uni.navigateTo({
    url: `/package-invest/pages/policy-detail/index?${query}`,
  });
};

const goAiChat = () => {
  uni.navigateTo({
    url: "/package-invest/pages/ai-chat/index",
  });
};

const contactAdvisor = () => {
  uni.showToast({
    title: "已为您转接人工顾问",
    icon: "none",
  });
};
</script>

<template>
  <view class="page">
    <view v-if="showIndustryDropdown" class="dropdown-mask" @tap="closeIndustryDropdown" />

    <view class="content">
      <view class="filter-card">
        <view class="filter-main-row">
          <view class="filter-field-main">
            <text class="field-label">产业类型</text>
            <view class="select-wrap">
              <view class="select-trigger" @tap="toggleIndustryDropdown">
                <text class="select-value">{{ selectedIndustry }}</text>
                <image class="select-icon" :src="'/package-invest/static/icons/policy-list/chevron-down-muted.png'" mode="aspectFit" />
              </view>

              <view
                v-if="showIndustryDropdown"
                class="select-dropdown"
              >
                <view
                  v-for="item in industryOptions"
                  :key="`industry-${item}`"
                  class="select-option"
                  :class="{ 'select-option-selected': selectedIndustry === item }"
                  hover-class="select-option-hover"
                  hover-start-time="0"
                  hover-stay-time="0"
                  @tap.stop="selectIndustry(item)"
                >
                  <view class="select-check-slot">
                    <image
                      v-if="selectedIndustry === item"
                      class="select-check-icon"
                      :src="'/package-invest/static/icons/policy-list/check-white.png'"
                      mode="aspectFit"
                    />
                  </view>
                  <text class="select-option-text" :class="{ 'select-option-text-selected': selectedIndustry === item }">{{ item }}</text>
                </view>
              </view>
            </view>
          </view>

          <button class="expand-btn" @tap="toggleAdvanced">
            <image
              class="expand-btn-icon"
              :class="{ 'expand-btn-icon-open': showAdvanced }"
              :src="'/package-invest/static/icons/policy-list/chevron-down-muted.png'"
              mode="aspectFit"
            />
          </button>
        </view>

        <view v-if="showAdvanced" class="advanced-panel">
          <view class="filter-field">
            <text class="field-label">所属园区</text>
            <view class="select-trigger" @tap="choosePark">
              <text class="select-value">{{ selectedPark }}</text>
              <image class="select-icon" :src="'/package-invest/static/icons/policy-list/chevron-down-muted.png'" mode="aspectFit" />
            </view>
          </view>

          <view class="date-grid">
            <view class="filter-field">
              <text class="field-label">发布起期</text>
              <picker mode="date" :value="startDate" @change="onStartDateChange">
                <view class="date-trigger">
                  <text class="date-value" :class="{ 'date-value-placeholder': !startDate }">{{ startDate || "请选择" }}</text>
                </view>
              </picker>
            </view>

            <view class="filter-field">
              <text class="field-label">截止日期前</text>
              <picker mode="date" :value="endDate" @change="onEndDateChange">
                <view class="date-trigger">
                  <text class="date-value" :class="{ 'date-value-placeholder': !endDate }">{{ endDate || "请选择" }}</text>
                </view>
              </picker>
            </view>
          </view>
        </view>
      </view>

      <view class="result-row">
        <text class="result-text"
          >找到 <text class="result-count">{{ filteredPolicies.length }}</text> 项政策</text
        >
      </view>

      <view class="policy-list">
        <view v-for="item in filteredPolicies" :key="item.title" class="policy-card" @tap="openPolicyDetail(item)">
          <view class="policy-header">
            <view class="policy-title-wrap">
              <text class="policy-title">{{ item.title }}</text>
              <text class="policy-subtitle">{{ item.park }} · {{ item.industry }}</text>
            </view>
            <image class="policy-arrow" :src="'/package-invest/static/icons/policy-list/chevron-right-muted.png'" mode="aspectFit" />
          </view>

          <view class="policy-tags">
            <view v-for="tag in item.tags" :key="`${item.title}-${tag}`" class="policy-tag">
              <text>{{ tag }}</text>
            </view>
          </view>

          <view class="policy-meta-grid">
            <view class="policy-meta-item">
              <text class="meta-label">补贴金额</text>
              <text class="meta-value meta-value-accent">{{ item.amount }}</text>
            </view>
            <view class="policy-meta-item">
              <text class="meta-label">截止日期</text>
              <text class="meta-value">{{ item.deadline }}</text>
            </view>
          </view>

          <view class="policy-condition">
            <text class="meta-label">申报条件</text>
            <text class="condition-text">{{ item.condition }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="floating-actions">
      <button class="action-btn action-btn-primary" @tap="goAiChat">
        <image class="action-icon" :src="'/package-invest/static/icons/policy-list/message-square-text-white.png'" mode="aspectFit" />
        <text>AI聊政策</text>
      </button>
      <button class="action-btn action-btn-secondary" @tap="contactAdvisor">
        <image class="action-icon" :src="'/package-invest/static/icons/policy-list/headset-white.png'" mode="aspectFit" />
        <text>人工解读政策</text>
      </button>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #fcfcfc;
}

.dropdown-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 30;
}

.content {
  padding: 32rpx;
  padding-bottom: 192rpx;
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
  box-sizing: border-box;
}

.filter-card {
  background: #ffffff;
  border-radius: 16rpx;
  border: 2rpx solid #e9edf3;
  box-shadow: 0 2rpx 4rpx rgba(10, 46, 90, 0.08);
  padding: 32rpx;
  box-sizing: border-box;
}

.filter-main-row {
  display: flex;
  align-items: flex-end;
  gap: 24rpx;
}

.filter-field-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
  position: relative;
  z-index: 40;
}

.filter-field {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.field-label {
  margin-left: 8rpx;
  font-size: 20rpx;
  line-height: 1.2;
  font-weight: 700;
  color: #6c7480;
  letter-spacing: 1rpx;
}

.select-trigger,
.date-trigger {
  height: 80rpx;
  border-radius: 12rpx;
  background: rgba(241, 245, 249, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx;
  box-sizing: border-box;
}

.select-wrap {
  position: relative;
}

.select-value,
.date-value {
  font-size: 28rpx;
  color: #111827;
}

.date-value-placeholder {
  color: #9ca3af;
}

.select-icon {
  width: 32rpx;
  height: 32rpx;
  opacity: 0.7;
}

.select-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 12rpx);
  border-radius: 12rpx;
  border: 2rpx solid #e9edf3;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(10, 46, 90, 0.12);
  overflow: hidden;
}

.select-option {
  height: 76rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(233, 237, 243, 0.9);
  transition: background-color 0.2s ease;
}

.select-option:active {
  background: #f59f0a;
}

.select-option:last-child {
  border-bottom: 0;
}

.select-option-hover {
  background: #f59f0a;
}

.select-option-selected {
  background: #f59f0a;
}

.select-check-slot {
  width: 28rpx;
  height: 28rpx;
  margin-right: 12rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.select-check-icon {
  width: 24rpx;
  height: 24rpx;
}

.select-option-text {
  font-size: 26rpx;
  color: #111827;
}

.select-option-text-selected {
  color: #ffffff;
}

.expand-btn {
  width: 80rpx;
  height: 80rpx;
  border: 0;
  border-radius: 12rpx;
  background: transparent;
  color: #6c7480;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.expand-btn::after {
  border: 0;
}

.expand-btn-icon {
  width: 40rpx;
  height: 40rpx;
  transition: transform 0.3s ease;
}

.expand-btn-icon-open {
  transform: rotate(180deg);
}

.advanced-panel {
  margin-top: 32rpx;
  padding-top: 32rpx;
  border-top: 2rpx dashed #e9edf3;
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.date-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24rpx;
}

.result-row {
  padding: 0 16rpx;
}

.result-text {
  font-size: 28rpx;
  color: #6c7480;
}

.result-count {
  color: #111827;
  font-weight: 600;
}

.policy-list {
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.policy-card {
  border-radius: 16rpx;
  border: 2rpx solid #e9edf3;
  background: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(10, 46, 90, 0.08);
  padding: 48rpx;
  box-sizing: border-box;
}

.policy-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16rpx;
}

.policy-title-wrap {
  min-width: 0;
  flex: 1;
}

.policy-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 28rpx;
  line-height: 1.4;
  color: #111827;
  font-weight: 600;
}

.policy-subtitle {
  margin-top: 8rpx;
  display: block;
  font-size: 24rpx;
  color: #6c7480;
}

.policy-arrow {
  width: 40rpx;
  height: 40rpx;
  flex-shrink: 0;
}

.policy-tags {
  margin-top: 24rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.policy-tag {
  height: 44rpx;
  padding: 0 20rpx;
  border-radius: 999rpx;
  background: #f59f0a;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  font-size: 22rpx;
  font-weight: 600;
}

.policy-meta-grid {
  margin-top: 24rpx;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24rpx;
}

.policy-meta-item {
  border-radius: 12rpx;
  background: rgba(241, 245, 249, 0.8);
  padding: 16rpx;
}

.meta-label {
  display: block;
  font-size: 22rpx;
  color: #6c7480;
}

.meta-value {
  margin-top: 8rpx;
  display: block;
  font-size: 28rpx;
  color: #111827;
  font-weight: 600;
}

.meta-value-accent {
  color: #f59f0a;
}

.policy-condition {
  margin-top: 24rpx;
  border-radius: 12rpx;
  background: rgba(241, 245, 249, 0.5);
  padding: 16rpx;
}

.condition-text {
  margin-top: 8rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 22rpx;
  line-height: 1.45;
  color: #111827;
}

.floating-actions {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding: 24rpx 32rpx 48rpx;
  border-top: 2rpx solid rgba(233, 237, 243, 0.8);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12rpx);
  box-sizing: border-box;
}

.action-btn {
  height: 96rpx;
  border-radius: 999rpx;
  border: 0;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  padding: 0 24rpx;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1;
}

.action-btn::after {
  border: 0;
}

.action-btn-primary {
  background: #003367;
  color: #ffffff;
  box-shadow: 0 8rpx 20rpx rgba(0, 51, 103, 0.25);
}

.action-btn-secondary {
  background: #f59f0a;
  color: #ffffff;
  box-shadow: 0 8rpx 20rpx rgba(245, 159, 10, 0.28);
}

.action-icon {
  width: 36rpx;
  height: 36rpx;
}
</style>
