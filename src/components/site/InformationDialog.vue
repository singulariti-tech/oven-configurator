<script setup lang="ts">
  import IconClose from "~icons/ant-design/close-circle-outlined";

  const props = withDefaults(
    defineProps<{
      title: string;
      action: string;
      okLabel: string;
    }>(),
    {
      title: "Confirm Action",
      action: "unknown",
      okLabel: "OK",
    }
  );

  const emit = defineEmits<{
    (event: "infoDialogClosed", action: string): void;
  }>();

  function closeDialog() {
    emit("infoDialogClosed", props.action);
  }
</script>

<template>
  <div class="fixed inset-0 z-[600] overflow-y-auto">
    <div class="fixed inset-0 w-full h-full bg-black opacity-40"></div>
    <div class="flex items-center min-h-screen px-4 py-8">
      <div class="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
        <div class="flex items-center justify-between p-4 border-b">
          <h4 class="text-lg font-bold text-gray-800">{{ props.title }}</h4>
          <button class="p-2 text-gray-400 rounded-md hover:bg-gray-100" @click="closeDialog">
            <IconClose />
          </button>
        </div>
        <div class="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
          <slot />
        </div>
        <div class="flex items-center gap-3 p-4 mt-5 border-t">
          <button
            class="px-6 py-2 text-gray-800 border bg-gray-100 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
            @click="closeDialog">
            {{ props.okLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
