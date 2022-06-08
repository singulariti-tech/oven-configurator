import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";

const messages = Object.fromEntries(
	Object.entries(import.meta.globEager("../../locales/*.{y(a)?ml,json}")).map(([key, value]) => {
		const isYamlOrJson = key.endsWith(".yaml") || key.endsWith(".json");

		return [key.slice(14, isYamlOrJson ? -5 : -4), value.default];
	})
);


type KeyValuePair = {
	[key: string]: any;
};

const supportedLocales: KeyValuePair = {
	"en-US": "en",
	"en": "en",
	"ja-JP": "ja",
	"ja": "ja",
};

const browserLocale = navigator.language;
const finalLocale: string = supportedLocales[browserLocale] || "en";
const routes = setupLayouts(generatedRoutes);

export const pinia = createPinia();
export const i18n = createI18n({
	legacy: false,
	locale: finalLocale,
	messages,
	globalInjection: true,
});
export const router = createRouter({
	history: createWebHistory(),
	routes,
});

// export const pwa = router.isReady().then(async () => {
// 	const { registerSW } = await import("virtual:pwa-register");
// 	registerSW({ immediate: true });
// });
