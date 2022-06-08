<script setup lang="ts">
  import { useHead } from "@vueuse/head";

  useHead({
    title: "Taikisha | Oven Configurator",
  });
</script>

<template>
  <section class="h-screen">
    <div class="container mx-auto h-full">
      <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
          <img src="@/assets/images/site/oven.jpg" class="w-full" alt="Oven image" />
        </div>
        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
          <div class="text-2xl font-bold p-3 mb-3">
            {{ $t("app.name") }}
          </div>
          <form>
            <!-- Email input -->
            <div class="mb-6">
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                :placeholder="$t('pages.login.email')" />
            </div>

            <!-- Password input -->
            <div class="mb-6">
              <input
                type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                :placeholder="$t('pages.login.password')" />
            </div>

            <div class="flex justify-between items-center mb-6">
              <div class="form-group form-check">
                <input
                  id="exampleCheck3"
                  type="checkbox"
                  class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-taikisha checked:border-taikisha focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  checked />
                <label class="form-check-label inline-block text-gray-800" for="exampleCheck2">{{
                  $t("pages.login.remember-me")
                }}</label>
              </div>
              <a
                href="#!"
                class="text-taikisha hover:text-taikisha focus:text-taikisha active:text-taikisha duration-200 transition ease-in-out"
                >{{ $t("pages.login.forgot-password") }}</a
              >
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              class="inline-block px-7 py-3 bg-taikisha text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-taikisha hover:shadow-lg focus:bg-taikisha focus:shadow-lg focus:outline-none focus:ring-0 active:bg-taikisha active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light">
              {{ $t("pages.login.sign-in") }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<route lang="yaml">
name: home
</route>
