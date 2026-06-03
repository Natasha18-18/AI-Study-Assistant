import axios from "axios";

const API = import.meta.env.VITE_API_URL;

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