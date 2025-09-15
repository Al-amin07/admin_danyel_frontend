// import { Title } from "@radix-ui/react-dialog";
import Title from "@/pages/shared/Title";
import { DriversTable } from "./DriverTable";

export default function Drivers() {
  return (
    <div className="space-y-13">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-auto">
          <Title title="Driver Management" subTitle="Manage  drivers" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4  gap-5">
        <div className="xl:col-span-4 w-full">
          <DriversTable />
        </div>
      </div>
    </div>
  );
}
