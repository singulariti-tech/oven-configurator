<script setup lang="ts">
  import { useHead } from "@vueuse/head";

  useHead({
    title: "Taikisha | Oven Configurator | Design | Step-4",
  });
</script>

<template>
  <div>
    <div class="mt-10 lg:mt-5 flex flex-row">
      <div class="w-[55%]">
        <!-- TABLES -->
        <div class="component-title">Housing Selection</div>
        <table class="w-full">
          <thead class="border-b border-t">
            <tr>
              <th scope="col" class="th w-[35%]">Slant Housing</th>
              <th scope="col" class="th">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <th scope="row" class="td system-selected">In (Standard)</th>
              <td class="td system-selected">OK-IV-20</td>
            </tr>
            <tr class="border-b">
              <th scope="row" class="td">In</th>
              <td class="td">
                <select class="form-field">
                  <option value="">Select</option>
                </select>
              </td>
            </tr>
            <tr class="border-b">
              <th scope="row" class="td system-selected">Out (Standard)</th>
              <td class="td system-selected">OK-IV-20</td>
            </tr>
            <tr class="border-b">
              <th scope="row" class="td">Out</th>
              <td class="td">
                <select class="form-field">
                  <option value="">Select</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <table class="mt-5 w-full">
          <thead class="border-b border-t">
            <tr>
              <th scope="col" class="th w-[35%]">U Turn</th>
              <th scope="col" class="th">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <th scope="row" class="td system-selected">Standard</th>
              <td class="td system-selected">OSU-R20-59</td>
            </tr>
            <tr class="border-b">
              <th scope="row" class="td">&nbsp;</th>
              <td class="td">
                <select class="form-field">
                  <option value="">Select</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-10 lg:mt-5 flex flex-row">
      <div class="w-[55%]">
        <!-- TABLES -->
        <div class="component-title">Air Seal Selection</div>
        <table class="w-full">
          <thead class="border-b border-t">
            <tr>
              <th scope="col" class="th w-[35%]" />
              <th scope="col" class="th">Standard</th>
              <th scope="col" class="th">Input</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <th scope="row" class="td">Type</th>
              <td class="td system-selected">No Standard</td>
              <td class="td">
                <select class="form-field">
                  <option value="">Select</option>
                  <option value="">New</option>
                  <option value="">Standard</option>
                </select>
              </td>
            </tr>
            <tr class="border-b">
              <th scope="row" class="td">Air Filter (Outlet)</th>
              <td class="td system-selected">No Standard</td>
              <td class="td">
                <select class="form-field">
                  <option value="">Select</option>
                  <option value="">Yes</option>
                  <option value="">No</option>
                </select>
              </td>
            </tr>
            <tr class="border-b">
              <th scope="row" class="td">Air Seal Length (mL)</th>
              <td class="td system-selected">6</td>
              <td class="td">
                <input class="form-field" type="text" name="airSealLength" value="6" />
              </td>
            </tr>
            <tr class="border-b">
              <th scope="row" class="td">Shadow Mask Quantity</th>
              <td class="td system-selected">2</td>
              <td class="td">
                <input class="form-field" type="text" name="shadowMaskQuantity" value="2" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-10 lg:mt-5 flex flex-row">
      <div class="w-[55%]">
        <!-- TABLES -->
        <div class="component-title">Heat Panel Selection</div>
        <table class="w-full">
          <thead class="border-b border-t">
            <tr>
              <th scope="col" class="th w-[35%]" />
              <th scope="col" class="th">Standard</th>
              <th scope="col" class="th">Input</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <th scope="row" class="td">Compartment</th>
              <td class="td system-selected">No Standard</td>
              <td class="td">
                <select class="form-field">
                  <option value="">Select</option>
                  <option value="">3</option>
                  <option value="">4</option>
                </select>
              </td>
            </tr>
            <tr class="border-b">
              <th scope="row" class="td">W (mm)</th>
              <td class="td system-selected">2000</td>
              <td class="td">
                <input class="form-field" type="text" value="2000" />
              </td>
            </tr>
            <tr class="border-b">
              <th scope="row" class="td">H (mm)</th>
              <td class="td system-selected">200</td>
              <td class="td">
                <input class="form-field" type="text" value="200" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: "step-4"
meta:
  layout: project
</route>
