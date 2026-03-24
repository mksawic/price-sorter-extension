import type { Sorter } from "shared/types/sorter";
import { getListingContainer } from "./functions/getters";
import { sortItems } from "./functions/sorting";
import { isSortingByPrice } from "./utils/getOrderParam";

export const allegroSorter: Sorter = {
  hostname: "allegro.pl",
  isSortingByPrice,
  getObserverTarget: getListingContainer,
  getListingContainer,
  sortItems,
};
