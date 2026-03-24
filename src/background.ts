import type { StatusMessage } from "shared/types/statusMessage";
import { setStorageStatus } from "shared/utils/storage";
import {
  SORTING_PERFORMED_ACTION,
  URL_CHANGED_ACTION,
} from "shared/consts/actions";

/**
 * Listen for history state updates and send a message to the content script.
 */
chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  if (details.frameId !== 0) return;

  void chrome.tabs
    .sendMessage(details.tabId, {
      action: URL_CHANGED_ACTION,
      details,
    })
    .catch(() => {
      // No receiver: content script not ready, tab closed, or URL no longer matches matches.
    });
});

/**
 * Update storage status based on sortingPerformed message
 */
chrome.runtime.onMessage.addListener(
  async ({ action, isActive, hostname }: StatusMessage) => {
    if (action === SORTING_PERFORMED_ACTION && hostname) {
      setStorageStatus(hostname, isActive);
    }
  },
);
