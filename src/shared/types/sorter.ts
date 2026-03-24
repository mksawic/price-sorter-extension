export type Sorter = {
  hostname: string;
  isSortingByPrice: () => boolean;
  getObserverTarget: () => Element | null;
  getListingContainer: () => Element | null;
  sortItems: () => void;
};
