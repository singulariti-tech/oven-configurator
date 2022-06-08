<script setup lang="ts">
  import { onMounted } from "vue";
  import { ToolDefinition } from "@/types/layout-designer/tool";
  import { ToolGroups } from "@/types/layout-designer/tool-definitions";

  const emit = defineEmits<{
    (event: "onInitialized", tools: Array<ToolDefinition>): void;
  }>();

  onMounted(() => {
    emit("onInitialized", tools);
  });

  function onToolDefinitionInitializedN(tool: ToolDefinition | null) {
    if (tool) {
      tools.push(tool);
    } else {
      console.log(`WARN: tool definition is null`);
    }
  }

  /* Data */
  const tools: Array<ToolDefinition> = [];
</script>

<template>
  <div>
    <div class="component-title">{{ $t("pages.new-project.library") }}</div>
    <div class="p-3 bg-gray-100 border border-black">
      <div class="flex flex-col toolbox text-sm">
        <div class="mb-2">
          <div class="title">{{ $t("pages.new-project.entry-exit-mods") }}</div>
          <div class="flex flex-wrap h-[145px] w-[310px]">
            <tool-definition-view
              v-for="def in ToolGroups.entryExit"
              :id="def.id"
              :key="def.id"
              :icon="def.icon"
              :width="def.width"
              :height="def.height"
              :tile-defs="def.tiles"
              @onToolDefinitionInitialized="onToolDefinitionInitializedN" />
          </div>
        </div>
        <div class="mb-2">
          <div class="title">{{ $t("pages.new-project.straight-zone-mods") }}</div>
          <div class="flex flex-wrap h-[145px] w-[310px]">
            <tool-definition-view
              v-for="def in ToolGroups.straight"
              :id="def.id"
              :key="def.id"
              :icon="def.icon"
              :width="def.width"
              :height="def.height"
              :tile-defs="def.tiles"
              @onToolDefinitionInitialized="onToolDefinitionInitializedN" />
          </div>
        </div>
        <div class="mb-2">
          <div class="title">{{ $t("pages.new-project.u-turn-mods") }}</div>
          <div class="flex flex-wrap h-[145px] w-[310px]">
            <tool-definition-view
              v-for="def in ToolGroups.uTurn"
              :id="def.id"
              :key="def.id"
              :icon="def.icon"
              :width="def.width"
              :height="def.height"
              :tile-defs="def.tiles"
              @onToolDefinitionInitialized="onToolDefinitionInitializedN" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
