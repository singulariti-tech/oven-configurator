<script setup lang="ts">
  import _ from "lodash";
  import { useRouter } from "vue-router";
  import IconProjects from "~icons/ion/albums-outline";
  import IconAddProject from "~icons/ion/document-outline";
  import IconExecuteProject from "~icons/ion/play-outline";
  import IconUserManager from "~icons/ion/people-outline";
  import IconMasterDataManager from "~icons/ion/cog-outline";

  const router = useRouter();
  const wizardPages = [
    "/projects",
    "/create-project",
    "/generate",
    "/admin/users",
    "/admin/master-data",
  ];

  function getClasses(index: number): string {
    const linkInContext = wizardPages[index];
    const currentLink = router.currentRoute.value.fullPath;

    const active = "router-link-active";
    const exactActive = "router-link-exact-active";
    if (currentLink.startsWith(linkInContext)) {
      const classes = `cursor-pointer ${active} flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300`;

      if (linkInContext === currentLink) {
        return `${exactActive} ${classes}`;
      }

      return classes;
    }

    return "cursor-pointer flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-300";
  }

  function go(index: number): void {
    const link = wizardPages[index];
    router.push(link);
  }
</script>

<template>
  <aside
    class="fixed w-16 h-full z-[998] overflow-hidden flex flex-col items-center pt-16 bg-white text-gray-800 dark:bg-gray-800 dark:text-white border-r border-gray-400/50 rounded">
    <div class="flex flex-col items-center mt-3">
      <span :class="getClasses(0)" @click="go(0)">
        <IconProjects class="w-6 h-6" />
      </span>
      <span :class="getClasses(1)" @click="go(1)">
        <IconAddProject class="w-6 h-6" />
      </span>
      <span :class="getClasses(2)" @click="go(2)">
        <IconExecuteProject class="w-6 h-6" />
      </span>
    </div>
    <div class="flex flex-col items-center mt-2 border-t border-gray-300">
      <span :class="getClasses(3)" @click="go(3)">
        <IconUserManager class="w-6 h-6" />
      </span>
      <span :class="getClasses(4)" @click="go(4)">
        <IconMasterDataManager class="w-6 h-6" />
      </span>
    </div>
    <div class="text-xs -rotate-90 w-[200px] mt-[27rem]">&copy; 2022 Taikisha India</div>
  </aside>
</template>
