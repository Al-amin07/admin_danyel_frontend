import { useGetAdminStateQuery } from "@/store/api/user/userApi";
import {
  Truck,
  Users,
  Building2,
  DollarSign,
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  LoaderIcon,
} from "lucide-react";

import StatCard from "./StatCard";
import AdminHomeLoads from "./AdminHomeLoads";
import AdminHomeUser from "./AdminHomeUser";

export default function AdminHome() {
  const { data, isLoading, isError, refetch } = useGetAdminStateQuery(null);
  const states = data?.data;

  if (isLoading) {
    return (
      <div className=" flex items-center justify-center min-h-[400px] md:min-h-[600px]">
        <LoaderIcon className="h-12 w-12 animate-spin " />
      </div>
    );
  }

  if (isError || !states) {
    return (
      <div className="flex items-center justify-center min-h-[500px] text-red-500">
        Failed to load admin state
      </div>
    );
  }

  // Card component

  console.log({ states });
  return (
    <div className="p-6 space-y-10  min-h-screen">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-black">
        Admin Dashboard
      </h1>

      {/* Top Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Companies"
          value={states.totalCompany}
          icon={<Building2 className="w-6 h-6 text-white" />}
          bgGradient="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatCard
          title="Total Drivers"
          value={states.totalDriver}
          icon={<Users className="w-6 h-6 text-white" />}
          bgGradient="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatCard
          title="Total Earnings"
          value={`$${states.totalEarnings}`}
          icon={<DollarSign className="w-6 h-6 text-white" />}
          bgGradient="bg-gradient-to-r from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Total Loads"
          value={states.totalLoad}
          icon={<Truck className="w-6 h-6 text-white" />}
          bgGradient="bg-gradient-to-r from-purple-500 to-purple-600"
        />
      </div>

      {/* Loads Breakdown */}
      <h2 className="text-xl font-semibold text-black">
        Load Status Breakdown
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Loads"
          value={states.activeLoad}
          icon={<ClipboardList className="w-6 h-6 text-white" />}
          bgGradient="bg-gradient-to-r from-blue-400 to-blue-500"
        />
        <StatCard
          title="Pending Loads"
          value={states.pendingLoad}
          icon={<Clock className="w-6 h-6 text-white" />}
          bgGradient="bg-gradient-to-r from-orange-400 to-orange-500"
        />
        <StatCard
          title="Delivered Loads"
          value={states.deliveredLoad}
          icon={<CheckCircle2 className="w-6 h-6 text-white" />}
          bgGradient="bg-gradient-to-r from-green-400 to-green-500"
        />
        <StatCard
          title="Cancelled Loads"
          value={states.cancelledLoad}
          icon={<XCircle className="w-6 h-6 text-white" />}
          bgGradient="bg-gradient-to-r from-red-400 to-red-500"
        />
      </div>

      <AdminHomeLoads loads={states?.loads} />
      <AdminHomeUser refetch={refetch} users={states?.users} />
    </div>
  );
}
