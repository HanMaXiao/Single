import { SUPPORTED_LOCALES, type SupportedLocale } from './i18n';

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}
