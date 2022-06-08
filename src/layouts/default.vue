<script lang="ts">
  export default {
    name: "LayoutDefault",
  };
</script>

<template>
  <application-header />
  <main class="dark:bg-gray-800 dark:text-white bg-white text-gray-800 min-h-screen mb-4">
    <router-view />
  </main>
  <application-footer />
</template>
