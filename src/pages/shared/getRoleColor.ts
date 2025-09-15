// utils/getRoleColor.ts
export function getRoleColor(role: string): string {
  switch (role) {
    case "admin":
      return "text-red-600 bg-red-100 px-2 py-1 rounded-full text-sm font-medium";
    case "company":
      return "text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-sm font-medium";
    case "driver":
      return "text-purple-600 bg-purple-100 px-2 py-1 rounded-full text-sm font-medium";
    case "super-admin":
      return "text-purple-600 bg-purple-100 px-2 py-1 rounded-full text-sm font-medium";
    default:
      return "text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-sm font-medium";
  }
}

// utils/getStatusColor.ts
export function getStatusColor(status: string): string {
  switch (status) {
    case "active":
      return "text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm font-medium";
    case "blocked":
      return "text-red-600 bg-red-100 px-2 py-1 rounded-full text-sm font-medium";
    case "deleted":
      return "text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-sm font-medium";
    default:
      return "text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-sm font-medium";
  }
}
