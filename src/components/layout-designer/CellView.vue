<script setup lang="ts">
  import { Ref, onMounted, ref } from "vue";
  import { Cell } from "@/types/layout-designer/cell";

  /* START Prop Definitions */
  interface Props {
    row: number;
    col: number;
  }

  const props = defineProps<Props>();
  /* END Prop Definitions */

  /* START Event Definitions */
  const emit = defineEmits<{
    (event: "cellInitialized", cell: Cell): void;
  }>();

  onMounted(() => {
    if (cellEl.value) {
      const header: boolean = cellEl.value?.classList.contains("header");
      const rowID: number = props.row;
      const colID: string = String.fromCharCode(props.col + 64);
      const cell: Cell = new Cell(rowID, colID, header, cellEl.value);

      emit("cellInitialized", cell);
    }
  });

  /* END Event Definitions */

  /* START Methods */
  function generateCellID(row: number, col: number): string {
    const colID: string = String.fromCharCode(col + 64);
    const cellID = `${colID}${row}`;
    return cellID;
  }

  function getClassList(row: number, col: number): string {
    if (row === 0 || col === 0) {
      return "header cell";
    }

    return "cell";
  }

  function getCellContent(row: number, col: number): string {
    if (row === 0) {
      return String.fromCharCode(col + 64);
    } else if (col === 0) {
      return "" + row;
    }

    return "";
  }

  /* END Methods */

  /* START Data */
  const cellEl: Ref<HTMLElement | null> = ref(null);
  /* END Data */
</script>

<template>
  <div :id="generateCellID(row, col)" ref="cellEl" :class="getClassList(row, col)">
    {{ getCellContent(row, col) }}
  </div>
</template>
