// import { Button } from "@/components/ui/button";
// import Title from "../Shared/Title";
import { useParams } from "react-router-dom";
// import { MdOutlineEdit } from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa";
// import LoadInformation from "./LoadInformation";
// import DocumentList from "./DocumentList";
// import { useGetSingleLoadQuery } from "@/redux/api/load/loadApi";
import { LoaderIcon } from "lucide-react";
// import CustomerPaymentSection from "../modal/CustomerPayment";
// import { useGetAllDriversQuery } from "@/redux/api/driver/driverApi";
import { formatDistanceToNow } from "date-fns";
import Title from "@/pages/shared/Title";
import { useGetSingleLoadQuery } from "@/store/api/load/loadApi";
import { useGetAllDriversQuery } from "@/store/api/driver/driverApi";
import LoadInformation from "./LoadInformation";
import CustomerAndDriverInfo from "./CustomerDriverInfo";
import DocumentList from "./DocumentList";

export const getLoadStatusMessage = (status: string): string => {
  switch (status) {
    case "Pending Assignment":
      return "Load is waiting for a driver to be assigned";
    case "Awaiting Pickup":
      return "Load is scheduled and waiting to be picked up by the driver";
    case "Assigned":
      return "A driver has been assigned to this load";
    case "In Transit":
      return "Driver is currently transporting the load";
    case "At Pickup":
      return "Driver has arrived at the pickup location";
    case "En Route to Pickup":
      return "Driver is currently on the way to the pickup location";
    case "Delivered":
      return "Load has been successfully delivered";
    case "Cancelled":
      return "This load has been cancelled";
    default:
      return "Status not available";
  }
};

function LoadDetailsPage() {
  const params = useParams();
  const id = params.id;
  // console.log({ id });
  const { data, isLoading, refetch } = useGetSingleLoadQuery(id, { skip: !id });
  const { data: driverData } = useGetAllDriversQuery({
    limit: 1000000,
    availability: "Available",
    status: true,
  });
  const drivers = driverData?.data;

  console.log({ data });
  const load = data?.data;
  if (isLoading)
    return (
      <div className=" flex items-center justify-center min-h-[400px] md:min-h-[600px]">
        <LoaderIcon className="h-12 w-12 animate-spin " />
      </div>
    );

  return (
    <div className="space-y-4 md:space-y-6 ">
      <div className="space-y-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="w-full lg:w-auto">
            <Title
              title={`Load ${load?.loadId}`}
              subTitle="Comprehensive details about this specific load"
            />
          </div>
          <div className="flex flex-col lg:flex-row xl:flex-row xs:flex-row gap-3 w-full lg:w-auto">
            {/* <div className="w-full xs:w-auto flex-1 min-w-[200px]">
              <Link
                to="/company-dashboard/load-board/create"
                className="block w-full"
              >
                <Button className="w-full p-4 md:p-6 rounded-lg border flex items-center justify-center gap-2 md:gap-3 text-black font-inter text-base md:text-[18px] font-semibold cursor-pointer shadow-md transition-all duration-300 hover:shadow-2xl hover:bg-[#2563EB] border-[#5D6875] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#4B5563]">
                  <MdOutlineEdit className="w-4 h-4 md:w-5 md:h-5" />
                  Edit Load
                </Button>
              </Link>
            </div> */}

            {/* <div className="w-full xs:w-auto flex-1 min-w-[200px]">
              <Link
                to="/company-dashboard/load-board/create"
                className="block w-full"
              >
                <Button className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white text-sm md:text-base font-semibold rounded-lg px-4 md:px-6 py-3 h-12 md:h-[52px] transition-all duration-300 hover:bg-[#1e53a8] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB] shadow-lg cursor-pointer">
                  <IoDocumentText className="w-4 h-4 md:w-5 md:h-5" />
                  Upload Docs
                </Button>
              </Link>
            </div> */}
          </div>
        </div>

        <div className="flex justify-between items-center p-4 bg-[#E9EFFD] border border-[#E5E5E5] rounded-xl shadow-md">
          <div className="flex items-center gap-5">
            <div>
              <FaTruckMoving className=" h-10 w-10 text-[#2563EB]" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-700 flex justify-start items-center gap-1">
                Current Status:{" "}
                <span className="text-[#2563EB]">{load?.loadStatus}</span>
              </h4>
              <p className="text-sm text-gray-500">
                {getLoadStatusMessage(load?.loadStatus)}
                {/* Driver is currently en route to the delivery location */}
              </p>
            </div>
          </div>
          <div>
            Last Updated{" "}
            {formatDistanceToNow(new Date(load?.updatedAt), {
              addSuffix: true,
            }).replace("about ", "")}
          </div>
        </div>
      </div>

      {/* Table Component */}
      {/* Table Component */}
      <div className="flex flex-col lg:flex-row w-full gap-5">
        <div className="w-full lg:w-2/3">
          <LoadInformation refetch={refetch} load={load} />
        </div>
        <div className="w-full lg:w-1/3">
          <CustomerAndDriverInfo
            drivers={drivers}
            refetch={refetch}
            load={load}
          />
          {/* <CustomerAndDriverInfo load={load} /> */}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-5">
        <div className="w-full  lg:w-2/3">{/* <OrderDetails /> */}</div>
        <div className="w-full lg:w-1/3">
          <DocumentList refetch={refetch} load={load} />
        </div>
      </div>
    </div>
  );
}

export default LoadDetailsPage;
