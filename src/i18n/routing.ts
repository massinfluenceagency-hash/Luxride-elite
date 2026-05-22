import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "fr", "pt", "it", "zh", "ar"],
  defaultLocale: "en",
});
