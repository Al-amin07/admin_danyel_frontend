import { ILoad } from "@/types/load.type";
import { formatDateToDDMMYY } from "@/utils/formatDate";
import React from "react";
// import UpdateLoadModal from "./UpdateLoadModal";
// import { useUpdateLoadMutation } from "@/redux/api/load/loadApi";
import { toast } from "sonner";
import { useUpdateLoadMutation } from "@/store/api/load/loadApi";
import UpdateLoadModal from "./UpdateLoadModal";

const LoadInformation = ({
  load,
  refetch,
}: {
  load: ILoad;
  refetch: () => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [updateLoad, { isLoading }] = useUpdateLoadMutation();
  const onSubmit = async (data: ILoad) => {
    const loadData: Partial<ILoad> = {
      weight: data.weight,
      quantity: data.quantity,
      loadType: data.loadType,
      specialInstructions: data.specialInstructions,
      // pickupAddress: data.pickupAddress,
      // deliveryAddress: data.deliveryAddress,
      pickupDate: data.pickupDate,
      pickupTime: data.pickupTime,
      deliveryDate: data.deliveryDate,
      deliveryTime: data.deliveryTime,
      totalDistance: data.totalDistance,
      ratePerMile: data.ratePerMile,
      totalPayment: data.totalPayment,
    };
    // if (
    //   data.pickupAddress &&
    //   JSON.stringify(data.pickupAddress) !== JSON.stringify(load.pickupAddress)
    // ) {
    //   loadData.pickupAddress = data.pickupAddress;
    // }

    // // Only include deliveryAddress if it changed
    // if (
    //   data.deliveryAddress &&
    //   JSON.stringify(data.deliveryAddress) !==
    //     JSON.stringify(load.deliveryAddress)
    // ) {
    //   loadData.deliveryAddress = data.deliveryAddress;
    // }
    const formData = new FormData();
    formData.append("data", JSON.stringify(loadData));
    try {
      const result = await updateLoad({
        data: formData,
        id: load?._id,
      }).unwrap();
      console.log({ result });
      if (result?.success) {
        toast.success("Load info updated successfully");
        refetch();
      } else {
        throw Error(result?.message || "Failed to update info");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to update info");
      console.log({ error });
    } finally {
      setOpen(false);
    }

    console.log({ loadData });
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg  mx-auto space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold ">Load Information</h2>
        <p
          onClick={() => setOpen(true)}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          Edit
        </p>
      </div>

      <hr className="text-[#C7CACF]" />

      <div className="space-y-8">
        {/* Item Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Item Details</h3>
          <div className="flex justify-between items-center">
            <div className="space-y-1 flex-1">
              <p className="text-sm text-secondary font-inter font-normal leading-[160%]">
                Load Type:
              </p>

              <p className="text-xl">{load?.loadType}</p>
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-secondary font-inter font-normal leading-[160%]">
                Quantity:
              </p>
              <p className="text-xl">{load?.quantity}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="space-y-1 flex-1">
              <p className="text-sm text-secondary font-inter font-normal leading-[160%]">
                Weight (LB)
              </p>

              <p className="text-xl">{load?.weight} LB</p>
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-secondary font-inter font-normal leading-[160%]">
                Special Handling Instruction
              </p>
              <p className="text-xl">{load?.specialInstructions || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Address Details</h3>
          <div className="flex justify-between ">
            <div className="space-y-1 flex-1">
              <p className="text-sm text-secondary font-inter font-normal leading-[160%]">
                Pickup Address
              </p>

              <p className="text-xl">
                {load?.pickupAddress?.street +
                  ", " +
                  load?.pickupAddress?.apartment +
                  ", " +
                  load?.pickupAddress?.state +
                  ", " +
                  load?.pickupAddress?.city +
                  ", " +
                  load?.pickupAddress?.country}{" "}
              </p>
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-secondary font-inter font-normal leading-[160%]">
                Delivery Address
              </p>
              <p className="text-xl">
                {" "}
                {load?.deliveryAddress?.street +
                  ", " +
                  load?.deliveryAddress?.apartment +
                  ", " +
                  load?.deliveryAddress?.state +
                  ", " +
                  load?.deliveryAddress?.city +
                  ", " +
                  load?.deliveryAddress?.country}
              </p>
            </div>
          </div>
        </div>
        {/* Time & Date */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Time & Date</h3>
          <div className="flex justify-between items-center">
            <div className="space-y-1 flex-1">
              <p className="text-sm text-secondary font-inter font-normal leading-[160%]">
                Pickup Time & Date
              </p>

              <p className="text-xl">
                {formatDateToDDMMYY(load?.pickupDate as Date)} -{" "}
                {load?.pickupTime}
              </p>
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-secondary font-inter font-normal leading-[160%]">
                Delivery Time & Date
              </p>
              <p className="text-xl">
                {formatDateToDDMMYY(load?.deliveryDate as Date)} -{" "}
                {load?.deliveryTime}
              </p>
            </div>
          </div>
        </div>

        {/* Rate & Distance */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Rate and Distance</h3>
          <div className="flex justify-between items-center">
            <div className="space-y-1 flex-1">
              <p className="text-sm text-secondary font-inter font-normal leading-[160%]">
                Total Distance
              </p>

              <p className="text-xl">{load?.totalDistance}</p>
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-secondary font-inter font-normal leading-[160%]">
                Rate Per Mile (RPM)
              </p>
              <p className="text-xl">{load?.ratePerMile}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-secondary font-inter font-normal leading-[160%]">
                Total Payment
              </p>

              <p className="text-xl">${load?.totalPayment}</p>
            </div>
          </div>
        </div>
      </div>
      <UpdateLoadModal
        isLoading={isLoading}
        isOpen={open}
        load={load}
        onSubmit={onSubmit}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default LoadInformation;
