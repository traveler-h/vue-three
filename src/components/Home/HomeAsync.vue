<template>
  <div class="home-page">
    <Banner :banner="data.banner" />
  </div>
  <div class="category" @click="goProduct">
    <h1>乐享生活100+</h1>
    <div class="category-list">
      <div class="category-item" v-for="item in data.sports.slice(0, 10)">
        <div class="item-btn">
          <img :src="item.menuThumbnail" :alt="item.displayName" />
          <h3>{{ item.displayName }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { getHomepage } from "../../api/idnex";
import Banner from "./Banner.vue";

export default {
  components: {
    Banner,
  },
  setup() {
    const state = reactive({
      data: {
        banner: [],
        hero: [],
        innovation: [],
        keywords: [],
        monthly: [],
        panoply: [],
        recall: [],
        sports: [],
        service: [],
        values: [],
        recommend: [],
      },
    });

    const getData = async () => {
      const result = await getHomepage();
      state.data = { ...result };
      console.log(state.data);
    };
    getData();
    const router = useRouter()

    const goProduct = () => {
      router.push('/product')
    }
    return {
      ...toRefs(state),
      goProduct
    };
  },
};
</script>

<style lang="less" scoped>
.home-page {
  width: 100%;
  height: 575px;
  position: relative;
  overflow: hidden;
}
.category {
  width: 60%;
  margin: 0 auto;
  padding: 40px 0;
  h1 {
    text-align: center;
  }
  .category-list {
    display: grid;
    grid-template-columns: repeat(5, 19%);
    grid-gap: 10% 2.5%;

    .category-item {
      width: 100%;

      .item-btn {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: #ffffff;
        box-shadow: 5px 5px 5px #cccccc;
        border-radius: 8px 8px 25px 8px;

        img {
          height: 64px;
          object-fit: contain;
        }

        h3 {
          font-weight: 700;
        }
      }
    }
  }
}
</style>