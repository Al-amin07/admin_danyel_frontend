import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import filter1 from "@/assets/photo/filter1.svg";
import { useState } from "react";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ILoad } from "@/types/load.type";
import { getPageRange } from "@/utils/getPageRange";
import { getStatusStyle } from "@/utils/load";
import Pagination from "@/components/shared/Pagination";

export function DriverLoadHistoryTable({ loads }: { loads: ILoad[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const rowsPerPage = 5;

  const totalPages = Math.ceil(loads.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentData = loads.slice(startIdx, startIdx + rowsPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };
  const pages = getPageRange(currentPage, totalPages);
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const start = (currentPage - 1) * rowsPerPage + 1; // first item index on current page
  const end = Math.min(currentPage * rowsPerPage, loads.length);
  console.log({ pages, start, end });
  const meta = {
    total: loads?.length,
    page: currentPage,
    totalPage: totalPages,
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="pt-3 pb-3">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-semibold text-[#27272A] font-inter leading-[120%]">
              Load History
            </h1>

            <div className="flex justify-end space-x-3 items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search loads"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="border border-[#D2D4D9] px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition duration-300 w-full sm:w-80"
                />
              </div>
              <div className="border border-[#D2D4D9] px-4 py-2 rounded-xl cursor-pointer hover:bg-[#F4F4F5]">
                <img src={filter1} alt="Filter icon" className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Load History Table */}
        <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-4 overflow-x-auto space-y-6">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-[#EDEEEF] border-[#E5E5E5] text-[#666666] text-sm rounded-2xl h-12">
                <TableHead className="px-4 h-12">Load ID</TableHead>
                <TableHead className="px-4 h-12">Route</TableHead>
                <TableHead className="px-4 h-12">Status</TableHead>
                <TableHead className="px-4 h-12">Rating</TableHead>
                <TableHead className="px-4 h-12">On-Time %</TableHead>
                <TableHead className="px-4 h-12">Date</TableHead>
                <TableHead className="px-4 h-12 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-[#1A1A1A]">
              {currentData.length > 0 ? (
                currentData.map((load) => (
                  <TableRow key={load.loadId}>
                    <TableCell className="font-medium px-4 py-3">
                      {load.loadId}
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
                      <div className="flex items-center">
                        {load?.rating || "N/A"}
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {/* {load.onTimePercentage} */}0
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {load.deliveryDate
                        ? new Date(load.deliveryDate).toLocaleDateString()
                        : ""}
                    </TableCell>
                    <TableCell className="text-center px-4 py-3">
                      <div className="space-x-2">
                        <Link to={`/admin-dashboard/loads/${load._id}`}>
                          <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                            View
                          </button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-4 text-gray-500"
                  >
                    No load history found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      {loads?.length > 0 && (
        <Pagination
          end={end}
          start={start}
          pages={pages}
          onPageChange={onPageChange}
          meta={meta}
        />
      )}
    </div>
  );
}
