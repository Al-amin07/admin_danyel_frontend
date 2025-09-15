import React from "react";
import { useForm } from "react-hook-form";
import { ILoad } from "@/types/load.type";

interface UpdateLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSubmit: (data: ILoad) => void;
  load: ILoad; // required, for update
}

export default function UpdateLoadModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  load,
}: UpdateLoadModalProps) {
  const { register, handleSubmit, reset, watch, setValue } = useForm<ILoad>({
    defaultValues: {
      weight: load?.weight || 0,
      loadType: load?.loadType || "",
      quantity: load?.quantity || 0,
      specialInstructions: load?.specialInstructions || "",
      // pickupAddress: load?.pickupAddress || {
      //   street: "",
      //   city: "",
      //   state: "",
      //   country: "",
      //   apartment: "",
      // },
      // deliveryAddress: load?.deliveryAddress || {
      //   street: "",
      //   city: "",
      //   state: "",
      //   country: "",
      //   apartment: "",
      // },
      pickupDate: (load?.pickupDate as Date) || "",
      pickupTime: load?.pickupTime || "",
      deliveryDate: (load?.deliveryDate as Date) || "",
      deliveryTime: load?.deliveryTime || "",
      totalDistance: load?.totalDistance || 0,
      ratePerMile: load?.ratePerMile || 0,
      totalPayment: load?.totalPayment || 0,
    },
  });
  // Reset when load changes (important for editing different loads)
  const totalDistance = watch("totalDistance");
  const ratePerMile = watch("ratePerMile");

  React.useEffect(() => {
    const total = Number(
      (Number(totalDistance) || 0) * (Number(ratePerMile) || 0)
    ).toFixed(2);
    setValue("totalPayment", Number(total));
  }, [totalDistance, ratePerMile, setValue]);

  // Reset when load changes
  React.useEffect(() => {
    if (load) reset(load);
  }, [load, reset]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Load</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Load Info */}
          <div>
            <label className="block text-sm font-medium">Load Type</label>
            <input
              {...register("loadType")}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                {...register("quantity")}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Weight (LB)</label>
              <input
                type="number"
                {...register("weight")}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Special Instructions
            </label>
            <textarea
              {...register("specialInstructions")}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Pickup & Delivery */}
          {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Pickup Address
              </label>
              <input
                {...register("pickupAddress.street")}
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="Street"
              />
              <input
                {...register("pickupAddress.city")}
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="City"
              />
              <input
                {...register("pickupAddress.state")}
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="State"
              />
              <input
                {...register("pickupAddress.country")}
                className="w-full border rounded px-3 py-2"
                placeholder="Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Delivery Address
              </label>
              <input
                {...register("deliveryAddress.street")}
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="Street"
              />
              <input
                {...register("deliveryAddress.city")}
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="City"
              />
              <input
                {...register("deliveryAddress.state")}
                className="w-full border rounded px-3 py-2 mb-2"
                placeholder="State"
              />
              <input
                {...register("deliveryAddress.country")}
                className="w-full border rounded px-3 py-2"
                placeholder="Country"
              />
            </div>
          </div> */}

          {/* Time & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Pickup Date & Time
              </label>
              <input
                type="date"
                id="pickupDate"
                {...register("pickupDate")}
                className="w-full border rounded px-3 py-2 mb-2"
              />
              <input
                type="time"
                {...register("pickupTime")}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Delivery Date & Time
              </label>
              <input
                type="date"
                {...register("deliveryDate")}
                className="w-full border rounded px-3 py-2 mb-2"
              />
              <input
                type="time"
                {...register("deliveryTime")}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Payment Info */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Distance</label>
              <input
                type="number"
                {...register("totalDistance")}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Rate Per Mile</label>
              <input
                step="0.001"
                type="number"
                {...register("ratePerMile")}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Total Payment</label>
              <input
                step="0.001"
                readOnly
                type="number"
                {...register("totalPayment")}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="px-4 py-2 disabled:opacity-70 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isLoading ? "Updating..." : "Update Load"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
