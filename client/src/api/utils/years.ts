export const fillWithMissingYears = (acc, cur) => {
  if (acc.length === 0) return [cur];
  const last = acc[acc.length - 1];
  const missingYearsCount = cur.value - last.value - 1;
  if (!missingYearsCount) {
    return [...acc, cur];
  }
  const filler = Array.from({ length: missingYearsCount }, (_, i) => ({
    value: last.value + i + 1,
    label: last.value + i + 1,
    count: 0,
    normalizedCount: 0,
  }));
  return [
    ...acc,
    ...filler,
    cur
  ];
}