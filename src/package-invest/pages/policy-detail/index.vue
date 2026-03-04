<script setup>
import { computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const policy = ref({
  title: "关于支持美妆企业入驻的租金减免办法",
  park: "东方美谷",
  industry: "美妆美业",
  amount: "最高50万元",
  deadline: "2026-12-31",
  condition: "需在本地注册，年产值达1000万以上。",
  tags: ["租金优惠", "新入驻"],
  publishDate: "2024-01-01",
});

const decode = (value, fallback = "") => {
  if (!value) {
    return fallback;
  }
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
};

onLoad((query) => {
  const tagsRaw = decode(query?.tags, "");
  const publishDate = decode(query?.publishDate, policy.value.publishDate);
  const deadlineRaw = decode(query?.deadlineDate || query?.deadline, policy.value.deadline);

  policy.value = {
    title: decode(query?.title, policy.value.title),
    park: decode(query?.park, policy.value.park),
    industry: decode(query?.industry, policy.value.industry),
    amount: decode(query?.amount, policy.value.amount),
    deadline: deadlineRaw,
    condition: decode(query?.condition, policy.value.condition),
    publishDate,
    tags: tagsRaw ? tagsRaw.split(",").filter(Boolean) : policy.value.tags,
  };
});

const deadlineText = computed(() => {
  if (!policy.value.deadline) {
    return "截止日期：2026-12-31";
  }
  const value = policy.value.deadline;
  if (value.includes("截止日期")) {
    return value;
  }
  return `截止日期：${value}`;
});

const publishDateText = computed(() => {
  if (!policy.value.publishDate) {
    return "执行日期：2024-01-01";
  }
  const value = policy.value.publishDate;
  if (value.includes("执行日期")) {
    return value;
  }
  return `执行日期：${value}`;
});

const propertyCards = ref([
  {
    name: "标准智造厂房 A1",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/36b16d5a-573b-4cb9-ac70-705d888c4875.png",
    specs: ["面积: 1500㎡", "层高: 8m"],
    extra: "承重: 2T/㎡",
  },
  {
    name: "研发中试中心 B3",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/2fefa5cc-fd2c-4d98-9d8c-02e31b6ea598.png",
    specs: ["面积: 800㎡", "配电: 200kvA"],
    extra: "消防: 丙类",
  },
  {
    name: "智能仓储空间 C5",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/ef96cdb4-2c70-40ee-a0cf-f8a2bdfe35b6.png",
    specs: ["面积: 3000㎡", "宽柱距: 12m"],
    extra: "平台: 双侧",
  },
]);

const processList = ref([
  {
    title: "提交申请",
    desc: "准备相关材料，向园区招商部门提交申请表",
  },
  {
    title: "资格审核",
    desc: "园区对申请企业进行资格审查（5-10个工作日）",
  },
  {
    title: "公示期",
    desc: "通过审核的企业进入公示期（7个工作日）",
  },
  {
    title: "资金拨付",
    desc: "公示无异议后，资金按规定时间拨付到企业账户",
  },
]);

const goAiChat = () => {
  uni.navigateTo({
    url: "/package-invest/pages/ai-chat/index",
  });
};

const goParkDetail = () => {
  uni.navigateTo({
    url: "/package-invest/pages/park-detail/index",
  });
};

const goMap = () => {
  uni.showToast({
    title: "地图功能开发中",
    icon: "none",
  });
};

const applyPolicy = () => {
  uni.navigateTo({
    url: "/package-invest/pages/ai-chat/index",
  });
};

const collectPolicy = () => {
  uni.showToast({
    title: "已收藏",
    icon: "none",
  });
};

const sharePolicy = () => {
  uni.showToast({
    title: "请点击右上角进行分享",
    icon: "none",
  });
};
</script>

<template>
  <view class="page">
    <button class="ai-float" @tap="goAiChat">
      <image class="ai-float-icon" :src="'/package-invest/static/icons/policy-list/message-square-text-white.png'" mode="aspectFit" />
      <text class="ai-float-text">聊政策</text>
    </button>

    <view class="card policy-header-card">
      <button class="map-btn" @tap="goMap">
        <image class="map-btn-icon" :src="'/package-invest/static/icons/park-detail-content/map-pin.png'" mode="aspectFit" />
      </button>

      <view class="header-main">
        <text class="policy-title">{{ policy.title }}</text>

        <view class="meta-list">
          <view class="meta-row meta-row-between">
            <view class="meta-left">
              <image class="meta-icon" :src="'/package-invest/static/icons/industry-cluster-detail/map-pin-muted.png'" mode="aspectFit" />
              <text class="meta-text">{{ policy.park }}</text>
            </view>
            <view class="park-link-wrap" @tap="goParkDetail">
              <text class="park-link">进园详情</text>
              <image class="park-link-icon" :src="'/package-invest/static/icons/park-factories/chevron-right.png'" mode="aspectFit" />
            </view>
          </view>

          <view class="meta-row">
            <image class="meta-icon" :src="'/package-invest/static/icons/lease-detail/tags-primary.png'" mode="aspectFit" />
            <text class="meta-text">{{ policy.industry }}</text>
          </view>

          <view class="meta-row">
            <image class="meta-icon" :src="'/package-invest/static/icons/industry-cluster-detail/calendar-muted.png'" mode="aspectFit" />
            <text class="meta-text">{{ publishDateText }}</text>
          </view>

          <view class="meta-row">
            <image class="meta-icon" :src="'/package-invest/static/icons/industry-cluster-detail/calendar-muted.png'" mode="aspectFit" />
            <text class="meta-text">{{ deadlineText }}</text>
          </view>
        </view>

        <view class="tag-list">
          <text v-for="tag in policy.tags" :key="tag" class="tag-item">{{ tag }}</text>
        </view>
      </view>
    </view>

    <view class="card subsidy-card">
      <text class="subsidy-label">补贴金额</text>
      <text class="subsidy-value">{{ policy.amount }}</text>
    </view>

    <view class="card section-card">
      <view class="section-title-row">
        <image class="section-title-icon" :src="'/package-invest/static/icons/policy-detail/circle-check-primary.png'" mode="aspectFit" />
        <text class="section-title">申报条件</text>
      </view>
      <text class="section-content">{{ policy.condition }}</text>
      <view class="material-box">
        <text class="material-title">所需材料示例：</text>
        <text class="material-item">• 企业营业执照副本</text>
        <text class="material-item">• 法人身份证复印件</text>
        <text class="material-item">• 财务报表（最近一年）</text>
        <text class="material-item">• 项目计划书</text>
        <text class="material-item">• 其他相关证明材料</text>
      </view>
    </view>

    <view class="card section-card">
      <view class="section-title-row">
        <image class="section-title-icon" :src="'/package-invest/static/icons/policy-detail/file-text-primary.png'" mode="aspectFit" />
        <text class="section-title">政策详情</text>
      </view>
      <text class="section-content section-content-wrap">
        为进一步吸引优质美妆企业，凡符合条件的入驻企业可享受前三年租金五折优惠...
      </text>
      <view class="tip-box">
        <text class="tip-title">💡 政策解读</text>
        <text class="tip-content"
          >该政策旨在吸引优质企业入驻，通过租金优惠、补贴支持等方式降低企业成本，促进产业集聚发展。符合条件的企业可在规定时间内向园区招商部门提交申请。</text
        >
      </view>
    </view>

    <view class="card section-card">
      <view class="section-title-row">
        <image class="section-title-icon" :src="'/package-invest/static/icons/policy-detail/zap-primary.png'" mode="aspectFit" />
        <text class="section-title">申报流程</text>
      </view>
      <view class="process-list">
        <view v-for="(item, index) in processList" :key="item.title" class="process-item">
          <view class="process-index">{{ index + 1 }}</view>
          <view class="process-content">
            <text class="process-title">{{ item.title }}</text>
            <text class="process-desc">{{ item.desc }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="property-wrap">
      <view class="property-head">
        <view class="property-title-wrap">
          <image class="property-title-icon" :src="'/package-invest/static/icons/policy-detail/building-2-primary.png'" mode="aspectFit" />
          <text class="property-title">园区配套物业</text>
        </view>
        <text class="property-hint">左右滑动</text>
      </view>

      <scroll-view class="property-scroll" scroll-x enhanced show-scrollbar="false">
        <view class="property-list">
          <view v-for="item in propertyCards" :key="item.name" class="property-card" @tap="goParkDetail">
            <view class="property-image-wrap">
              <image class="property-image" :src="item.image" mode="aspectFill" />
            </view>
            <view class="property-content">
              <text class="property-name">{{ item.name }}</text>
              <view class="property-specs">
                <text v-for="spec in item.specs" :key="spec" class="property-spec">{{ spec }}</text>
              </view>
              <view class="property-extra-row">
                <image class="property-extra-icon" :src="'/package-invest/static/icons/policy-detail/shield-check-muted.png'" mode="aspectFit" />
                <text class="property-extra">{{ item.extra }}</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="card park-entry-card" @tap="goParkDetail">
      <view class="park-entry-main">
        <view class="park-image-wrap">
          <image
            class="park-image"
            :src="'https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/36b16d5a-573b-4cb9-ac70-705d888c4875.png'"
            mode="aspectFill"
          />
          <view class="park-image-mask">
            <image
              class="park-image-logo"
              :src="'https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/b082ea4d-1936-4eac-b5c8-4b8f2a67ba48.png'"
              mode="aspectFit"
            />
          </view>
        </view>

        <view class="park-info">
          <text class="park-name">东方美谷·美妆产业园</text>
          <view class="park-meta-list">
            <view class="park-meta-row">
              <image class="park-meta-icon" :src="'/package-invest/static/icons/policy-detail/users-primary.png'" mode="aspectFit" />
              <text class="park-meta-text">已入驻企业：<text class="park-meta-strong">120+ 家</text></text>
            </view>
            <view class="park-meta-row park-meta-row-top">
              <image class="park-meta-icon" :src="'/package-invest/static/icons/policy-detail/target-primary.png'" mode="aspectFit" />
              <text class="park-meta-text line-clamp-two">产业定位：高端美妆研发、生物医药、生产配套</text>
            </view>
          </view>
        </view>

        <image class="park-arrow" :src="'/package-invest/static/icons/policy-detail/chevron-right-muted.png'" mode="aspectFit" />
      </view>

      <view class="park-entry-foot">
        <text class="park-entry-tip">查看完整园区规划与配套服务</text>
        <text class="park-entry-badge">官方招商</text>
      </view>
    </view>

    <view class="card section-card contact-card">
      <view class="section-title-row">
        <image class="section-title-icon" :src="'/package-invest/static/icons/policy-detail/phone-primary.png'" mode="aspectFit" />
        <text class="section-title">联系方式</text>
      </view>
      <view class="contact-content">
        <text class="contact-title">东方美谷 招商部</text>
        <text class="contact-item">电话：400-888-8888</text>
        <text class="contact-item">邮箱：business@park.com</text>
        <text class="contact-item">工作时间：周一至周五 9:00-18:00</text>
      </view>
    </view>

    <view class="bottom-actions">
      <button class="apply-btn" @tap="applyPolicy">
        <image class="apply-btn-icon" :src="'/package-invest/static/icons/factory-list/zap.png'" mode="aspectFit" />
        <text>申报</text>
      </button>

      <button class="minor-btn" @tap="collectPolicy">
        <image class="minor-btn-icon" :src="'/package-invest/static/icons/policy-detail/star-muted.png'" mode="aspectFit" />
        <text class="minor-btn-text">收藏</text>
      </button>

      <button class="minor-btn" @tap="sharePolicy">
        <image class="minor-btn-icon" :src="'/package-invest/static/icons/policy-detail/share-2-muted.png'" mode="aspectFit" />
        <text class="minor-btn-text">分享</text>
      </button>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 32rpx 32rpx 220rpx;
  background: #f8f9fb;
  box-sizing: border-box;
}

.card {
  position: relative;
  border-radius: 24rpx;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(17, 24, 39, 0.06);
  margin-bottom: 32rpx;
}

.ai-float {
  position: fixed;
  right: 48rpx;
  bottom: 160rpx;
  z-index: 60;
  width: 112rpx;
  height: 112rpx;
  border-radius: 999rpx;
  border: 4rpx solid #ffffff;
  background: linear-gradient(135deg, #f59f0a 0%, #f7b23b 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-shadow: 0 8rpx 32rpx rgba(10, 46, 90, 0.12);
  animation: ai-float-bounce 1s infinite;
}

.ai-float::after {
  border: 0;
}

.ai-float-icon {
  width: 40rpx;
  height: 40rpx;
}

.ai-float-text {
  margin-top: 4rpx;
  font-size: 20rpx;
  line-height: 1;
  color: #ffffff;
  font-weight: 700;
}

@keyframes ai-float-bounce {
  0%,
  100% {
    transform: translateY(-8rpx);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.policy-header-card {
  border-radius: 16rpx;
  overflow: hidden;
}

.map-btn {
  position: absolute;
  top: 32rpx;
  right: 32rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 999rpx;
  background: rgba(0, 51, 103, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 2;
}

.map-btn::after {
  border: 0;
}

.map-btn-icon {
  width: 36rpx;
  height: 36rpx;
}

.header-main {
  padding: 48rpx 112rpx 24rpx 48rpx;
}

.policy-title {
  display: block;
  font-size: 30rpx;
  line-height: 1.35;
  color: #111827;
  font-weight: 700;
}

.meta-list {
  margin-top: 20rpx;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-top: 16rpx;
}

.meta-row:first-child {
  margin-top: 0;
}

.meta-row-between {
  justify-content: space-between;
}

.meta-left {
  display: inline-flex;
  align-items: center;
  gap: 12rpx;
  min-width: 0;
}

.meta-icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
}

.meta-text {
  font-size: 26rpx;
  color: #6b7280;
  line-height: 1.45;
}

.park-link {
  font-size: 24rpx;
  color: #003367;
  white-space: nowrap;
}

.park-link-wrap {
  display: inline-flex;
  align-items: center;
  gap: 4rpx;
  padding-left: 8rpx;
}

.park-link-icon {
  width: 24rpx;
  height: 24rpx;
  flex-shrink: 0;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 20rpx;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  height: 32rpx;
  padding: 0 14rpx;
  border-radius: 999rpx;
  border: 2rpx solid transparent;
  background: #f59f0a;
  color: #ffffff;
  font-size: 20rpx;
  line-height: 1;
  font-weight: 500;
}

.subsidy-card {
  padding: 28rpx 24rpx;
  text-align: center;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.05) 100%);
}

.subsidy-label {
  display: block;
  font-size: 24rpx;
  color: #6b7280;
}

.subsidy-value {
  display: block;
  margin-top: 12rpx;
  font-size: 52rpx;
  line-height: 1;
  color: #f59f0a;
  font-weight: 700;
}

.section-card {
  padding: 32rpx;
}

.section-title-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.section-title-icon {
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
}

.section-title {
  font-size: 30rpx;
  color: #111827;
  font-weight: 700;
}

.section-content {
  display: block;
  margin-top: 20rpx;
  font-size: 26rpx;
  line-height: 1.7;
  color: #1f2937;
}

.section-content-wrap {
  white-space: pre-wrap;
}

.material-box {
  margin-top: 20rpx;
  padding: 20rpx;
  border-radius: 16rpx;
  background: rgba(241, 245, 249, 0.8);
}

.material-title {
  display: block;
  font-size: 22rpx;
  color: #111827;
  font-weight: 600;
}

.material-item {
  display: block;
  margin-top: 8rpx;
  font-size: 22rpx;
  line-height: 1.6;
  color: #6b7280;
}

.tip-box {
  margin-top: 20rpx;
  padding: 20rpx;
  border-radius: 16rpx;
  background: #eff6ff;
  border: 2rpx solid #bfdbfe;
}

.tip-title {
  display: block;
  font-size: 22rpx;
  color: #1e3a8a;
  font-weight: 600;
}

.tip-content {
  display: block;
  margin-top: 8rpx;
  font-size: 22rpx;
  line-height: 1.6;
  color: #1d4ed8;
}

.process-list {
  margin-top: 18rpx;
}

.process-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
  margin-top: 16rpx;
}

.process-item:first-child {
  margin-top: 0;
}

.process-index {
  width: 64rpx;
  height: 64rpx;
  border-radius: 999rpx;
  background: #003367;
  color: #ffffff;
  font-size: 22rpx;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.process-content {
  flex: 1;
  min-width: 0;
}

.process-title {
  display: block;
  font-size: 26rpx;
  color: #111827;
  font-weight: 600;
}

.process-desc {
  display: block;
  margin-top: 6rpx;
  font-size: 22rpx;
  line-height: 1.6;
  color: #6b7280;
}

.property-wrap {
  margin-bottom: 32rpx;
}

.property-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rpx;
}

.property-title-wrap {
  display: inline-flex;
  align-items: center;
  gap: 12rpx;
}

.property-title-icon {
  width: 36rpx;
  height: 36rpx;
}

.property-title {
  font-size: 30rpx;
  color: #111827;
  font-weight: 700;
}

.property-hint {
  font-size: 20rpx;
  color: #6b7280;
}

.property-scroll {
  margin-top: 18rpx;
  width: 100%;
  white-space: nowrap;
}

.property-list {
  display: inline-flex;
  gap: 24rpx;
  padding: 0 2rpx 8rpx;
}

.property-card {
  width: 560rpx;
  border-radius: 20rpx;
  background: rgba(241, 245, 249, 0.5);
  overflow: hidden;
  box-shadow: 0 6rpx 18rpx rgba(15, 23, 42, 0.06);
}

.property-image-wrap {
  width: 100%;
  height: 316rpx;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
}

.property-content {
  padding: 20rpx;
}

.property-name {
  display: block;
  font-size: 28rpx;
  color: #111827;
  font-weight: 700;
}

.property-specs {
  margin-top: 12rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}

.property-spec {
  display: inline-flex;
  align-items: center;
  height: 36rpx;
  padding: 0 12rpx;
  border-radius: 8rpx;
  border: 2rpx solid #e5e7eb;
  background: #ffffff;
  color: #6b7280;
  font-size: 18rpx;
}

.property-extra-row {
  margin-top: 12rpx;
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.property-extra-icon {
  width: 20rpx;
  height: 20rpx;
  flex-shrink: 0;
}

.property-extra {
  font-size: 18rpx;
  color: rgba(75, 85, 99, 0.8);
}

.park-entry-card {
  overflow: hidden;
}

.park-entry-main {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 24rpx;
}

.park-image-wrap {
  width: 160rpx;
  height: 160rpx;
  border-radius: 16rpx;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  background: #f1f5f9;
}

.park-image {
  width: 100%;
  height: 100%;
}

.park-image-mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
}

.park-image-logo {
  width: 80rpx;
  height: 80rpx;
  opacity: 0.95;
}

.park-info {
  flex: 1;
  min-width: 0;
}

.park-name {
  display: block;
  font-size: 28rpx;
  color: #111827;
  font-weight: 700;
}

.park-meta-list {
  margin-top: 8rpx;
}

.park-meta-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.park-meta-row-top {
  align-items: flex-start;
  margin-top: 4rpx;
}

.park-meta-icon {
  width: 24rpx;
  height: 24rpx;
  margin-top: 2rpx;
  flex-shrink: 0;
}

.park-meta-text {
  font-size: 20rpx;
  line-height: 1.45;
  color: #6b7280;
}

.park-meta-strong {
  color: #111827;
  font-weight: 600;
}

.line-clamp-two {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.park-arrow {
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
}

.park-entry-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14rpx 24rpx;
  background: rgba(0, 51, 103, 0.05);
  border-top: 2rpx solid rgba(0, 51, 103, 0.06);
}

.park-entry-tip {
  font-size: 18rpx;
  color: #003367;
  font-weight: 600;
}

.park-entry-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36rpx;
  padding: 0 12rpx;
  border-radius: 999rpx;
  background: #ffffff;
  border: 2rpx solid rgba(0, 51, 103, 0.2);
  font-size: 16rpx;
  color: #003367;
  font-weight: 600;
}

.contact-card {
  margin-bottom: 24rpx;
}

.contact-content {
  margin-top: 20rpx;
}

.contact-title {
  display: block;
  font-size: 26rpx;
  color: #111827;
  font-weight: 600;
}

.contact-item {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #6b7280;
}

.bottom-actions {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 20rpx 32rpx calc(20rpx + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(16rpx);
  border-top: 2rpx solid #e5e7eb;
  box-sizing: border-box;
}

.apply-btn {
  flex: 2;
  height: 96rpx;
  border-radius: 999rpx;
  border: 0;
  background: linear-gradient(135deg, #003367 0%, #004d99 100%);
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  padding: 0;
}

.apply-btn::after {
  border: 0;
}

.apply-btn-icon {
  width: 30rpx;
  height: 30rpx;
  filter: brightness(0) invert(1);
}

.minor-btn {
  flex: 1;
  height: 96rpx;
  border-radius: 24rpx;
  border: 2rpx solid rgba(107, 114, 128, 0.22);
  background: #ffffff;
  color: #6b7280;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rpx;
  padding: 0;
}

.minor-btn::after {
  border: 0;
}

.minor-btn-icon {
  width: 30rpx;
  height: 30rpx;
}

.minor-btn-text {
  font-size: 18rpx;
  line-height: 1;
  font-weight: 500;
}
</style>
