export const fillWithMissingYears = (acc, cur) => {
  if (acc.length === 0) return [cur];
  const last = acc[acc.length - 1];
  if (cur.value === last.value + 1) {
    return [...acc, cur];
  }
  const missingYears = cur.value - 1;
  return [
    ...acc,
    {
      value: missingYears,
      label: missingYears,
      count: 0,
      normalizedCount: 0,
    },
    cur
  ];
}