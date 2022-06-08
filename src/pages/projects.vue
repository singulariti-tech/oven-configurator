<script setup lang="ts">
  import { useHead } from "@vueuse/head";
  import { useRouter } from "vue-router";
  import IconEdit from "~icons/ant-design/edit-outlined";
  import IconDelete from "~icons/ant-design/delete-outlined";
  import IconView from "~icons/carbon/view";
  import IconAdd from "~icons/carbon/add";
  import IconExecuteProject from "~icons/ion/play-outline";

  useHead({
    title: "Taikisha | Oven Configurator | Projects",
  });

  function createProject() {
    router.push("/create-project");
  }

  const router = useRouter();
</script>

<template>
  <div>
    <nav class="w-full flex pb-2 mb-2 border-b border-gray-400/50 dark:bg-gray-800 items-center">
      <span class="text-xl font-bold mr-2 text-taikisha"> {{ $t("app.name") }}</span>
      <span class="font-bold text-xl">||</span>
      <span class="text-lg font-semibold ml-4 mr-10 text-taikisha">
        {{ $t("pages.projects.title") }}
      </span>
    </nav>
    <div class="m-1 mt-4 mb-4 space-x-2 flex items-center justify-between">
      <div class="space-x-2">
        <span class="text-sm">{{ $t("pages.projects.search") }}:</span>
        <input class="form-field" type="text" name="searchContent" />
        <select class="form-field">
          <option value="">
            {{ $t("pages.projects.select-search-criteria") }}
          </option>
          <option>{{ $t("pages.projects.project-code") }}</option>
          <option>{{ $t("pages.projects.project-name") }}</option>
          <option>{{ $t("pages.projects.client") }}</option>
          <option>{{ $t("pages.projects.status") }}</option>
        </select>
      </div>
      <div class="flex space-x-3">
        <button type="button" class="button" @click="createProject">
          <IconAdd name="Create Project" />
          <span>{{ $t("pages.projects.new-project") }}</span>
        </button>
        <div>
          <record-pager :page-number="1" :page-size="20" :total-record-count="0" />
        </div>
      </div>
    </div>
    <table class="w-full">
      <thead class="border-b border-t">
        <tr>
          <th scope="col" class="th">
            {{ $t("pages.projects.project-code") }}
          </th>
          <th scope="col" class="th">
            {{ $t("pages.projects.project-name") }}
          </th>
          <th scope="col" class="th">
            {{ $t("pages.projects.client") }}
          </th>
          <th scope="col" class="th">
            {{ $t("pages.projects.status") }}
          </th>
          <th scope="col" class="th">
            {{ $t("common.actions") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="td">LDV</td>
          <td class="td">Laser Division Vadodara Factory</td>
          <td class="td">ABC</td>
          <td class="td">
            <toggle-switch
              id="ts-1"
              identity-i-d="1"
              positive-label="Open"
              negative-label="Closed"
              :checked="true"
              :mutate-enabled="true" />
          </td>
          <td class="td space-x-2 flex">
            <IconView class="w-6 h-6" name="View Project" />
            <IconEdit class="w-6 h-6" name="Edit Project" />
            <IconDelete class="w-6 h-6" name="Delete Project" />
            <IconExecuteProject class="w-6 h-6" name="Generate 3D Models" />
          </td>
        </tr>
        <tr class="border-b">
          <td class="td">NPP</td>
          <td class="td">New Plastic Paint Shop</td>
          <td class="td">DEF</td>
          <td class="td">
            <toggle-switch
              id="ts-2"
              identity-i-d="2"
              positive-label="Open"
              negative-label="Closed"
              :checked="false"
              :mutate-enabled="true" />
          </td>
          <td class="td space-x-2 flex">
            <IconView class="w-6 h-6" name="View Project" />
            <IconEdit class="w-6 h-6" name="Edit Project" />
            <IconDelete class="w-6 h-6" name="Delete Project" />
            <IconExecuteProject class="w-6 h-6" name="Generate 3D Models" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex mt-4 justify-end">
      <record-pager :page-number="1" :page-size="20" :total-record-count="0" />
    </div>
  </div>
</template>

<route lang="yaml">
name: projects
meta:
  layout: secure
</route>
