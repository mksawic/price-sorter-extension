import { PARAM_NAME, SORT_ASC, SORT_DESC } from "allegro/consts/params";

export function getOrderParam() {
  const urlParams = new URLSearchParams(location.search);

  return urlParams.get(PARAM_NAME);
}

export function isSortingByPrice() {
  const order = getOrderParam();
  return order === SORT_ASC || order === SORT_DESC;
}
