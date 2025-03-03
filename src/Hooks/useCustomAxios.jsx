import axios from "axios";

const CustomAxios = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://fitforge-server.vercel.app",
});
const useCustomAxios = () => {
  return CustomAxios;
};

export default useCustomAxios;
