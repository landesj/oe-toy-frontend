import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { ChangeEvent } from "react";

type Props = {
  timeRange: number;
  setTimeRange: (n: number) => void;
};

export const Header = ({ timeRange, setTimeRange }: Props) => {
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setTimeRange(event.target.value as number);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#DCDCDC" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Pfizer</Typography>
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="time-period-select-label">Time Period</InputLabel>
            <Select
              labelId="time-period-select-label"
              id="time-period-select"
              value={timeRange}
              label="Time Period"
              onChange={handleChange}
            >
              <MenuItem value={7}>7 Days</MenuItem>
              <MenuItem value={30}>30 Days</MenuItem>
              <MenuItem value={90}>3 Months</MenuItem>
              <MenuItem value={180}>6 Months</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
