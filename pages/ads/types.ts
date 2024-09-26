export type TrackingDayCount = {
  date: string;
  type: "click" | "view";
  adId: string;
  count: number;
};

export type TrackingData = {
  unique_users: number;
  tracking_data: TrackingDayCount[];
};
