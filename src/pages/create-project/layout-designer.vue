<script setup lang="ts">
  import { Ref, onMounted, nextTick, ref } from "vue";
  import gsap from "gsap";
  import Draggable from "gsap/Draggable";
  import _ from "lodash";
  import { Cell } from "@/types/layout-designer/cell";
  import { Stage } from "@/types/layout-designer/stage";
  import { ToolDefinition } from "@/types/layout-designer/tool";
  import { StageMembers } from "@/types/layout-designer/stage";
  import { LayoutDesigner } from "@/types/layout-designer/designer";
  import { ModuleListRecord } from "@/types/layout-designer/layout-types";
  import { useHead } from "@vueuse/head";
  import { useProjectStore } from "@/store/projects";
  import html2canvas from "html2canvas";

  useHead({
    title: "Taikisha | Oven Configurator | Design | Layout",
  });

  onMounted(() => {
    nextTick(() => {
      window.addEventListener("resize", () => {
        designer.resetToolPositions();
      });
    });
  });

  /* START Handlers for events from child components */

  function toolboxInitialized(defs: Array<ToolDefinition>) {
    _.forEach(defs, function (def) {
      // Setup Drag and Drop
      const draggable: Draggable[] = Draggable.create(def.getRef(), {
        type: "x,y",
        bounds: dragArea.value,
        onDragStart: e => {
          gsap.to(e.target, { duration: 0.1, opacity: 0.5 });
        },
        onDragEnd: e => {
          // add tile to stage
          designer.addToolToStage(e, draggable[0]);
        },
      });

      // Add to toolbox
      designer.getToolbox().addDefinition(def);
    });
  }

  function onStageInitialized(stg: StageMembers): void {
    const stage: Stage = designer.getStage();
    stage.ref = stg.el;
    _.forEach(stg.cells, (cell: Cell) => {
      stage.addCell(cell);
    });
  }

  function onTurnLeft90(): void {
    designer.turnLeft90();
  }

  function onTurnRight90(): void {
    designer.turnRight90();
  }

  function onResetRotation(): void {
    designer.resetRotation();
  }

  function onClearLayout(): void {
    designer.destroy();
  }

  function onValidateLayout(): void {
    designer.validate();
  }

  function onClearValidationResults(): void {
    designer.clearValidationResults();
  }

  function capture() {
    const stage: HTMLElement | null = document.getElementById("stage");
    if (stage) {
      html2canvas(stage).then(function (canvas) {
        projectStore.setScreenshot(canvas.toDataURL());
      });
    }
  }

  /* END Handlers for events from child components */

  /* Data */
  const projectStore = useProjectStore();
  const dragArea: Ref<HTMLElement | null> = ref(null);
  const moduleListRecords: Ref<Array<ModuleListRecord>> = ref([]);
  let designer: LayoutDesigner = new LayoutDesigner(moduleListRecords);
</script>

<template>
  <div>
    <div ref="dragArea" class="mt-5 flex flex-wrap gap-8">
      <toolbox-grid @onInitialized="toolboxInitialized" />
      <layout-grid
        @stageInitialized="onStageInitialized"
        @turnLeft90="onTurnLeft90"
        @turnRight90="onTurnRight90"
        @resetRotation="onResetRotation"
        @clearLayout="onClearLayout"
        @validateLayout="onValidateLayout"
        @clearValidationResults="onClearValidationResults"
        @captureScreen="capture" />
    </div>
    <div class="mt-5">
      <div class="relative flex items-center">
        <div class="flex-grow border-t border-blue-400"></div>
        <span class="flex-shrink mx-2 text-blue-400">{{
          $t("pages.new-project.scroll-down-for-mods")
        }}</span>
        <div class="flex-grow border-t border-blue-400"></div>
      </div>
    </div>
    <div class="mt-5 mb-5 flex flex-wrap gap-8">
      <module-list :rows="moduleListRecords" />
    </div>
  </div>
</template>

<style>
  @import "@/styles/layout-designer.css";
</style>

<route lang="yaml">
name: designer
meta:
  layout: project
</route>
