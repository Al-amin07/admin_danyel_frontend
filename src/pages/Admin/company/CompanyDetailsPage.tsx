import { useParams, Link } from "react-router-dom";
// import { useGetCompanyByIdQuery } from "@/store/api/company/companyApi";
import { LoaderIcon, ArrowLeft } from "lucide-react";
import { formatDateToDDMMYY } from "@/utils/formatDate";
import { useGetSingleCompanyQuery } from "@/store/api/company/companyApi";

function CompanyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleCompanyQuery({ id });

  const company = data?.data;

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoaderIcon className="h-12 w-12 animate-spin" />
      </div>
    );

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-7xl mb-4 text-gray-300">🏢</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Company Not Found
        </h2>
        <p className="text-gray-500">The requested company does not exist.</p>
        <Link
          to="/admin-dashboard/companies"
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Back to Companies
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-900">
          {company.companyName}
        </h1>
        <Link
          to="/admin-dashboard/companies"
          className="flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>
      </div>

      {/* Company Info */}
      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Company Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Address</p>
              <p className="font-medium">{company.companyAddress || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Employees</p>
              <p className="font-medium">
                {company.numberOfEmployees || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Operation Hours</p>
              <p className="font-medium">
                {company.startOperationHour} -{" "}
                {company.endOperationHour || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Payment Terms</p>
              <p className="font-medium">{company.paymentTerms}</p>
            </div>
            <div>
              <p className="text-gray-500">Language</p>
              <p className="font-medium">{company.languagePreference}</p>
            </div>
            <div>
              <p className="text-gray-500">Time Zone</p>
              <p className="font-medium">{company.timeZone}</p>
            </div>
            <div>
              <p className="text-gray-500">Currency</p>
              <p className="font-medium">{company.currency}</p>
            </div>
            <div>
              <p className="text-gray-500">Date Format</p>
              <p className="font-medium">{company.dateFormat}</p>
            </div>
            <div>
              <p className="text-gray-500">Created At</p>
              <p className="font-medium">
                {formatDateToDDMMYY(company.createdAt as Date)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Updated At</p>
              <p className="font-medium">
                {formatDateToDDMMYY(company.updatedAt as Date)}
              </p>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Notification Preferences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(company.notificationPreferences || {}).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between border border-[#B2DDFF] rounded-lg px-4 py-2"
                >
                  <span className="capitalize text-gray-700">{key}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      value
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {value ? "Enabled" : "Disabled"}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Loads & Drivers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Drivers
            </h2>
            {company.drivers && company.drivers.length > 0 ? (
              <ul className="list-disc pl-6 space-y-1">
                {company.drivers.map((driver: any) => (
                  <li key={driver._id}>
                    {driver.driverId || driver._id} -{" "}
                    {driver.user?.name || "Unknown"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No drivers assigned</p>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Loads</h2>
            {company.loads && company.loads.length > 0 ? (
              <ul className="list-disc pl-6 space-y-1">
                {company.loads.map((load: any) => (
                  <li key={load._id}>{load.loadId || load._id}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No loads assigned</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailsPage;
