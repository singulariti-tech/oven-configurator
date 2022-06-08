import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import App from "@/App.vue";
import { createApp } from "vue";
import * as modules from "@/modules/no-ssg";

import "@/styles/index.css";

import { createHead } from '@vueuse/head';

Draggable.zIndex = 100;
gsap.registerPlugin(Draggable);

const head = createHead();

const app = createApp(App).use(modules.router).use(modules.pinia).use(modules.i18n).use(head).mount("#app");
