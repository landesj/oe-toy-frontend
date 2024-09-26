import { useEffect, useState } from "react";
import { fetchTrackingData } from "./helpers/fetch";
import { getCurrentDate, getPreviousDate } from "./helpers/date";
import { TrackingData } from "./types";
import { ValueBox } from "./components/NumberBox";
import { DataTable } from "./components/Table";
import { Header } from "./components/Header";
import { LoadingSpinner } from "./components/Loading";
import { Box } from "@mui/material";
import { Graph } from "./components/TrackingGraph";

const COMPANY_ID = "5d6cb2a6";
const COST = 150_000;

const round = (number: number) => {
  return Math.round(number * 1000) / 1000;
};

export default function AdLand() {
  const [timeRange, setTimeRange] = useState(7);
  const [trackingData, setTrackingData] = useState<TrackingData | undefined>(
    undefined
  );

  useEffect(() => {
    const startTimestamp = getPreviousDate(timeRange);
    fetchTrackingData(startTimestamp, getCurrentDate(), COMPANY_ID).then(
      (data) => {
        if (!data) {
          alert("Unable to fetch tracking data");
          return;
        }
        setTrackingData(data.data);
      }
    );
  }, [timeRange]);

  if (!trackingData) return <LoadingSpinner />;

  const numViews = trackingData.tracking_data
    .filter((data) => data.type === "view")
    .reduce((acc, data) => {
      return acc + data.count;
    }, 0);

  const numClicks = trackingData.tracking_data
    .filter((data) => data.type === "click")
    .reduce((acc, data) => {
      return acc + data.count;
    }, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginLeft: "10%",
        marginRight: "10%",
      }}
    >
      <Header timeRange={timeRange} setTimeRange={setTimeRange} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Graph trackingData={trackingData} type="view" title="Views" />
        <Graph trackingData={trackingData} type="click" title="Clicks" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ValueBox name="Unique users" value={trackingData.unique_users} />
        <ValueBox name="Total views" value={numViews} />
        <ValueBox name="Total clicks" value={numClicks} />
        <ValueBox name="Click rate" value={round(numViews / numClicks)} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <ValueBox name="Cost" value={`$${COST}`} />
        <ValueBox
          name="Cost / unique user"
          value={`$${round(COST / trackingData.unique_users)}`}
        />
        <ValueBox name="Cost / view" value={`$${round(COST / numViews)}`} />
        <ValueBox name="Cost / click" value={`$${round(COST / numClicks)}`} />
      </Box>
      <DataTable trackingData={trackingData} />
    </Box>
  );
}
