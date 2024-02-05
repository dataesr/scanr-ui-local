export default function getLangFieldValue(locale) {
  return function (field) {
    if (!field) {
      return null;
    }

    if (field[locale]) {
      return field[locale];
    }

    return field.default || field.fr || field.en;
  };
}
