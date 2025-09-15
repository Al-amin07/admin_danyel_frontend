import Title from "@/pages/shared/Title";
import ActiveCompanyTable from "./ActiveCompanyTable";

export default function Company() {
  return (
    <div className="space-y-6 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <Title title="Company " subTitle=" Manage company " />
        </div>
      </div>

      {/* Table Component */}
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          <ActiveCompanyTable />
        </div>
      </div>
    </div>
  );
}
