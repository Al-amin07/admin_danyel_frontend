import { useState } from "react";
import user1 from "@/assets/photo/user1.svg";
import { ILoad } from "@/types/load.type";
import { FaStar } from "react-icons/fa";
// import {
//   useChangeDriverMutation,
//   useUpdateLoadMutation,
// } from "@/redux/api/load/loadApi";
import { toast } from "sonner";
import { IDriver } from "@/types/driver.type";
import {
  useChangeDriverMutation,
  useUpdateLoadMutation,
} from "@/store/api/load/loadApi";

const CustomerAndDriverInfo = ({
  load,
  refetch,
  drivers,
}: {
  load: ILoad;
  refetch: () => void;
  drivers: IDriver[];
}) => {
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [openDriverModal, setOpenDriverModal] = useState(false);
  const [updateLoad, { isLoading }] = useUpdateLoadMutation();
  const [changeDriver, { isLoading: changeDriverLoading }] =
    useChangeDriverMutation();
  // --- Customer Form State ---
  const [customerForm, setCustomerForm] = useState({
    name: load?.customer?.name || "",
    paymentStatus: load?.paymentStatus || "",
    paymentDate: load?.paymentDate
      ? new Date(load.paymentDate).toISOString().split("T")[0]
      : "",
  });

  const handleCustomerChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCustomerForm({ ...customerForm, [e.target.name]: e.target.value });
  };

  const handleSaveCustomer = async () => {
    console.log("Updated Customer & Payment:", customerForm);
    const formdata = new FormData();
    const updatedData: {
      paymentStatus: "PENDING" | "PAID" | "REJECTED";
      customer: {
        name: string;
      };
      paymentDate?: string;
    } = {
      paymentStatus: customerForm.paymentStatus,
      customer: {
        name: customerForm.name,
      },
    };
    if (customerForm.paymentDate) {
      const dateObj = new Date(customerForm.paymentDate);

      updatedData.paymentDate = dateObj.toISOString();
    }
    formdata.append("data", JSON.stringify(updatedData));
    try {
      const result = await updateLoad({
        data: formdata,
        id: load?._id,
      }).unwrap();
      console.log({ result });
      if (result?.success) {
        toast.success("Customer info updated successfully");
        refetch();
      } else {
        throw Error(result?.message || "Failed to update info");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to update info");
      console.log(error);
    } finally {
      setOpenCustomerModal(false);
    }
    // TODO: Replace with API call
  };

  // --- Driver Change State ---
  const [selectedDriver, setSelectedDriver] = useState(
    load?.assignedDriver?._id
  );

  const handleSaveDriver = async () => {
    const updatedData = {
      assignedDriver: selectedDriver,
    };
    console.log(updatedData);
    try {
      const result = await changeDriver({
        data: updatedData,
        id: load?._id,
      }).unwrap();
      console.log({ result });
      if (result?.success) {
        toast.success("Customer info updated successfully");
        refetch();
      } else {
        throw Error(result?.message || "Failed to update info");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to update info");
      console.log({ error });
    } finally {
      setOpenDriverModal(false);
    }
    // TODO: Replace with API call
  };

  return (
    <div className="space-y-8 mb-6">
      {/* Part-1 Customer & Payment */}
      <div className="mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Customer & Payment</h2>
            <button
              className="text-base hover:underline text-blue-500 cursor-pointer"
              onClick={() => setOpenCustomerModal(true)}
            >
              Edit
            </button>
          </div>
          <hr className="text-[#C7CACF]" />
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <img src={user1} alt="" />
            </div>
            <p className="ml-4 text-xl">{load?.customer?.name}</p>
          </div>
          <hr className="text-[#C7CACF]" />
          <div className="mt-2 space-y-3">
            <div className="flex items-center justify-between">
              <p>
                <strong>Payment Status:</strong>
              </p>
              <p className="text-[#139E4D]">{load?.paymentStatus}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>
                <strong>Payment Date:</strong>
              </p>
              <p className="text-black">
                {load?.paymentDate
                  ? new Date(load.paymentDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Part-2 Assigned Driver */}
      <div className="mx-auto bg-white  p-6 rounded-lg shadow-lg max-w-4xl w-full">
        {load?.assignedDriver ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Assigned Driver</h2>
              <button
                className="text-base hover:underline text-blue-500 cursor-pointer"
                onClick={() => setOpenDriverModal(true)}
              >
                {load?.assignedDriver ? "Change" : "Assign Driver"}
              </button>
            </div>
            <hr className="text-[#C7CACF]" />

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-18 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <img
                  src={load?.assignedDriver?.user?.profileImage}
                  alt={load?.assignedDriver?.user?.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:space-x-4 w-full">
                <div className="flex flex-col sm:w-3/4">
                  <p className="text-xl font-medium">
                    {load?.assignedDriver?.user?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    ID: {load?.assignedDriver?.driverId}
                  </p>
                </div>
                <div className="flex items-center ml-auto sm:ml-0">
                  <span className="mr-2 text-xl font-semibold">4.5</span>
                  <FaStar className="text-yellow-500" />
                </div>
              </div>
            </div>

            <hr className="text-[#C7CACF]" />

            <div className="mt-4  space-y-6">
              <p>
                <strong>Status:</strong> {load?.assignedDriver?.availability}{" "}
              </p>
              <p>
                <strong>Vehicle:</strong> {load?.assignedDriver?.vehicleModel}
              </p>
              <p>
                <strong>License Plate:</strong>{" "}
                {load?.assignedDriver?.licenseNumber}
              </p>
              <p>
                <strong>Phone No:</strong> {load?.assignedDriver?.user?.phone}
              </p>
            </div>

            {/* <Link
              to={`/company-dashboard/message?receiverId=${load?.assignedDriver?.user?._id}`}
              className="w-full  block text-center mb-3 py-2 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-600 transition-all"
            >
              Message
            </Link> */}
          </div>
        ) : (
          <div className="p-6 border border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col items-center justify-center space-y-4 shadow-sm">
            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A9 9 0 1118.879 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            {/* Message */}
            <p className="text-gray-600 text-lg font-medium">
              No driver assigned yet
            </p>

            {/* Assign Button */}
            <button
              onClick={() => setOpenDriverModal(true)}
              className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all"
            >
              Assign Driver
            </button>
          </div>
        )}
      </div>

      {/* --- Customer Modal --- */}
      {openCustomerModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black/60 z-40">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-5">
            <h3 className="text-xl font-semibold">Edit Customer & Payment</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Customer Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={customerForm.name}
                  onChange={handleCustomerChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Payment Status
                </label>
                <select
                  name="paymentStatus"
                  value={customerForm.paymentStatus}
                  onChange={handleCustomerChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                  <option value="UNPAID">Unpaid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Payment Date
                </label>
                <input
                  type="date"
                  name="paymentDate"
                  value={customerForm.paymentDate}
                  onChange={handleCustomerChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setOpenCustomerModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={handleSaveCustomer}
                className="px-4 py-2 disabled:opacity-70 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Driver Change Modal --- */}
      {openDriverModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-40">
          <div className="bg-white z-50 rounded-2xl shadow-lg w-full max-w-md p-6 space-y-5">
            <h3 className="text-xl font-semibold">Change Driver</h3>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Select New Driver
              </label>
              <select
                value={selectedDriver!}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="w-full p-2 border rounded-lg mt-2"
              >
                <option value="">Select Driver</option>
                {drivers?.map((el) => (
                  <option value={el?._id}>{el?.user?.name}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setOpenDriverModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDriver}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {changeDriverLoading ? "Saving..." : " Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAndDriverInfo;
