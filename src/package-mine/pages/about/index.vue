<script setup>
const storyPoints = [
  {
    title: "真实底层数据：",
    desc: "所有厂房均来自政府备案园区，信息经官方认证，厂房信息唯一识别技术，杜绝虚假与重复，物理参数、租赁状态等核心信息全核实，确保真实可追溯，让您安心享受招商引资政策。",
  },
  {
    title: "智能AI经纪人：",
    desc: "通过对话洞察您的需求，从厂房物理条件、地方产业政策、行业配套生态三大维度，为您提供结构化的分析推荐，辅助科学决策。",
  },
  {
    title: "直连洽谈通道：",
    desc: "小程序内嵌园区直通功能，您可直接与招商方沟通，告别中介传话的延迟与误差，让对接更高效、落地更顺畅。",
  },
];

const storyBlocks = [
  {
    title: "我们的使命",
    icon: "/package-mine/static/icons/about/target-primary.png",
    desc: "通过AI大模型和数字化平台，让企业快速找到最适合发展的产业生态环境，降低选址成本，加速产业升级。",
  },
  {
    title: "我们的愿景",
    icon: "/package-mine/static/icons/about/lightbulb-primary.png",
    desc: "成为全国领先的产业招商数字化服务平台，连接政府园区、企业和生态伙伴，打造透明、高效、可信的厂房租赁生态。",
  },
  {
    title: "我们的故事",
    icon: "/package-mine/static/icons/about/book-open-primary.png",
    desc: "大招象诞生于对产业招商痛点的深刻理解。我们发现，企业找厂房困难重重——信息不透明、中介众多、政策复杂。因此，我们决定直接与政府园区合作，整合真实房源和产业数据，用AI技术为企业提供智能匹配和全程顾问服务。",
  },
];

const stats = [
  {
    value: "100+",
    label: "覆盖城市",
    desc: "服务覆盖全国超100个城市",
  },
  {
    value: "3000+",
    label: "合作园区",
    desc: "与全国3000个产业园区达成合作",
  },
  {
    value: "10000+",
    label: "助力落地",
    desc: "累计助力10000家企业成功落地",
  },
  {
    value: "1000万+",
    label: "租赁面积",
    desc: "平台租赁总面积超过1000万平方米",
  },
  {
    value: "100万+",
    label: "平台会员",
    desc: "小程序会员已突破100万人",
    wide: true,
  },
];

const coreValues = [
  {
    title: "信息可信",
    desc: "所有房源信息均来自政府备案园区，官方认证，假一赔百。",
    icon: "/package-mine/static/icons/about/circle-check-green.png",
  },
  {
    title: "直连园区",
    desc: "去除中介环节，直接与园区招商负责人沟通，高效落地。",
    icon: "/package-mine/static/icons/about/link-2-blue.png",
  },
  {
    title: "智能匹配",
    desc: "AI大模型深度分析需求，精准推荐最适合的产业生态环境。",
    icon: "/package-mine/static/icons/about/zap-yellow.png",
  },
  {
    title: "全程顾问",
    desc: "1对1专属顾问，提供从选房到政策申报的全流程支持。",
    icon: "/package-mine/static/icons/about/users-purple.png",
  },
];

const partnerGroups = [
  {
    title: "政府园区合作伙伴",
    items: ["张江科学城", "临港新片区", "浦东新区", "闵行经开区", "嘉定工业区", "松江工业区"],
  },
  {
    title: "产业联盟合作伙伴",
    items: [
      "中国生物医药产业联盟",
      "新能源汽车产业联盟",
      "集成电路产业联盟",
      "人工智能产业联盟",
      "绿色制造产业联盟",
      "智能装备产业联盟",
    ],
  },
  {
    title: "金融机构合作伙伴",
    items: ["工商银行", "建设银行", "招商银行", "浦发银行", "民生银行", "中信银行"],
  },
];

const footerLinks = [
  { key: "about", label: "关于我们" },
  { key: "business", label: "商务合作" },
  { key: "privacy", label: "隐私政策" },
];

const footerPartners = ["政府园区", "产业联盟", "金融机构"];

const onFooterLinkTap = (key) => {
  if (key === "about") {
    return;
  }
  if (key === "business") {
    uni.navigateTo({
      url: "/package-mine/pages/business-cooperation/index",
    });
    return;
  }
  if (key === "privacy") {
    uni.showToast({
      title: "隐私政策开发中",
      icon: "none",
    });
  }
};
</script>

<template>
  <view class="about-page">
    <view class="section section-brand">
      <view class="story-card">
        <view class="story-content">
          <text class="story-text">
            在传统厂房租赁领域，海量信息真伪难辨、参数混乱、中介传递低效，企业选址往往耗时费力、充满不确定性。大招象以人工智能与数字化技术，重新定义厂房租赁——我们不仅是信息平台，更是您的智能决策伙伴。
          </text>

          <text class="story-highlight">
            我们以自研AI厂房投资大模型为核心，打造了"信息可信、直连园区、决策分析"的全新服务体系：
          </text>

          <view class="story-points">
            <view v-for="item in storyPoints" :key="item.title" class="story-point">
              <view class="story-dot" />
              <text class="story-point-text">
                <text class="story-point-title">{{ item.title }}</text>{{ item.desc }}
              </text>
            </view>
          </view>

          <text class="story-note">
            我们只合作规范稳定的产业园区，帮助企业规避私人厂房风险，让每一笔实业投资都建立在可信的起点上。
          </text>
        </view>
      </view>

      <view class="story-blocks">
        <view v-for="item in storyBlocks" :key="item.title" class="story-block-item">
          <view class="story-block-head">
            <view class="story-block-icon-wrap">
              <image class="story-block-icon" :src="item.icon" mode="aspectFit" />
            </view>
            <text class="story-block-title">{{ item.title }}</text>
          </view>
          <text class="story-block-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>

    <view class="section">
      <text class="section-title">我们的成就</text>
      <view class="stats-grid">
        <view v-for="item in stats" :key="item.label" class="stats-card" :class="{ 'stats-card-wide': item.wide }">
          <text class="stats-value">{{ item.value }}</text>
          <text class="stats-label">{{ item.label }}</text>
          <text class="stats-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>

    <view class="section">
      <text class="section-title">核心价值观</text>
      <view class="core-list">
        <view v-for="item in coreValues" :key="item.title" class="core-card">
          <view class="core-icon-wrap">
            <image class="core-icon" :src="item.icon" mode="aspectFit" />
          </view>
          <view class="core-main">
            <text class="core-title">{{ item.title }}</text>
            <text class="core-desc">{{ item.desc }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section section-last">
      <text class="section-title">合作伙伴</text>

      <view class="partner-groups">
        <view v-for="group in partnerGroups" :key="group.title" class="partner-group">
          <text class="partner-group-title">{{ group.title }}</text>

          <view class="partner-grid">
            <view v-for="name in group.items" :key="name" class="partner-card">
              <view class="partner-card-body">
                <view class="partner-logo-wrap">
                  <text class="partner-logo-emoji">🏢</text>
                </view>
                <text class="partner-name">{{ name }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="partner-note-card">
        <text class="partner-note-title">持续扩展合作伙伴</text>
        <text class="partner-note-desc">
          大招象致力于与更多政府园区、产业联盟和金融机构建立合作关系，为企业提供更全面的产业招商服务。
        </text>
      </view>
    </view>

    <view class="about-footer">
      <view class="about-footer-inner">
        <view class="footer-links">
          <text
            v-for="item in footerLinks"
            :key="item.key"
            class="footer-link-item"
            @tap="onFooterLinkTap(item.key)"
          >
            {{ item.label }}
          </text>
        </view>

        <view class="footer-partners">
          <text class="footer-partners-title">合作伙伴</text>
          <view class="footer-partners-tags">
            <view v-for="item in footerPartners" :key="item" class="footer-partner-tag">{{ item }}</view>
          </view>
        </view>

        <view class="footer-copyright">
          <text class="footer-copyright-text">租厂房直接和园区谈</text>
          <text class="footer-copyright-text">© 2026 大招象 版权所有</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
page {
  background-color: #fff;
}
</style>

<style scoped>
.about-page {
  min-height: 100vh;
  background: #ffffff;
  padding-bottom: 40rpx;
}

.section {
  padding: 64rpx 32rpx 0;
}

.section-last {
  padding-bottom: 64rpx;
}

.section-title {
  display: block;
  font-size: 36rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 48rpx;
}

.story-card {
  border-radius: 32rpx;
  border: 2rpx solid rgba(0, 51, 103, 0.1);
  background: rgba(0, 51, 103, 0.05);
  padding: 48rpx;
}

.story-content {
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.story-text,
.story-point-text {
  font-size: 28rpx;
  line-height: 1.75;
  color: #64748b;
}

.story-highlight {
  font-size: 28rpx;
  line-height: 1.7;
  color: #003367;
  font-weight: 600;
}

.story-points {
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.story-point {
  display: flex;
  column-gap: 24rpx;
}

.story-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  margin-top: 16rpx;
  flex-shrink: 0;
  background: #003367;
}

.story-point-title {
  font-weight: 600;
  color: #0f172a;
}

.story-note {
  padding-top: 32rpx;
  border-top: 2rpx solid #e2e8f0;
  font-size: 24rpx;
  line-height: 1.65;
  color: #64748b;
  font-style: italic;
}

.story-blocks {
  margin-top: 48rpx;
  display: flex;
  flex-direction: column;
  row-gap: 48rpx;
}

.story-block-item {
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.story-block-head {
  display: flex;
  align-items: center;
  column-gap: 24rpx;
}

.story-block-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  background: rgba(0, 51, 103, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.story-block-icon {
  width: 40rpx;
  height: 40rpx;
}

.story-block-title {
  font-size: 36rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #0f172a;
}

.story-block-desc {
  padding-left: 104rpx;
  font-size: 28rpx;
  line-height: 1.75;
  color: #64748b;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24rpx;
}

.stats-card {
  border-radius: 20rpx;
  border: 2rpx solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.08);
  padding: 32rpx;
  text-align: center;
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.stats-card-wide {
  grid-column: span 2 / span 2;
}

.stats-value {
  font-size: 48rpx;
  line-height: 1.2;
  font-weight: 700;
  color: #003367;
}

.stats-label {
  font-size: 28rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #0f172a;
}

.stats-desc {
  font-size: 24rpx;
  line-height: 1.5;
  color: #64748b;
}

.core-list {
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.core-card {
  border-radius: 20rpx;
  border: 2rpx solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.08);
  padding: 32rpx;
  display: flex;
  column-gap: 24rpx;
}

.core-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  border-radius: 16rpx;
  background: #eef2f7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.core-icon {
  width: 48rpx;
  height: 48rpx;
}

.core-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  row-gap: 8rpx;
}

.core-title {
  font-size: 30rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #0f172a;
}

.core-desc {
  font-size: 28rpx;
  line-height: 1.7;
  color: #64748b;
}

.partner-groups {
  display: flex;
  flex-direction: column;
  row-gap: 64rpx;
}

.partner-group {
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.partner-group-title {
  font-size: 28rpx;
  line-height: 1.35;
  font-weight: 600;
  color: #0f172a;
}

.partner-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24rpx;
}

.partner-card {
  border-radius: 20rpx;
  border: 2rpx solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.08);
  min-height: 160rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16rpx;
}

.partner-logo-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  background: #eef2f7;
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-logo-emoji {
  font-size: 36rpx;
  line-height: 1;
}

.partner-name {
  text-align: center;
  font-size: 24rpx;
  line-height: 1.45;
  font-weight: 500;
  color: #0f172a;
}

.partner-note-card {
  margin-top: 48rpx;
  border-radius: 20rpx;
  border: 2rpx solid rgba(0, 51, 103, 0.2);
  background: rgba(0, 51, 103, 0.05);
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.partner-note-title {
  font-size: 28rpx;
  line-height: 1.35;
  font-weight: 500;
  color: #0f172a;
}

.partner-note-desc {
  font-size: 24rpx;
  line-height: 1.65;
  color: #64748b;
}

.about-footer {
  margin-top: auto;
  border-top: 2rpx solid #e2e8f0;
  background: #ffffff;
}

.about-footer-inner {
  padding: 48rpx 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 48rpx;
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 48rpx;
  row-gap: 16rpx;
}

.footer-link-item {
  font-size: 26rpx;
  line-height: 1.45;
  color: #64748b;
}

.footer-partners {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.footer-partners-title {
  text-align: center;
  font-size: 22rpx;
  line-height: 1.35;
  color: #64748b;
}

.footer-partners-tags {
  display: flex;
  justify-content: center;
  column-gap: 16rpx;
  row-gap: 16rpx;
  flex-wrap: wrap;
}

.footer-partner-tag {
  padding: 8rpx 24rpx;
  border-radius: 12rpx;
  background: #f1f5f9;
  font-size: 22rpx;
  line-height: 1.35;
  color: #64748b;
}

.footer-copyright {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8rpx;
}

.footer-copyright-text {
  text-align: center;
  font-size: 22rpx;
  line-height: 1.45;
  color: #64748b;
  opacity: 0.8;
}
</style>
