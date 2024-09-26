import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { TrackingData, TrackingDayCount } from "../types";

const COST = 50_000;

type Props = {
  trackingData: TrackingData;
};

export const DataTable = ({ trackingData }: Props) => {
  const dataByCampaign = trackingData.tracking_data.reduce((acc, data) => {
    const results = acc[data.adId] || [];
    results.push(data);
    acc[data.adId] = results;
    return acc;
  }, {} as { [key: string]: TrackingDayCount[] });
  const tableDataByCampaign = Object.entries(dataByCampaign).map(
    ([campaign, campaignData]) => {
      const numViews = campaignData
        .filter((d) => d.type === "view")
        .reduce((acc, data) => acc + data.count, 0);
      const numClicks = campaignData
        .filter((d) => d.type === "click")
        .reduce((acc, data) => acc + data.count, 0);
      const cost = COST;
      return {
        campaign,
        numViews,
        numClicks,
        cost,
      };
    }
  );

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom sx={{ padding: 2 }}>
        Stats by Campaign
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Campaign</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Views</TableCell>
            <TableCell>Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableDataByCampaign.map((row) => (
            <TableRow key={row.campaign}>
              <TableCell>{row.campaign}</TableCell>
              <TableCell>{`$${row.cost}`}</TableCell>
              <TableCell>{row.numViews}</TableCell>
              <TableCell>{row.numClicks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
