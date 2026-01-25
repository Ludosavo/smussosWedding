<script setup>
import { onBeforeUnmount, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";

const route = useRoute();

const syncBackground = () => {
  const root = document.documentElement;
  if (route.path === "/") {
    root.classList.add("home-bg");
  } else {
    root.classList.remove("home-bg");
  }
};

onMounted(syncBackground);
watchEffect(syncBackground);
onBeforeUnmount(() => document.documentElement.classList.remove("home-bg"));
</script>

<template>
  <NavBar />
  <router-view />
</template>
