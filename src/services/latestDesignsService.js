import axios from 'axios';
import endpoints from "constants/endpoints";
import configData from "constants/configData";


export const fetchLatestDesigns = async() => {
  try {
    const {data} = await axios.get(configData.SERVER_URL + endpoints.LATEST_DESIGNS);
    return data;

  } catch (error) {
      throw error;
  }
}


