<script lang="ts">
  export default {
    name: "LayoutSecure",
  };
</script>
<template>
  <application-sidebar />
  <application-header />
  <main
    class="pt-16 pl-20 dark:bg-gray-800 dark:text-white bg-white text-gray-800 min-h-screen mb-4">
    <router-view />
  </main>
</template>
