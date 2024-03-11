import axios from "axios";

const API_URL = "http://localhost:8000";

export const uploadData = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/upload`, data);
    if (res.status === 200) return { isSuccess: true, data: res.data };
  } catch (error) {
    console.log("Error while uploading data.", error);
    return { isSuccess: false, data: error.message };
  }
};
