import type { Sorter } from "shared/types/sorter";

import { setupMutationObserver } from "shared/utils/setupMutationObserver";
import { emitSortingMessage } from "shared/utils/emitSortingMessage";
import { allegroSorter } from "allegro";
import { olxSorter } from "olx";

const sorters: Record<string, Sorter> = {
  "allegro.pl": allegroSorter,
  "olx.pl": olxSorter,
};

const hostname = location.hostname.replace(/^www\./, "");
const sorter = sorters[hostname];

if (!sorter) {
  throw new Error(
    `[PRICE-SORTER]: No matching sorter found for hostname: ${hostname}`,
  );
}

const runSorter = () => {
  try {
    sorter.sortItems();
    emitSortingMessage(true, sorter.hostname);
  } catch (error) {
    console.error(`[PRICE-SORTER] ${sorter.hostname}: Error sorting items`);
    console.error(error);
    emitSortingMessage(false, sorter.hostname);
  }
};

runSorter();
setupMutationObserver({
  runSorter,
  sorter,
});
