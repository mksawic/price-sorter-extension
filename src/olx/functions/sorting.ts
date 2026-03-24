import { SORT_DESC } from "olx/consts/params";
import { getOrderParam, isSortingByPrice } from "olx/utils/getOrderParam";
import { getItemPrice, getListingContainer, getProductItems } from "./getters";

export function sortItems(): void {
  if (!isSortingByPrice()) {
    throw new Error("[PRICE-SORTER] OLX: Not sorting by price");
  }

  const container = getListingContainer();
  if (!container) {
    throw new Error("[PRICE-SORTER] OLX: Listing container not found");
  }

  const items = getProductItems(container);
  if (items.length < 2) {
    throw new Error(
      `[PRICE-SORTER] OLX: Not enough items to sort (found ${items.length})`,
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
    `[PRICE-SORTER] OLX: Sorted ${items.length} items by price (order: ${order || "ascending"})`,
  );
}
