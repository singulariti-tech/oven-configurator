<script setup lang="ts">
  import { Ref, ref, onMounted, nextTick } from "vue";
  import { useI18n } from "vue-i18n";
  import { useStorage } from "@vueuse/core";

  defineEmits(["toggleSidebar"]);

  const { availableLocales } = useI18n();

  //   const preferedDark = usePreferredDark();
  const isDark = useStorage("isDark", ref(false));
  const body: Ref<HTMLBodyElement | null> = ref(null);

  onMounted(async () => {
    await nextTick();

    body.value = document.querySelector("body") as HTMLBodyElement;
    if (body.value) {
      if (isDark.value) body.value.classList.add("dark");
    }
  });
</script>

<template>
  <header>
    <nav
      class="fixed w-full z-[1000] bg-white text-gray-800 dark:bg-gray-800 dark:text-white py-2 pl-3 px-8 shadow-sm dark:shadow-sm flex items-center border-b border-gray-400/50">
      <div>
        <router-link :to="{ name: 'home' }">
          <div class="font-bold lg:text-xl md:text-lg text-md flex content-start">
            <img src="@/assets/images/site/logo_en.png" class="bg-left h-8" />
          </div>
        </router-link>
      </div>
      <div class="ml-auto flex items-center h-full">
        <select
          id="language"
          v-model="$i18n.locale"
          class="py-1 focus:outline-none rounded dark:text-gray-800">
          <option v-for="locale in availableLocales" :key="locale" :value="locale">
            {{ locale }}
          </option>
        </select>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
