<script setup>
import { ref } from "vue";

const industryOptions = ["美妆美业", "生物医药", "高端制造", "智能装备", "新能源新材料"];
const investmentScaleOptions = ["500万以下", "500万-2000万", "2000万-1亿", "1亿以上"];
const powerOptions = ["50kVA以下", "50-200kVA", "200-500kVA", "500kVA以上"];
const fireOptions = ["丁类", "丙类", "乙类", "甲类"];

const form = ref({
  projectName: "",
  industry: "",
  investmentScale: "",
  requiredArea: "",
  ceilingHeight: "",
  powerRequirement: "",
  fireRequirement: "",
  otherRequirements: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
});

const fileList = ref([]);
const agreementChecked = ref(false);
const dropdownVisible = ref(false);
const dropdownField = ref("");

const openSelect = (field) => {
  if (dropdownVisible.value && dropdownField.value === field) {
    dropdownVisible.value = false;
    dropdownField.value = "";
    return;
  }
  dropdownField.value = field;
  dropdownVisible.value = true;
};

const closeSelect = () => {
  dropdownVisible.value = false;
  dropdownField.value = "";
};

const chooseOption = (item) => {
  const field = dropdownField.value;
  if (!field) {
    return;
  }
  form.value[field] = item;
  closeSelect();
};

const openAiPublish = () => {
  uni.navigateTo({
    url: "/package-invest/pages/ai-chat/index",
  });
};

const chooseFiles = () => {
  uni.chooseMessageFile({
    count: 5,
    type: "file",
    extension: ["pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png"],
    success: (res) => {
      const files = (res.tempFiles || []).map((item) => ({
        name: item.name || "未命名文件",
        size: Number(item.size || 0),
      }));
      fileList.value = files;
    },
  });
};

const formatSize = (size) => {
  if (!size) {
    return "0KB";
  }
  if (size < 1024) {
    return `${size}B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)}KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)}MB`;
};

const resetForm = () => {
  form.value = {
    projectName: "",
    industry: "",
    investmentScale: "",
    requiredArea: "",
    ceilingHeight: "",
    powerRequirement: "",
    fireRequirement: "",
    otherRequirements: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  };
  fileList.value = [];
  agreementChecked.value = false;
  closeSelect();
};

const submitForm = () => {
  if (!form.value.projectName.trim()) {
    uni.showToast({ title: "请输入项目名称", icon: "none" });
    return;
  }
  if (!form.value.industry) {
    uni.showToast({ title: "请选择产业类型", icon: "none" });
    return;
  }
  if (!form.value.investmentScale) {
    uni.showToast({ title: "请选择投资规模", icon: "none" });
    return;
  }
  if (!form.value.requiredArea.trim()) {
    uni.showToast({ title: "请输入所需面积", icon: "none" });
    return;
  }
  if (!form.value.contactName.trim() || !form.value.contactPhone.trim() || !form.value.contactEmail.trim()) {
    uni.showToast({ title: "请完善联系信息", icon: "none" });
    return;
  }
  if (!agreementChecked.value) {
    uni.showToast({ title: "请先同意协议条款", icon: "none" });
    return;
  }
  uni.showToast({ title: "需求已提交", icon: "success" });
};
</script>

<template>
  <view class="page">
    <view class="container">
      <view class="card card-info">
        <view class="info-content">
          <image class="info-icon" :src="'/package-invest/static/icons/project-entrust/info-blue.png'" mode="aspectFit" />
          <view class="info-text-wrap">
            <text class="info-title">填写以下信息，我们将为您匹配最合适的园区和厂房</text>
            <text class="info-desc">所有信息仅用于选址匹配，不会对外公开</text>
          </view>
        </view>
      </view>

      <view class="card card-ai">
        <view class="ai-content">
          <view class="ai-left">
            <view class="ai-icon-wrap">
              <image
                class="ai-icon"
                :src="'/package-invest/static/icons/project-entrust/message-square-text-orange.png'"
                mode="aspectFit"
              />
            </view>
            <view class="ai-copy">
              <text class="ai-title">想更快更精准？</text>
              <text class="ai-desc">对话式提交需求，AI为您深度匹配园区政策</text>
            </view>
          </view>
          <button class="ai-btn" @tap="openAiPublish">AI助手发布</button>
        </view>
      </view>

      <view class="card" :class="{ 'card-elevated': dropdownVisible && (dropdownField === 'industry' || dropdownField === 'investmentScale') }">
        <view class="card-header">
          <text class="card-title">基本信息</text>
          <text class="card-desc">项目的基本情况</text>
        </view>
        <view class="card-body">
          <view class="field-wrap">
            <text class="field-label">项目名称<text class="required">*</text></text>
            <input v-model="form.projectName" class="field-input" placeholder="请输入项目名称" placeholder-class="placeholder" />
          </view>

          <view
            class="field-wrap field-wrap-select"
            :class="{ 'field-wrap-select-open': dropdownVisible && dropdownField === 'industry' }"
            @tap.stop
          >
            <text class="field-label">产业类型<text class="required">*</text></text>
            <view class="field-select" @tap.stop="openSelect('industry')">
              <text class="select-value" :class="{ 'select-placeholder': !form.industry }">{{ form.industry || "请选择产业类型" }}</text>
              <image
                class="select-icon"
                :class="{ 'select-icon-open': dropdownVisible && dropdownField === 'industry' }"
                :src="'/package-invest/static/icons/project-entrust/chevron-down-muted.png'"
                mode="aspectFit"
              />
            </view>
            <view v-if="dropdownVisible && dropdownField === 'industry'" class="select-dropdown" @tap.stop>
              <scroll-view class="select-dropdown-list" scroll-y enhanced>
                <view
                  v-for="item in industryOptions"
                  :key="`industry-${item}`"
                  class="select-option"
                  :class="{ 'select-option-active': form.industry === item }"
                  hover-class="select-option-hover"
                  hover-stay-time="80"
                  @tap.stop="chooseOption(item)"
                >
                  <view class="select-check-slot" :class="{ 'select-check-slot-active': form.industry === item }">
                    <image
                      v-if="form.industry === item"
                      class="select-check-icon"
                      :src="'/package-invest/static/icons/policy-list/check-white.png'"
                      mode="aspectFit"
                    />
                  </view>
                  <text class="select-option-text">{{ item }}</text>
                </view>
              </scroll-view>
            </view>
          </view>

          <view
            class="field-wrap field-wrap-select"
            :class="{ 'field-wrap-select-open': dropdownVisible && dropdownField === 'investmentScale' }"
            @tap.stop
          >
            <text class="field-label">投资规模<text class="required">*</text></text>
            <view class="field-select" @tap.stop="openSelect('investmentScale')">
              <text class="select-value" :class="{ 'select-placeholder': !form.investmentScale }">
                {{ form.investmentScale || "请选择投资规模" }}
              </text>
              <image
                class="select-icon"
                :class="{ 'select-icon-open': dropdownVisible && dropdownField === 'investmentScale' }"
                :src="'/package-invest/static/icons/project-entrust/chevron-down-muted.png'"
                mode="aspectFit"
              />
            </view>
            <view v-if="dropdownVisible && dropdownField === 'investmentScale'" class="select-dropdown" @tap.stop>
              <scroll-view class="select-dropdown-list" scroll-y enhanced>
                <view
                  v-for="item in investmentScaleOptions"
                  :key="`scale-${item}`"
                  class="select-option"
                  :class="{ 'select-option-active': form.investmentScale === item }"
                  hover-class="select-option-hover"
                  hover-stay-time="80"
                  @tap.stop="chooseOption(item)"
                >
                  <view class="select-check-slot" :class="{ 'select-check-slot-active': form.investmentScale === item }">
                    <image
                      v-if="form.investmentScale === item"
                      class="select-check-icon"
                      :src="'/package-invest/static/icons/policy-list/check-white.png'"
                      mode="aspectFit"
                    />
                  </view>
                  <text class="select-option-text">{{ item }}</text>
                </view>
              </scroll-view>
            </view>
          </view>
        </view>
      </view>

      <view class="card" :class="{ 'card-elevated': dropdownVisible && (dropdownField === 'powerRequirement' || dropdownField === 'fireRequirement') }">
        <view class="card-header">
          <text class="card-title">厂房需求</text>
          <text class="card-desc">具体的厂房硬件要求</text>
        </view>
        <view class="card-body">
          <view class="field-wrap">
            <text class="field-label">所需面积 (㎡)<text class="required">*</text></text>
            <input
              v-model="form.requiredArea"
              class="field-input"
              type="number"
              placeholder="请输入所需面积，如5000"
              placeholder-class="placeholder"
            />
          </view>

          <view class="field-wrap">
            <text class="field-label">层高 (米)</text>
            <input
              v-model="form.ceilingHeight"
              class="field-input"
              type="digit"
              placeholder="请输入所需层高，如5"
              placeholder-class="placeholder"
            />
          </view>

          <view
            class="field-wrap field-wrap-select"
            :class="{ 'field-wrap-select-open': dropdownVisible && dropdownField === 'powerRequirement' }"
            @tap.stop
          >
            <text class="field-label">电力需求</text>
            <view class="field-select" @tap.stop="openSelect('powerRequirement')">
              <text class="select-value" :class="{ 'select-placeholder': !form.powerRequirement }">
                {{ form.powerRequirement || "请选择电力需求" }}
              </text>
              <image
                class="select-icon"
                :class="{ 'select-icon-open': dropdownVisible && dropdownField === 'powerRequirement' }"
                :src="'/package-invest/static/icons/project-entrust/chevron-down-muted.png'"
                mode="aspectFit"
              />
            </view>
            <view v-if="dropdownVisible && dropdownField === 'powerRequirement'" class="select-dropdown" @tap.stop>
              <scroll-view class="select-dropdown-list" scroll-y enhanced>
                <view
                  v-for="item in powerOptions"
                  :key="`power-${item}`"
                  class="select-option"
                  :class="{ 'select-option-active': form.powerRequirement === item }"
                  hover-class="select-option-hover"
                  hover-stay-time="80"
                  @tap.stop="chooseOption(item)"
                >
                  <view class="select-check-slot" :class="{ 'select-check-slot-active': form.powerRequirement === item }">
                    <image
                      v-if="form.powerRequirement === item"
                      class="select-check-icon"
                      :src="'/package-invest/static/icons/policy-list/check-white.png'"
                      mode="aspectFit"
                    />
                  </view>
                  <text class="select-option-text">{{ item }}</text>
                </view>
              </scroll-view>
            </view>
          </view>

          <view
            class="field-wrap field-wrap-select"
            :class="{ 'field-wrap-select-open': dropdownVisible && dropdownField === 'fireRequirement' }"
            @tap.stop
          >
            <text class="field-label">消防要求</text>
            <view class="field-select" @tap.stop="openSelect('fireRequirement')">
              <text class="select-value" :class="{ 'select-placeholder': !form.fireRequirement }">
                {{ form.fireRequirement || "请选择消防要求" }}
              </text>
              <image
                class="select-icon"
                :class="{ 'select-icon-open': dropdownVisible && dropdownField === 'fireRequirement' }"
                :src="'/package-invest/static/icons/project-entrust/chevron-down-muted.png'"
                mode="aspectFit"
              />
            </view>
            <view v-if="dropdownVisible && dropdownField === 'fireRequirement'" class="select-dropdown" @tap.stop>
              <scroll-view class="select-dropdown-list" scroll-y enhanced>
                <view
                  v-for="item in fireOptions"
                  :key="`fire-${item}`"
                  class="select-option"
                  :class="{ 'select-option-active': form.fireRequirement === item }"
                  hover-class="select-option-hover"
                  hover-stay-time="80"
                  @tap.stop="chooseOption(item)"
                >
                  <view class="select-check-slot" :class="{ 'select-check-slot-active': form.fireRequirement === item }">
                    <image
                      v-if="form.fireRequirement === item"
                      class="select-check-icon"
                      :src="'/package-invest/static/icons/policy-list/check-white.png'"
                      mode="aspectFit"
                    />
                  </view>
                  <text class="select-option-text">{{ item }}</text>
                </view>
              </scroll-view>
            </view>
          </view>

          <view class="field-wrap">
            <text class="field-label">其他需求</text>
            <textarea
              v-model="form.otherRequirements"
              class="field-textarea"
              maxlength="400"
              placeholder="请输入其他特殊需求，如装修、配套设施等"
              placeholder-class="placeholder"
            />
          </view>
        </view>
      </view>

      <view class="card">
        <view class="card-header">
          <text class="card-title">联系信息</text>
          <text class="card-desc">我们将通过此信息与您联系</text>
        </view>
        <view class="card-body">
          <view class="field-wrap">
            <text class="field-label">联系人<text class="required">*</text></text>
            <input v-model="form.contactName" class="field-input" placeholder="请输入联系人姓名" placeholder-class="placeholder" />
          </view>

          <view class="field-wrap">
            <text class="field-label">联系电话<text class="required">*</text></text>
            <input
              v-model="form.contactPhone"
              class="field-input"
              type="number"
              maxlength="11"
              placeholder="请输入联系电话"
              placeholder-class="placeholder"
            />
          </view>

          <view class="field-wrap">
            <text class="field-label">邮箱地址<text class="required">*</text></text>
            <input
              v-model="form.contactEmail"
              class="field-input"
              type="text"
              placeholder="请输入邮箱地址"
              placeholder-class="placeholder"
            />
          </view>
        </view>
      </view>

      <view class="card">
        <view class="card-header">
          <text class="card-title">附件上传</text>
          <text class="card-desc">上传相关文件以便我们更好地了解您的需求</text>
        </view>
        <view class="card-body">
          <view class="upload-box" @tap="chooseFiles">
            <image class="upload-icon" :src="'/package-invest/static/icons/project-entrust/upload-muted.png'" mode="aspectFit" />
            <text class="upload-title">点击上传或拖拽文件</text>
            <text class="upload-desc">支持 PDF、Word、Excel、图片等格式</text>
          </view>

          <view v-if="fileList.length" class="file-list">
            <view v-for="file in fileList" :key="file.name" class="file-item">
              <text class="file-name">{{ file.name }}</text>
              <text class="file-size">{{ formatSize(file.size) }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="card agreement-card">
        <view class="agreement-row" @tap="agreementChecked = !agreementChecked">
          <view class="agreement-checkbox" :class="{ 'agreement-checkbox-checked': agreementChecked }">
            <image
              v-if="agreementChecked"
              class="agreement-check-icon"
              :src="'/package-invest/static/icons/policy-list/check-white.png'"
              mode="aspectFit"
            />
          </view>
          <text class="agreement-text">
            我已阅读并同意
            <text class="agreement-link">《用户协议》</text>、
            <text class="agreement-link">《隐私政策》</text>
            和
            <text class="agreement-link">《使用须知》</text>
          </text>
        </view>
      </view>

      <view class="action-row">
        <button class="action-btn action-btn-ghost" @tap="resetForm">重置</button>
        <button class="action-btn action-btn-primary" @tap="submitForm">提交需求</button>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f5f7fb;
}

.container {
  width: 100%;
  max-width: 1400rpx;
  margin: 0 auto;
  padding: 48rpx 32rpx;
  box-sizing: border-box;
}

.card {
  position: relative;
  z-index: 1;
  border-radius: 24rpx;
  border: 2rpx solid #e5e7eb;
  background: #ffffff;
  box-shadow: 0 4rpx 16rpx rgba(10, 46, 90, 0.08);
  margin-bottom: 48rpx;
  overflow: visible;
}

.card-elevated {
  z-index: 300;
}

.card-info {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.info-content {
  padding: 32rpx;
  display: flex;
  gap: 24rpx;
}

.info-icon {
  width: 40rpx;
  height: 40rpx;
  margin-top: 4rpx;
  flex-shrink: 0;
}

.info-text-wrap {
  flex: 1;
  min-width: 0;
}

.info-title {
  display: block;
  color: #1e3a8a;
  font-size: 28rpx;
  line-height: 1.5;
  font-weight: 600;
}

.info-desc {
  display: block;
  margin-top: 6rpx;
  color: rgba(30, 58, 138, 0.8);
  font-size: 24rpx;
  line-height: 1.4;
}

.card-ai {
  border-color: #fed7aa;
  background: rgba(255, 247, 237, 0.5);
}

.ai-content {
  padding: 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24rpx;
}

.ai-left {
  display: flex;
  align-items: center;
  gap: 24rpx;
  flex: 1;
  min-width: 0;
}

.ai-icon-wrap {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  background: #ffedd5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ai-icon {
  width: 40rpx;
  height: 40rpx;
}

.ai-copy {
  flex: 1;
  min-width: 0;
}

.ai-title {
  display: block;
  color: #7c2d12;
  font-size: 28rpx;
  line-height: 1.4;
  font-weight: 600;
}

.ai-desc {
  display: block;
  margin-top: 4rpx;
  color: rgba(124, 45, 18, 0.8);
  font-size: 22rpx;
  line-height: 1.5;
}

.ai-btn {
  height: 72rpx;
  padding: 0 32rpx;
  border-radius: 999rpx;
  border: 0;
  background: #f97316;
  color: #ffffff;
  font-size: 22rpx;
  font-weight: 500;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ai-btn::after {
  border: 0;
}

.card-header {
  padding: 48rpx;
  padding-bottom: 32rpx;
}

.card-title {
  display: block;
  color: #111827;
  font-size: 36rpx;
  line-height: 1.4;
  font-weight: 600;
}

.card-desc {
  margin-top: 8rpx;
  display: block;
  color: #6b7280;
  font-size: 28rpx;
  line-height: 1.45;
}

.card-body {
  padding: 0 48rpx 48rpx;
}

.field-wrap {
  margin-top: 32rpx;
}

.field-wrap:first-child {
  margin-top: 0;
}

.field-wrap-select {
  position: relative;
  z-index: 10;
}

.field-wrap-select-open {
  z-index: 700;
}

.field-label {
  display: block;
  color: #111827;
  font-size: 28rpx;
  line-height: 1.35;
  font-weight: 500;
  margin-bottom: 16rpx;
}

.required {
  color: #ef4444;
  margin-left: 4rpx;
}

.field-input,
.field-select {
  width: 100%;
  height: 80rpx;
  border-radius: 12rpx;
  border: 2rpx solid #dbe3ee;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0 24rpx;
}

.field-input {
  font-size: 28rpx;
  color: #111827;
}

.placeholder {
  color: #9ca3af;
}

.field-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.field-select:active {
  border-color: #cbd5e1;
  background: #f8fafc;
}

.select-value {
  flex: 1;
  min-width: 0;
  font-size: 28rpx;
  color: #111827;
}

.select-placeholder {
  color: #9ca3af;
}

.select-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 16rpx;
  flex-shrink: 0;
  opacity: 0.5;
  transition: transform 0.2s ease;
}

.select-icon-open {
  transform: rotate(180deg);
}

.field-textarea {
  width: 100%;
  min-height: 192rpx;
  border-radius: 12rpx;
  border: 2rpx solid #e5e7eb;
  background: #ffffff;
  box-sizing: border-box;
  padding: 16rpx 24rpx;
  font-size: 28rpx;
  line-height: 1.6;
  color: #111827;
}

.upload-box {
  border: 4rpx dashed #e5e7eb;
  border-radius: 24rpx;
  padding: 48rpx 24rpx;
  text-align: center;
}

.upload-icon {
  width: 64rpx;
  height: 64rpx;
  margin: 0 auto;
}

.upload-title {
  display: block;
  margin-top: 16rpx;
  color: #111827;
  font-size: 28rpx;
  line-height: 1.4;
  font-weight: 500;
}

.upload-desc {
  display: block;
  margin-top: 8rpx;
  color: #6b7280;
  font-size: 24rpx;
  line-height: 1.4;
}

.file-list {
  margin-top: 20rpx;
}

.file-item {
  height: 64rpx;
  border-radius: 10rpx;
  background: #f8fafc;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12rpx;
}

.file-item:first-child {
  margin-top: 0;
}

.file-name {
  max-width: 70%;
  font-size: 24rpx;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  font-size: 22rpx;
  color: #6b7280;
}

.agreement-card {
  padding: 32rpx;
}

.agreement-row {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
}

.agreement-checkbox {
  margin-top: 4rpx;
  width: 32rpx;
  height: 32rpx;
  border-radius: 999rpx;
  border: 2rpx solid #003367;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.agreement-checkbox-checked {
  background: #003367;
}

.agreement-check-icon {
  width: 20rpx;
  height: 20rpx;
}

.agreement-text {
  flex: 1;
  font-size: 24rpx;
  line-height: 1.65;
  color: #6b7280;
}

.agreement-link {
  color: #003367;
}

.select-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 8rpx);
  z-index: 500;
  border: 2rpx solid #e5e7eb;
  border-radius: 12rpx;
  background: #ffffff;
  box-shadow: 0 10rpx 28rpx rgba(15, 23, 42, 0.1);
  overflow: hidden;
}

.select-dropdown-list {
  max-height: 360rpx;
}

.select-option {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 68rpx;
  border-radius: 8rpx;
  padding: 12rpx 16rpx 12rpx 64rpx;
  box-sizing: border-box;
}

.select-option-hover {
  background: #f3f4f6;
}

.select-option-active {
  background: #f8fafc;
}

.select-check-slot {
  position: absolute;
  left: 16rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 28rpx;
  height: 28rpx;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select-check-slot-active {
  background: #003367;
}

.select-check-icon {
  width: 20rpx;
  height: 20rpx;
}

.select-option-text {
  display: block;
  font-size: 28rpx;
  line-height: 1.4;
  color: #111827;
}

.action-row {
  display: flex;
  gap: 24rpx;
  padding-bottom: 32rpx;
}

.action-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.action-btn::after {
  border: 0;
}

.action-btn-ghost {
  border: 2rpx solid #e5e7eb;
  background: #ffffff;
  color: #111827;
}

.action-btn-primary {
  border: 0;
  background: linear-gradient(135deg, #003367 0%, #004d99 100%);
  color: #ffffff;
}
</style>
