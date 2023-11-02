import axios from 'axios';
import endpoints from "constants/endpoints";
import configData from "constants/configData";


export const fetchUserInfoGmail = async(user) => {

  try {
    let url = configData.SERVER_URL + endpoints.FETCH_USER_INFO_GMAIL ;
    const {data} = await axios.get(url+"?userAccessToken="+user.access_token, { withCredentials: true });
    return data;

  } catch (error) {
      throw error;
  }
}

export const fetchUserInfoPhone = async(user) => {

  try {
    let url = configData.SERVER_URL + endpoints.FETCH_USER_INFO_PHONE ;
    const {data} = await axios.get(url+"?userAccessToken="+user.access_token, { withCredentials: true });
    return data;

  } catch (error) {
      throw error;
  }
}

export const saveUserInfo = async(userDetails) => {

  let userDataReq = {
    'email': userDetails.email,
    'userName': userDetails.name,
    'phoneNumber': userDetails.phoneNumber,
    'picture': userDetails.picture,
    'verifiedEmail': userDetails.verified_email,
    'loggedWith': userDetails.loggedWith
  }
  try {
    let url = configData.SERVER_URL + endpoints.SAVE_USER_INFO ;
    await axios.post(url, userDataReq);

  } catch (error) {
      throw error;
  }
}



