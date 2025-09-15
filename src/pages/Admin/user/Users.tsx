import Title from "@/pages/shared/Title";
import AllUserTable from "./AllUserTable";

export default function Users() {
  return (
    <div className="space-y-6 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <Title title="User Management" subTitle=" Manage users" />
        </div>
      </div>

      {/* Table Component */}
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          <AllUserTable />
        </div>
      </div>
    </div>
  );
}
