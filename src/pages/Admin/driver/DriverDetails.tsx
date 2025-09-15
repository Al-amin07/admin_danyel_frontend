// import user from "@/assets/photo/user1.svg";
import { IDriver } from "@/types/driver.type";
import { FaPhoneAlt, FaTruckMoving } from "react-icons/fa";
import { PiClipboardTextBold } from "react-icons/pi";

const DriversDetails = ({ driver }: { driver: IDriver }) => {
  return (
    <div className="w-full mx-auto ">
      {/* Breadcrumb */}
      <div className="text-gray-500 mb-4">
        <span className="text-blue-500 cursor-pointer">Drivers</span> /{" "}
        <span className="font-semibold text-gray-800">John Doe</span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Driver Profile Picture */}
        <img
          className="w-20 h-20 rounded-full object-cover"
          src={driver?.user?.profileImage}
          alt={driver?.user?.name}
        />
        {/* Driver Info */}
        <div>
          <h2 className="text-xl font-semibold">{driver?.user?.name}</h2>
          <p className="text-gray-500">ID: {driver?.driverId}</p>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★★★★☆</span>
            <span className="text-gray-500">({driver?.averageRating})</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-start gap-6">
          <div className="text-2xl font-semibold pb-2 flex justify-center items-center space-x-4">
            <span>
              <FaPhoneAlt className="text-[#2563EB]" />
            </span>

            <h2>Contact Information</h2>
          </div>

          <div className="flex justify-between items-center space-x-20">
            <div>
              <p className="text-gray-600">Phone Number </p>
              <p className="text-gray-600">{driver?.user?.phone} </p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="text-gray-600">{driver?.user?.email}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-600">Address:</p>
            <p className="text-gray-600">
              {driver?.location?.street} {driver?.location?.city}{" "}
            </p>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-start gap-6">
          <div className="text-2xl font-semibold pb-2 flex justify-center items-center space-x-4">
            <span>
              <FaTruckMoving className="text-[#2563EB]" />
            </span>
            <h2>Vehicle Information</h2>
          </div>

          <div className="flex justify-between items-center space-x-20">
            <div>
              <p className="text-gray-600 text-base">Vehicle Type </p>
              <p className="text-gray-600 text-xl">{driver?.vehicleType} </p>
            </div>
            <div>
              <p className="text-gray-600 text-base">Vehicle Model</p>
              <p className="text-gray-600 text-xl">{driver?.vehicleModel}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-600 text-base">License Plate Number</p>
            <p className="text-gray-600 text-xl">{driver?.licenseNumber}</p>
          </div>
        </div>

        {/* Current Assignment */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-start gap-6">
          <div className="text-2xl font-semibold pb-2 flex justify-center items-center space-x-4">
            <span>
              <PiClipboardTextBold className="text-[#2563EB]" />
            </span>
            <h2>Current Assignment</h2>
          </div>

          <div className="flex justify-between items-center space-x-20">
            <div>
              <p className="text-gray-600 text-base">Current Load </p>
              <p className="text-gray-600 text-xl">Load #4329 </p>
            </div>
            <div>
              <p className="text-gray-600 text-base">ETA</p>
              <p className="text-gray-600 text-xl">Today, 4:30 PM</p>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-10 ">
            <div>
              <p className="text-gray-600 text-base">Rout </p>
              <p className="text-gray-600 text-xl">
                Los Angeles, <br /> CA to San Diego, CA{" "}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-base">Price</p>
              <p className="text-gray-600 text-xl">12000 USD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriversDetails;
