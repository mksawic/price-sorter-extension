import { getOrderParam, isSortingByPrice } from "allegro/utils/getOrderParam";
import { SORT_DESC } from "allegro/consts/params";
import { getItemPrice, getListingContainer, getProductItems } from "./getters";

export function sortItems(): void {
  if (!isSortingByPrice()) {
    throw new Error("[PRICE-SORTER] Allegro: Not sorting by price");
  }

  const container = getListingContainer();
  if (!container) {
    throw new Error("[PRICE-SORTER] Allegro: Listing container not found");
  }

  const items = getProductItems(container);
  if (items.length < 2) {
    throw new Error(
      `[PRICE-SORTER] Allegro: Not enough items to sort (found ${items.length})`,
    );
  }

  const order = getOrderParam();

  items.sort((a, b) => {
    const priceA = getItemPrice(a);
    const priceB = getItemPrice(b);

    if (priceA === null && priceB === null) return 0;
    if (priceA === null) return 1;
    if (priceB === null) return -1;

    if (order === SORT_DESC) {
      return priceB - priceA;
    }
    return priceA - priceB;
  });

  container.replaceChildren(...items);

  console.log(
    `[PRICE-SORTER] Allegro: Sorted ${items.length} items by price (order: ${order || "ascending"})`,
  );
}
