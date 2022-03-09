<template>
  <suspense>
    <template #fallback>
      <VLoading />
    </template>
    <template #default>
      <HomeAsync></HomeAsync>
    </template>
  </suspense>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import VLoading from "../components/Loading.vue";
const HomeAsync = defineAsyncComponent(() => 
  import("../components/Home/HomeAsync.vue")
);
</script>

<style>
</style>