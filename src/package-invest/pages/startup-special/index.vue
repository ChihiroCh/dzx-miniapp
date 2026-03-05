<script setup>
const heroImage =
  "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/b65808e7-9399-4424-a396-3635d591ce25.png";

const partnerLogo =
  "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/d330a819-f4a1-4b04-9764-2de6287ee1f9.png";

const industries = [
  { name: "人工智能", icon: "/package-invest/static/icons/startup-special/brain.png" },
  { name: "芯片半导体", icon: "/package-invest/static/icons/startup-special/cpu.png" },
  { name: "生物医药", icon: "/package-invest/static/icons/startup-special/stethoscope.png" },
  { name: "无人驾驶", icon: "/package-invest/static/icons/startup-special/car-front.png" },
  { name: "低空经济", icon: "/package-invest/static/icons/startup-special/wind.png" },
  { name: "宠物经济", icon: "/package-invest/static/icons/startup-special/dog.png" },
];

const freeServices = [
  {
    name: "免费选址服务",
    desc: "AI智能匹配最优园区",
    icon: "/package-invest/static/icons/startup-special/map-pin.png",
    free: true,
  },
  {
    name: "免费项目报道",
    desc: "合作媒体矩阵联合宣发",
    icon: "/package-invest/static/icons/startup-special/newspaper.png",
    free: true,
  },
  {
    name: "投融资对接",
    desc: "直连一线VC与产业基金",
    icon: "/package-invest/static/icons/startup-special/trending-up.png",
    free: true,
  },
];

const premiumServices = [
  {
    name: "工商财税",
    desc: "一站式公司代办与税务筹划",
    icon: "/package-invest/static/icons/startup-special/calculator.png",
  },
  {
    name: "环评许可",
    desc: "专业环评机构驻场指导",
    icon: "/package-invest/static/icons/startup-special/file-check.png",
  },
  {
    name: "高新申报",
    desc: "专业团队全程跟进提升通过率",
    icon: "/package-invest/static/icons/startup-special/award.png",
  },
];

const partners = [
  {
    name: "36Kr",
    desc: "业界领先的创业服务平台",
    logo: partnerLogo,
  },
];

const openConsult = () => {
  uni.navigateTo({
    url: "/package-invest/pages/ai-chat/index",
  });
};

const openPartner = (item) => {
  uni.showToast({
    title: `已打开 ${item.name}`,
    icon: "none",
  });
};
</script>

<template>
  <view class="startup-page">
    <view class="section hero-section">
      <view class="hero-image-wrap">
        <image class="hero-image" :src="heroImage" mode="aspectFill" />
        <view class="hero-overlay" />
      </view>

      <view class="intro-card">
        <text class="intro-title">什么是初创企业？</text>
        <text class="intro-desc">
          初创企业是指处于创业初期，具有较强创新能力和高成长潜力的企业。大招象致力于为硬科技初创团队提供全生命周期的空间配套与政策扶持。
        </text>
        <view class="intro-tip-wrap">
          <text class="intro-tip">🎯 大招象致力于为硬科技初创团队提供全生命周期支持</text>
        </view>
      </view>
    </view>

    <view class="section industries-section">
      <view class="section-head">
        <text class="section-title">我们支持的产业</text>
        <text class="section-subtitle">聚焦硬科技领域，为创新企业提供专业支持</text>
      </view>

      <view class="industry-grid">
        <view
          v-for="item in industries"
          :key="`industry-${item.name}`"
          class="industry-card"
        >
          <view class="industry-icon-wrap">
            <image class="industry-icon" :src="item.icon" mode="aspectFit" />
          </view>
          <text class="industry-name">{{ item.name }}</text>
        </view>
      </view>
    </view>

    <view class="section services-section">
      <view class="section-head">
        <text class="section-title">我们可以提供的服务</text>
        <text class="section-subtitle">从选址到政策申报，全流程专业支持</text>
      </view>

      <view class="service-group">
        <view class="group-head">
          <view class="group-mark group-mark-accent" />
          <text class="group-title">免费服务</text>
        </view>

        <view class="service-list">
          <view
            v-for="item in freeServices"
            :key="`free-${item.name}`"
            class="service-card"
          >
            <view class="service-icon-wrap service-icon-wrap-accent">
              <image class="service-icon" :src="item.icon" mode="aspectFit" />
            </view>

            <view class="service-main">
              <view class="service-title-row">
                <text class="service-title">{{ item.name }}</text>
                <view class="free-badge"><text class="free-badge-text">免费</text></view>
              </view>
              <text class="service-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="service-group">
        <view class="group-head">
          <view class="group-mark group-mark-primary" />
          <text class="group-title">增值服务</text>
        </view>

        <view class="service-list">
          <view
            v-for="item in premiumServices"
            :key="`premium-${item.name}`"
            class="service-card"
          >
            <view class="service-icon-wrap service-icon-wrap-primary">
              <image class="service-icon" :src="item.icon" mode="aspectFit" />
            </view>

            <view class="service-main">
              <text class="service-title">{{ item.name }}</text>
              <text class="service-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="section partners-section">
      <view class="section-head">
        <text class="section-title">合作伙伴</text>
        <text class="section-subtitle">与业界领先机构深度合作，为初创企业赋能</text>
      </view>

      <view class="partner-list">
        <view
          v-for="item in partners"
          :key="`partner-${item.name}`"
          class="partner-card"
          @tap="openPartner(item)"
        >
          <view class="partner-logo-wrap">
            <image class="partner-logo" :src="item.logo" mode="aspectFill" />
          </view>

          <view class="partner-main">
            <text class="partner-name">{{ item.name }}</text>
            <text class="partner-desc">{{ item.desc }}</text>
          </view>

          <image
            class="partner-arrow"
            :src="'/package-invest/static/icons/startup-special/arrow-right.png'"
            mode="aspectFit"
          />
        </view>
      </view>

      <view class="cta-card">
        <text class="cta-title">准备好开启创业之旅了吗？</text>
        <text class="cta-desc">大招象为初创企业提供从选址到落地的全链路服务支持</text>

        <view class="cta-btn-wrap">
          <button class="cta-btn" @tap="openConsult">立即咨询</button>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.startup-page {
  min-height: 100vh;
  background: #ffffff;
  padding-bottom: 64rpx;
}

.section {
  padding: 48rpx 32rpx;
  box-sizing: border-box;
}

.hero-section {
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.hero-image-wrap {
  position: relative;
  width: 100%;
  height: 384rpx;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(10, 46, 90, 0.12);
}

.hero-image {
  width: 100%;
  height: 100%;
}

.hero-overlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
}

.intro-card {
  border-radius: 16rpx;
  border: 2rpx solid rgba(0, 51, 103, 0.2);
  background: linear-gradient(135deg, rgba(0, 51, 103, 0.05), rgba(245, 159, 10, 0.05));
  box-shadow: 0 4rpx 12rpx rgba(15, 23, 42, 0.06);
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 18rpx;
}

.intro-title {
  display: block;
  font-size: 36rpx;
  line-height: 50rpx;
  color: #111827;
  font-weight: 700;
}

.intro-desc {
  display: block;
  font-size: 28rpx;
  line-height: 44rpx;
  color: rgba(17, 24, 39, 0.8);
}

.intro-tip-wrap {
  padding-top: 14rpx;
  border-top: 2rpx solid rgba(0, 51, 103, 0.1);
}

.intro-tip {
  display: block;
  font-size: 22rpx;
  line-height: 34rpx;
  color: #003367;
  font-weight: 600;
}

.section-head {
  display: flex;
  flex-direction: column;
  row-gap: 10rpx;
}

.section-title {
  display: block;
  font-size: 36rpx;
  line-height: 50rpx;
  color: #111827;
  font-weight: 700;
}

.section-subtitle {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #6b7280;
}

.industry-grid {
  margin-top: 16rpx;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24rpx;
}

.industry-card {
  border-radius: 16rpx;
  border: 2rpx solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(15, 23, 42, 0.06);
  padding: 32rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 16rpx;
  text-align: center;
}

.industry-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  background: rgba(0, 51, 103, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.industry-icon {
  width: 40rpx;
  height: 40rpx;
}

.industry-name {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
  font-weight: 600;
}

.services-section {
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.service-group {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.group-head {
  display: flex;
  align-items: center;
  column-gap: 12rpx;
}

.group-mark {
  width: 8rpx;
  height: 40rpx;
  border-radius: 999rpx;
}

.group-mark-accent {
  background: #f59f0a;
}

.group-mark-primary {
  background: #003367;
}

.group-title {
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
  font-weight: 600;
}

.service-list {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.service-card {
  border-radius: 16rpx;
  border: 2rpx solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(15, 23, 42, 0.06);
  padding: 24rpx;
  display: flex;
  align-items: flex-start;
  column-gap: 16rpx;
}

.service-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2rpx;
}

.service-icon-wrap-accent {
  background: rgba(245, 159, 10, 0.1);
}

.service-icon-wrap-primary {
  background: rgba(0, 51, 103, 0.1);
}

.service-icon {
  width: 36rpx;
  height: 36rpx;
}

.service-main {
  flex: 1;
  min-width: 0;
}

.service-title-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 6rpx;
}

.service-title {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
  font-weight: 600;
}

.free-badge {
  height: 36rpx;
  padding: 0 16rpx;
  border-radius: 999rpx;
  background: #f59f0a;
  display: inline-flex;
  align-items: center;
}

.free-badge-text {
  color: #ffffff;
  font-size: 20rpx;
  line-height: 1;
  font-weight: 600;
}

.service-desc {
  display: block;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #6b7280;
}

.partners-section {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.partner-list {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.partner-card {
  border-radius: 16rpx;
  border: 2rpx solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(15, 23, 42, 0.06);
  padding: 24rpx;
  display: flex;
  align-items: center;
  column-gap: 16rpx;
}

.partner-logo-wrap {
  width: 128rpx;
  height: 128rpx;
  border-radius: 12rpx;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
}

.partner-logo {
  width: 100%;
  height: 100%;
}

.partner-main {
  flex: 1;
  min-width: 0;
}

.partner-name {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
  font-weight: 600;
}

.partner-desc {
  display: block;
  margin-top: 6rpx;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #6b7280;
}

.partner-arrow {
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
  opacity: 0.6;
}

.cta-card {
  margin-top: 48rpx;
  border-radius: 16rpx;
  border: 2rpx solid rgba(0, 51, 103, 0.3);
  background: linear-gradient(135deg, rgba(0, 51, 103, 0.1), rgba(245, 159, 10, 0.1));
  padding: 48rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.cta-title {
  display: block;
  font-size: 32rpx;
  line-height: 44rpx;
  color: #111827;
  font-weight: 700;
}

.cta-desc {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  color: rgba(17, 24, 39, 0.72);
}

.cta-btn-wrap {
  padding-top: 8rpx;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 80rpx;
  border-radius: 16rpx;
  padding: 20rpx 48rpx;
  background: #003367;
  color: #ffffff;
  border: 0;
  font-size: 28rpx;
  line-height: 1;
  font-weight: 600;
}

.cta-btn::after {
  border: 0;
}
</style>
