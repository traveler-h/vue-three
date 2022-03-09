<template>
  <h1 @click="sendRead">
    文章标题：{{ title }}, 读者数量：{{ reader }}, 文章内容：
    {{ article?.content }}
  </h1>
  <h2>{{ count }}</h2>
  <a-button type="primary" @click="addCount">点击+1</a-button>
</template>
<script>
import { ref, defineEmits, defineProps } from "vue";
defineProps({
  article: Object,
  title: String,
  reader: Number,
});
export default {
  setup() {
    let count = ref(0);

    const addCount = () => {
      count.value++;
    };

    const emit = defineEmits(["finishRead"]);
    const sendRead = () => {
      emit("finishRead", "【已读】");
    };
    return {
      count,
      addCount,
      sendRead
    }
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
