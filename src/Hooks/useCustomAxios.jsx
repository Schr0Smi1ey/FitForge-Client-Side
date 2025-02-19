import axios from "axios";

const CustomAxios = axios.create({
  baseURL: "http://localhost:3000",
});
const useCustomAxios = () => {
  return CustomAxios;
};

export default useCustomAxios;
