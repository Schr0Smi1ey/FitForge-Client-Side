import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "./useCustomAxios";

const useTrainers = () => {
  const customAxios = useCustomAxios();
  const { data: trainers = [], isloading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await customAxios.get("/trainers");
      return res.data;
    },
  });
  return { trainers, isloading };
};

export default useTrainers;
