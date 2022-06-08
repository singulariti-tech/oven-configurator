<script setup lang="ts">
  import { Ref, onMounted, ref } from "vue";
  import { StageMembers } from "@/types/layout-designer/stage";
  import { Cell } from "@/types/layout-designer/cell";

  /* Define all the events raised by this component */
  const emit = defineEmits<{
    (event: "stageInitialized", members: StageMembers): void;
    (event: "turnLeft90"): void;
    (event: "turnRight90"): void;
    (event: "resetRotation"): void;
    (event: "clearLayout"): void;
    (event: "validateLayout"): void;
    (event: "clearValidationResults"): void;
    (event: "helpRequested"): void;
    (event: "debugRequested"): void;
    (event: "captureScreen"): void;
  }>();

  onMounted(() => {
    if (stageEl.value) {
      const members: StageMembers = {
        el: stageEl.value,
        cells: cells,
      };
      emit("stageInitialized", members);
    }
  });

  /* START Methods for button event handlers */
  function turnLeft90() {
    emit("turnLeft90");
  }

  function turnRight90() {
    emit("turnRight90");
  }

  function resetRotation() {
    emit("resetRotation");
  }

  function clearLayoutRequest() {
    // show confirmation dialog
    displayConfirmationDialog.value = true;
  }

  function hideClearLayoutConfirmationDialog() {
    displayConfirmationDialog.value = false;
  }

  function clearLayout() {
    emit("clearLayout");
    hideClearLayoutConfirmationDialog();
  }

  function validateLayout() {
    emit("validateLayout");
  }

  function clearValidationResults() {
    emit("clearValidationResults");
  }

  function requestHelp() {
    displayHelpDialog.value = true;
  }

  function hideHelpDialog() {
    displayHelpDialog.value = false;
  }

  function showDebugInformation() {
    emit("debugRequested");
    displayDebugDialog.value = true;
  }

  function hideDebugDialog() {
    displayDebugDialog.value = false;
  }

  function captureScreen() {
    emit("captureScreen");
  }
  /* END Methods for button event handlers */

  /* START Methods for cell event handlers */

  function onCellInitialized(el: Cell) {
    cells.push(el);
  }

  /* END Methods for cell event handlers */

  /* START Data used by component */
  const displayDebugDialog: Ref<boolean> = ref(false);
  const displayConfirmationDialog: Ref<boolean> = ref(false);
  const displayHelpDialog = ref(false);
  const cells: Array<Cell> = [];
  const stageEl: Ref<HTMLElement | null> = ref(null);
</script>

<template>
  <div>
    <div class="component-title">{{ $t("pages.new-project.layout") }}</div>

    <div class="flex flex-row">
      <div class="flex flex-col border-[1px] border-black bg-gray-100 p-2 h-[722px]">
        <button
          type="button"
          class="btn mx-auto mt-1"
          title="Rotate Left 90&deg;"
          @click="turnLeft90">
          <img
            src="@/assets/images/layout/icon-rotate-left-90.svg"
            width="37"
            height="37"
            alt="Rotate Left 90&deg;" />
        </button>
        <button
          type="button"
          class="btn mx-auto mt-1"
          title="Rotate Right 90&deg;"
          @click="turnRight90">
          <img
            src="@/assets/images/layout/icon-rotate-right-90.svg"
            width="37"
            height="37"
            alt="Rotate Right 90&deg;" />
        </button>
        <button
          type="button"
          class="btn mx-auto mt-1"
          title="Reset Rotation"
          @click="resetRotation">
          <img
            src="@/assets/images/layout/reset_rotation.svg"
            width="35"
            height="35"
            alt="Reset Rotation" />
        </button>
        <button
          type="button"
          class="btn mx-auto mt-1"
          title="Clear Layout"
          @click="clearLayoutRequest">
          <img src="@/assets/images/layout/clear.svg" width="30" height="30" alt="Clear Layout" />
        </button>
      </div>
      <div
        id="stage"
        ref="stageEl"
        class="grid grid-cols-16 grid-rows-16 gap-0 border-[1px] border-black">
        <template v-for="(r, rIndex) in 16" :key="rIndex">
          <template v-for="(c, cIndex) in 16" :key="cIndex">
            <cell-view :row="rIndex" :col="cIndex" @cellInitialized="onCellInitialized" />
          </template>
        </template>
      </div>
      <div class="flex flex-col border border-black bg-gray-100 p-2 h-[722px]">
        <button type="button" class="btn mx-auto mt-1" title="Validate" @click="validateLayout">
          <img src="@/assets/images/layout/validate.svg" width="28" height="28" alt="Validate" />
        </button>
        <button
          type="button"
          class="btn mx-auto mt-1"
          title="Clear selection/validation results"
          @click="clearValidationResults">
          <img
            src="@/assets/images/layout/renew.svg"
            width="30"
            height="30"
            alt="Clear selection/validation results" />
        </button>
        <button
          type="button"
          class="btn ml-1 mr-1"
          title="Capture Screenshot"
          @click="captureScreen">
          <img
            src="@/assets/images/layout/screenshot.svg"
            width="32"
            height="32"
            alt="Screenshot" />
        </button>
        <button type="button" class="btn mt-auto ml-1 mr-1" title="Help" @click="requestHelp">
          <img src="@/assets/images/layout/help.svg" width="32" height="32" alt="Help" />
        </button>
        <button
          type="button"
          class="btn ml-1 mr-1"
          title="Dump debug information"
          @click="showDebugInformation">
          <img
            src="@/assets/images/layout/debug.svg"
            width="32"
            height="32"
            alt="Dump debug information" />
        </button>
      </div>
    </div>

    <!-- Clear layout confirmation dialog -->
    <confirmation-dialog
      v-if="displayConfirmationDialog"
      title="Clear layout?"
      action="clearLayout"
      ok-label="OK"
      @actionConfirmed="clearLayout"
      @actionCancelled="hideClearLayoutConfirmationDialog">
      Are you sure you want to clear the layout? It cannot be undone.
    </confirmation-dialog>

    <!-- Help Dialog v-if="displayHelpDialog" -->
    <information-dialog
      v-if="displayHelpDialog"
      title="Help"
      action="closeDialog"
      ok-label="OK"
      @infoDialogClosed="hideHelpDialog">
      <ul class="space-y-4">
        <li>
          <span class="font-bold">Creating the Layout</span>
          <p>Components may be dragged from the toolbox and dropped into the layout grid</p>
        </li>
        <li>
          <span class="font-bold">Selecting components (so you can rotate them)</span>
          <p>
            Click a component in the grid to 'Select'. Clicking the same element again toggles the
            selection. You may also click the 'Clear selection' button on the right toolbar for the
            same result.
          </p>
        </li>
        <li>
          <span class="font-bold">Removing a component from the layout</span>
          <p>Double-click a component to remove it from the layout grid.</p>
        </li>
        <li>
          <span class="font-bold">Rotating components</span>
          <p>
            Select a component and click on either of the 'rotate' buttons to rotate the tiles.
            Click 'Reset' to restore to original position.
          </p>
        </li>
        <li>
          <span class="font-bold">Validating the layout</span>
          <p>Click the 'Validate' button to validate the layout.</p>
        </li>
        <li>
          <span class="font-bold">Clear validation result</span>
          <p>Click the 'Clear selection/validation results' button on the right toolbar.</p>
        </li>
        <li>
          <span class="font-bold">Starting afresh</span>
          <p>Click the 'Clear' button to clear an existing layout.</p>
        </li>
      </ul>
    </information-dialog>

    <!-- Debug Console -->
    <information-dialog
      v-if="displayDebugDialog"
      title="Debug Console"
      action="closeDialog"
      ok-label="OK"
      @infoDialogClosed="hideDebugDialog">
      <div class="flex flex-col">
        <textarea
          id="debugTextArea"
          class="form-field h-[300px]"
          rows="10"
          placeholder="No debug information"></textarea>
        <label for="debugTextArea" class="mt-2 text-xs"
          >Please copy the following info and send it to the developer along with a screenshot of
          the layout</label
        >
      </div>
    </information-dialog>
  </div>
</template>

<style></style>
