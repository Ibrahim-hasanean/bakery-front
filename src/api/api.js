import axios from "axios";
const API_END_POINT = process.env.REACT_APP_API_URL;
console.log(API_END_POINT);
export default axios.create({
  baseURL: `${API_END_POINT}`,
});
