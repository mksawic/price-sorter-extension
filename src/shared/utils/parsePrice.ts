export function parsePrice(priceText: string | null): number | null {
  if (!priceText) return null;

  const cleaned = priceText
    .replaceAll(/zł|PLN|€/gi, "")
    .replaceAll(/\s/g, "")
    .trim();

  const normalized = cleaned.includes(",")
    ? cleaned.replaceAll(",", ".")
    : cleaned;
  const price = Number.parseFloat(normalized);

  return Number.isNaN(price) ? null : price;
}
