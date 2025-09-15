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
import { formatDateToDDMMYY } from "@/utils/formatDate";
import { useGetAllCompaniesQuery } from "@/store/api/company/companyApi";
import { getPageRange } from "@/utils/getPageRange";
import Pagination from "@/components/shared/Pagination";

function ActiveCompanyTable({ limit = 10 }: { limit?: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllCompaniesQuery({
    page: currentPage,
    search: searchTerm,
    limit: limit,
  });

  const companies = data?.data;
  const meta = data?.meta;
  const pages = getPageRange(meta?.page, meta?.totalPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const start = (meta?.page - 1) * meta?.limit + 1;
  const end = Math.min(meta?.page * meta?.limit, meta?.total);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px] md:min-h-[600px]">
        <LoaderIcon className="h-12 w-12 animate-spin" />
      </div>
    );

  return (
    <div className="space-y-11">
      <div>
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-[#27272A] font-inter leading-[120%]">
            Active Companies
          </h1>

          <div className="flex justify-end space-x-3 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search companies"
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

        {/* Company Table */}
        <div>
          <div className="space-y-6">
            <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-4 overflow-x-auto space-y-6">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-[#EDEEEF] border-[#E5E5E5] text-[#666666] text-sm rounded-2xl h-12">
                    <TableHead className="px-4 h-12">Company Name</TableHead>
                    <TableHead className="px-4 h-12">Address</TableHead>
                    <TableHead className="px-4 h-12">Payment Terms</TableHead>
                    <TableHead className="px-4 h-12">Loads</TableHead>
                    <TableHead className="px-4 h-12">
                      Number Of Employees
                    </TableHead>
                    <TableHead className="px-4 h-12">Created At</TableHead>
                    <TableHead className="px-4 h-12 text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="text-[#1A1A1A]">
                  {companies &&
                    companies?.length > 0 &&
                    companies?.map((company: any) => (
                      <TableRow key={company?._id}>
                        <TableCell className="font-medium px-4 py-3">
                          {company?.companyName}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {company?.companyAddress}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {company?.paymentTerms || "N/A"}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {company?.loads?.length || 0}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {company?.numberOfEmployees}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {formatDateToDDMMYY(company?.createdAt as Date)}
                        </TableCell>
                        <TableCell className="text-center px-4 py-3">
                          <Link to={`/admin-dashboard/company/${company?._id}`}>
                            <button className="text-blue-500 px-4 py-2 rounded-lg font-medium hover:underline cursor-pointer">
                              Details
                            </button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {!isLoading && companies && companies?.length === 0 && (
                <div className="flex w-full mx-auto flex-col items-center justify-center py-20">
                  <div className="text-7xl mb-4 text-gray-300">🏢</div>
                  <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                    No Company Found
                  </h2>
                  <p className="text-gray-500 text-center max-w-sm">
                    There are no companies available at the moment. Please check
                    back later or refresh the page.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {companies?.length > 0 && (
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

export default ActiveCompanyTable;
