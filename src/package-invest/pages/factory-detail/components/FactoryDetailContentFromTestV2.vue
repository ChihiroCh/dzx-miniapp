<script setup>
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  factoryData: {
    type: Object,
    default: () => ({}),
  },
});

const carouselImages = computed(() => {
  const mainImage = props.factoryData?.image;
  const fallback = [
    "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/873dac6c-b82d-4ef0-9948-88d88e7cb90f.png",
    "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/26/0d86c67f-f5b4-49ad-89b9-e842de805e66.png",
    "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/27/a79a884f-7039-40cf-b829-dc8f11a3d252.png",
  ];
  if (!mainImage) {
    return fallback;
  }
  return [mainImage, ...fallback.filter((item) => item !== mainImage)];
});

const currentImageIndex = ref(0);

const displayName = computed(
  () => props.factoryData?.name || "张江集成电路产业园 - A3栋标准厂房",
);

const parseNumber = (value, fallback = 0) => {
  const num = Number(String(value || "").replace(/[^\d.]/g, ""));
  if (Number.isNaN(num)) {
    return fallback;
  }
  return num;
};

const areaNum = computed(() => parseNumber(props.factoryData?.area, 1200));
const rentNum = computed(() => parseNumber(props.factoryData?.rent, 45));
const monthlyRent = computed(() => Math.round(areaNum.value * rentNum.value));
const yearlyRent = computed(() => monthlyRent.value * 12);

const money = (value) => `¥${Number(value).toLocaleString("zh-CN")}`;

const basicInfoList = computed(() => [
  {
    label: "面积",
    value: props.factoryData?.area || "1200 m²",
    icon: "/static/icons/industry/factory.png",
  },
  {
    label: "层高",
    value: props.factoryData?.height || "6 m",
    icon: "/static/icons/factory-list/maximize-2.png",
  },
  {
    label: "承重",
    value: "1.5 t/㎡",
    icon: "/static/icons/industry/cog.png",
  },
  {
    label: "柱距",
    value: "8m x 9m",
    icon: "/static/icons/factory-list/layers.png",
  },
  {
    label: "配电",
    value: props.factoryData?.power || "200 KVA",
    icon: "/static/icons/factory-list/zap.png",
  },
  {
    label: "消防等级",
    value: "丙类",
    icon: "/static/icons/park-enterprise-services/circle-question-mark.png",
  },
  {
    label: "用水",
    value: "进出水口",
    icon: "/static/icons/park-enterprise-services/leaf.png",
  },
  {
    label: "天然气",
    value: "工业用气",
    icon: "/static/icons/industry/truck.png",
  },
  {
    label: "蒸汽",
    value: "无供应",
    icon: "/static/icons/park-enterprise-services/zap.png",
  },
  {
    label: "货梯",
    value: "2吨货梯(2部)",
    icon: "/static/icons/park-stats/trending-up.png",
  },
  {
    label: "结构",
    value: "框架结构",
    icon: "/static/icons/industry/layers.png",
  },
  {
    label: "墙面",
    value: "实砖墙+保温层",
    icon: "/static/icons/industry/brain.png",
  },
]);

const floorRows = [
  {
    floor: "1F",
    area: "400",
    height: "6",
    weight: "2",
    power: "80KVA",
    wall: "实砖墙",
    ground: "金刚砂地坪",
    fire: "喷淋/烟感",
  },
  {
    floor: "2F",
    area: "400",
    height: "4.5",
    weight: "1",
    power: "60KVA",
    wall: "彩钢板",
    ground: "环氧地坪",
    fire: "喷淋/烟感",
  },
  {
    floor: "3F",
    area: "400",
    height: "4.5",
    weight: "0.8",
    power: "60KVA",
    wall: "隔离窗",
    ground: "防静电地板",
    fire: "烟感",
  },
];

const featureList = [
  { name: "带装修", icon: "/static/icons/factory-feature/palette-accent.png" },
  { name: "双路供电", icon: "/static/icons/factory-feature/zap-accent.png" },
  { name: "卸货平台", icon: "/static/icons/factory-feature/truck-accent.png" },
];

const leaseItems = computed(() => [
  {
    label: "租售类型",
    value: "仅出租",
    icon: "/static/icons/park-enterprise-services/scale.png",
  },
  {
    label: "租金单价",
    value: `${rentNum.value} 元/㎡/月`,
    icon: "/static/icons/park-enterprise-services/coins.png",
  },
  {
    label: "付款方式",
    value: "付三押三",
    icon: "/static/icons/park-enterprise-services/credit-card.png",
  },
  {
    label: "押金方式",
    value: "三个月租金",
    icon: "/static/icons/park-enterprise-services/scale.png",
  },
  {
    label: "是否含物业",
    value: "否",
    icon: "/static/icons/park-enterprise-services/user-check.png",
  },
  {
    label: "物业费用",
    value: "3.5 元/㎡/月",
    icon: "/static/icons/park-enterprise-services/file-text.png",
  },
]);

const suitableIndustries = ["集成电路", "电子信息", "精密仪器"];

const amenitiesPageIndex = ref(0);
const amenitiesPages = [
  [
    { name: "公寓", icon: "/static/tabbar/home.png" },
    { name: "地铁", icon: "/static/icons/home-tools/compass.png" },
    { name: "公交", icon: "/static/icons/industry/car-front.png" },
    { name: "餐饮", icon: "/static/icons/home-tools/book-open.png" },
    { name: "停车", icon: "/static/icons/industry/car.png" },
    { name: "安防", icon: "/static/icons/home-advantages/shield-check.png" },
    { name: "物业", icon: "/static/icons/park-enterprise-services/user-check.png" },
    { name: "快递", icon: "/static/icons/industry/truck.png" },
    { name: "绿化", icon: "/static/icons/industry/wind.png" },
    { name: "消防", icon: "/static/icons/park-enterprise-services/circle-question-mark.png" },
  ],
  [
    { name: "便利店", icon: "/static/icons/home-tools/download.png" },
    { name: "会议室", icon: "/static/icons/home-tools/briefcase.png" },
    { name: "食堂", icon: "/static/icons/industry/stethoscope.png" },
    { name: "金融", icon: "/static/icons/park-enterprise-services/credit-card.png" },
    { name: "政策", icon: "/static/icons/park-policies/arrow-right.png" },
    { name: "客服", icon: "/static/icons/park-contact/user.png" },
    { name: "供电", icon: "/static/icons/factory-list/zap.png" },
    { name: "物流", icon: "/static/icons/industry/truck.png" },
    { name: "园医", icon: "/static/icons/industry/stethoscope.png" },
    { name: "更多", icon: "/static/icons/park-policies/chevron-right.png" },
  ],
];

const photoPageIndex = ref(0);
const photoPages = [
  [
    "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/28/5330c716-481e-44f7-a73d-e6572c0d37e5.png",
    "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/28/a7b4385a-ea5e-4208-b260-73828f7e49d6.png",
    "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/28/d5647a48-3704-459b-a021-b1242eb2ed1d.png",
  ],
  [
    "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/28/86a9ec4c-5441-4969-8a79-a62d011bc68b.png",
    "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/28/c9b7d289-520b-4667-837b-dc0528ac2918.png",
    "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/28/6347c480-cef3-49b1-a335-a3f1e8144b08.png",
  ],
];

const locationTab = ref("coords");
const locationTabs = [
  { id: "coords", label: "地理坐标" },
  { id: "expressway", label: "附近高速" },
  { id: "railway", label: "高铁地图" },
  { id: "bus", label: "公交线路" },
];

const toPrev = () => {
  if (!carouselImages.value.length) {
    return;
  }
  currentImageIndex.value =
    (currentImageIndex.value - 1 + carouselImages.value.length) %
    carouselImages.value.length;
};

const toNext = () => {
  if (!carouselImages.value.length) {
    return;
  }
  currentImageIndex.value =
    (currentImageIndex.value + 1) % carouselImages.value.length;
};

const toIndex = (index) => {
  currentImageIndex.value = index;
};

const onAmenityChange = (event) => {
  amenitiesPageIndex.value = event?.detail?.current || 0;
};

const onPhotoChange = (event) => {
  photoPageIndex.value = event?.detail?.current || 0;
};

const tableThumbProgress = ref(0);
const tableThumbRatio = ref(0.32);
const tableViewportWidth = ref(0);
const tableContentWidth = ref(0);
const tableMaxScrollLeft = ref(0);
const lastTableScrollLeft = ref(0);
const tableCalibrateTimer = ref(null);
const TABLE_EDGE_PX_GAP = 8;
const TABLE_EDGE_PROGRESS_GAP = 0.03;
const instance = getCurrentInstance();

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const calcSnappedProgress = (scrollLeft, maxScrollLeft) => {
  if (maxScrollLeft <= 0) {
    return 0;
  }
  const raw = clamp(scrollLeft / maxScrollLeft, 0, 1);
  const edgeGap = Math.max(TABLE_EDGE_PX_GAP, maxScrollLeft * 0.03);
  if (scrollLeft <= edgeGap || raw <= TABLE_EDGE_PROGRESS_GAP) {
    return 0;
  }
  if (scrollLeft >= maxScrollLeft - edgeGap || raw >= 1 - TABLE_EDGE_PROGRESS_GAP) {
    return 1;
  }
  return raw;
};

const measureTableSize = () => {
  if (!instance?.proxy) {
    return;
  }
  uni
    .createSelectorQuery()
    .in(instance.proxy)
    .select(".table-scroll")
    .boundingClientRect((rect) => {
      tableViewportWidth.value = Number(rect?.width || 0);
    })
    .select(".table-wrap")
    .boundingClientRect((rect) => {
      tableContentWidth.value = Number(rect?.width || 0);
    })
    .exec();
};

const onTableScroll = (event) => {
  const detail = event?.detail || {};
  const scrollLeft = Number(detail.scrollLeft || 0);
  const scrollWidth = Number(detail.scrollWidth || 0);
  const clientWidth = Number(detail.clientWidth || 0);
  const viewportWidth =
    clientWidth > 0 ? clientWidth : tableViewportWidth.value;
  const contentWidth = scrollWidth > 0 ? scrollWidth : tableContentWidth.value;

  if (contentWidth > 0 && viewportWidth > 0) {
    const ratio = Math.min(Math.max(viewportWidth / contentWidth, 0.08), 1);
    tableThumbRatio.value = ratio;
  }

  const measuredMaxScrollLeft = Math.max(contentWidth - viewportWidth, 0);
  if (measuredMaxScrollLeft > 0) {
    tableMaxScrollLeft.value = Math.max(
      tableMaxScrollLeft.value,
      measuredMaxScrollLeft,
    );
  }
  if (scrollLeft > 0) {
    tableMaxScrollLeft.value = Math.max(tableMaxScrollLeft.value, scrollLeft);
  }
  lastTableScrollLeft.value = scrollLeft;
  const maxScrollLeft = Math.max(measuredMaxScrollLeft, tableMaxScrollLeft.value, 0);
  const progress = calcSnappedProgress(scrollLeft, maxScrollLeft);
  tableThumbProgress.value = progress;
  if (tableCalibrateTimer.value) {
    clearTimeout(tableCalibrateTimer.value);
  }
  tableCalibrateTimer.value = setTimeout(() => {
    measureTableSize();
    setTimeout(() => {
      const max = Math.max(
        tableContentWidth.value - tableViewportWidth.value,
        tableMaxScrollLeft.value,
        0,
      );
      if (max <= 0) {
        tableThumbProgress.value = 0;
        return;
      }
      const left = clamp(lastTableScrollLeft.value, 0, max);
      tableThumbProgress.value = calcSnappedProgress(left, max);
    }, 36);
  }, 90);
};

const tableThumbStyle = computed(() => {
  const width = tableThumbRatio.value * 100;
  const maxOffset = 100 - width;
  const offset = maxOffset * tableThumbProgress.value;
  return {
    width: `${width}%`,
    left: `${offset}%`,
  };
});

const onTableScrollToRight = () => {
  if (tableContentWidth.value > 0 && tableViewportWidth.value > 0) {
    tableThumbRatio.value = Math.min(
      Math.max(tableViewportWidth.value / tableContentWidth.value, 0.08),
      1,
    );
    const measuredMax = Math.max(tableContentWidth.value - tableViewportWidth.value, 0);
    if (measuredMax > 0) {
      tableMaxScrollLeft.value = Math.max(tableMaxScrollLeft.value, measuredMax);
      lastTableScrollLeft.value = measuredMax;
    }
  }
  tableThumbProgress.value = 1;
};

const onTableScrollToLeft = () => {
  lastTableScrollLeft.value = 0;
  tableThumbProgress.value = 0;
};

onMounted(() => {
  measureTableSize();
  setTimeout(measureTableSize, 60);
  setTimeout(measureTableSize, 240);
});

onUnmounted(() => {
  if (tableCalibrateTimer.value) {
    clearTimeout(tableCalibrateTimer.value);
    tableCalibrateTimer.value = null;
  }
});
</script>

<template>
  <view class="from-test-wrap">
    <view class="hero-card">
      <image class="hero-image" :src="carouselImages[currentImageIndex]" mode="aspectFill" />
      <view class="hero-soft-mask" />

      <view class="media-tab-row">
        <view class="media-tab">
          <image class="media-tab-icon" src="/static/icons/park-banner/play.png" mode="aspectFit" />
          <text class="media-tab-text">视频</text>
        </view>
        <view class="media-tab">
          <image class="media-tab-icon" src="/static/icons/home-tools/compass.png" mode="aspectFit" />
          <text class="media-tab-text">全景</text>
        </view>
        <view class="media-tab media-tab-active">
          <image class="media-tab-icon" src="/static/icons/park-banner/image.png" mode="aspectFit" />
          <text class="media-tab-text">图片</text>
        </view>
      </view>

      <view class="hero-count">{{ currentImageIndex + 1 }}/{{ carouselImages.length }}</view>

      <view class="arrow-btn arrow-left" @tap="toPrev">
        <image class="arrow-icon" src="/static/icons/chevron-left.png" mode="aspectFit" />
      </view>
      <view class="arrow-btn arrow-right" @tap="toNext">
        <image class="arrow-icon" src="/static/icons/chevron-right.png" mode="aspectFit" />
      </view>

      <view class="dots-row">
        <view
          v-for="(item, index) in carouselImages"
          :key="`${item}-${index}`"
          class="dot-item"
          :class="{ 'dot-item-active': currentImageIndex === index }"
          @tap="toIndex(index)"
        />
      </view>
    </view>

    <view class="head-block">
      <text class="factory-title">{{ displayName }}</text>

      <view class="tag-row">
        <view class="head-tag"><text>官方认证</text></view>
        <view class="head-tag"><text>真实厂房</text></view>
        <view class="head-tag"><text>享受政策</text></view>
      </view>

      <view class="location-row">
        <image class="location-icon" src="/static/icons/map-pin.png" mode="aspectFit" />
        <text class="location-text">上海市浦东新区张江科学城</text>
      </view>
    </view>

    <view class="basic-grid">
      <view v-for="item in basicInfoList" :key="item.label" class="basic-item">
        <view class="basic-item-head">
          <image class="basic-item-icon" :src="item.icon" mode="aspectFit" />
          <text class="basic-item-label">{{ item.label }}</text>
        </view>
        <text class="basic-item-value">{{ item.value }}</text>
      </view>
    </view>

    <view class="section-card">
      <view class="section-head">
        <view class="head-line" />
        <text class="section-title">分层详细参数</text>
      </view>

      <scroll-view
        class="table-scroll"
        scroll-x
        :show-scrollbar="false"
        :upper-threshold="24"
        :lower-threshold="24"
        @scroll="onTableScroll"
        @scrolltolower="onTableScrollToRight"
        @scrolltoupper="onTableScrollToLeft"
      >
        <view class="table-wrap">
          <view class="table-head table-row">
            <text class="cell-sticky">楼层</text>
            <text>面积 (m²)</text>
            <text>层高 (m)</text>
            <text>承重 (t/㎡)</text>
            <text>配电情况</text>
            <text>墙面类型</text>
            <text>地面类型</text>
            <text>消防情况</text>
          </view>

          <view v-for="row in floorRows" :key="row.floor" class="table-row">
            <text class="cell-sticky cell-primary">{{ row.floor }}</text>
            <text>{{ row.area }}</text>
            <text>{{ row.height }}</text>
            <text>{{ row.weight }}</text>
            <text>{{ row.power }}</text>
            <text>{{ row.wall }}</text>
            <text>{{ row.ground }}</text>
            <text>{{ row.fire }}</text>
          </view>
        </view>
      </scroll-view>

      <view class="table-scrollbar">
        <view class="table-scrollbar-thumb" :style="tableThumbStyle" />
      </view>

      <view class="scroll-tip">
        <text>←</text>
        <text>左右拖动查看完整楼层参数</text>
        <text>→</text>
      </view>
    </view>

    <view class="feature-wrap">
      <text class="feature-title">厂房特色</text>
      <view class="feature-grid">
        <view v-for="item in featureList" :key="item.name" class="feature-card">
          <image class="feature-icon" :src="item.icon" mode="aspectFit" />
          <text class="feature-text">{{ item.name }}</text>
        </view>
      </view>
    </view>

    <view class="section-card">
      <view class="section-head">
        <view class="head-line" />
        <text class="section-title">租售及物业详情</text>
      </view>
      <view class="lease-grid">
        <view v-for="item in leaseItems" :key="item.label" class="lease-item">
          <view class="lease-label-row">
            <image class="lease-icon" :src="item.icon" mode="aspectFit" />
            <text class="lease-label">{{ item.label }}</text>
          </view>
          <text class="lease-value">{{ item.value }}</text>
        </view>
      </view>
    </view>

    <view class="rent-card">
      <view class="rent-card-head">
        <text class="rent-card-title">租金信息</text>
        <image class="rent-card-icon" src="/static/icons/park-enterprise-services/credit-card.png" mode="aspectFit" />
      </view>
      <view class="rent-line">
        <text class="rent-line-label">单价</text>
        <text class="rent-line-value rent-line-value-primary">
          ¥{{ rentNum }}<text class="rent-line-unit">/㎡/月</text>
        </text>
      </view>
      <view class="rent-line">
        <text class="rent-line-label">月租金</text>
        <text class="rent-line-value">{{ money(monthlyRent) }}</text>
      </view>
      <view class="rent-line">
        <text class="rent-line-label">年租金</text>
        <text class="rent-line-value">{{ money(yearlyRent) }}</text>
      </view>
      <view class="rent-calc-btn">
        <image class="rent-calc-icon" src="/static/icons/home-tools/calculator.png" mode="aspectFit" />
        <text class="rent-calc-text">详细租金计算</text>
      </view>
    </view>

    <view class="section-card park-card">
      <view class="park-head">
        <image class="park-head-icon" src="/static/icons/park-stats/building-2.png" mode="aspectFit" />
        <text class="park-head-title">所属园区</text>
      </view>
      <view class="park-name-wrap">
        <text class="park-name">张江科学城</text>
        <text class="park-desc">政府备案产业园区</text>
      </view>
      <view class="park-industry-wrap">
        <text class="park-industry-label">主导产业</text>
        <view class="park-industry-row">
          <view class="park-industry-chip" v-for="item in suitableIndustries" :key="`park-${item}`">
            <text>{{ item }}</text>
          </view>
        </view>
      </view>
      <view class="park-detail-btn">
        <image class="park-detail-btn-icon" src="/static/icons/park-policies/arrow-right.png" mode="aspectFit" />
        <text class="park-detail-btn-text">查看园区详情</text>
      </view>
    </view>

    <view class="suitable-wrap">
      <text class="suitable-title">适合产业</text>
      <view class="suitable-row">
        <view class="suitable-chip" v-for="item in suitableIndustries" :key="`s-${item}`">
          <text>{{ item }}</text>
        </view>
      </view>
    </view>

    <view class="section-card">
      <view class="section-head section-head-tight">
        <view class="head-line" />
        <text class="section-title">厂房配套设施</text>
      </view>

      <swiper class="amenity-swiper" :current="amenitiesPageIndex" @change="onAmenityChange" circular>
        <swiper-item v-for="(page, pageIndex) in amenitiesPages" :key="`a-${pageIndex}`">
          <view class="amenity-page">
            <view class="amenity-item" v-for="item in page" :key="item.name">
              <view class="amenity-icon-wrap">
                <image class="amenity-icon" :src="item.icon" mode="aspectFit" />
              </view>
              <text class="amenity-text">{{ item.name }}</text>
            </view>
          </view>
        </swiper-item>
      </swiper>

      <view class="mini-dots-row">
        <view
          v-for="(item, index) in amenitiesPages"
          :key="`amenity-dot-${index}`"
          class="mini-dot"
          :class="{ 'mini-dot-active': amenitiesPageIndex === index }"
        />
      </view>
    </view>

    <view class="section-card">
      <view class="section-head section-head-tight">
        <view class="head-line" />
        <text class="section-title">厂房图片</text>
      </view>
      <swiper class="photo-swiper" :current="photoPageIndex" @change="onPhotoChange" circular>
        <swiper-item v-for="(page, pageIndex) in photoPages" :key="`p-${pageIndex}`">
          <view class="photo-page-grid">
            <view class="photo-item" v-for="img in page" :key="img">
              <image class="photo-img" :src="img" mode="aspectFill" />
            </view>
          </view>
        </swiper-item>
      </swiper>
      <view class="mini-dots-row mini-dots-row-photos">
        <view
          v-for="(item, index) in photoPages"
          :key="`photo-dot-${index}`"
          class="mini-dot"
          :class="{ 'mini-dot-active': photoPageIndex === index }"
        />
      </view>
    </view>

    <view class="section-card">
      <view class="section-head section-head-tight">
        <view class="head-line" />
        <text class="section-title">详细信息</text>
      </view>
      <view class="long-desc-wrap">
        <text class="long-desc-text">
          该厂房位于产业园核心区域，采用高标准现代化工业设计。底层承重高达2.0吨/㎡，二层及以上承重1.2吨/㎡，完美适配精密制造与自动化组装线需求。建筑采用全钢筋混凝土框架结构，柱距设计开阔（8m x 9m），极大提升了内部空间的灵活布局能力与利用率。厂房配备两部3吨品牌载重货梯，垂直物流效率行业领先。内部已预留多路双冗余供电系统及充足的配电容量，特别适合集成电路、生物医药研发及智能装备制造等高新技术产业拎包入驻。周边产业生态成熟，科研人才储备雄厚，园区内配套有高标准人才公寓、品牌餐饮及24小时便利商业，是各大企业设立华东总部或生产中心、研发基地的首选理想之所。
        </text>
      </view>
    </view>

    <view class="section-card">
      <view class="section-head section-head-tight">
        <view class="head-line" />
        <text class="section-title">位置信息</text>
      </view>

      <view class="location-tab-row">
        <view
          v-for="tab in locationTabs"
          :key="tab.id"
          class="location-tab"
          :class="{ 'location-tab-active': locationTab === tab.id }"
          @tap="locationTab = tab.id"
        >
          <text class="location-tab-text">{{ tab.label }}</text>
        </view>
      </view>

      <view class="location-content">
        <view class="location-map-wrap" v-if="locationTab === 'coords'">
          <image
            class="location-map-img"
            src="https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2026/2/28/19fd7568-8147-48bf-88ed-ec53c9d1c282.png"
            mode="aspectFill"
          />
          <view class="location-pin">
            <image class="location-pin-icon" src="/static/icons/map-pin.png" mode="aspectFit" />
          </view>
        </view>

        <view class="location-info-row" v-if="locationTab === 'coords'">
          <image class="location-info-icon" src="/static/icons/home-tools/compass.png" mode="aspectFit" />
          <text class="location-info-text">上海市浦东新区张江科学城</text>
        </view>

        <view class="location-empty" v-if="locationTab !== 'coords'">
          <text>{{ locationTabs.find((item) => item.id === locationTab)?.label }} 信息完善中</text>
        </view>
      </view>
    </view>

    <view class="bottom-actions-fixed">
      <view class="bottom-actions-inner">
        <view class="bottom-btn bottom-btn-ai">
          <image class="bottom-btn-icon" src="/static/icons/park-contact/message-circle.png" mode="aspectFit" />
          <text class="bottom-btn-text bottom-btn-text-ai">咨询AI</text>
        </view>
        <view class="bottom-btn bottom-btn-visit">
          <image class="bottom-btn-icon" src="/static/icons/home-tools/briefcase.png" mode="aspectFit" />
          <text class="bottom-btn-text bottom-btn-text-visit">预约参观</text>
        </view>
        <view class="bottom-btn bottom-btn-link">
          <image class="bottom-btn-icon bottom-btn-icon-light" src="/static/icons/park-contact/phone.png" mode="aspectFit" />
          <text class="bottom-btn-text bottom-btn-text-link">园区直联</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.from-test-wrap {
  margin-top: 0;
  padding: 0 0 220rpx;
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.hero-card {
  position: relative;
  width: 100%;
  height: 420rpx;
  border-radius: 16rpx;
  overflow: hidden;
  background: #e7ecf3;
}

.hero-image {
  width: 100%;
  height: 100%;
}

.hero-soft-mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.06) 0%,
    rgba(15, 23, 42, 0.02) 45%,
    rgba(15, 23, 42, 0.1) 100%
  );
  pointer-events: none;
}

.media-tab-row {
  position: absolute;
  top: 18rpx;
  left: 18rpx;
  z-index: 10;
  display: flex;
  gap: 12rpx;
}

.media-tab {
  height: 50rpx;
  padding: 0 18rpx;
  border-radius: 999rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6rpx);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.media-tab-active {
  background: rgba(0, 51, 103, 0.8);
}

.media-tab-icon {
  width: 28rpx;
  height: 28rpx;
}

.media-tab-text {
  margin-left: 8rpx;
  font-size: 22rpx;
  line-height: 1;
  color: #ffffff;
}

.hero-count {
  position: absolute;
  top: 18rpx;
  right: 18rpx;
  height: 44rpx;
  padding: 0 14rpx;
  border-radius: 12rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  font-size: 20rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.arrow-btn {
  position: absolute;
  top: 50%;
  width: 72rpx;
  height: 72rpx;
  border-radius: 999rpx;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
}

.arrow-left {
  left: 16rpx;
}

.arrow-right {
  right: 16rpx;
}

.arrow-icon {
  width: 40rpx;
  height: 40rpx;
  filter: brightness(0) invert(1);
}

.dots-row {
  position: absolute;
  left: 50%;
  bottom: 16rpx;
  transform: translateX(-50%);
  display: flex;
  gap: 8rpx;
}

.dot-item {
  width: 12rpx;
  height: 12rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.5);
}

.dot-item-active {
  width: 24rpx;
  background: #ffffff;
}

.head-block {
  padding: 0 4rpx;
  display: flex;
  flex-direction: column;
  row-gap: 14rpx;
}

.factory-title {
  display: block;
  font-size: 36rpx;
  line-height: 1.35;
  color: #111827;
  font-weight: 600;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.head-tag {
  height: 40rpx;
  padding: 0 14rpx;
  border-radius: 8rpx;
  border: 1px solid rgba(0, 51, 103, 0.25);
  background: rgba(0, 51, 103, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18rpx;
  color: #003367;
  font-weight: 500;
}

.location-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.location-icon {
  width: 24rpx;
  height: 24rpx;
}

.location-text {
  font-size: 22rpx;
  line-height: 1.3;
  color: #6b7280;
}

.basic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12rpx;
}

.basic-item {
  border-radius: 16rpx;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 2rpx 10rpx rgba(15, 23, 42, 0.05);
  padding: 16rpx;
  box-sizing: border-box;
}

.basic-item-head {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.basic-item-icon {
  width: 24rpx;
  height: 24rpx;
}

.basic-item-label {
  flex: 1;
  font-size: 18rpx;
  line-height: 1.2;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.basic-item-value {
  margin-top: 8rpx;
  display: block;
  font-size: 20rpx;
  line-height: 1.25;
  color: #111827;
  font-weight: 600;
  word-break: break-all;
}

.section-card {
  border-radius: 16rpx;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 2rpx 10rpx rgba(15, 23, 42, 0.04);
  overflow: hidden;
}

.section-head {
  padding: 32rpx 32rpx 24rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.section-head-tight {
  padding-top: 32rpx;
  padding-bottom: 24rpx;
}

.head-line {
  width: 8rpx;
  height: 30rpx;
  border-radius: 999rpx;
  background: #003367;
}

.section-title {
  font-size: 28rpx;
  line-height: 1.2;
  color: #111827;
  font-weight: 600;
}

.table-scroll {
  width: 100%;
}

.table-wrap {
  min-width: 1160rpx;
}

.table-row {
  display: flex;
  align-items: center;
  border-top: 1px solid #e5e7eb;
}

.table-row text {
  width: 140rpx;
  padding: 18rpx 20rpx;
  box-sizing: border-box;
  font-size: 20rpx;
  line-height: 1.25;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table-head {
  background: #f8fafc;
}

.table-head text {
  color: #6b7280;
  font-weight: 600;
}

.cell-sticky {
  position: sticky;
  left: 0;
  z-index: 2;
  width: 120rpx;
  background: #ffffff;
  font-weight: 700;
}

.table-head .cell-sticky {
  background: #f8fafc;
  z-index: 3;
  color: #111827;
}

.cell-primary {
  color: #003367;
}

.table-row .cell-primary {
  color: #003367;
  font-weight: 700;
}

.cell-sticky {
  border-right: 1px solid #e5e7eb;
}

.table-scrollbar {
  margin: 12rpx 0 0;
  width: 100%;
  height: 8rpx;
  border-radius: 999rpx;
  position: relative;
}

.table-scrollbar-thumb {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 999rpx;
  background: #9ca3af;
}

.scroll-tip {
  height: 52rpx;
  border-top: 1px solid #e5e7eb;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  font-size: 18rpx;
  color: #6b7280;
}

.feature-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.feature-title {
  font-size: 26rpx;
  line-height: 1.25;
  color: #111827;
  font-weight: 600;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.feature-card {
  border-radius: 14rpx;
  border: 1px solid rgba(245, 158, 11, 0.2);
  background: rgba(245, 158, 11, 0.05);
  padding: 18rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.feature-icon {
  width: 32rpx;
  height: 32rpx;
}

.feature-text {
  font-size: 22rpx;
  line-height: 1.2;
  color: #111827;
  font-weight: 500;
}

.lease-grid {
  padding: 0 32rpx 32rpx;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx 16rpx;
}

.lease-item {
  display: flex;
  flex-direction: column;
  row-gap: 8rpx;
}

.lease-label-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.lease-icon {
  width: 28rpx;
  height: 28rpx;
  flex-shrink: 0;
  opacity: 0.72;
}

.lease-label {
  font-size: 20rpx;
  line-height: 1.2;
  color: #6b7280;
  font-weight: 500;
}

.lease-value {
  padding-left: 32rpx;
  font-size: 24rpx;
  line-height: 1.25;
  color: #111827;
  font-weight: 600;
}

.rent-card {
  border-radius: 16rpx;
  border: 1px solid rgba(0, 51, 103, 0.18);
  background: linear-gradient(
    135deg,
    rgba(0, 51, 103, 0.05) 0%,
    rgba(34, 197, 94, 0.05) 100%
  );
  padding: 32rpx;
  box-sizing: border-box;
}

.rent-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rent-card-title {
  font-size: 30rpx;
  color: #111827;
  font-weight: 600;
}

.rent-card-icon {
  width: 40rpx;
  height: 40rpx;
}

.rent-line {
  margin-top: 16rpx;
  padding-bottom: 16rpx;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rent-line-label {
  font-size: 24rpx;
  color: #6b7280;
}

.rent-line-value {
  font-size: 32rpx;
  color: #111827;
  font-weight: 700;
}

.rent-line-value-primary {
  color: #003367;
}

.rent-line-unit {
  font-size: 20rpx;
  font-weight: 400;
  color: #6b7280;
}

.rent-calc-btn {
  margin-top: 24rpx;
  height: 80rpx;
  border-radius: 12rpx;
  border: 1px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rent-calc-icon {
  width: 32rpx;
  height: 32rpx;
  transform: translateY(0);
}

.rent-calc-text {
  margin-left: 10rpx;
  font-size: 24rpx;
  line-height: 1.1;
  transform: translateY(0);
  color: #111827;
}

.park-card {
  padding: 32rpx;
  box-sizing: border-box;
}

.park-head {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.park-head-icon {
  width: 40rpx;
  height: 40rpx;
}

.park-head-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #111827;
}

.park-name-wrap {
  margin-top: 16rpx;
}

.park-name {
  display: block;
  font-size: 30rpx;
  line-height: 1.25;
  color: #111827;
  font-weight: 600;
}

.park-desc {
  margin-top: 6rpx;
  display: block;
  font-size: 20rpx;
  color: #6b7280;
}

.park-industry-wrap {
  margin-top: 18rpx;
}

.park-industry-label {
  display: block;
  font-size: 20rpx;
  color: #6b7280;
  font-weight: 500;
}

.park-industry-row {
  margin-top: 10rpx;
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
}

.park-industry-chip {
  height: 40rpx;
  border-radius: 8rpx;
  background: #f3f4f6;
  padding: 0 12rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18rpx;
  color: #6b7280;
}

.park-detail-btn {
  margin-top: 24rpx;
  height: 80rpx;
  border-radius: 12rpx;
  background: #003367;
  display: flex;
  align-items: center;
  justify-content: center;
}

.park-detail-btn-icon {
  width: 32rpx;
  height: 32rpx;
  transform: translateY(0);
  filter: brightness(0) invert(1);
}

.park-detail-btn-text {
  margin-left: 8rpx;
  font-size: 23rpx;
  line-height: 1.1;
  transform: translateY(0);
  color: #ffffff;
  font-weight: 500;
}

.suitable-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.suitable-title {
  font-size: 26rpx;
  color: #111827;
  font-weight: 600;
}

.suitable-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.suitable-chip {
  height: 44rpx;
  border-radius: 999rpx;
  padding: 0 18rpx;
  background: rgba(0, 51, 103, 0.1);
  color: #003367;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
  font-weight: 500;
}

.amenity-swiper {
  height: 280rpx;
}

.amenity-page {
  padding: 8rpx 24rpx 12rpx;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 20rpx;
}

.amenity-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
}

.amenity-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 999rpx;
  background: rgba(0, 51, 103, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}

.amenity-icon {
  width: 40rpx;
  height: 40rpx;
}

.amenity-text {
  font-size: 18rpx;
  color: #6b7280;
  font-weight: 500;
}

.mini-dots-row {
  padding-bottom: 14rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
}

.mini-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 999rpx;
  background: #d1d5db;
}

.mini-dot-active {
  width: 24rpx;
  background: #003367;
}

.photo-swiper {
  height: 220rpx;
}

.photo-page-grid {
  padding: 0 24rpx;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10rpx;
}

.photo-item {
  height: 0;
  padding-top: 75%;
  border-radius: 10rpx;
  overflow: hidden;
  background: #e5e7eb;
  position: relative;
}

.photo-img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.mini-dots-row-photos {
  margin-top: 12rpx;
  padding-bottom: 16rpx;
}

.long-desc-wrap {
  padding: 0 32rpx 32rpx;
}

.long-desc-text {
  font-size: 24rpx;
  line-height: 1.8;
  color: #4b5563;
  text-align: justify;
}

.location-tab-row {
  margin: 0 32rpx;
  padding: 6rpx;
  border-radius: 10rpx;
  background: rgba(148, 163, 184, 0.2);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6rpx;
}

.location-tab {
  height: 68rpx;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.location-tab-active {
  background: #ffffff;
  box-shadow: 0 2rpx 8rpx rgba(15, 23, 42, 0.08);
}

.location-tab-text {
  font-size: 18rpx;
  color: #6b7280;
  font-weight: 500;
}

.location-tab-active .location-tab-text {
  color: #111827;
}

.location-content {
  padding: 20rpx 32rpx 32rpx;
}

.location-map-wrap {
  position: relative;
  width: 100%;
  height: 320rpx;
  border-radius: 12rpx;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  background: #e5e7eb;
}

.location-map-img {
  width: 100%;
  height: 100%;
}

.location-pin {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 52rpx;
  height: 52rpx;
  border-radius: 999rpx;
  background: rgba(0, 51, 103, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: marker-bounce 1.6s ease-in-out infinite;
}

.location-pin-icon {
  width: 28rpx;
  height: 28rpx;
  filter: brightness(0) invert(1);
}

.location-info-row {
  margin-top: 14rpx;
  display: flex;
  align-items: flex-start;
  gap: 8rpx;
}

.location-info-icon {
  width: 32rpx;
  height: 32rpx;
  margin-top: 2rpx;
}

.location-info-text {
  flex: 1;
  font-size: 20rpx;
  line-height: 1.4;
  color: #111827;
  font-weight: 500;
}

.location-empty {
  height: 320rpx;
  border-radius: 12rpx;
  border: 1px solid #e5e7eb;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  color: #6b7280;
}

.bottom-actions-fixed {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  border-top: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12rpx);
  padding: 16rpx 20rpx calc(16rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.bottom-actions-inner {
  width: 100%;
  max-width: 896rpx;
  margin: 0 auto;
  display: flex;
  gap: 12rpx;
}

.bottom-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.bottom-btn-ai {
  border: 1px solid rgba(0, 51, 103, 0.26);
  background: #ffffff;
}

.bottom-btn-visit {
  border: 1px solid rgba(0, 51, 103, 0.18);
  background: rgba(0, 51, 103, 0.08);
}

.bottom-btn-link {
  border: 1px solid #003367;
  background: linear-gradient(135deg, #003367 0%, #1a5d99 100%);
  box-shadow: 0 8rpx 18rpx rgba(0, 51, 103, 0.24);
}

.bottom-btn-icon {
  width: 32rpx;
  height: 32rpx;
  transform: translateY(0);
}

.bottom-btn-icon-light {
  filter: brightness(0) invert(1);
}

.bottom-btn-text {
  margin-left: 8rpx;
  font-size: 24rpx;
  line-height: 1.1;
  transform: translateY(0);
  font-weight: 500;
}

.bottom-btn-text-ai {
  color: #003367;
}

.bottom-btn-text-visit {
  color: #003367;
}

.bottom-btn-text-link {
  color: #ffffff;
}

@keyframes marker-bounce {
  0%,
  100% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -56%);
  }
}
</style>
