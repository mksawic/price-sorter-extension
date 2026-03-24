import { SELECTORS } from "allegro/consts/selectors";
import { parsePrice } from "shared/utils/parsePrice";

export function getListingContainer(): Element | null {
  return document.querySelector(SELECTORS.listingContainer);
}

export function getProductItems(listContainer: Element): Element[] {
  const listItems = listContainer.querySelectorAll(SELECTORS.listItem);

  return Array.from(listItems).filter((item) => {
    const firstChild = item.firstElementChild;
    return firstChild?.matches(SELECTORS.productArticle);
  });
}

export function getItemPrice(item: Element): number | null {
  const priceEl = item.querySelector(SELECTORS.price);
  if (!priceEl) return null;
  const priceText = priceEl.textContent;
  return parsePrice(priceText);
}
