import { Paper, Typography } from "@mui/material";

type Props = {
  name: string;
  value: number | string;
};

export function ValueBox({ name, value }: Props) {
  return (
    <Paper
      elevation={3}
      sx={{ padding: 3, textAlign: "center", borderRadius: 2 }}
      style={{ width: "15%" }}
    >
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
        {value}
      </Typography>
    </Paper>
  );
}
