import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, PUT, PATCH, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Credentials": true,
};

export const checkCredentials = async (user) => {
  let res = await axios.post(`${process.env.REACT_APP_URL}/user/login`, user, {
    headers: headers,
  });
  return res.data.user;
};

export const createUser = async(user) => {
  let res = await axios.post(`${process.env.REACT_APP_URL}/user`, user, {
    headers: headers,
  });
  return res.data.user;
}
