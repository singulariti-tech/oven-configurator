import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ViteSSG } from "vite-ssg";
import App from "@/App.vue";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import "@/styles/index.css";

Draggable.zIndex = 100;
gsap.registerPlugin(Draggable);

const routes = setupLayouts(generatedRoutes);

export const createApp = ViteSSG(App, { routes }, async ctx => {
  Object.values(import.meta.globEager("./modules/*.ts")).map(i => i.install?.(ctx));
});
