import axios from 'axios';

const numeralsAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Methods': '*'
  }
});

export default numeralsAPI;
