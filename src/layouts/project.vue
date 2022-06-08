<script lang="ts">
  export default {
    name: "LayoutProject",
  };
</script>

<script setup lang="ts">
  import _ from "lodash";
  import { Ref, ref } from "vue";
  import { useRouter } from "vue-router";
  import IconArrowForward from "~icons/ic/baseline-navigate-next";

  const router = useRouter();
  const wizardPages = [
    "/create-project",
    "/create-project/layout-designer",
    "/create-project/sizing",
    "/create-project/summary",
  ];

  console.log();
  const totalPages: number = wizardPages.length;
  const currentPageIndex: Ref<number> = ref(
    _.indexOf(wizardPages, router.currentRoute.value.fullPath)
  );

  function getClasses(index: number): string {
    if (currentPageIndex.value === index) {
      return "cursor-pointer ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white router-link-active router-link-exact-active";
    }

    return "cursor-pointer ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white";
  }

  function go(index: number): void {
    currentPageIndex.value = index;
    const link = wizardPages[currentPageIndex.value];
    router.push(link);
  }

  function next(): void {
    const idx: number = (currentPageIndex.value + 1) % totalPages;
    go(idx);
  }

  function prev(): void {
    let idx: number = (currentPageIndex.value - 1) % totalPages;
    if (idx < 0) {
      idx = 0;
    }
    go(idx);
  }

  function submit(): void {
    // do something
  }
</script>

<template>
  <application-sidebar />
  <application-header />
  <nav
    class="fixed top-12 z-[900] w-full flex pt-[0.7rem] pl-20 pb-2 mb-2 border-b border-gray-400/50 dark:bg-gray-800 dark:text-white bg-white text-gray-800 opacity-100 items-center">
    <span class="text-xl font-bold mr-2 text-taikisha"> {{ $t("app.name") }}</span>
    <span class="font-bold text-xl">||</span>
    <span class="text-xl font-bold ml-4 mr-10 text-taikisha">{{
      $t("pages.new-project.new-oven-design")
    }}</span>
    <ol class="text-sm inline-flex items-center space-x-1 md:space-x-3">
      <li>
        <div class="flex items-center">
          <span :class="getClasses(0)" @click="go(0)">
            {{ $t("pages.new-project.information") }}
          </span>
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <IconArrowForward />
          <span :class="getClasses(1)" @click="go(1)">
            {{ $t("pages.new-project.layout") }}
          </span>
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <IconArrowForward />
          <span :class="getClasses(2)" @click="go(2)">
            {{ $t("pages.new-project.sizing") }}
          </span>
        </div>
      </li>
      <li>
        <div class="flex items-center">
          <IconArrowForward />
          <span :class="getClasses(3)" @click="go(3)">
            {{ $t("pages.new-project.summary") }}
          </span>
        </div>
      </li>
    </ol>
    <div class="ml-auto text-sm inline-flex">
      <button
        type="button"
        class="button disabled:opacity-50"
        :disabled="currentPageIndex === 0"
        @click="prev">
        {{ $t("common.previous") }}
      </button>
      <button
        type="button"
        class="button disabled:opacity-50"
        :disabled="currentPageIndex === totalPages - 1"
        @click="next">
        {{ $t("common.next") }}
      </button>
      <button
        type="button"
        class="button disabled:opacity-50"
        :disabled="currentPageIndex < totalPages - 1"
        @click="submit">
        {{ $t("common.submit") }}
      </button>
    </div>
  </nav>
  <main
    class="pt-24 pl-20 dark:bg-gray-800 dark:text-white bg-white text-gray-800 min-h-screen mb-4">
    <router-view />
  </main>
</template>

<style scoped></style>
