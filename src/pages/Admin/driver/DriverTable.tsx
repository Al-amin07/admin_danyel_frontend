import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IDriver } from "@/types/driver.type";
import { getPageRange } from "@/utils/getPageRange";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";

import { useGetAllDriversQuery } from "@/store/api/driver/driverApi";
import Pagination from "@/components/shared/Pagination";
import {
  useAssignLoadToDriverMutation,
  useGetAllLoadsQuery,
} from "@/store/api/load/loadApi";
import { vehicleTypeOptions } from "./driver.constant";

const statusOptions = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];
const availabilityOptions = ["On Duty", "Available"];
// const ratingOptions = ["All", "4+", "4.5+", "5"];

export function DriversTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [openLoadModal, setOpenLoadModal] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [assignLoad, { isLoading: assignLoadLoading }] =
    useAssignLoadToDriverMutation();
  const [selectedStatus, setSelectedStatus] = useState<string | null>("All");
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("All");
  const { data: loadData } = useGetAllLoadsQuery({
    page: 1,
    limit: 100,
    search: "Pending Assignment",
  });
  const loads = loadData?.data;
  console.log({ loads });
  const [selectedAvailability, setSelectedAvailability] =
    useState<string>("All");
  // const [selectedRating, setSelectedRating] = useState<string>("All");
  const { data, isLoading, refetch } = useGetAllDriversQuery({
    page: currentPage,
    limit: 10,
    search: searchTerm,
    status: selectedStatus,

    vehicleType: selectedVehicleType,
    availability: selectedAvailability,
  });
  const drivers = data?.data;
  const meta = data?.meta;
  console.log({ drivers, meta });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const start = (meta?.page - 1) * meta?.limit + 1; // first item index on current page
  const end = Math.min(meta?.page * meta?.limit, meta?.total);
  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    handleFilterChange();
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    handleFilterChange();
  };

  const handleVehicleTypeChange = (value: string) => {
    setSelectedVehicleType(value);
    handleFilterChange();
  };

  const handleAvailabilityChange = (value: string) => {
    setSelectedAvailability(value);
    handleFilterChange();
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedStatus("All");
    setSelectedVehicleType("All");
    setSelectedAvailability("All");
    // setSelectedRating("All");
    setCurrentPage(1);
  };
  const pages = getPageRange(meta?.page, meta?.totalPage);
  console.log({
    searchTerm,
    selectedAvailability,
    selectedStatus,
  });
  if (isLoading)
    return (
      <div className=" flex items-center justify-center min-h-[400px] md:min-h-[600px]">
        <LoaderIcon className="h-12 w-12 animate-spin " />
      </div>
    );
  const openModal = (driver: IDriver) => {
    console.log(driver);
    if (driver?.availability === "On Duty") {
      toast.error("Driver is on duty. Please try again later.");
      return;
    }
    setSelectedDriver(driver?._id);
    setOpenLoadModal(true);
  };
  const handleAssignLoadToDriver = async () => {
    try {
      const result = await assignLoad({
        id: selectedLoad,
        data: {
          driverId: selectedDriver,
        },
      }).unwrap();
      console.log({ result });
      if (result?.success) {
        refetch();
        toast.success("Load assigned to driver successfully");
      } else {
        throw Error(result?.message || "Failed to assign load");
      }
    } catch (error: any) {
      toast.error(error?.message || error?.data?.message);
    } finally {
      setSelectedDriver("");
      setOpenLoadModal(false);
    }
  };
  return (
    <div>
      <div className="space-y-6">
        <div className="pt-3 pb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="flex justify-end">
              <div className="w-full max-w-2xl flex items-center justify-between border border-foundation-white rounded-xl text-[#ABB7C2] px-2.5 py-3 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search by name or ID..."
                    className="outline-none bg-transparent text-sm text-black"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <span>
                  <IoSearchSharp />
                </span>
              </div>
            </div>

            {/* Status Filter */}
            <Select
              value={selectedStatus as string}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-full py-4 sm:py-6 border border-[#C7CACF] rounded-lg">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="border-none bg-white">
                <SelectItem
                  value="All"
                  className="hover:bg-gray-200 hover:text-[#2563EB] cursor-pointer transition-colors duration-300"
                >
                  All Status
                </SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem
                    key={status.label}
                    value={String(status.value)}
                    className="hover:bg-gray-200 hover:text-[#2563EB] cursor-pointer transition-colors duration-300"
                  >
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Vehicle Type Filter */}
            <Select
              value={selectedVehicleType}
              onValueChange={handleVehicleTypeChange}
            >
              <SelectTrigger className="w-full py-4 sm:py-6 border border-[#C7CACF] rounded-lg">
                <SelectValue placeholder="All Vehicle Types" />
              </SelectTrigger>
              <SelectContent className="border-none bg-white">
                <SelectItem
                  value="All"
                  className="hover:bg-gray-200 hover:text-[#2563EB] cursor-pointer transition-colors duration-300"
                >
                  All Vehicle Types
                </SelectItem>
                {vehicleTypeOptions.map((type) => (
                  <SelectItem
                    key={type.key}
                    value={type.key}
                    className="hover:bg-gray-200 hover:text-[#2563EB] cursor-pointer transition-colors duration-300"
                  >
                    {type.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Rating Filter */}
            {/* <Select value={selectedRating} onValueChange={handleRatingChange}>
              <SelectTrigger className="w-full py-4 sm:py-6 border border-[#C7CACF] rounded-lg">
                <SelectValue placeholder="All Ratings" />
              </SelectTrigger>
              <SelectContent className="border-none bg-white">
                {ratingOptions.map((rating) => (
                  <SelectItem
                    key={rating}
                    value={rating}
                    className="hover:bg-gray-200 hover:text-[#2563EB] cursor-pointer transition-colors duration-300"
                  >
                    {rating === "All" ? "All Ratings" : `${rating} Stars`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}

            {/* Availability Filter */}
            <Select
              value={selectedAvailability}
              onValueChange={handleAvailabilityChange}
            >
              <SelectTrigger className="w-full py-4 sm:py-6 border border-[#C7CACF] rounded-lg">
                <SelectValue placeholder="All Availability" />
              </SelectTrigger>
              <SelectContent className="border-none bg-white">
                <SelectItem
                  value="All"
                  className="hover:bg-gray-200 hover:text-[#2563EB] cursor-pointer transition-colors duration-300"
                >
                  All Availability
                </SelectItem>
                {availabilityOptions.map((availability) => (
                  <SelectItem
                    key={availability}
                    value={availability}
                    className="hover:bg-gray-200 hover:text-[#2563EB] cursor-pointer transition-colors duration-300"
                  >
                    {availability}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={handleReset}
              className="w-full bg-slate-100 text-sm font-medium border border-gray-200 rounded-xl cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Drivers Table */}
        <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-4 overflow-x-auto space-y-6">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-[#EDEEEF] border-[#E5E5E5] text-[#666666] text-sm rounded-2xl h-12">
                <TableHead className="px-4 h-12">Driver</TableHead>
                <TableHead className="px-4 h-12">Vehicle Type</TableHead>
                <TableHead className="px-4 h-12">Status</TableHead>
                <TableHead className="px-4 h-12">Current Load</TableHead>
                <TableHead className="px-4 h-12">Availability</TableHead>
                <TableHead className="px-4 h-12">Rating</TableHead>
                <TableHead className="px-4 h-12">On-Time %</TableHead>
                <TableHead className="px-4 h-12 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-[#1A1A1A]">
              {drivers?.length > 0 ? (
                drivers?.map((driver: IDriver) => (
                  <TableRow key={driver?.driverId}>
                    <TableCell className="font-medium px-4 py-3 flex items-center gap-3">
                      <div className="flex items-center">
                        <img
                          src={driver?.user?.profileImage}
                          alt={driver?.user?.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div className="flex flex-col">
                          <span>{driver?.user?.name}</span>
                          <span className="text-sm text-gray-500">
                            ID: {driver?.driverId}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {driver?.vehicleType}
                    </TableCell>

                    <TableCell
                      className={`px-2 py-1 inline-block mt-2 text-center  font-medium rounded-full  ${
                        driver.status
                          ? "bg-[#DDEDE8] text-[#10B981]"
                          : "bg-[#F5F5F5] text-[#B0B0B0]"
                      }`}
                    >
                      {driver.status ? "Active" : "Inactive"}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      {/* {driver.currentLoad} */}
                      ssgvj
                    </TableCell>
                    <TableCell
                      className={`px-3 py-1.5 font-medium rounded-full inline-block ${
                        driver.availability === "On Duty"
                          ? "bg-[#BBCFF9] text-[#1A1A1A]"
                          : "bg-[#D1E7FF] text-[#3B82F6]"
                      }`}
                    >
                      {driver.availability}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <div className="flex items-center">
                        {driver.averageRating?.toFixed(2)}
                        <span className="text-yellow-500 ml-1">★</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {/* {driver.onTimePercentage} */}
                      90%
                    </TableCell>
                    <TableCell className="text-center px-4 py-3">
                      <div className="space-x-2">
                        <Link to={`/admin-dashboard/drivers/${driver._id}`}>
                          <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                            View
                          </button>
                        </Link>

                        <button
                          onClick={() => openModal(driver)}
                          className="text-green-500 hover:text-green-700 cursor-pointer"
                        >
                          Assign
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-4 text-gray-500"
                  >
                    No drivers found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      {drivers?.length > 0 && (
        <Pagination
          meta={meta}
          pages={pages}
          start={start}
          end={end}
          onPageChange={onPageChange}
        />
      )}
      {/* --- Driver Change Modal --- */}
      {openLoadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-40">
          <div className="bg-white z-50 rounded-2xl shadow-lg w-full max-w-md p-6 space-y-5">
            <h3 className="text-xl font-semibold">Assign Load</h3>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Select a Load
              </label>
              <select
                value={selectedLoad!}
                onChange={(e) => setSelectedLoad(e.target.value)}
                className="w-full p-2 border rounded-lg mt-2"
              >
                <option value="">Select Load</option>
                {loads?.map((el: any) => (
                  <option value={el?._id}>{el?.loadId}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setOpenLoadModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                disabled={
                  loads?.length === 0 || !selectedLoad || assignLoadLoading
                }
                onClick={handleAssignLoadToDriver}
                className="px-4 py-2 bg-blue-600 disabled:opacity-70  text-white rounded-lg hover:bg-blue-700"
              >
                {assignLoadLoading ? "Saving..." : " Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
