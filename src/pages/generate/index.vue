<script setup lang="ts">
  import { useHead } from "@vueuse/head";

  useHead({
    title: "Taikisha | Oven Configurator",
  });
</script>
<template>
  <div>
    <nav class="w-full flex pb-2 mb-2 border-b border-gray-400/50 dark:bg-gray-800 items-center">
      <span class="text-xl font-bold mr-2 text-taikisha"> {{ $t("app.name") }}</span>
      <span class="font-bold text-xl">||</span>
      <span class="text-lg font-semibold ml-4 mr-10 text-taikisha">
        {{ $t("pages.generate-models.title") }}
      </span>
    </nav>
  </div>
</template>

<route lang="yaml">
name: generate
meta:
  layout: secure
</route>
