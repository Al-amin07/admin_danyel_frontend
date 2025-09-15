// import DriverLoadHistory from "@/components/CompanyDashboard/Drivers/DriverLoadHistory";
// import DriversDetails from "@/components/CompanyDashboard/Drivers/DriversDetails";
// import DriversDetailsCard from "@/components/CompanyDashboard/Drivers/DriversDetailsCard";
// import { useGetSingleDriverQuery } from "@/redux/api/driver/driverApi";
import { LoaderIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import DriversDetails from "./DriverDetails";
import DriversDetailsCard from "./DriverDetailsCard";
import { DriverLoadHistoryTable } from "./DriverLoadHistoryTable";
import { useGetSingleDriverQuery } from "@/store/api/driver/driverApi";
import { ILoad } from "@/types/load.type";

const DriversDetailsPage = () => {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useGetSingleDriverQuery(id as string, {
    skip: !id,
  });
  const driver = data?.data;
  console.log(driver);
  if (isLoading)
    return (
      <div className=" flex items-center justify-center min-h-[400px] md:min-h-[600px]">
        <LoaderIcon className="h-12 w-12 animate-spin " />
      </div>
    );

  return (
    <div className="space-y-10">
      <DriversDetails driver={driver} />
      <DriversDetailsCard driver={driver} />
      <DriverLoadHistoryTable loads={driver?.loads as ILoad[]} />
    </div>
  );
};

export default DriversDetailsPage;
