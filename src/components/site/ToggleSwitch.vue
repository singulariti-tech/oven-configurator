<script setup lang="ts">
  import { ref } from "vue";

  interface Props {
    id: string;
    identityID: string;
    positiveLabel: string;
    negativeLabel: string;
    checked: boolean;
    mutateEnabled: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    id: "na",
    positiveLabel: "Enabled",
    negativeLabel: "Disabled",
    checked: false,
    mutateEnabled: false,
  });

  const emit = defineEmits<{
    (event: "switchToggled", identity: string, value: boolean): void;
  }>();

  function check() {
    emit("switchToggled", props.identityID, checkModel.value);
  }

  const checkModel = ref(props.checked);
</script>

<template>
  <div class="flex justify-left w-28">
    <div v-if="props.mutateEnabled" class="form-check form-switch">
      <input
        :id="props.id"
        v-model="checkModel"
        class="form-check-input appearance-none w-9 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
        type="checkbox"
        role="switch"
        @change="check" />
      <label class="form-check-label inline-block text-gray-800 ml-2" :for="props.id">
        <span v-if="checkModel">{{ props.positiveLabel }}</span>
        <span v-else>{{ props.negativeLabel }}</span>
      </label>
    </div>
    <div v-else class="form-check form-switch">
      <label class="form-check-label inline-block text-gray-800 ml-2">
        <span v-if="checkModel">{{ props.positiveLabel }}</span>
        <span v-else>{{ props.negativeLabel }}</span>
      </label>
    </div>
  </div>
</template>
