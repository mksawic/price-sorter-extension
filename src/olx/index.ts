import type { Sorter } from "shared/types/sorter";
import { getObserverTarget, getListingContainer } from "./functions/getters";
import { sortItems } from "./functions/sorting";
import { isSortingByPrice } from "./utils/getOrderParam";

export const olxSorter: Sorter = {
  hostname: "olx.pl",
  isSortingByPrice,
  getObserverTarget,
  getListingContainer,
  sortItems,
};
