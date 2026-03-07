<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const articleMap = {
  "1": {
    id: "1",
    title: "化妆品工厂选址避坑5大关键",
    views: "2450 阅读",
    date: "2026-02-15",
    category: "避坑指南",
    summary: "除了环评，你还需要关注这几个隐形细节。",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/c2d33169-a60e-4588-8391-c4ccd7e205bc.png",
    content: "第一关是污水处理能力，很多园区虽然招收美妆，但排污额度已满。第二关是配电容量，部分园区宣传的是总装机而非可分配容量。第三关是消防等级匹配，丙类、丁类差异会直接影响你的工艺落地。",
    keypoints: ["了解园区的污水处理能力和排污额度限制", "提前调研园区的剩余配电容量", "咨询园区关于环评和消防的具体要求"],
  },
  "2": {
    id: "2",
    title: "如何低成本扩容企业配电？",
    views: "1980 阅读",
    date: "2026-02-10",
    category: "预算方案",
    summary: "针对用电大的企业，通过园区协调省下几十万增容费。",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/deb81ae0-54aa-4807-9360-2364296db8e9.png",
    content: "扩容不是只看电力公司报价。通过分时施工、园区共建配电房、申请区域增容专项支持，通常可以显著降低初期成本。",
    keypoints: ["拆分短期与长期用电需求", "优先评估园区协同增容方案", "核算峰谷电价对生产排班的影响"],
  },
  "3": {
    id: "3",
    title: "长三角产业转移政策对比",
    views: "1630 阅读",
    date: "2026-02-06",
    category: "政策",
    summary: "上海、江苏、浙江三地补贴政策全面解读。",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/5f7f12c0-c7b2-41c6-abab-e3873ad67c9e.png",
    content: "不同城市政策的差异主要集中在租金补贴、固定资产投资奖励和人才奖励。选址时应按企业发展阶段匹配政策周期。",
    keypoints: ["对比补贴兑现周期", "关注行业准入门槛", "结合企业现金流选择落地区域"],
  },
  "4": {
    id: "4",
    title: "新能源汽车产业聚集地排名",
    views: "2210 阅读",
    date: "2026-02-03",
    category: "聚集地",
    summary: "2025年全国新能源产业园区TOP10分析。",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/e282f721-1b95-4de9-90b9-05255e38902c.png",
    content: "评估聚集地时，除了企业数量，还要看上下游配套成熟度、供应链半径和人才可获得性。高密度聚集能显著缩短协同周期。",
    keypoints: ["重点核查龙头企业和核心供应商分布", "评估交通与物流时效", "结合未来扩产节奏预留空间"],
  },
  "5": {
    id: "5",
    title: "中小企业如何选择产业园区",
    views: "1760 阅读",
    date: "2026-01-29",
    category: "预算方案",
    summary: "500万-2000万投资规模企业的最优选择。",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/60acd730-d7fb-40e5-b3e3-ffad4feeb3ce.png",
    content: "中小企业选址核心是现金流安全。建议优先选择可分阶段交付、配套可用、政策兑现周期明确的园区，降低初始沉没成本。",
    keypoints: ["将一次性投入拆分为阶段投入", "优先选择成熟园区配套", "签约前确认租约条款和交付标准"],
  },
  "6": {
    id: "6",
    title: "生物医药产业园区环评要求",
    views: "2090 阅读",
    date: "2026-01-21",
    category: "政策",
    summary: "从GMP认证到环保达标的完整流程。",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/973429ac-898d-4d9d-8d22-b7ca1299e2ba.png",
    content: "生物医药企业入驻前应同步核对环评容量、危废处置资质和生产许可衔接流程，避免后续因审批链条导致投产延期。",
    keypoints: ["确认园区危废处置能力", "提前准备环评与消防资料", "与审批窗口核实办理时序"],
  },
  "7": {
    id: "7",
    title: "区域选择：一二线城市对比",
    views: "1540 阅读",
    date: "2026-01-12",
    category: "区域",
    summary: "成本、政策、人才三维度深度分析。",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/03c2b729-bf89-4a07-9632-7e0a2a64c351.png",
    content: "一线城市适合品牌与研发中心，二线城市适合规模化生产。建议按企业阶段组合布局，而不是单点押注，兼顾效率与成本。",
    keypoints: ["对比用工和租金长期成本", "评估政策匹配度与兑现效率", "规划研发与制造分层布局"],
  },
  "8": {
    id: "8",
    title: "租赁合同中的隐形陷阱",
    views: "2320 阅读",
    date: "2026-01-05",
    category: "避坑指南",
    summary: "5个常见条款让你多花百万冤枉钱。",
    image: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/b5f95a47-fc40-4c30-8247-4bc35ca620be.png",
    content: "厂房租赁常见风险包括交付标准模糊、违约责任不对等、租金递增规则不清。签约前应逐条核验附件和补充协议。",
    keypoints: ["明确免租期与交付验收条件", "约定维修责任与费用边界", "确认递增条款和违约责任"],
  },
};

const fallbackArticle = articleMap["1"];
const article = ref(fallbackArticle);

const relatedItems = ref([
  {
    id: "2",
    title: "如何低成本扩容企业配电？",
    summary: "针对用电大的企业，通过园区协调省下几十万增容费。",
  },
]);

onLoad((query) => {
  const id = String(query?.id || "1");
  article.value = articleMap[id] || fallbackArticle;
});

const onRelatedTap = (item) => {
  uni.navigateTo({
    url: `/package-invest/pages/site-guide-detail/index?id=${item.id}`,
  });
};

const onResourcePolicyTap = () => {
  uni.navigateTo({
    url: "/package-invest/pages/policy-list/index",
  });
};

const onResourceGuideTap = () => {
  uni.navigateTo({
    url: "/package-invest/pages/site-guide/index",
  });
};

const onFavoriteTap = () => {
  uni.showToast({
    title: "已加入收藏",
    icon: "none",
  });
};

const onLikeTap = () => {
  uni.showToast({
    title: "已点赞",
    icon: "none",
  });
};

const onShareTap = () => {
  uni.showToast({
    title: "分享功能开发中",
    icon: "none",
  });
};
</script>

<template>
  <view class="detail-page">
    <view class="detail-content">
      <view class="card header-card">
        <text class="title">{{ article.title }}</text>
        <view class="meta-row">
          <view class="meta-left">
            <view class="meta-item">
              <image class="meta-icon" src="../../static/icons/site-guide-detail/eye-muted.png" mode="aspectFit" />
              <text class="meta-text">{{ article.views }}</text>
            </view>
            <view class="meta-item">
              <image class="meta-icon" src="../../static/icons/site-guide-detail/calendar-muted.png" mode="aspectFit" />
              <text class="meta-text">{{ article.date }}</text>
            </view>
          </view>
          <view class="meta-tag">
            <text class="meta-tag-text">{{ article.category }}</text>
          </view>
        </view>
      </view>

      <view class="hero-wrap">
        <image class="hero-image" :src="article.image" mode="aspectFill" />
      </view>

      <view class="card summary-card">
        <text class="summary-text">{{ article.summary }}</text>
      </view>

      <view class="card main-card">
        <text class="paragraph-text">{{ article.content }}</text>

        <view class="section-wrap">
          <view class="section-block">
            <text class="section-title">核心要点</text>
            <view class="bullet-list">
              <view v-for="(item, index) in article.keypoints" :key="`${article.id}-${index}`" class="bullet-item">
                <text class="bullet-mark">•</text>
                <text class="bullet-text">{{ item }}</text>
              </view>
            </view>
          </view>

          <view class="section-block">
            <text class="section-title">相关资源</text>
            <view class="resource-list">
              <view class="resource-item" hover-class="resource-item-hover" @tap="onResourcePolicyTap">
                <image class="resource-icon" src="../../static/icons/site-guide-detail/file-text-primary.png" mode="aspectFit" />
                <text class="resource-text">查看相关政策文档</text>
                <image class="resource-arrow" src="../../static/icons/site-guide-detail/chevron-right-muted.png" mode="aspectFit" />
              </view>
              <view class="resource-item" hover-class="resource-item-hover" @tap="onResourceGuideTap">
                <image class="resource-icon" src="../../static/icons/site-guide-detail/book-open-primary.png" mode="aspectFit" />
                <text class="resource-text">浏览更多选址指南</text>
                <image class="resource-arrow" src="../../static/icons/site-guide-detail/chevron-right-muted.png" mode="aspectFit" />
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="action-sticky">
        <view class="action-btn" hover-class="action-btn-hover" @tap="onFavoriteTap">
          <image class="action-icon" src="../../static/icons/site-guide-detail/heart-muted.png" mode="aspectFit" />
          <text class="action-text">收藏</text>
        </view>
        <view class="action-btn" hover-class="action-btn-hover" @tap="onLikeTap">
          <image class="action-icon" src="../../static/icons/site-guide-detail/thumbs-up-muted.png" mode="aspectFit" />
          <text class="action-text">128</text>
        </view>
        <view class="action-btn" hover-class="action-btn-hover" @tap="onShareTap">
          <image class="action-icon" src="../../static/icons/site-guide-detail/share-2-muted.png" mode="aspectFit" />
          <text class="action-text">分享</text>
        </view>
      </view>

      <view class="related-wrap">
        <text class="related-title">相关推荐</text>
        <view class="related-list">
          <view v-for="item in relatedItems" :key="item.id" class="related-item" hover-class="related-item-hover" @tap="onRelatedTap(item)">
            <text class="related-item-title">{{ item.title }}</text>
            <text class="related-item-summary">{{ item.summary }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: #ffffff;
}

.detail-content {
  padding: 48rpx 32rpx 56rpx;
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.card {
  border-radius: 20rpx;
  background: #ffffff;
  box-shadow: 0 6rpx 20rpx rgba(15, 23, 42, 0.08);
}

.header-card {
  padding: 32rpx;
}

.title {
  font-size: 40rpx;
  line-height: 1.35;
  color: #0f172a;
  font-weight: 700;
  margin-bottom: 24rpx;
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 16rpx;
}

.meta-left {
  display: flex;
  align-items: center;
  column-gap: 24rpx;
  flex-wrap: wrap;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  column-gap: 8rpx;
}

.meta-icon {
  width: 28rpx;
  height: 28rpx;
}

.meta-text {
  font-size: 22rpx;
  line-height: 1.35;
  color: #64748b;
}

.meta-tag {
  border-radius: 8rpx;
  background: rgba(245, 159, 10, 0.12);
  padding: 4rpx 16rpx;
  flex-shrink: 0;
}

.meta-tag-text {
  font-size: 20rpx;
  line-height: 1.35;
  color: #f59f0a;
  font-weight: 600;
}

.hero-wrap {
  height: 384rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 6rpx 20rpx rgba(15, 23, 42, 0.08);
  background: #f1f5f9;
}

.hero-image {
  width: 100%;
  height: 100%;
}

.summary-card {
  padding: 24rpx 32rpx;
}

.summary-text {
  font-size: 26rpx;
  line-height: 1.7;
  color: #64748b;
}

.main-card {
  padding: 32rpx;
}

.paragraph-text {
  font-size: 28rpx;
  line-height: 1.8;
  color: #0f172a;
}

.section-wrap {
  margin-top: 32rpx;
  padding-top: 32rpx;
  border-top: 2rpx solid #e2e8f0;
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.section-title {
  display: block;
  font-size: 28rpx;
  line-height: 1.4;
  color: #0f172a;
  font-weight: 600;
  margin-bottom: 32rpx;
}

.bullet-list {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.bullet-item {
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
}

.bullet-mark {
  font-size: 30rpx;
  line-height: 1.2;
  color: #003367;
  font-weight: 700;
  margin-top: -2rpx;
}

.bullet-text {
  flex: 1;
  font-size: 26rpx;
  line-height: 1.6;
  color: #64748b;
}

.resource-list {
  display: flex;
  flex-direction: column;
}

.resource-item + .resource-item {
  margin-top: 20rpx;
}

.resource-item {
  border-radius: 12rpx;
  background: #f1f5f9;
  padding: 16rpx;
  display: flex;
  align-items: center;
  column-gap: 12rpx;
}

.resource-item-hover {
  opacity: 0.9;
}

.resource-icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
}

.resource-text {
  flex: 1;
  min-width: 0;
  font-size: 26rpx;
  line-height: 1.4;
  color: #0f172a;
}

.resource-arrow {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
}

.action-sticky {
  position: sticky;
  bottom: 0;
  z-index: 20;
  margin: 0 -32rpx;
  padding: 24rpx 32rpx;
  border-top: 2rpx solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 -4rpx 20rpx rgba(15, 23, 42, 0.05);
  display: flex;
  align-items: center;
  column-gap: 12rpx;
}

.action-btn {
  height: 72rpx;
  border-radius: 12rpx;
  border: 2rpx solid #dbe3ef;
  background: #ffffff;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10rpx;
}

.action-btn-hover {
  background: #f8fafc;
}

.action-icon {
  width: 32rpx;
  height: 32rpx;
}

.action-text {
  font-size: 26rpx;
  line-height: 1.35;
  color: #334155;
}

.related-wrap {
  margin-top: 16rpx;
  padding-top: 24rpx;
  border-top: 2rpx solid #e2e8f0;
}

.related-title {
  display: block;
  font-size: 28rpx;
  line-height: 1.4;
  color: #0f172a;
  font-weight: 600;
  margin-bottom: 32rpx;
}

.related-list {
  display: flex;
  flex-direction: column;
}

.related-item + .related-item {
  margin-top: 12rpx;
}

.related-item {
  border-radius: 16rpx;
  border: 2rpx solid #e2e8f0;
  padding: 20rpx 24rpx;
  background: #ffffff;
}

.related-item-hover {
  border-color: rgba(0, 51, 103, 0.3);
}

.related-item-title {
  display: block;
  font-size: 28rpx;
  line-height: 1.4;
  color: #0f172a;
  font-weight: 600;
  margin-bottom: 16rpx;
}

.related-item-summary {
  font-size: 24rpx;
  line-height: 1.45;
  color: #64748b;
}
</style>
