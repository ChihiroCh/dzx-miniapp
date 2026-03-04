<script setup>
const projects = [
  { id: 'A001', name: '新能源电池材料项目', budget: '2.5亿元' },
  { id: 'A002', name: '高端装备制造项目', budget: '1.2亿元' },
  { id: 'A003', name: '数字经济产业园项目', budget: '3.8亿元' },
]

const openDetail = (id) => {
  uni.navigateTo({
    url: `/package-invest/pages/project-detail/index?id=${id}`,
  })
}
</script>

<template>
  <view class="page">
    <view v-for="item in projects" :key="item.id" class="project-card" @tap="openDetail(item.id)">
      <text class="project-name">{{ item.name }}</text>
      <text class="project-meta">计划投资：{{ item.budget }}</text>
      <text class="project-link">查看详情 ></text>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 24rpx;
  background: #f5f7fb;
  box-sizing: border-box;
}

.project-card {
  margin-bottom: 16rpx;
  padding: 24rpx;
  border-radius: 18rpx;
  background: #fff;
}

.project-name {
  display: block;
  font-size: 30rpx;
  color: #1f2430;
  font-weight: 500;
}

.project-meta {
  display: block;
  margin-top: 12rpx;
  font-size: 24rpx;
  color: #6c7480;
}

.project-link {
  display: block;
  margin-top: 12rpx;
  font-size: 24rpx;
  color: #003367;
}
</style>
