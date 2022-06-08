import { ViteSetupModule } from "@/types/ViteSetupModule";
import { createI18n } from "vue-i18n";

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import

// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const messages = Object.fromEntries(
  Object.entries(import.meta.globEager("../../locales/*.{y(a)?ml,json}")).map(([key, value]) => {
    const isYamlOrJson = key.endsWith(".yaml") || key.endsWith(".json");

    return [key.slice(14, isYamlOrJson ? -5 : -4), value.default];
  })
);

type KeyValuePair = {
  [key: string]: any;
};

export const install: ViteSetupModule = ({ app }) => {
  const supportedLocales: KeyValuePair = {
    "en-US": "en",
    "en": "en",
    "ja-JP": "ja",
    "ja": "ja",
  };

  const browserLocale = navigator.language;
  const finalLocale: string = supportedLocales[browserLocale] || "en";
  const i18n = createI18n({
    legacy: false,
    locale: finalLocale,
    messages,
    globalInjection: true,
  });

  app.use(i18n);
};
