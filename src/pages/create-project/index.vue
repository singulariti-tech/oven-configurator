<script setup lang="ts">
  import { useHead } from "@vueuse/head";

  useHead({
    title: "Taikisha | Oven Configurator | Design | Information",
  });
</script>
<template>
  <div class="mt-6 w-[55%]">
    <div class="component-title">
      {{ $t("common.client") }}
    </div>
    <section title="Client Details" class="mt-5 md:col-span-2">
      <div class="section">
        <div class="form-element">
          <label class="form-label">{{ $t("pages.new-project.client-name") }}</label>
          <input class="form-field" type="text" name="clientName" />
        </div>
        <div class="form-element">
          <label class="form-label">{{ $t("pages.new-project.facility-code") }}</label>
          <input class="form-field" type="text" name="facilityCode" />
        </div>
        <div class="form-element">
          <label class="form-label">{{ $t("pages.new-project.facility-name") }}</label>
          <input class="form-field" type="text" name="facilityName" />
        </div>
        <div class="form-element">
          <label class="form-label">{{ $t("pages.new-project.plant-name") }}</label>
          <input class="form-field" type="text" name="plantName" />
        </div>
      </div>
    </section>
    <section title="Project Details">
      <div class="component-title">
        {{ $t("common.project") }}
      </div>
      <div class="section">
        <div class="form-element">
          <label class="form-label">{{ $t("pages.new-project.project-name") }}</label>
          <input class="form-field" type="text" name="projectName" />
        </div>
        <div class="form-element">
          <label class="form-label"
            >{{ $t("pages.new-project.project-code") }} ({{
              $t("pages.new-project.tm-number")
            }})</label
          >
          <input class="form-field" type="text" name="projectCode" />
        </div>
        <div class="form-element">
          <label class="form-label"
            >{{ $t("pages.new-project.project-code") }} ({{
              $t("pages.new-project.drawings")
            }})</label
          >
          <input class="form-field" type="text" name="facilityName" />
        </div>
      </div>
    </section>
  </div>
</template>

<route lang="yaml">
name: information
meta:
  layout: project
</route>

<style scoped></style>
