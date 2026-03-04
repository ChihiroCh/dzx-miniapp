<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import FactoryDetailContentFromTestV2 from "./components/FactoryDetailContentFromTestV2.vue";

const factory = ref({
  id: "",
  name: "厂房详情",
  image: "",
  area: "-",
  height: "-",
  power: "-",
  rent: "-",
  tags: [],
});

const decodeValue = (value) => {
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
  const tagsText = decodeValue(query?.tags);
  factory.value = {
    id: decodeValue(query?.id),
    name: decodeValue(query?.name) || "厂房详情",
    image: decodeValue(query?.image),
    area: decodeValue(query?.area) || "-",
    height: decodeValue(query?.height) || "-",
    power: decodeValue(query?.power) || "-",
    rent: decodeValue(query?.rent) || "-",
    tags: tagsText ? tagsText.split("|").filter(Boolean) : [],
  };
});
</script>

<template>
  <view class="page">
    <FactoryDetailContentFromTestV2 :factory-data="factory" />
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 32rpx 32rpx 0;
  box-sizing: border-box;
  background: #f5f7fb;
}
</style>
