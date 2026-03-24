const SITE_STATUS_STORAGE_KEY = "priceSorterSiteStatus";

export async function getSiteStatus(hostname: string): Promise<boolean> {
  const result = await chrome.storage.session.get(SITE_STATUS_STORAGE_KEY);
  const map = result[SITE_STATUS_STORAGE_KEY] as
    | Record<string, boolean>
    | undefined;
  return Boolean(map?.[hostname]);
}

export async function setStorageStatus(
  hostname: string,
  isActive: boolean,
): Promise<void> {
  const result = await chrome.storage.session.get(SITE_STATUS_STORAGE_KEY);
  const current = (result[SITE_STATUS_STORAGE_KEY] ?? {}) as Record<
    string,
    boolean
  >;

  await chrome.storage.session.set({
    [SITE_STATUS_STORAGE_KEY]: {
      ...current,
      [hostname]: isActive,
    },
  });
}
