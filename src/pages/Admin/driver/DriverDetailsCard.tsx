import { IDriver } from "@/types/driver.type";

const DriversDetailsCard = ({ driver }: { driver: IDriver }) => {
  const totalDelevaries = driver?.loads?.filter(
    (el) => el.loadStatus === "Delivered"
  );
  const statusData = [
    {
      title: "On Time Delivery",
      amount: "96%",
    },
    {
      title: "Total Deliveries",
      amount: totalDelevaries?.length,
    },
    {
      title: "Average Rating",
      amount: `${driver?.averageRating}/5`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Performance Overview</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-5 place-items-start w-full">
        {statusData.map((single) => (
          <div
            key={single.title}
            className="w-full h-[187px] p-5 sm:p-6 bg-white rounded-[16px] border border-[#E0E0E0] flex flex-col justify-between mx-auto"
          >
            <div className="flex items-center justify-start gap-5"></div>

            <div className="flex-1 flex flex-col items-center justify-center mt-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-Robot tracking-[-0.68px] text-[#2563EB]">
                {single.amount}
              </h2>
              <h1 className="text-[#484848] text-[18px] leading-[160%] font-[400] font-poppins mt-2">
                {single.title}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriversDetailsCard;
