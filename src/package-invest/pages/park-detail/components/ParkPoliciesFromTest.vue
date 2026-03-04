<script setup>
import { computed, ref } from "vue";

const tabs = ["租金补贴", "科技补贴", "人才补贴", "产业补贴"];
const activeTab = ref(0);

const policyMap = {
  0: [
    { title: "初创企业场租补贴", dept: "经信局", amount: "最高30元/㎡" },
    { title: "高新企业租金减免", dept: "科学城管委会", amount: "减免50%" },
    { title: "外资总部租金补贴", dept: "商务委", amount: "50-100万" },
    { title: "孵化器入驻补贴", dept: "科技局", amount: "2元/㎡/天" },
    { title: "重点产业链场租补贴", dept: "管委会", amount: "最高200万" },
  ],
  1: [
    { title: "研发投入后补助", dept: "科技局", amount: "研发费10%" },
    { title: "省重点研发计划", dept: "科技厅", amount: "最高100万" },
    { title: "科技小巨人认定奖", dept: "经信委", amount: "50-100万" },
    { title: "专利申请资助", dept: "知识产权局", amount: "每件1000元" },
  ],
  2: [
    { title: "领军人才生活补贴", dept: "人才办", amount: "50-100万" },
    { title: "人才公寓租屋补贴", dept: "住建局", amount: "住房全免" },
    { title: "高管个税奖励", dept: "财政局", amount: "贡献度40%" },
    { title: "优秀青年创业奖", dept: "团委", amount: "10-20万" },
    { title: "人才子女入学优待", dept: "教育局", amount: "定点保障" },
  ],
  3: [
    { title: "上市挂牌奖励", dept: "金融办", amount: "最高800万" },
    { title: "高新技术企业认定", dept: "科技部", amount: "30-50万" },
    { title: "瞪羚企业入库奖励", dept: "管委会", amount: "20万" },
    { title: "工业数字化转型奖", dept: "经信局", amount: "最高100万" },
    { title: "重大项目招引贴息", dept: "招商局", amount: "免息/低息" },
  ],
};

const currentPolicies = computed(() => policyMap[activeTab.value] || []);

const setTab = (index) => {
  activeTab.value = index;
};
</script>

<template>
  <view class="policies-wrap">
    <view class="policies-head">
      <text class="policies-title">配套政策</text>
      <view class="head-btn">
        <text class="head-btn-text">全部政策</text>
        <image
          class="head-btn-icon"
          src="/static/icons/park-policies/chevron-right.png"
          mode="aspectFit"
        />
      </view>
    </view>

    <view class="tabs-wrap">
      <view class="tabs-list">
        <view
          v-for="(item, index) in tabs"
          :key="`policy-tab-${index}`"
          class="tab-item"
          :class="{ 'tab-item-active': activeTab === index }"
          @tap="setTab(index)"
        >
          <text
            class="tab-item-text"
            :class="{ 'tab-item-text-active': activeTab === index }"
            >{{ item }}</text
          >
        </view>
      </view>

      <view class="tab-content">
        <view v-if="currentPolicies.length" class="policy-card">
          <view class="policy-list">
            <view
              v-for="(policy, index) in currentPolicies"
              :key="`policy-${index}`"
              class="policy-item"
              :class="{
                'policy-item-last': index === currentPolicies.length - 1,
              }"
            >
              <view class="policy-left">
                <text class="policy-name">{{ policy.title }}</text>
                <text class="policy-dept">{{ policy.dept }}</text>
              </view>
              <view class="policy-right">
                <text class="policy-badge">{{ policy.amount }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="more-btn">
      <text class="more-btn-text">了解更多政策详情</text>
      <image
        class="more-btn-icon"
        src="/static/icons/park-policies/arrow-right.png"
        mode="aspectFit"
      />
    </view>
  </view>
</template>

<style scoped>
.policies-wrap {
  margin-top: 24rpx;
  padding: 0 32rpx 40rpx;
  box-sizing: border-box;
}

.policies-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.policies-title {
  display: block;
  font-size: 36rpx;
  line-height: 1.4;
  font-weight: 600;
  color: #111827;
}

.head-btn {
  display: inline-flex;
  align-items: center;
}

.head-btn-text {
  font-size: 24rpx;
  line-height: 1.3;
  color: #6c7480;
}

.head-btn-icon {
  margin-left: 4rpx;
  width: 24rpx;
  height: 24rpx;
}

.tabs-wrap {
  margin-top: 32rpx;
}

.tabs-list {
  height: 80rpx;
  padding: 8rpx;
  border-radius: 12rpx;
  background: rgba(241, 245, 249, 0.8);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  gap: 4rpx;
  box-sizing: border-box;
}

.tab-item {
  height: 64rpx;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12rpx 24rpx;
  box-sizing: border-box;
}

.tab-item-active {
  background: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
}

.tab-item-text {
  font-size: 24rpx;
  line-height: 1.3;
  color: #6c7480;
}

.tab-item-text-active {
  color: #003367;
}

.tab-content {
  margin-top: 32rpx;
}

.policy-card {
  border-radius: 16rpx;
  border: 1px solid #e9edf3;
  background: #ffffff;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.policy-list {
  padding: 0;
}

.policy-item {
  padding: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(233, 237, 243, 0.5);
}

.policy-item-last {
  border-bottom: 0;
}

.policy-left {
  display: flex;
  flex-direction: column;
  row-gap: 8rpx;
  min-width: 0;
  flex: 1;
}

.policy-name {
  font-size: 28rpx;
  line-height: 1.35;
  color: #111827;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.policy-dept {
  font-size: 22rpx;
  line-height: 1.3;
  color: #6c7480;
}

.policy-right {
  margin-left: 16rpx;
  flex-shrink: 0;
}

.policy-badge {
  padding: 4rpx 16rpx;
  border-radius: 9999rpx;
  background: rgba(0, 51, 103, 0.1);
  color: #003367;
  font-size: 20rpx;
  line-height: 1.2;
  font-weight: 700;
}

.more-btn {
  margin-top: 32rpx;
  width: 100%;
  height: 88rpx;
  border-radius: 12rpx;
  border: 1px solid rgba(0, 51, 103, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.more-btn-text {
  font-size: 28rpx;
  line-height: 1.3;
  color: #003367;
  font-weight: 500;
}

.more-btn-icon {
  margin-left: 16rpx;
  width: 32rpx;
  height: 32rpx;
}
</style>
