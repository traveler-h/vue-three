<template>
  <div class="home-bannerbg" :style="{ backgroundColor: data.bgColor }"></div>
  <a-carousel autoplay arrows :beforeChange="changeFn">
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <left-circle-outlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <right-circle-outlined />
      </div>
    </template>
    <div class="home-banner" v-for="item in props.banner" :key="item._id">
      <div class="banner-item">
        <div class="item-l">
          <h3 :style="{ color: item.text_color }">{{ item.desktop_sub_title || item.sub_title }}</h3>
          <h1 :style="{ color: item.text_color }">{{ item.desktop_title || item.title }}</h1>
        </div>
        <div class="item-r">
          <img :src="item.imgsrc" alt />
        </div>
      </div>
    </div>
  </a-carousel>
</template>

<script setup>
import { reactive } from "vue";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons-vue";
const props = defineProps({ banner: Array });
const data = reactive({
  bgColor: props.banner[0]?.bg_color,
});
const changeFn = (from, to) => {
  data.bgColor = props.banner[to]?.bg_color;
  console.log(to);
};
</script>

<style scoped lang="less">
.home-bannerbg {
  position: absolute;
  background: #ff0000;
  transform: skew(0, -8deg);
  transition: all 0.5s;
  width: 100%;
  height: 575px;
  transform-origin: 0 0;
}

.home-banner {
  display: block !important;
  .banner-item {
    display: flex;
    height: 575px;
    justify-content: center;
    min-width: 1200px;
    .item-l {
      width: 340px;
      padding-right: 100px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-top: 100px;
      text-align: right;
    }
    h3 {
      font-size: 30px;
      font-weight: 900;
      margin: 0;
      line-height: 40px;
    }
    h1 {
      font-size: 60px;
      font-weight: 900;
      margin: 0;
      line-height: 70px;
    }

    .item-r {
      margin-top: 45px;
      transform-origin: 0 100%;
      transform: skew(0, -8deg);
      overflow: hidden;
      border-radius: 20px;
      border-bottom-right-radius: 80px;
      img {
        transform-origin: 0 100%;
        transform: skew(0, 8deg);
        border-radius: 20px;
      }
    }
  }
}
/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  overflow: hidden;
  height: 575px;
  line-height: 575px;
}

.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 16px;
  line-height: 16px;
  font-size: 25px;
  color: #fff;
  opacity: 0.3;
  z-index: 1;
}
.ant-carousel :deep(.custom-slick-arrow:before) {
  display: none;
}
.ant-carousel :deep(.custom-slick-arrow:hover) {
  opacity: 0.5;
}

.ant-carousel :deep(.slick-slide h3) {
  color: #fff;
}
</style>