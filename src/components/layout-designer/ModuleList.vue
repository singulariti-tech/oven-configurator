<script setup lang="ts">
  import { ModuleListRecord } from "@/types/layout-designer/layout-types";

  /* START Prop Definitions */
  interface Props {
    rows: Array<ModuleListRecord>;
  }

  const props = defineProps<Props>();
  /* END Prop Definitions */
</script>

<template>
  <div class="">
    <div class="component-title">{{ $t("pages.new-project.module-list") }}</div>
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="border-b border-t border-black">
                <tr>
                  <th scope="col" rowspan="2" class="th">#</th>
                  <th scope="col" rowspan="2" class="th">{{ $t("pages.new-project.cell") }}</th>
                  <th scope="col" rowspan="2" class="th">
                    {{ $t("pages.new-project.component") }}
                  </th>
                  <th scope="col" rowspan="2" class="th">
                    {{ $t("pages.new-project.module-type") }}
                  </th>
                  <th scope="col" rowspan="2" class="th">
                    {{ $t("pages.new-project.internal-duct") }}
                  </th>
                  <th scope="col" rowspan="2" class="th">L (m)</th>
                  <th scope="col" colspan="3" class="th border-b border-gray-400">MOC</th>
                  <th scope="col" rowspan="2" class="th">
                    {{ $t("pages.new-project.insulation-spec") }}
                  </th>
                </tr>
                <tr>
                  <th scope="col" class="th">
                    {{ $t("pages.new-project.roof") }} / {{ $t("pages.new-project.side-panel") }}
                  </th>
                  <th scope="col" class="th">{{ $t("pages.new-project.floor-panel") }}</th>
                  <th scope="col" class="th">{{ $t("pages.new-project.internal-duct") }}</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="props.rows.length > 0">
                  <tr v-for="(row, index) in props.rows" :key="index" class="border-b border-black">
                    <td class="td">
                      {{ index }}
                    </td>
                    <td class="td">
                      {{ row.cellID }}
                    </td>
                    <td class="td">
                      {{ row.component }}
                    </td>
                    <td class="td">1</td>
                    <td class="td">1</td>
                    <td class="td">
                      <input class="form-field" type="text" name="length" value="" />
                    </td>
                    <td class="td">
                      <select class="form-field">
                        <option value="-">{{ $t("common.select") }}</option>
                      </select>
                    </td>
                    <td class="td">
                      <select class="form-field">
                        <option value="-">{{ $t("common.select") }}</option>
                      </select>
                    </td>
                    <td class="td">
                      <select class="form-field">
                        <option value="-">{{ $t("common.select") }}</option>
                      </select>
                    </td>
                    <td class="td">
                      <select class="form-field">
                        <option value="-">{{ $t("common.select") }}</option>
                      </select>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr class="border-b border-black">
                    <td class="td" colspan="9">{{ $t("common.no-records") }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
