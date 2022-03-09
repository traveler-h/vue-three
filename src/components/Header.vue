<template>
  <a-row
    class="header"
    type="flex"
    justify="space-around"
    :class="{ hidden: store.state.isFullscreen }"
  >
    <a-col class="l-logo" :span="14">
      <img src="../assets/img/logo.png" alt />
      <a-input-search
        v-model:value="data.value"
        placeholder="input search text"
        enter-button
        @search="onSearch"
      />
    </a-col>
    <a-col class="r-menu" :span="10">
      <a-menu v-model:selectedKeys="data.current" mode="horizontal">
        <a-menu-item key="help">
          <template #icon>
            <mail-outlined />
          </template>
          帮助中心
        </a-menu-item>
        <a-menu-item @click="goCart" key="buycar">
          <template #icon>
            <appstore-outlined />
          </template>
          个人中心
        </a-menu-item>
        <a-sub-menu key="center">
          <template #icon>
            <setting-outlined />
          </template>
          <template #title>购物车</template>
          <a-menu-item-group title="商品">
            <a-menu-item v-for="(item, idx) in store.state.buycarts" :key="item.id">
              <div class="product-item">
                <div class="left">
                  <img :src="item.imgsrc" :alt="item.title" />
                </div>
                <div class="middle">
                  <div class="product-title">
                    <span>{{ item.title }}</span>
                  </div>
                  <div class="product-num">
                    <span>数量：{{ item.num }}</span>
                    <div class="control">
                      <span class="btn" @click.stop="store.commit('addBuycartsNum', idx)">+</span>
                      <span class="btn" @click.stop="store.commit('minusBuycartsNum', idx)">-</span>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <span class="price">{{ item.num * item.price }}</span>
                </div>
              </div>
            </a-menu-item>
            <a-menu-item key="total">总价</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
      </a-menu>
    </a-col>
  </a-row>
</template>

<script setup>
import { reactive, ref } from "vue";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const value = ref("");
const store = useStore()
const router = useRouter()
const data = reactive({
  value: '',
  current: ['help']
})
const onSearch = (searchValue) => {
  console.log("use value", searchValue);
  console.log("or use this.value", value.value);
};

</script>


<style lang="less" scoped>
.header {
  height: 80px;
  transition: all 0.5s;
  .l-logo {
    display: flex;
    // justify-content: space-around;
    align-items: center;

    img {
      max-height: 80px;
      margin: 0 80px0;
    }
  }

  .r-menu {
    display: flex;
    justify-content: flex-end;
    padding-right: 100px;
    align-items: center;
  }
}
.header.hidden {
  transform: translate(0, -100%);
}
</style>