import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRoleColor, getStatusColor } from "../shared/getRoleColor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateToDDMMYY } from "@/utils/formatDate";
import { MoreVerticalIcon } from "lucide-react";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
} from "@/store/api/user/userApi";
import { toast } from "sonner";
import { Link } from "react-router-dom";
export default function AdminHomeUser({
  users,
  refetch,
}: {
  users: any[];
  refetch: () => void;
}) {
  const [blockUser] = useBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const handleBlock = async (userId: string, isBlocked: boolean) => {
    console.log(isBlocked);
    const loadId = toast.loading("Blocking user...");
    try {
      const result = await blockUser({ id: userId, isBlocked }).unwrap();
      if (result?.success) {
        refetch();
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
        refetch();
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#27272A] font-inter leading-[120%]">
          Users
        </h1>
        <Link
          to={"/admin-dashboard/users"}
          className="bg-blue-500 text-white py-2 px-4 rounded-sm"
        >
          View All Users
        </Link>
      </div>
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
                <TableHead className="px-4 h-12 text-center">Actions</TableHead>
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
                    <TableCell className="px-4 py-3">{user?.email}</TableCell>
                    <TableCell className="px-4 py-3">{user?.phone}</TableCell>
                    <TableCell className={`px-4 py-3 capitalize `}>
                      <span
                        className={` ${getRoleColor(user?.role)} rounded-full`}
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
                        <DropdownMenuTrigger className="text-center" asChild>
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
        </div>
      </div>
    </div>
  );
}
