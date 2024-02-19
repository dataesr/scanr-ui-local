import { LangField } from "../types/commons";

export default function getLangFieldValue(locale: string): any {
  return function (field: LangField): string | null {
    if (!field) {
      return null;
    }

    if (field[locale]) {
      return field[locale];
    }

    return field.default || field.fr || field.en;
  };
}
