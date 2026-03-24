import { SORTING_PERFORMED_ACTION } from "shared/consts/actions";

/**
 * Emit "sortingPerformed" to popup and background script.
 */
export function emitSortingMessage(isActive: boolean, hostname: string) {
  void chrome.runtime
    .sendMessage({
      action: SORTING_PERFORMED_ACTION,
      isActive,
      hostname,
    })
    .catch(() => {
      // No listener (e.g. service worker restarting). Status is still persisted via storage when used.
    });
}
