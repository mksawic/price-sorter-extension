import { URL_CHANGED_ACTION } from "shared/consts/actions";
import type { Sorter } from "shared/types/sorter";
import { emitSortingMessage } from "./emitSortingMessage";

type SetupMutationObserverOptions = {
  runSorter: () => void;
  sorter: Sorter;
};

export function setupMutationObserver({
  runSorter,
  sorter,
}: SetupMutationObserverOptions) {
  chrome.runtime.onMessage.addListener(async (request) => {
    if (request.action !== URL_CHANGED_ACTION || !sorter.isSortingByPrice()) {
      emitSortingMessage(false, sorter.hostname);
      return;
    }

    const observer = new MutationObserver((mutations) => {
      const hasNewNodes = mutations.some(
        (mutation) => mutation.addedNodes.length > 0,
      );

      if (
        hasNewNodes &&
        sorter.isSortingByPrice() &&
        !!sorter.getListingContainer()
      ) {
        observer.disconnect();
        requestAnimationFrame(runSorter);
      }
    });

    observer.observe(sorter.getObserverTarget() || document.body, {
      childList: true,
      subtree: true,
    });
  });
}
