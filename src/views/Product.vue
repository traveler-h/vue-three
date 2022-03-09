<template>
  <div v-show="data.isLoading" class="loding">
    <Loading :progress="data.progress"></Loading>
  </div>
  <div v-show="!data.isLoading" class="products" id="products">
    <div
      class="desc"
      :class="{ active: data.descIndex == i }"
      v-if="data.products[data.pIdx]"
      v-for="(desc, i) in data.products[data.pIdx].desc"
    >
      <h1 class="title">{{ desc.title }}</h1>
      <p class="content">{{ desc.content }}</p>
    </div>
    <div class="product-list" :class="{ hidden: store.state.isFullscreen }">
      <h1>
        <SketchOutlined />产品推荐
      </h1>
      <div class="product">
        <div
          class="product-item"
          v-for="(item, index) in data.products"
          @click="changeModel(item, index)"
        >
          <div class="title">{{ item.title }}</div>
          <img :src="item.imgsrc" :class="{ active: index == data.pIdx }" :alt="item.title" />
          <a-button type="primary" block @click.stop="addToCart(item)">
            <template #icon>
              <ShoppingCartOutlined />
            </template>
            加入购物车
          </a-button>
        </div>
      </div>
    </div>
    <div class="scene-list" :class="{ hidden: store.state.isFullscreen }">
      <h1>
        <RadarChartOutlined />切换使用场景
      </h1>
      <div class="scenes">
        <div
          class="scene-item"
          v-for="(scene, index) in data.scenes"
          @click="changeHdr(scene, index)"
        >
          <img
            :class="{ active: index == data.sIdx }"
            :src="`./files/hdr/${scene}.jpg`"
            :alt="scene"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import {
  SketchOutlined,
  RadarChartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons-vue";
import { getProduct } from "../api/idnex";
import Loading from "../components/Loading.vue";
import Base3d from "../utils/Base3d";

const data = reactive({
  products: [],
  scenes: [],
  isLoading: true,
  pIdx: 0,
  sIdx: 0,
  base3d: {},
  descIndex: 0,
  progress: 0
});

const store = useStore();
function LoadingFinish() {
  data.isLoading = false;
}

onMounted(async () => {
  let result = await getProduct();
  data.products = result?.list;
  data.scenes = result?.hdr;
  // data.isLoading = false;
  data.base3d = new Base3d("#products", LoadingFinish);
  data.base3d.onProgress((e) => {
    let progressNum = e.loaded / e.total;
    progressNum = progressNum.toFixed(2) * 100;
    data.progress = progressNum;
    // console.log(progressNum);
  });
});

window.addEventListener("mousewheel", (e) => {
  if (e.deltaY > 0) {
    store.commit("setFullscreen", true);
  }

  if (e.deltaY < 0) {
    store.commit("setFullscreen", false);
  }
});

window.addEventListener("mousewheel", (e) => {
  let duration = data.base3d.animateAction._clip.duration;
  let time = data.base3d.animateAction.time;
  let index = Math.floor((time / duration) * 4);
  data.descIndex = index;
});

const changeModel = (item, index) => {
  console.log(index);
  data.pIdx = index
  data.base3d.setModel(item.modelName)
}

const changeHdr = (scene, index) => {
  console.log(index);
  data.sIdx = index
  data.base3d.setEnvMap(scene);
}

const addToCart = (item) => {
  let product = { ...item, num: 1 }
  let index = 0
  const isExit = store.state.buycarts.some((item, idx) => {
    if (item.id === product.id) {
      index = idx
      return true
    } else {
      return false
    }
  })
  if (isExit) {
    store.commit('addBuycartsNum', index)
  } else {
    store.commit('addBuycarts', product)

  }
}
</script>

<style lang="less" scoped>
.products {
  width: 100vw;
  height: 100vh;
  .desc {
    position: fixed;
    z-index: 100000;
    background-color: rgba(255, 255, 255, 0.5);
    width: 600px;
    top: 100px;
    left: 50%;
    margin-left: -300px;
    transition: all 0.5s;
    transform: translate(-100vw, 0);
    padding: 15px;
  }
  .desc.active {
    transform: translate(0, 0);
  }
  .product-list,
  .scene-list {
    position: fixed;
    width: 300px;
    height: calc(100vh - 80px);
    text-align: center;
    background-color: rgba(255, 255, 255, 0.5);
    transition: all 0.5s;
    top: 80px;

    h1 {
      font-size: 20px;
      font-weight: 900;
      padding: 10px 25px 0;
    }
  }
  .product-list {
    left: 0;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    .product {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .product-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 250px;
        margin: 10px 0;
        background-color: #ffffff;
        border-radius: 20px;
        box-shadow: 5px 5px 10px #666666;
        transition: all 0.3s;

        &.active {
          box-shadow: 2px 2px 5px #666, 0px 0px 10px red;
        }

        &:hover {
          transform: translate(0px, -5px);
          box-shadow: 2px 2px 5px #666, 0px 0px 10px orangered;
          // background-color: orange;
        }

        .title {
          padding: 0 20px;
        }

        img {
          width: 120px;
        }

        .cart {
        }
      }
    }
  }
  .scene-list {
    right: 0;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    h3 {
      font-size: 20px;
      font-weight: 900;
      padding: 0 30px;
    }
    .scenes {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .scene-item {
      padding: 6px 0;

      img {
        width: 230px;
        border-radius: 10px;
        box-shadow: 2px 2px 10px #666;
        transition: all 0.3s;
        &.active {
          box-shadow: 2px 2px 5px #666, 0px 0px 10px red;
        }
        &:hover {
          transform: translate(0px, -5px);
          box-shadow: 2px 2px 5px #666, 0px 0px 10px orangered;
        }
      }
    }
  }
  .product-list.hidden {
    transform: translate(-100%, 0);
  }

  .scene-list.hidden {
    transform: translate(100%, 0);
  }
}
</style>