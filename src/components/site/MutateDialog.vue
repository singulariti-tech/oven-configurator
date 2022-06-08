<script setup lang="ts">
  import IconClose from "~icons/ant-design/close-circle-outlined";

  interface Props {
    title: string;
    submitButtonLabel: string;
    action: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    action: "unknown",
    submitButtonLabel: "Submit",
    title: "",
  });

  const emit = defineEmits<{
    (event: "actionConfirmed", action: string): void;
    (event: "actionCancelled", action: string): void;
  }>();

  function confirmAction() {
    emit("actionConfirmed", props.action);
  }

  function cancelAction() {
    emit("actionCancelled", props.action);
  }
</script>

<template>
  <div class="fixed inset-0 z-[600] overflow-y-auto">
    <div class="fixed inset-0 w-full h-full bg-black opacity-40"></div>
    <div class="flex items-center min-h-screen px-4 py-8">
      <div class="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
        <div class="flex items-center justify-between p-4 border-b">
          <h4 class="text-lg font-bold text-gray-800">{{ title }}</h4>
          <button class="p-2 text-gray-400 rounded-md hover:bg-gray-100" @click="cancelAction">
            <IconClose />
          </button>
        </div>
        <div class="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
          <slot />
        </div>
        <div class="flex items-center gap-3 p-4 mt-5 border-t">
          <button type="button" class="button" @click="confirmAction">
            {{ props.submitButtonLabel }}
          </button>
          <button type="button" class="button" @click="cancelAction">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
