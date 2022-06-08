<template>
  <div>
    <nav class="w-full flex pb-2 mb-2 border-b border-gray-300/50 items-center">
      <span class="text-xl font-bold mr-2 text-taikisha"> {{ $t("app.name") }}</span>
      <span class="font-bold text-xl">||</span>
      <span class="text-lg font-semibold ml-4 mr-10 text-taikisha">
        {{ $t("pages.master-data.title") }}
      </span>
    </nav>
  </div>
</template>

<route lang="yaml">
name: master-data
meta:
  layout: secure
</route>
