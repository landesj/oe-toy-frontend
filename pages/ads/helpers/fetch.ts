import axios from "axios";

const FETCH_URL =
  "https://pu8yqxx64l.execute-api.us-east-1.amazonaws.com/default/get-tracking-data";

export async function fetchTrackingData(
  startTime: number,
  endTime: number,
  companyId: string
) {
  try {
    return await axios.get(FETCH_URL, {
      params: {
        start_time: startTime,
        end_time: endTime,
        company_id: companyId,
      },
    });
  } catch (e) {
    console.error("Unable to fetch tracking data", e);
    alert("Unable to fetch tracking data");
  }
}
