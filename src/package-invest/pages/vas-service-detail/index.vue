<script setup>
import { computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const detail = ref({
  title: "高新技术企业认定申报",
  category: "企业认证",
  description: "帮助企业获得高新技术企业资质，享受税收优惠和政策扶持",
});

const stats = [
  { value: "98%", label: "申报成功率" },
  { value: "15天", label: "平均办理周期" },
  { value: "2000+", label: "成功案例" },
];

const contentSections = [
  {
    title: "服务包含内容",
    items: [
      "企业资质评估与可行性分析",
      "研发费用归集与财务梳理",
      "技术创新点提炼与文档编制",
      "知识产权整理与申报指导",
      "申报材料撰写与专家评审",
      "政府部门沟通与跟进",
    ],
  },
  {
    title: "服务优势",
    items: [
      "专业团队：拥有10年+申报经验的专家团队",
      "高成功率：98%的申报成功率，业界领先",
      "全程陪同：从评估到获批的全流程专业指导",
      "政策解读：实时更新最新政策要求和评审标准",
      "后续支持：获批后的维护和复审指导",
    ],
  },
  {
    title: "适用企业",
    items: [
      "从事软件开发、集成电路、新材料等高新技术领域",
      "研发投入占比不低于总收入的5%",
      "拥有自主知识产权或核心技术",
      "年收入在5000万元以下的企业优先",
    ],
  },
];

const processSteps = [
  {
    title: "初步评估",
    duration: "1-2天",
    description: "评估企业是否符合高新技术企业认定条件",
    icon: "/package-invest/static/icons/vas-service-detail/clipboard-list-white.png",
  },
  {
    title: "材料准备",
    duration: "3-5天",
    description: "收集企业营业执照、财务报表、研发证明等材料",
    icon: "/package-invest/static/icons/vas-service-detail/file-text-white.png",
  },
  {
    title: "申报文件编制",
    duration: "5-7天",
    description: "撰写技术创新说明书、研发费用汇总表等申报文件",
    icon: "/package-invest/static/icons/vas-service-detail/pen-tool-white.png",
  },
  {
    title: "政府部门申报",
    duration: "1天",
    description: "向科技部门提交申报材料，进入审核流程",
    icon: "/package-invest/static/icons/vas-service-detail/send-white.png",
  },
  {
    title: "专家评审",
    duration: "30-45天",
    description: "等待专家组评审，可能需要补充材料",
    icon: "/package-invest/static/icons/vas-service-detail/users-white.png",
  },
  {
    title: "获批与公示",
    duration: "7-10天",
    description: "获得高新技术企业证书，享受税收优惠",
    icon: "/package-invest/static/icons/vas-service-detail/award-white.png",
  },
];

const materialTabs = ["基础材料", "财务材料", "技术材料"];
const activeMaterialTab = ref("基础材料");

const materialMap = {
  基础材料: [
    { name: "营业执照副本", desc: "企业法人营业执照复印件", required: true },
    { name: "组织机构代码证", desc: "组织机构代码证复印件", required: true },
    { name: "税务登记证", desc: "国税、地税登记证复印件", required: true },
    { name: "企业章程", desc: "企业章程或合伙协议", required: false },
  ],
  财务材料: [
    { name: "近三年财务报表", desc: "资产负债表、利润表、现金流量表", required: true },
    { name: "研发费用专项审计", desc: "会计师事务所出具的专项审计报告", required: true },
    { name: "纳税申报表", desc: "企业所得税和增值税纳税申报资料", required: false },
  ],
  技术材料: [
    { name: "知识产权证明", desc: "专利、软著、商标等证书材料", required: true },
    { name: "核心技术说明", desc: "关键技术路线、创新点及应用场景", required: true },
    { name: "研发项目立项资料", desc: "项目计划书与阶段成果文档", required: false },
  ],
};

const currentMaterials = computed(() => materialMap[activeMaterialTab.value] || []);

const successCases = [
  {
    name: "智能制造科技有限公司",
    industry: "智能制造",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/5b3f9ce5-c04d-4b4e-958c-3147998fd0fa.png",
    benefit: "获得研发费用加计扣除75%",
    taxSaving: "年度节税约150万元",
  },
  {
    name: "生物医药研发中心",
    industry: "生物医药",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/b770dfd3-bf60-4c9c-8c1e-177704a44e9d.png",
    benefit: "获得企业所得税减按15%征收",
    taxSaving: "年度节税约200万元",
  },
  {
    name: "软件开发有限公司",
    industry: "软件与信息技术",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/b83757a5-4e25-475a-8185-5493d6a79270.png",
    benefit: "获得软件产品增值税优惠",
    taxSaving: "年度节税约120万元",
  },
];

const decode = (value) => {
  if (!value) {
    return "";
  }
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
};

onLoad((query) => {
  const title = decode(query?.title);
  const category = decode(query?.category);
  const description = decode(query?.description);

  detail.value = {
    title: title ? `${title}申报` : "高新技术企业认定申报",
    category: category || "企业认证",
    description: description || "帮助企业获得高新技术企业资质，享受税收优惠和政策扶持",
  };
});

const switchMaterialTab = (tab) => {
  activeMaterialTab.value = tab;
};

const goAiChat = () => {
  uni.navigateTo({
    url: "/package-invest/pages/ai-chat/index",
  });
};

const callAdvisor = () => {
  uni.makePhoneCall({
    phoneNumber: "4008888888",
  });
};
</script>

<template>
  <view class="page">
    <view class="section header-section">
      <view class="header-main">
        <view class="header-icon-box">
          <image class="header-icon" :src="'/package-invest/static/icons/vas-service-detail/zap-white.png'" mode="aspectFit" />
        </view>

        <view class="header-info">
          <text class="header-title">{{ detail.title }}</text>
          <text class="header-sub">{{ detail.category }}</text>
          <text class="header-desc">{{ detail.description }}</text>
        </view>
      </view>

      <view class="stats-grid">
        <view v-for="item in stats" :key="`stat-${item.label}`" class="stat-card">
          <text class="stat-value">{{ item.value }}</text>
          <text class="stat-label">{{ item.label }}</text>
        </view>
      </view>
    </view>

    <view class="section content-section">
      <view v-for="section in contentSections" :key="section.title" class="content-block">
        <text class="content-title">{{ section.title }}</text>

        <view class="content-list">
          <view v-for="(item, idx) in section.items" :key="`${section.title}-${idx}`" class="content-item">
            <image class="content-icon" :src="'/package-invest/static/icons/vas-service-detail/circle-check-primary.png'" mode="aspectFit" />
            <text class="content-text">{{ item }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section process-section">
      <text class="section-title">办理流程</text>

      <view class="process-list">
        <view v-for="(step, idx) in processSteps" :key="step.title" class="process-row">
          <view v-if="idx !== processSteps.length - 1" class="process-line" />

          <view class="process-card">
            <view class="process-card-inner">
              <view class="process-icon-wrap">
                <image class="process-icon" :src="step.icon" mode="aspectFit" />
              </view>

              <view class="process-info">
                <view class="process-head">
                  <text class="process-name">{{ step.title }}</text>
                  <text class="process-time">{{ step.duration }}</text>
                </view>
                <text class="process-desc">{{ step.description }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="cycle-card">
        <image class="cycle-icon" :src="'/package-invest/static/icons/vas-service-detail/clock-accent.png'" mode="aspectFit" />
        <view class="cycle-info">
          <text class="cycle-title">预计总周期</text>
          <text class="cycle-desc">从初步评估到获批约45-60天</text>
        </view>
      </view>
    </view>

    <view class="section material-section">
      <text class="section-title material-title">所需材料</text>

      <view class="tab-wrap">
        <view class="tab-list">
          <view
            v-for="tab in materialTabs"
            :key="tab"
            class="tab-item"
            :class="{ 'tab-item-active': activeMaterialTab === tab }"
            @tap="switchMaterialTab(tab)"
          >
            <text class="tab-text" :class="{ 'tab-text-active': activeMaterialTab === tab }">{{ tab }}</text>
          </view>
        </view>
      </view>

      <view class="material-list">
        <view v-for="item in currentMaterials" :key="item.name" class="material-card" :class="{ 'material-card-required': item.required }">
          <view class="material-card-inner">
            <image
              class="material-icon"
              :src="item.required ? '/package-invest/static/icons/vas-service-detail/circle-alert-red.png' : '/package-invest/static/icons/vas-service-detail/circle-check-primary.png'"
              mode="aspectFit"
            />

            <view class="material-info">
              <view class="material-head">
                <text class="material-name">{{ item.name }}</text>
                <text class="material-tag" :class="item.required ? 'material-tag-required' : 'material-tag-optional'">{{ item.required ? '必需' : '可选' }}</text>
              </view>
              <text class="material-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="tip-card">
        <image class="tip-icon" :src="'/package-invest/static/icons/vas-service-detail/info-blue.png'" mode="aspectFit" />
        <view class="tip-info">
          <text class="tip-title">温馨提示</text>
          <text class="tip-desc">所有材料需提供原件或加盖企业公章的复印件。具体要求可能因地区而异，建议咨询我们的专业顾问获取最新要求。</text>
        </view>
      </view>
    </view>

    <view class="section case-section">
      <text class="section-title">成功案例</text>

      <view class="case-list">
        <view v-for="caseItem in successCases" :key="caseItem.name" class="case-card">
          <view class="case-cover-wrap">
            <image class="case-cover" :src="caseItem.image" mode="aspectFill" />
            <view class="case-cover-mask" />
            <view class="case-cover-text">
              <text class="case-name">{{ caseItem.name }}</text>
              <text class="case-industry">{{ caseItem.industry }}</text>
            </view>
          </view>

          <view class="case-body">
            <view class="case-row">
              <image class="case-icon" :src="'/package-invest/static/icons/vas-service-detail/circle-check-primary.png'" mode="aspectFit" />
              <view class="case-row-info">
                <text class="case-row-label">认定结果</text>
                <text class="case-row-value">成功认定为高新技术企业</text>
              </view>
            </view>

            <view class="case-row">
              <image class="case-icon" :src="'/package-invest/static/icons/vas-service-detail/trending-up-accent.png'" mode="aspectFit" />
              <view class="case-row-info">
                <text class="case-row-label">获得优惠</text>
                <text class="case-row-value">{{ caseItem.benefit }}</text>
              </view>
            </view>

            <view class="case-highlight">
              <image class="case-icon" :src="'/package-invest/static/icons/vas-service-detail/dollar-sign-accent.png'" mode="aspectFit" />
              <view class="case-row-info">
                <text class="case-row-label">税收节省</text>
                <text class="case-highlight-value">{{ caseItem.taxSaving }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="case-tip-card">
        <text class="case-tip-title">想要获得类似的成功案例？</text>
        <text class="case-tip-desc">联系我们的专业顾问，为您的企业量身定制认定方案</text>
      </view>
    </view>

    <view class="bottom-fixed">
      <view class="bottom-action bottom-action-primary" hover-class="bottom-action-hover" hover-stay-time="80" @tap="goAiChat">
        <image class="bottom-action-icon" :src="'/package-invest/static/icons/park-bottom-actions/message-circle.png'" mode="aspectFit" />
        <text class="bottom-action-text bottom-action-text-primary">立即咨询AI助手</text>
      </view>

      <view class="bottom-action bottom-action-secondary" hover-class="bottom-action-hover" hover-stay-time="80" @tap="callAdvisor">
        <image class="bottom-action-icon" :src="'/package-invest/static/icons/park-bottom-actions/phone.png'" mode="aspectFit" />
        <text class="bottom-action-text bottom-action-text-secondary">联系专属顾问</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #ffffff;
  padding-bottom: 300rpx;
}

.section {
  padding: 48rpx 32rpx;
}

.header-section {
  padding-top: 48rpx;
}

.header-main {
  display: flex;
  align-items: flex-start;
  column-gap: 24rpx;
}

.header-icon-box {
  width: 128rpx;
  height: 128rpx;
  border-radius: 20rpx;
  background: linear-gradient(135deg, #003367 0%, #0a5ca7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon {
  width: 64rpx;
  height: 64rpx;
}

.header-info {
  flex: 1;
  min-width: 0;
}

.header-title {
  display: block;
  font-size: 40rpx;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.35;
  margin-bottom: 8rpx;
}

.header-sub {
  display: block;
  font-size: 24rpx;
  color: #64748b;
  line-height: 1.3;
  margin-bottom: 12rpx;
}

.header-desc {
  display: block;
  font-size: 26rpx;
  line-height: 1.6;
  color: #334155;
}

.stats-grid {
  margin-top: 32rpx;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16rpx;
}

.stat-card {
  border-radius: 16rpx;
  background: #f8fafc;
  padding: 20rpx 12rpx;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 34rpx;
  font-weight: 700;
  color: #003367;
  line-height: 1.2;
}

.stat-label {
  display: block;
  margin-top: 6rpx;
  font-size: 22rpx;
  color: #64748b;
  line-height: 1.3;
}

.content-section {
  padding-top: 0;
}

.content-block + .content-block {
  margin-top: 28rpx;
}

.content-title {
  display: block;
  font-size: 34rpx;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 16rpx;
  line-height: 1.35;
}

.content-list {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.content-item {
  border-radius: 14rpx;
  background: #f8fafc;
  padding: 20rpx 20rpx;
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
}

.content-icon {
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
  margin-top: 2rpx;
}

.content-text {
  flex: 1;
  font-size: 26rpx;
  line-height: 1.55;
  color: #334155;
}

.process-section {
  padding-top: 8rpx;
}

.section-title {
  display: block;
  font-size: 34rpx;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.35;
  margin-bottom: 24rpx;
}

.process-list {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.process-row {
  position: relative;
}

.process-line {
  position: absolute;
  left: 64rpx;
  top: auto;
  width: 2rpx;
  height: 16rpx;
  bottom: -16rpx;
  background: linear-gradient(180deg, #003367 0%, rgba(0, 51, 103, 0.25) 100%);
  z-index: 2;
}

.process-card {
  position: relative;
  z-index: 1;
  border-radius: 16rpx;
  border: 2rpx solid #e2e8f0;
  border-left: 8rpx solid #003367;
  background: #ffffff;
  box-shadow: 0 4rpx 16rpx rgba(15, 23, 42, 0.04);
}

.process-card-inner {
  padding: 24rpx;
  display: flex;
  align-items: flex-start;
  column-gap: 16rpx;
}

.process-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 999rpx;
  background: linear-gradient(135deg, #003367 0%, #0a5ca7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.process-icon {
  width: 38rpx;
  height: 38rpx;
}

.process-info {
  flex: 1;
  min-width: 0;
}

.process-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  column-gap: 12rpx;
  margin-bottom: 8rpx;
}

.process-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.35;
}

.process-time {
  font-size: 20rpx;
  color: #003367;
  background: rgba(0, 51, 103, 0.1);
  border-radius: 999rpx;
  padding: 6rpx 14rpx;
  line-height: 1.2;
  flex-shrink: 0;
}

.process-desc {
  display: block;
  font-size: 24rpx;
  line-height: 1.5;
  color: #64748b;
}

.cycle-card {
  margin-top: 24rpx;
  border-radius: 16rpx;
  border: 2rpx solid rgba(245, 159, 10, 0.35);
  background: rgba(245, 159, 10, 0.12);
  padding: 24rpx;
  display: flex;
  align-items: center;
  column-gap: 16rpx;
}

.cycle-icon {
  width: 40rpx;
  height: 40rpx;
  flex-shrink: 0;
}

.cycle-info {
  min-width: 0;
}

.cycle-title {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.3;
}

.cycle-desc {
  display: block;
  margin-top: 6rpx;
  font-size: 22rpx;
  line-height: 1.5;
  color: #64748b;
}

.material-section {
  padding-top: 0;
}

.material-title {
  margin-bottom: 16rpx;
}

.tab-wrap {
  border-radius: 14rpx;
  background: #f1f5f9;
  padding: 8rpx;
}

.tab-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 8rpx;
}

.tab-item {
  border-radius: 10rpx;
  padding: 14rpx 8rpx;
  text-align: center;
}

.tab-item-active {
  background: #ffffff;
  box-shadow: 0 2rpx 8rpx rgba(15, 23, 42, 0.08);
}

.tab-text {
  font-size: 22rpx;
  color: #64748b;
  line-height: 1.2;
}

.tab-text-active {
  color: #0f172a;
  font-weight: 500;
}

.material-list {
  margin-top: 16rpx;
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.material-card {
  border-radius: 14rpx;
  border: 2rpx solid #e2e8f0;
  border-left: 8rpx solid #94a3b8;
  background: #ffffff;
}

.material-card-required {
  border-left-color: #ef4444;
}

.material-card-inner {
  padding: 20rpx;
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
}

.material-icon {
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
  margin-top: 2rpx;
}

.material-info {
  flex: 1;
  min-width: 0;
}

.material-head {
  display: flex;
  align-items: center;
  column-gap: 10rpx;
  margin-bottom: 6rpx;
}

.material-name {
  font-size: 26rpx;
  color: #0f172a;
  font-weight: 500;
  line-height: 1.3;
}

.material-tag {
  font-size: 20rpx;
  line-height: 1.1;
  border-radius: 8rpx;
  padding: 4rpx 10rpx;
}

.material-tag-required {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.12);
}

.material-tag-optional {
  color: #64748b;
  background: #f1f5f9;
}

.material-desc {
  display: block;
  font-size: 22rpx;
  color: #64748b;
  line-height: 1.5;
}

.tip-card {
  margin-top: 24rpx;
  border-radius: 16rpx;
  border: 2rpx solid #bfdbfe;
  background: #eff6ff;
  padding: 24rpx;
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
}

.tip-icon {
  width: 40rpx;
  height: 40rpx;
  flex-shrink: 0;
  margin-top: 2rpx;
}

.tip-info {
  min-width: 0;
  flex: 1;
}

.tip-title {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: #1e3a8a;
  line-height: 1.3;
  margin-bottom: 6rpx;
}

.tip-desc {
  display: block;
  font-size: 22rpx;
  line-height: 1.5;
  color: #1e40af;
}

.case-section {
  padding-top: 0;
}

.case-list {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.case-card {
  border-radius: 16rpx;
  border: 2rpx solid #e2e8f0;
  overflow: hidden;
  background: #ffffff;
}

.case-cover-wrap {
  position: relative;
  height: 320rpx;
  overflow: hidden;
}

.case-cover {
  width: 100%;
  height: 100%;
}

.case-cover-mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.02) 0%, rgba(15, 23, 42, 0.6) 100%);
}

.case-cover-text {
  position: absolute;
  left: 24rpx;
  right: 24rpx;
  bottom: 20rpx;
}

.case-name {
  display: block;
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.3;
}

.case-industry {
  display: block;
  margin-top: 6rpx;
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.82);
}

.case-body {
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.case-row {
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
}

.case-highlight {
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
  border-radius: 12rpx;
  background: rgba(245, 159, 10, 0.12);
  padding: 16rpx;
}

.case-icon {
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
  margin-top: 2rpx;
}

.case-row-info {
  flex: 1;
  min-width: 0;
}

.case-row-label {
  display: block;
  font-size: 22rpx;
  color: #64748b;
  line-height: 1.3;
}

.case-row-value {
  display: block;
  margin-top: 4rpx;
  font-size: 24rpx;
  color: #0f172a;
  line-height: 1.45;
}

.case-highlight-value {
  display: block;
  margin-top: 4rpx;
  font-size: 24rpx;
  color: #f59f0a;
  font-weight: 700;
  line-height: 1.45;
}

.case-tip-card {
  margin-top: 24rpx;
  border-radius: 16rpx;
  border: 2rpx solid rgba(0, 51, 103, 0.2);
  background: rgba(0, 51, 103, 0.05);
  padding: 24rpx;
  text-align: center;
}

.case-tip-title {
  display: block;
  font-size: 26rpx;
  color: #0f172a;
  line-height: 1.4;
  margin-bottom: 8rpx;
}

.case-tip-desc {
  display: block;
  font-size: 22rpx;
  color: #64748b;
  line-height: 1.5;
}

.bottom-fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 80;
  background: #ffffff;
  border-top: 2rpx solid #e2e8f0;
  padding: 24rpx 32rpx calc(env(safe-area-inset-bottom) + 20rpx);
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.bottom-action {
  height: 88rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10rpx;
  transition: transform 0.16s ease;
}

.bottom-action-hover {
  transform: scale(0.995);
}

.bottom-action-primary {
  background: linear-gradient(135deg, #003366 0%, #004d99 100%);
}

.bottom-action-secondary {
  background: #fff;
  border: 2rpx solid #e2e8f0;
}

.bottom-action-icon {
  width: 36rpx;
  height: 36rpx;
  flex-shrink: 0;
}

.bottom-action-text {
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.2;
}

.bottom-action-text-primary {
  color: #ffffff;
}

.bottom-action-text-secondary {
  color: #0f172a;
}
</style>
