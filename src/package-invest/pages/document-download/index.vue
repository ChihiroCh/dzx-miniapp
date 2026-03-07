<script setup>
import { computed, ref } from "vue";

const keyword = ref("");
const activeCategory = ref("全部");

const categories = ["全部", "安全规范", "政策补贴", "法律文件", "申报指南"];

const docs = [
  {
    id: "d1",
    title: "2026年上海各区选址补贴汇总.pdf",
    meta: "4.5MB · PDF",
    downloads: "1200",
    score: "98%",
    category: "政策补贴",
    icon: "../../static/icons/document-download/file-text-red.png",
    iconKind: "file",
  },
  {
    id: "d2",
    title: "标准厂房租赁合同(政府参考版).doc",
    meta: "52KB · DOC",
    downloads: "3500",
    score: "95%",
    category: "法律文件",
    icon: "../../static/icons/document-download/file-text-blue.png",
    iconKind: "file",
  },
  {
    id: "d3",
    title: "企业环评报批流程全攻略.pdf",
    meta: "2.1MB · PDF",
    downloads: "890",
    score: "88%",
    category: "申报指南",
    icon: "../../static/icons/document-download/file-text-red.png",
    iconKind: "file",
  },
  {
    id: "d4",
    title: "高新技术企业认定条件及材料清单.xls",
    meta: "156KB · XLS",
    downloads: "2100",
    score: "92%",
    category: "政策补贴",
    icon: "../../static/icons/document-download/sheet-green.png",
    iconKind: "sheet",
  },
  {
    id: "d5",
    title: "专精特新\"小巨人\"企业申报指南.pdf",
    meta: "3.2MB · PDF",
    downloads: "1650",
    score: "90%",
    category: "申报指南",
    icon: "../../static/icons/document-download/file-text-red.png",
    iconKind: "file",
  },
  {
    id: "d6",
    title: "厂房消防安全检查清单.doc",
    meta: "89KB · DOC",
    downloads: "756",
    score: "85%",
    category: "安全规范",
    icon: "../../static/icons/document-download/file-text-blue.png",
    iconKind: "file",
  },
  {
    id: "d7",
    title: "工业用地出让合同范本.pdf",
    meta: "1.8MB · PDF",
    downloads: "543",
    score: "82%",
    category: "法律文件",
    icon: "../../static/icons/document-download/file-text-red.png",
    iconKind: "file",
  },
  {
    id: "d8",
    title: "企业搬迁补贴申报表.xls",
    meta: "234KB · XLS",
    downloads: "1200",
    score: "88%",
    category: "政策补贴",
    icon: "../../static/icons/document-download/sheet-green.png",
    iconKind: "sheet",
  },
];

const filteredDocs = computed(() => {
  const query = keyword.value.trim().toLowerCase();
  return docs.filter((item) => {
    const categoryOk = activeCategory.value === "全部" || item.category === activeCategory.value;
    if (!categoryOk) {
      return false;
    }
    if (!query) {
      return true;
    }
    return item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
  });
});

const onDownload = (item) => {
  uni.showToast({
    title: `开始下载：${item.title}`,
    icon: "none",
  });
};

const onFavorite = () => {
  uni.showToast({
    title: "已收藏",
    icon: "none",
  });
};

const onShare = () => {
  uni.showToast({
    title: "分享功能开发中",
    icon: "none",
  });
};

const onFeedback = () => {
  uni.showToast({
    title: "反馈入口开发中",
    icon: "none",
  });
};
</script>

<template>
  <view class="doc-page">
    <view class="doc-content">
      <view class="search-filter-wrap">
        <view class="search-wrap">
          <image class="search-icon" src="../../static/icons/document-download/search-muted.png" mode="aspectFit" />
          <input v-model="keyword" class="search-input" type="text" placeholder="搜索文档..." />
        </view>

        <view class="filter-wrap">
          <text class="filter-title">分类筛选</text>
          <scroll-view class="filter-scroll" scroll-x enable-flex show-scrollbar="false">
            <view class="filter-row">
              <view
                v-for="item in categories"
                :key="item"
                class="filter-chip"
                :class="{ 'filter-chip-active': item === activeCategory }"
                @tap="activeCategory = item"
              >
                <text class="filter-chip-text" :class="{ 'filter-chip-text-active': item === activeCategory }">{{ item }}</text>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>

      <text class="result-count">找到 {{ filteredDocs.length }} 个文档</text>

      <view class="doc-list">
        <view v-for="item in filteredDocs" :key="item.id" class="doc-card">
          <view class="doc-card-content">
            <view class="doc-head">
              <view class="doc-icon-wrap">
                <image class="doc-icon" :class="item.iconKind === 'sheet' ? 'doc-icon-sheet' : 'doc-icon-file'" :src="item.icon" mode="aspectFit" />
              </view>
              <view class="doc-main">
                <text class="doc-title">{{ item.title }}</text>
                <text class="doc-meta">{{ item.meta }}</text>
              </view>
            </view>

            <view class="doc-stat-row">
              <view class="doc-stats">
                <view class="doc-stat-item">
                  <image class="doc-stat-icon" src="../../static/icons/document-download/download-muted.png" mode="aspectFit" />
                  <text class="doc-stat-text">{{ item.downloads }}</text>
                </view>
                <view class="doc-stat-item">
                  <image class="doc-stat-icon" src="../../static/icons/document-download/heart-muted.png" mode="aspectFit" />
                  <text class="doc-stat-text">{{ item.score }}</text>
                </view>
              </view>
              <view class="doc-tag">
                <text class="doc-tag-text">{{ item.category }}</text>
              </view>
            </view>

            <view class="doc-action-row">
              <view class="doc-download-btn" hover-class="doc-btn-hover" @tap="onDownload(item)">
                <image class="doc-action-icon" src="../../static/icons/document-download/download-muted.png" mode="aspectFit" />
                <text class="doc-download-text">下载</text>
              </view>
              <view class="doc-icon-btn" hover-class="doc-btn-hover" @tap="onFavorite">
                <image class="doc-action-icon" src="../../static/icons/document-download/heart-muted.png" mode="aspectFit" />
              </view>
              <view class="doc-icon-btn" hover-class="doc-btn-hover" @tap="onShare">
                <image class="doc-action-icon" src="../../static/icons/document-download/share-2-muted.png" mode="aspectFit" />
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="feedback-wrap">
        <view class="feedback-btn" hover-class="doc-btn-hover" @tap="onFeedback">
          <image class="feedback-icon" src="../../static/icons/document-download/message-square-muted.png" mode="aspectFit" />
          <text class="feedback-text">没有找到需要的文档？反馈需求</text>
        </view>
      </view>

      <view class="doc-footer">
        <view class="doc-footer-inner">
          <view class="doc-footer-text-wrap">
            <text class="doc-footer-text">租厂房直接和园区谈</text>
            <text class="doc-footer-text">© 2026 大招象 版权所有</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.doc-page {
  min-height: 100vh;
  background: #ffffff;
}

.doc-content {
  padding: 48rpx 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.search-filter-wrap {
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.search-wrap {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 24rpx;
  top: 50%;
  width: 36rpx;
  height: 36rpx;
  transform: translateY(-50%);
}

.search-input {
  height: 80rpx;
  border-radius: 16rpx;
  border: 2rpx solid #dbe3ef;
  background: #ffffff;
  padding: 0 24rpx 0 72rpx;
  font-size: 28rpx;
  color: #0f172a;
  box-sizing: border-box;
}

.filter-wrap {
  display: flex;
  flex-direction: column;
}

.filter-title {
  display: block;
  font-size: 22rpx;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 16rpx;
}

.filter-row {
  display: inline-flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  gap: 12rpx;
  padding-right: 8rpx;
}

.filter-scroll {
  width: 100%;
}

.filter-chip {
  border-radius: 999rpx;
  border: 2rpx solid #e2e8f0;
  background: #ffffff;
  padding: 4rpx 20rpx;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.filter-chip-active {
  border-color: transparent;
  background: #003367;
}

.filter-chip-text {
  font-size: 24rpx;
  line-height: 1.2;
  color: #0f172a;
  font-weight: 600;
}

.filter-chip-text-active {
  color: #ffffff;
}

.result-count {
  display: block;
  font-size: 28rpx;
  color: #64748b;
}

.doc-list {
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.doc-card {
  border-radius: 16rpx;
  border: 2rpx solid #e2e8f0;
  background: #ffffff;
  box-shadow: 0 4rpx 12rpx rgba(15, 23, 42, 0.05);
  overflow: hidden;
}

.doc-card-content {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.doc-head {
  display: flex;
  align-items: flex-start;
  column-gap: 24rpx;
}

.doc-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  border-radius: 16rpx;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.doc-icon {
  display: block;
  margin: 0 auto;
}

.doc-icon-file {
  width: 48rpx;
  height: 48rpx;
}

.doc-icon-sheet {
  width: 52rpx;
  height: 52rpx;
}

.doc-main {
  flex: 1;
  min-width: 0;
  padding-top: 2rpx;
}

.doc-title {
  display: block;
  font-size: 28rpx;
  line-height: 1.4;
  color: #0f172a;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.doc-meta {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  line-height: 1.35;
  color: #64748b;
}

.doc-stat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 16rpx;
}

.doc-stats {
  display: flex;
  align-items: center;
  column-gap: 24rpx;
}

.doc-stat-item {
  display: inline-flex;
  align-items: center;
  column-gap: 8rpx;
}

.doc-stat-icon {
  width: 28rpx;
  height: 28rpx;
}

.doc-stat-text {
  font-size: 24rpx;
  line-height: 1.2;
  color: #64748b;
}

.doc-tag {
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.doc-tag-text {
  font-size: 24rpx;
  line-height: 1.2;
  color: #64748b;
}

.doc-action-row {
  display: flex;
  align-items: center;
  column-gap: 12rpx;
  padding-top: 16rpx;
}

.doc-download-btn {
  height: 72rpx;
  border-radius: 12rpx;
  border: 2rpx solid #dbe3ef;
  background: #ffffff;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8rpx;
}

.doc-icon-btn {
  height: 72rpx;
  border-radius: 12rpx;
  background: transparent;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.doc-action-icon {
  width: 32rpx;
  height: 32rpx;
}

.doc-download-text {
  font-size: 28rpx;
  line-height: 1.2;
  color: #334155;
  font-weight: 500;
}

.doc-btn-hover {
  opacity: 0.88;
}

.feedback-wrap {
  padding-top: 48rpx;
  border-top: 2rpx solid #e2e8f0;
}

.feedback-btn {
  height: 80rpx;
  border-radius: 12rpx;
  border: 2rpx solid #dbe3ef;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 12rpx;
}

.feedback-icon {
  width: 36rpx;
  height: 36rpx;
}

.feedback-text {
  font-size: 28rpx;
  color: #334155;
  line-height: 1.3;
  font-weight: 500;
}

.doc-footer {
  margin-top: 16rpx;
  border-top: 2rpx solid #e2e8f0;
  background: #ffffff;
}

.doc-footer-inner {
  padding-top: 8rpx;
  padding-bottom: 24rpx;
  display: flex;
  justify-content: center;
}

.doc-footer-text-wrap {
  width: 323rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0.6;
}

.doc-footer-text {
  font-size: 28rpx;
  line-height: 1.5;
  color: #64748b;
}
</style>
