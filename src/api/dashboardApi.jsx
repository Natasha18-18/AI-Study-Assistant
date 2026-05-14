import axios from "axios";

const API = "http://localhost:5000/api";

export const trackAIUsage = async (userId) => {
  return await axios.post(
    `${API}/activity/ai`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};