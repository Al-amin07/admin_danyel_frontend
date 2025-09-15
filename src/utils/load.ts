export const getPaymentStatusStyle = (status: string) => {
  switch (status) {
    case "PAID":
      return "bg-[#DDEDE8] text-[#10B981]";
    case "PENDING":
      return "bg-[#FFF6E8] text-[#F59E0B]";
    case "PROCESSING":
      return "bg-[#E0E7FF] text-[#6366F1]";
    default:
      return "bg-[#F5F5F5] text-[#B0B0B0]";
  }
};

export const getStatusStyle = (status: string) => {
  switch (status) {
    case "Pending Assignment":
      return "bg-yellow-100 text-yellow-800"; // light yellow bg, golden text
    case "Awaiting Pickup":
      return "bg-yellow-50 text-yellow-600"; // lighter yellow for waiting
    case "Assigned":
      return "bg-indigo-100 text-indigo-600"; // light indigo for assigned
    case "En Route to Pickup":
      return "bg-purple-100 text-purple-700"; // light purple bg, purple text
    case "At Pickup":
      return "bg-blue-50 text-blue-600"; // light blue bg, blue text
    case "In Transit":
      return "bg-green-100 text-green-700"; // light green bg, green text
    case "Delivered":
      return "bg-gray-50 text-gray-600"; // light gray bg, gray text
    case "Cancelled":
      return "bg-red-50 text-red-600"; // light red bg, red text
    default:
      return "bg-gray-50 text-gray-500"; // fallback gray
  }
};

export const loadTypes: string[] = [
  "Full Truckload",
  "Less Than Truckload",
  "Refrigerated",
  "Hazardous Materials",
  "Oversized",
  "Fragile",
  "Express",
  "Palletized",
  "Bulk",
  "Liquid",
];
