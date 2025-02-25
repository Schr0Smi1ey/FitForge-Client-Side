import ClassCard from "../../../Cards/ClassCard";
import { GridLoader } from "react-spinners";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { useQuery } from "@tanstack/react-query";

const FeaturedClasses = () => {
  const customAxios = useCustomAxios();
  const { data: classes, isFetching } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await customAxios.get("/classes?home=true");
      return res.data;
    },
  });
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {classes.map((featuredClass, index) => {
        return <ClassCard key={index} classData={featuredClass}></ClassCard>;
      })}
    </div>
  );
};

export default FeaturedClasses;
