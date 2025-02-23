import { useQuery } from "@tanstack/react-query";
import useCustomAxios from "./useCustomAxios";

const useClasses = () => {
  const customAxios = useCustomAxios();
  const { data: classes = [], isFetching } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await customAxios.get("/classes");
      return res.data;
    },
  });
  return { classes, isFetching };
};

export default useClasses;
