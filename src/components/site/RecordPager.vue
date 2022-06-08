<script setup lang="ts">
  interface Props {
    pageNumber: number;
    pageSize: number;
    totalRecordCount: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    pageNumber: 1,
    pageSize: 20,
    totalRecordCount: 0,
  });

  const emit = defineEmits<{
    (event: "previous"): void;
    (event: "next"): void;
    (event: "pageSizeChanged", size: number): void;
  }>();

  /* START Methods */
  function prev() {
    emit("previous");
  }

  function next() {
    emit("next");
  }

  function changeRecordSize() {
    emit("pageSizeChanged", props.pageSize);
  }
  /* END Methods */
</script>

<template>
  <div class="flex space-x-1">
    <!-- Previous -->
    <button class="button" type="button" @click="prev">{{ $t("common.previous") }}</button>
    <!-- Current (Select) -->
    <select v-model="props.pageNumber" class="form-field" name="pageNumber">
      <option v-for="page in props.totalRecordCount">{{ page }}</option>
    </select>
    <!-- Next -->
    <button class="button" type="button" @click="next">{{ $t("common.next") }}</button>
    <!-- Page Size -->
    <select v-model="props.pageSize" class="form-field" name="pageSize" @change="changeRecordSize">
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>
</template>
