import { SELECTORS } from "olx/consts/selectors";
import { parsePrice } from "shared/utils/parsePrice";

export function getObserverTarget(): Element | null {
  return document.querySelector(SELECTORS.observerTarget);
}

export function getListingContainer(): Element | null {
  return document.querySelector(SELECTORS.listingContainer);
}

export function getProductItems(listContainer: Element): Element[] {
  return Array.from(listContainer.querySelectorAll(SELECTORS.listItem));
}

export function getItemPrice(item: Element): number | null {
  const priceEl = item.querySelector(SELECTORS.price);
  if (!priceEl) return null;
  const priceText = priceEl.textContent;
  return parsePrice(priceText);
}
