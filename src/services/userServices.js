import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, PUT, PATCH, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Credentials": true,
};

const uri = process.env.REACT_APP_URL;

export const checkCredentials = async (user) => {
  let res = await axios.post(`${uri}/user/login`, user, {
    headers: headers,
  });
  return res.data.user;
};

export const saveUser = async (user) => {
  let res = await axios.post(`${uri}/user`, user, {
    headers: headers,
  });
  return res.data.user;
};

export const getUserInfo = async (userName) => {
  let res = await axios.get(`${uri}/user`, {
    headers: headers,
    params: {
      id: userName,
    },
  });
  return res.data.user;
};
