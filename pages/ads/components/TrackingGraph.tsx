import { Box, Typography } from "@mui/material";
import { TrackingData } from "../types";
import { LineChart } from "@mui/x-charts";

type Props = {
  trackingData: TrackingData;
  type: "view" | "click";
  title: string;
};

export function Graph({ trackingData, type, title }: Props) {
  const dataByType = trackingData.tracking_data.filter(
    (data) => data.type === type
  );
  const dateByDate = dataByType.reduce((acc, data) => {
    const results = acc[data.date] || {};
    results[data.adId] = data.count;
    acc[data.date] = results;
    return acc;
  }, {} as { [key: string]: { [key: string]: number } });

  const graphDataset = Object.entries(dateByDate).map(([date, counts]) => {
    return {
      date: new Date(date),
      ...counts,
    };
  });
  const uniqueCampaigns = dataByType.reduce((acc, d) => {
    acc.add(d.adId);
    return acc;
  }, new Set<string>());

  const series = Array.from(uniqueCampaigns).map((c) => {
    return {
      id: c,
      label: c,
      dataKey: c,
      stack: "total",
      area: false,
      showMark: false,
    };
  });

  return (
    <Box>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <LineChart
        dataset={graphDataset}
        xAxis={[
          {
            id: "date",
            dataKey: "date",
            scaleType: "time",
            valueFormatter: (date) => {
              return date.toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
              });
            },
          },
        ]}
        series={series}
        width={550}
        height={400}
        margin={{ left: 70 }}
      />
    </Box>
  );
}
