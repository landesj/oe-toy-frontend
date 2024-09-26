import { Box, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { AdInfo } from "../types/adInfo";

type Props = {
  question: string;
};

const getAdvertiser = async (question: string) => {
  try {
    const response = await axios.post("/api/ad", { question });
    return response.data;
  } catch (error) {
    console.error("Error fetching advertiser:", error);
  }
};

const getUserId = () => {
  return "mock-user-id";
};

const trackAdvertisement = (advertiser: AdInfo, type: "view" | "click") => {
  const userId = getUserId();
  axios.post("/api/track", { advertiser, userId, type });
};

export function Ad({ question }: Props) {
  const [advertiser, setAdvertiser] = useState<AdInfo | undefined>(undefined);

  useEffect(() => {
    getAdvertiser(question).then((advertiser) => {
      setAdvertiser(advertiser);
    });
  }, [question]);

  useEffect(() => {
    if (advertiser) {
      trackAdvertisement(advertiser, "view");
      // No guarantee that the component renders before this hook is executed,
      // so this would need to be safer in production
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [advertiser]);

  const handleClick = () => {
    if (!advertiser) return;
    trackAdvertisement(advertiser, "click");
  };

  if (!advertiser) return <LinearProgress />;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a
          href={advertiser.finalUrl}
          target="_blank"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              maxWidth: 400,
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <Box
              component="img"
              src={advertiser.imgUrl}
              alt="Sample"
              sx={{
                height: "66.67%",
                width: "100%",
                objectFit: "cover",
              }}
            />
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                {advertiser.headline}
              </Typography>
              <Typography variant="body1" paragraph>
                {advertiser.description}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {advertiser.companyName}
              </Typography>
            </Box>
          </Box>
        </a>
      </Box>
      <LinearProgress style={{ marginTop: "5px" }} />
    </div>
  );
}
