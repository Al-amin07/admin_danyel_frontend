import ActiveLoadsTable from "@/pages/shared/ActiveLoadsTable";
import Title from "@/pages/shared/Title";

function LoadBoard() {
  return (
    <div className="space-y-6 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <Title
            title="Load Board"
            subTitle=" Manage and assign loads to drivers"
          />
        </div>
      </div>

      {/* Table Component */}
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          <ActiveLoadsTable />
        </div>
      </div>
    </div>
  );
}

export default LoadBoard;
