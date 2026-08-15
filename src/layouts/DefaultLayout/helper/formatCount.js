export const formatCount = (count) => {
  if (!count) return 0;
  return new Intl.NumberFormat("en-Us", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count);
};
