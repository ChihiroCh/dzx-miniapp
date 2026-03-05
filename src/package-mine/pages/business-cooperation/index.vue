<script setup>
import { ref } from "vue";

const cooperationCards = [
  {
    key: "media",
    title: "媒体合作",
    description: "与行业媒体、新闻机构合作，共同传播产业信息",
    icon: "/package-mine/static/icons/business-cooperation/newspaper-primary.png",
    points: [
      "行业媒体报道与宣传",
      "联合发布产业研究报告",
      "品牌推广与内容合作",
      "活动联合主办",
    ],
    contactText: "联系邮箱：media@dazhaoxiang.com",
  },
  {
    key: "park",
    title: "园区入驻",
    description: "政府园区、产业园区加入大招象平台",
    icon: "/package-mine/static/icons/business-cooperation/building-2-primary.png",
    points: [
      "园区信息数字化展示",
      "厂房房源智能发布",
      "招商引资数据分析",
      "政策补贴信息发布",
      "企业入驻对接服务",
    ],
    contactText: "联系电话：400-888-8888",
  },
  {
    key: "service",
    title: "企业服务商加盟",
    description: "财税、法律、融资等服务商加入生态",
    icon: "/package-mine/static/icons/business-cooperation/briefcase-primary.png",
    points: [
      "高新技术企业申报服务",
      "专精特新企业认定服务",
      "财税法律咨询服务",
      "融资对接服务",
      "产业政策申报指导",
    ],
    contactText: "联系邮箱：partner@dazhaoxiang.com",
  },
  {
    key: "finance",
    title: "投资融资合作",
    description: "与金融机构、投资方合作，支持企业发展",
    icon: "/package-mine/static/icons/business-cooperation/trending-up-primary.png",
    points: ["产业基金合作", "企业融资对接", "投资项目推荐", "金融产品定制"],
    contactText: "联系电话：400-888-8888",
  },
];

const cooperationTypes = [
  "媒体合作",
  "园区入驻",
  "企业服务商加盟",
  "投资融资合作",
];

const form = ref({
  cooperationType: "",
  companyName: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  description: "",
});

const showTypeDropdown = ref(false);

const toggleTypeDropdown = () => {
  showTypeDropdown.value = !showTypeDropdown.value;
};

const closeTypeDropdown = () => {
  showTypeDropdown.value = false;
};

const selectType = (item) => {
  form.value.cooperationType = item;
  closeTypeDropdown();
};

const showProtocolToast = () => {
  uni.showToast({
    title: "协议页面开发中",
    icon: "none",
  });
};

const submitIntent = () => {
  closeTypeDropdown();

  if (
    !form.value.cooperationType ||
    !form.value.companyName ||
    !form.value.contactName
  ) {
    uni.showToast({
      title: "请先填写必填项",
      icon: "none",
    });
    return;
  }

  uni.showToast({
    title: "提交成功",
    icon: "success",
  });

  form.value = {
    cooperationType: "",
    companyName: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    description: "",
  };
};

const callPhone = () => {
  uni.makePhoneCall({
    phoneNumber: "4008888888",
    fail: () => {
      uni.showToast({
        title: "拨号失败",
        icon: "none",
      });
    },
  });
};

const copyBusinessEmail = () => {
  uni.setClipboardData({
    data: "business@dazhaoxiang.com",
    success: () => {
      uni.showToast({
        title: "已复制邮箱",
        icon: "none",
      });
    },
  });
};
</script>

<template>
  <view class="business-page">
    <view
      v-if="showTypeDropdown"
      class="dropdown-mask"
      @tap="closeTypeDropdown"
    />

    <view class="content-wrap">
      <view class="intro-wrap">
        <text class="intro-title">合作机会</text>
        <text class="intro-desc"
          >大招象致力于打造厂房租赁生态，欢迎各类合作伙伴加入，共同为企业提供优质服务。</text
        >
      </view>

      <view class="cards-wrap">
        <view
          v-for="card in cooperationCards"
          :key="card.key"
          class="coop-card"
        >
          <view class="coop-header">
            <view class="coop-icon-wrap">
              <image class="coop-icon" :src="card.icon" mode="aspectFit" />
            </view>
            <view class="coop-meta">
              <text class="coop-title">{{ card.title }}</text>
              <text class="coop-desc">{{ card.description }}</text>
            </view>
          </view>

          <view class="point-list">
            <view
              v-for="point in card.points"
              :key="`${card.key}-${point}`"
              class="point-item"
            >
              <image
                class="point-icon"
                :src="'/package-mine/static/icons/business-cooperation/circle-check-primary.png'"
                mode="aspectFit"
              />
              <text class="point-text">{{ point }}</text>
            </view>
          </view>

          <view class="contact-line-wrap">
            <text class="contact-line">{{ card.contactText }}</text>
          </view>
        </view>
      </view>

      <view class="form-wrap">
        <text class="form-title">提交合作意向</text>

        <view class="form-card">
          <view class="form-item form-item-type">
            <text class="form-label">合作类型 *</text>
            <view class="type-select-wrap">
              <view class="form-select">
                <view class="form-select-touch" @tap="toggleTypeDropdown" />
                <text
                  :class="
                    form.cooperationType ? 'form-value selected' : 'form-value'
                  "
                >
                  {{ form.cooperationType || "请选择合作类型" }}
                </text>
                <image
                  class="form-select-icon"
                  :class="{ 'form-select-icon-open': showTypeDropdown }"
                  :src="'/package-mine/static/icons/business-cooperation/chevron-down-muted.png'"
                  mode="aspectFit"
                />
              </view>

              <view
                v-if="showTypeDropdown"
                class="type-select-dropdown"
                @tap.stop
              >
                <view
                  v-for="item in cooperationTypes"
                  :key="`cooperation-type-${item}`"
                  class="type-option"
                  :class="{ 'type-option-selected': form.cooperationType === item }"
                  hover-class="type-option-hover"
                  hover-start-time="0"
                  hover-stay-time="0"
                  @tap.stop="selectType(item)"
                >
                  <view class="type-check-slot">
                    <image
                      v-if="form.cooperationType === item"
                      class="type-check-icon"
                      :src="'/package-mine/static/icons/business-cooperation/check-white.png'"
                      mode="aspectFit"
                    />
                  </view>
                  <text
                    class="type-option-text"
                    :class="{
                      'type-option-text-selected': form.cooperationType === item,
                    }"
                    >{{ item }}</text
                  >
                </view>
              </view>
            </view>
          </view>

          <view class="form-item">
            <text class="form-label">公司名称 *</text>
            <input
              v-model="form.companyName"
              class="form-input"
              placeholder="请输入公司名称"
              placeholder-class="placeholder"
            />
          </view>

          <view class="form-item">
            <text class="form-label">联系人 *</text>
            <input
              v-model="form.contactName"
              class="form-input"
              placeholder="请输入联系人姓名"
              placeholder-class="placeholder"
            />
          </view>

          <view class="form-item">
            <text class="form-label">联系电话</text>
            <input
              v-model="form.contactPhone"
              class="form-input"
              placeholder="请输入联系电话"
              type="number"
              maxlength="11"
              placeholder-class="placeholder"
            />
          </view>

          <view class="form-item">
            <text class="form-label">邮箱地址</text>
            <input
              v-model="form.contactEmail"
              class="form-input"
              placeholder="请输入邮箱地址"
              type="text"
              placeholder-class="placeholder"
            />
          </view>

          <view class="form-item">
            <text class="form-label">合作描述</text>
            <textarea
              v-model="form.description"
              class="form-textarea"
              placeholder="请简要描述您的合作需求和想法"
              placeholder-class="placeholder"
            />
          </view>

          <button class="submit-btn" @tap="submitIntent">提交合作意向</button>

          <view class="protocol-line">
            <text class="protocol-text">提交即表示您同意我们的</text>
            <text class="protocol-link" @tap="showProtocolToast">隐私政策</text>
            <text class="protocol-text">和</text>
            <text class="protocol-link" @tap="showProtocolToast">用户协议</text>
          </view>
        </view>
      </view>

      <view class="contact-card">
        <view class="contact-item" @tap="callPhone">
          <image
            class="contact-icon"
            :src="'/package-mine/static/icons/business-cooperation/phone-primary.png'"
            mode="aspectFit"
          />
          <view class="contact-meta">
            <text class="contact-title">电话咨询</text>
            <text class="contact-sub">400-888-8888</text>
          </view>
        </view>

        <view class="contact-item" @tap="copyBusinessEmail">
          <image
            class="contact-icon"
            :src="'/package-mine/static/icons/business-cooperation/mail-primary.png'"
            mode="aspectFit"
          />
          <view class="contact-meta">
            <text class="contact-title">邮件咨询</text>
            <text class="contact-sub">business@dazhaoxiang.com</text>
          </view>
        </view>

        <view class="contact-item">
          <image
            class="contact-icon"
            :src="'/package-mine/static/icons/business-cooperation/map-pin-primary.png'"
            mode="aspectFit"
          />
          <view class="contact-meta">
            <text class="contact-title">公司地址</text>
            <text class="contact-sub">上海市浦东新区世纪大道100号</text>
          </view>
        </view>
      </view>

      <view class="bottom-spacer" />
    </view>
  </view>
</template>

<style scoped>
.business-page {
  min-height: 100vh;
  background: #ffffff;
}

.dropdown-mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 30;
}

.content-wrap {
  padding: 48rpx 32rpx;
  box-sizing: border-box;
}

.intro-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.intro-title {
  display: block;
  font-size: 40rpx;
  line-height: 56rpx;
  color: #111827;
  font-weight: 700;
}

.intro-desc {
  display: block;
  font-size: 28rpx;
  line-height: 42rpx;
  color: #6b7280;
}

.cards-wrap {
  margin-top: 24rpx;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.coop-card {
  border: 2rpx solid #e5e7eb;
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.06);
  padding: 48rpx;
}

.coop-header {
  display: flex;
  align-items: flex-start;
  column-gap: 24rpx;
}

.coop-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
  background: rgba(0, 51, 103, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.coop-icon {
  width: 40rpx;
  height: 40rpx;
}

.coop-meta {
  flex: 1;
  min-width: 0;
}

.coop-title {
  display: block;
  font-size: 32rpx;
  line-height: 44rpx;
  color: #111827;
  font-weight: 600;
}

.coop-desc {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #6b7280;
}

.point-list {
  margin-top: 24rpx;
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.point-item {
  display: flex;
  align-items: flex-start;
  column-gap: 12rpx;
}

.point-icon {
  width: 32rpx;
  height: 32rpx;
  margin-top: 2rpx;
  flex-shrink: 0;
}

.point-text {
  flex: 1;
  min-width: 0;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
}

.contact-line-wrap {
  margin-top: 16rpx;
  padding-top: 16rpx;
  border-top: 2rpx solid #e5e7eb;
}

.contact-line {
  display: block;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #6b7280;
}

.form-wrap {
  margin-top: 32rpx;
}

.form-title {
  display: block;
  font-size: 36rpx;
  line-height: 48rpx;
  color: #111827;
  font-weight: 700;
}

.form-card {
  margin-top: 16rpx;
  border: 2rpx solid #e5e7eb;
  border-radius: 16rpx;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.06);
  padding: 48rpx;
}

.form-item {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
}

.form-item-type {
  position: relative;
  z-index: 40;
}

.form-item + .form-item {
  margin-top: 24rpx;
}

.type-select-wrap {
  position: relative;
}

.form-label {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
  font-weight: 500;
}

.form-select,
.form-input {
  width: 100%;
  height: 80rpx;
  border-radius: 12rpx;
  border: 2rpx solid #d1d5db;
  background: #ffffff;
  padding: 0 24rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28rpx;
  color: #111827;
}

.form-select {
  position: relative;
}

.form-select-touch {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
}

.form-value {
  color: #9ca3af;
  position: relative;
  z-index: 1;
}

.form-value.selected {
  color: #111827;
}

.form-select-icon {
  width: 32rpx;
  height: 32rpx;
  flex-shrink: 0;
  margin-left: 16rpx;
  position: relative;
  z-index: 1;
  transition: transform 0.2s ease;
}

.form-select-icon-open {
  transform: rotate(180deg);
}

.type-select-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 12rpx);
  border-radius: 12rpx;
  border: 2rpx solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 8rpx 24rpx rgba(10, 46, 90, 0.12);
  overflow: hidden;
  z-index: 45;
}

.type-option {
  min-height: 76rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(229, 231, 235, 0.9);
}

.type-option:last-child {
  border-bottom: 0;
}

.type-option-hover,
.type-option-selected {
  background: #f59f0a;
}

.type-check-slot {
  width: 28rpx;
  height: 28rpx;
  margin-right: 12rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.type-check-icon {
  width: 24rpx;
  height: 24rpx;
}

.type-option-text {
  font-size: 26rpx;
  color: #111827;
}

.type-option-text-selected {
  color: #ffffff;
}

.form-textarea {
  width: 100%;
  min-height: 192rpx;
  border-radius: 12rpx;
  border: 2rpx solid #d1d5db;
  background: #ffffff;
  padding: 18rpx 24rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
}

.placeholder {
  color: #9ca3af;
}

.submit-btn {
  margin-top: 24rpx;
  width: 100%;
  height: 80rpx;
  border: 0;
  border-radius: 12rpx;
  background: linear-gradient(135deg, #003366 0%, #004d99 100%);
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 500;
  line-height: 80rpx;
}

.submit-btn::after {
  border: 0;
}

.protocol-line {
  margin-top: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 6rpx;
  row-gap: 4rpx;
}

.protocol-text,
.protocol-link {
  font-size: 24rpx;
  line-height: 34rpx;
}

.protocol-text {
  color: #6b7280;
}

.protocol-link {
  color: #003367;
}

.contact-card {
  margin-top: 24rpx;
  border-radius: 16rpx;
  border: 2rpx solid #e5e7eb;
  background: #f1f3f7;
  padding: 48rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  column-gap: 16rpx;
}

.contact-icon {
  width: 36rpx;
  height: 36rpx;
  margin-top: 2rpx;
  flex-shrink: 0;
}

.contact-meta {
  flex: 1;
  min-width: 0;
}

.contact-title {
  display: block;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #111827;
  font-weight: 500;
}

.contact-sub {
  display: block;
  margin-top: 4rpx;
  font-size: 24rpx;
  line-height: 34rpx;
  color: #6b7280;
  word-break: break-all;
}

.bottom-spacer {
  height: 32rpx;
}
</style>
