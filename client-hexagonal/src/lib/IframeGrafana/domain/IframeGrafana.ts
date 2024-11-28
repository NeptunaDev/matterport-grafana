import { Base } from "../../Shared/domain/Base";

export interface IframeGrafana extends Base {
  readonly idPlant: string;
  readonly url: string;
  readonly order: number;
}

export function urlIsValid(url: string): boolean {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  const isValidUrl = urlPattern.test(url);
  if (!isValidUrl) {
    return false;
  }
  return true;
}

export function ensureIframeGrafanaUrlIsValid(url: string): void {
  if (!urlIsValid(url)) {
    throw new Error(`Invalid Url: ${url}`);
  }
}

export function orderIsValid(order: number): boolean {
  if (isNaN(order)) return false;
  if (order < 0) return false;
  return true;
}

export function ensureIframeGrafanaOrderIsValid(order: number): void {
  if (!orderIsValid(order)) {
    throw new Error(`Invalid Order: ${order}`);
  }
}
