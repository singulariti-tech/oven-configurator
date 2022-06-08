<script setup lang="ts">
  import { Ref, onMounted, ref } from "vue";
  import { TileDefinition } from "@/types/layout-designer/tile";
  import { ToolDefinitionData, ToolDefinition } from "@/types/layout-designer/tool";

  interface Props {
    id: string;
    width: number;
    height: number;
    icon: string;
    tileDefs: Array<TileDefinition>;
  }

  const props = withDefaults(defineProps<Props>(), {
    width: 1,
    height: 1,
    tileDefs: [] as Array<TileDefinition>,
  });

  const emit = defineEmits<{
    (event: "onToolDefinitionInitialized", el: ToolDefinition | null): void;
  }>();

  onMounted(() => {
    if (shadowElement.value) {
      const arg: ToolDefinitionData = {
        id: shadowElement.value.id,
        w: props.width,
        h: props.height,
        el: shadowElement.value,
        tiles: new Set(props.tileDefs),
      };
      let def: ToolDefinition = new ToolDefinition(arg);
      emit("onToolDefinitionInitialized", def);
    }
  });

  function getParentClasses() {
    const size = `${props.width}x${props.height}`;
    return `tile tile-${size}`;
  }

  function getElementClasses() {
    const size = `${props.width}x${props.height}`;
    return `el s${size}`;
  }

  function getShadowElementClasses() {
    const size = `${props.width}x${props.height}`;
    return `el-shadow s${size}`;
  }

  function getBackgroundStyles() {
    const path = `/assets/images/layout/${props.icon}`;
    return `background-image: url(${path}); background-size: 100% 100%`;
  }

  /* Data */
  const shadowElement: Ref<HTMLElement | null> = ref(null);
</script>

<template>
  <div :class="getParentClasses()">
    <div :class="getElementClasses()" :style="getBackgroundStyles()">&nbsp;</div>
    <div
      :id="id"
      ref="shadowElement"
      :class="getShadowElementClasses()"
      :style="getBackgroundStyles()">
      &nbsp;
    </div>
  </div>
</template>

<style></style>
