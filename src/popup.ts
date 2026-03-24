import type { StatusMessage } from "shared/types/statusMessage";
import { getSiteStatus } from "shared/utils/storage";

// Apply i18n to all elements with data-i18n attribute
document.querySelectorAll("[data-i18n]").forEach((el) => {
  const key = el.getAttribute("data-i18n");
  if (key) {
    el.textContent = chrome.i18n.getMessage(key);
  }
});

function updateStatus(hostname: string, isActive: boolean) {
  const container = document.getElementById(hostname);
  const statusDot = container?.querySelector(".status-dot");
  const statusText = container?.querySelector(".status-text");

  if (!statusDot || !statusText) return;

  statusDot.classList.toggle("active", isActive);
  statusText.textContent = chrome.i18n.getMessage(
    isActive ? "statusActive" : "statusInactive",
  );
}

// Update status based on sortingPerformed message
chrome.runtime.onMessage.addListener(
  async ({ action, isActive, hostname }: StatusMessage) => {
    if (action === "sortingPerformed" && hostname) {
      updateStatus(hostname, isActive);
    }
  },
);

getSiteStatus("allegro.pl").then((isActive) =>
  updateStatus("allegro.pl", isActive),
);
getSiteStatus("olx.pl").then((isActive) => updateStatus("olx.pl", isActive));
