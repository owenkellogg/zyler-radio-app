import * as languages from './languages';
import { LanguageType } from './types.language';

export function getLanguage(): LanguageType {
  return languages.enUS;
}

export const language = getLanguage();
