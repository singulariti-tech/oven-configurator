<script lang="ts">
  export default {
    name: "Layout404",
  };
</script>

<template>
  <application-header />
  <main class="w-full min-h-screen bg-blue-100 grid place-items-center mb-4">
    <router-view />
  </main>
  <application-footer />
</template>
