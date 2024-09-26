import { AdInfo } from "@/app/types/adInfo";
import { AvertisingInfoDbClient } from "./database";

const client = new AvertisingInfoDbClient();

export const getAdvertiserInfo = (
  categoryId: string | undefined
): AdInfo | undefined => {
  if (!categoryId) return undefined;
  const adItem = client.getCategory(categoryId);
  if (!adItem) return undefined;
  return adItem;
};
