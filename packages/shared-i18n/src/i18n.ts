export const SUPPORTED_LOCALES = ['zh-CN', 'en-US'] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  'zh-CN': '中文',
  'en-US': 'English',
};
