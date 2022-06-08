<script lang="ts">
  export default {
    name: "SummaryView",
  };
</script>

<script setup lang="ts">
  import { useHead } from "@vueuse/head";
  import { useProjectStore } from "@/store/projects";

  useHead({
    title: "Taikisha | Oven Configurator | Design | Summary",
  });

  const projectStore = useProjectStore();
</script>

<template>
  <div>
    <div class="mt-10 lg:mt-5 flex flex-col w-[55%]">
      <div class="component-title">Design Summary</div>
      <div class="form-element">
        <div class="form-label">Body Dimension</div>
        <div class="form-label">W x H x L</div>
      </div>
      <div class="form-element">
        <div class="form-label">Conveyor Type</div>
        <div class="form-label">INVERTED</div>
      </div>
      <div class="form-element">
        <div class="form-label">Layout image</div>
        <div>
          <img :src="projectStore.$state.currentDesign.screenshot" />
        </div>
      </div>
    </div>
    <div class="mt-10">
      <table class="w-[95%]">
        <thead class="border-b border-t">
          <tr>
            <th scope="col" class="th">S.No</th>
            <th scope="col" class="th">Zone Name</th>
            <th scope="col" class="th">Oven Section Type</th>
            <th scope="col" class="th">Internal Duct Type</th>
            <th scope="col" class="th">Oven Section Dimensions H (mm)</th>
            <th scope="col" class="th">Oven Section Dimensions W (mm)</th>
            <th scope="col" class="th">Zone Length (mm)</th>
            <th scope="col" class="th">MOC</th>
            <th scope="col" class="th">Insulation</th>
            <th scope="col" class="th">Air Seal Design Type</th>
            <th scope="col" class="th">Air Filter at Outlet</th>
            <th scope="col" class="th">Air Seal Shadow Mask Quantity</th>
            <th scope="col" class="th">Heat Panel Compartment Quantity</th>
            <th scope="col" class="th">Heat Panel Width (mm)</th>
            <th scope="col" class="th">Heat Panel Height (mm)</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="td">&nbsp;</td>
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
          </tr>
          <tr class="border-b">
            <td class="td">&nbsp;</td>
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
          </tr>
          <tr class="border-b">
            <td class="td">&nbsp;</td>
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
            <td class="td" />
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex mt-10 space-x-2">
      <button class="button" type="button">Refresh</button>
      <button class="button" type="button">Export</button>
    </div>
  </div>
</template>

<route lang="yaml">
name: summary
meta:
  layout: project
</route>
