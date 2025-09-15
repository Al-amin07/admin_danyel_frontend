import filter1 from "@/assets/photo/filter1.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { Link } from "react-router-dom";
import { LoaderIcon } from "lucide-react";
import { ILoad } from "@/types/load.type";
import { formatDateToDDMMYY } from "@/utils/formatDate";
import { useGetAllLoadsQuery } from "@/store/api/load/loadApi";
import { getPageRange } from "@/utils/getPageRange";
import Pagination from "@/components/shared/Pagination";
import { getPaymentStatusStyle, getStatusStyle } from "@/utils/load";

function ActiveLoadsTable({ limit = 10 }: { limit?: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllLoadsQuery({
    page: currentPage,
    search: searchTerm,
    limit: limit,
  });

  const loads = data?.data;
  const meta = data?.meta;
  const pages = getPageRange(meta?.page, meta?.totalPage);
  console.log({ loads, pages, meta });

  //

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const start = (meta?.page - 1) * meta?.limit + 1; // first item index on current page
  const end = Math.min(meta?.page * meta?.limit, meta?.total);

  // Function to get status styling

  if (isLoading)
    return (
      <div className=" flex items-center justify-center min-h-[400px] md:min-h-[600px]">
        <LoaderIcon className="h-12 w-12 animate-spin " />
      </div>
    );

  return (
    <div className="space-y-11">
      <div>
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-[#27272A] font-inter leading-[120%]">
            Active Loads
          </h1>

          <div className="flex justify-end space-x-3 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search loads"
                className="border border-[#D2D4D9] px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition duration-300 w-full sm:w-80"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="border border-[#D2D4D9] px-4 py-2 rounded-xl cursor-pointer hover:bg-[#F4F4F4]">
              <img src={filter1} alt="Filter icon" className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Table Part */}
        <div>
          <div className="space-y-6">
            {/* Load History Table */}
            <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-4 overflow-x-auto space-y-6">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-[#EDEEEF] border-[#E5E5E5] text-[#666666] text-sm rounded-2xl h-12">
                    <TableHead className="px-4 h-12">Load ID</TableHead>
                    <TableHead className="px-4 h-12">Route</TableHead>
                    <TableHead className="px-4 h-12">Driver</TableHead>
                    <TableHead className="px-4 h-12">Status</TableHead>
                    <TableHead className="px-4 h-12">Payment Status</TableHead>
                    <TableHead className="px-4 h-12">Details</TableHead>
                    <TableHead className="px-4 h-12">Schedule</TableHead>
                    {/* <TableHead className="px-4 h-12">Earning</TableHead> */}
                    <TableHead className="px-4 h-12 text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="text-[#1A1A1A] ">
                  {loads &&
                    loads?.length > 0 &&
                    loads?.map((load: ILoad) => (
                      <TableRow key={load?._id}>
                        <TableCell className="font-medium px-4 py-3">
                          Load {load?.loadId}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium truncate max-w-[260px]">
                              {load?.pickupAddress?.city +
                                "," +
                                load?.pickupAddress.state}{" "}
                              →{" "}
                              {load?.deliveryAddress.city +
                                " , " +
                                load?.deliveryAddress?.state}
                            </span>
                            <span className="text-sm text-gray-500">
                              {load?.totalDistance} miles
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center">
                            {load?.assignedDriver ? (
                              <div className=" flex items-center gap-3">
                                <img
                                  src={load?.assignedDriver?.user?.profileImage}
                                  alt={load?.assignedDriver?.user?.name}
                                  className="w-8 h-8 rounded-full mr-2"
                                />

                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {load?.assignedDriver?.user?.name}
                                  </span>

                                  <span className="text-sm text-gray-500">
                                    ID: {load.assignedDriver?.driverId}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="text-yellow-500 font-medium">
                                Un Assigned
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="px-4  py-3">
                          <div
                            className={`px-4 py-1 inline-block font-medium rounded-full text-center ${getStatusStyle(
                              load.loadStatus
                            )}`}
                          >
                            {load?.loadStatus}
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div
                            className={`px-4 py-1 inline-block font-medium rounded-full text-center ${getPaymentStatusStyle(
                              load.paymentStatus
                            )}`}
                          >
                            {load?.paymentStatus}
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {load?.weight} lbs
                            </span>
                            <span className="text-sm text-gray-500">
                              $ {load?.ratePerMile}/ mi
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium">
                              Pickup:{" "}
                              {formatDateToDDMMYY(load?.pickupDate as Date) +
                                ", " +
                                load?.pickupTime}
                            </span>
                            <span className="text-sm text-gray-500">
                              Delevery EST:{" "}
                              {formatDateToDDMMYY(load?.deliveryDate as Date) +
                                ", " +
                                load?.deliveryTime}
                            </span>
                          </div>
                        </TableCell>
                        {/* <TableCell className="px-4 py-3">
                        $ {load?.totalPayment}
                      </TableCell> */}
                        <TableCell className="text-center px-4 py-3">
                          <div className="space-x-2">
                            {/* <Link to={`loads/${load.id}`}> */}
                            <Link to={`/admin-dashboard/loads/${load?._id}`}>
                              <button className="text-blue-500 px-4 py-2 rounded-lg font-medium hover:underline  cursor-pointer">
                                Details
                              </button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {!isLoading && loads && loads?.length === 0 && (
                <div className="flex   w-full mx-auto flex-col items-center justify-center py-20">
                  <div className="text-7xl mb-4 text-gray-300">📦</div>
                  <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                    No Load Found
                  </h2>
                  <p className="text-gray-500 text-center max-w-sm">
                    There are no loads available at the moment. Please check
                    back later or refresh the page.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination Controls */}
          {loads?.length > 0 && (
            <Pagination
              meta={meta}
              onPageChange={onPageChange}
              start={start}
              end={end}
              pages={pages}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveLoadsTable;
