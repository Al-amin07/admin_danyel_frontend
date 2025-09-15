import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";

import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { formatDateToDDMMYY } from "@/utils/formatDate";
// import { useGetAllUsersQuery } from "@/store/api/user/userApi";
import { getPageRange } from "@/utils/getPageRange";
import Pagination from "@/components/shared/Pagination";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/store/api/user/userApi";
import { getRoleColor, getStatusColor } from "@/pages/shared/getRoleColor";
import { toast } from "sonner";

function AllUserTable({ limit = 10 }: { limit?: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [blockUser] = useBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    search: searchTerm,
    limit: limit,
  });

  const users = data?.data;
  console.log(data);
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

  const handleBlock = async (userId: string, isBlocked: boolean) => {
    console.log(isBlocked);
    const loadId = toast.loading("Blocking user...");
    try {
      const result = await blockUser({ id: userId, isBlocked }).unwrap();
      if (result?.success) {
        toast.success(result?.message || "User blocked successfully", {
          id: loadId,
        });
      } else {
        throw Error(result?.message || "Failed to block user");
      }
    } catch (error) {
      toast.error("Failed to block user", { id: loadId });
      console.log(error);
    }
    console.log("Block user:", userId);
  };
  const handleDelete = async (userId: string, isDeleted: boolean) => {
    const loadId = toast.loading("Blocking user...");
    try {
      const result = await deleteUser({ id: userId, isDeleted }).unwrap();
      if (result?.success) {
        toast.success(result?.message || "User deleted successfully", {
          id: loadId,
        });
      } else {
        throw Error(result?.message || "Failed to delete user");
      }
    } catch (error) {
      toast.error("Failed to block user", { id: loadId });
      console.log(error);
    }
    console.log("Block user:", userId);
  };
  return (
    <div className="space-y-11">
      <div>
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-[#27272A] font-inter leading-[120%]">
            All Users
          </h1>

          <div className="flex justify-end space-x-3 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users"
                className="border border-[#D2D4D9] px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition duration-300 w-full sm:w-80"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* User Table */}
        <div>
          <div className="space-y-6">
            <div className="bg-[#FFFFFF] rounded-2xl shadow-sm p-4 overflow-x-auto space-y-6">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-[#EDEEEF] border-[#E5E5E5] text-[#666666] text-sm rounded-2xl h-12">
                    <TableHead className="px-4 h-12">Name</TableHead>
                    <TableHead className="px-4 h-12">Email</TableHead>
                    <TableHead className="px-4 h-12">Phone</TableHead>
                    <TableHead className="px-4 h-12">Role</TableHead>
                    <TableHead className="px-4 h-12">Status</TableHead>
                    <TableHead className="px-4 h-12">Created At</TableHead>
                    <TableHead className="px-4 h-12 text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="text-[#1A1A1A]">
                  {users &&
                    users?.length > 0 &&
                    users?.map((user: any) => (
                      <TableRow key={user?._id}>
                        <TableCell className="font-medium px-4 py-3">
                          {user?.name} {user?.lastName || ""}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {user?.email}
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {user?.phone}
                        </TableCell>
                        <TableCell className={`px-4 py-3 capitalize `}>
                          <span
                            className={` ${getRoleColor(
                              user?.role
                            )} rounded-full`}
                          >
                            {user?.role}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <span
                            className={getStatusColor(
                              user?.isBlocked
                                ? "blocked"
                                : user?.isDeleted
                                ? "deleted"
                                : "active"
                            )}
                          >
                            {user?.isBlocked
                              ? "Blocked"
                              : user?.isDeleted
                              ? "Deleted"
                              : "Active"}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          {formatDateToDDMMYY(user?.createdAt as Date)}
                        </TableCell>

                        <TableCell className="text-center px-4 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              className="text-center"
                              asChild
                            >
                              <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100">
                                <MoreVerticalIcon className="w-5 h-5 text-gray-600" />
                              </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              align="end"
                              className="w-40 bg-white border-[#B2DDFF] shadow-md"
                            >
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={() =>
                                  handleBlock(
                                    user._id,
                                    user.isBlocked ? false : true
                                  )
                                }
                                className="text-yellow-600 hover:bg-slate-100"
                              >
                                {user.isBlocked ? "Unblock" : "Block"}
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() =>
                                  handleDelete(
                                    user._id,
                                    user.isDeleted ? false : true
                                  )
                                }
                                className="text-red-600 hover:bg-slate-100"
                              >
                                {user.isDeleted ? "Cancel Delete" : "Delete"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {!isLoading && users && users?.length === 0 && (
                <div className="flex w-full mx-auto flex-col items-center justify-center py-20">
                  <div className="text-7xl mb-4 text-gray-300">👤</div>
                  <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                    No User Found
                  </h2>
                  <p className="text-gray-500 text-center max-w-sm">
                    There are no users available at the moment. Please check
                    back later or refresh the page.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {users?.length > 0 && (
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

export default AllUserTable;
