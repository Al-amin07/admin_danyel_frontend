import { JSX } from "react";

const StatCard = ({
  title,
  value,
  icon,
  bgGradient,
}: {
  title: string;
  value: number | string;
  icon: JSX.Element;
  bgGradient?: string;
}) => (
  <div
    className={`flex items-center p-6 rounded-2xl shadow-md transition hover:shadow-xl ${
      bgGradient || "bg-white"
    }`}
  >
    <div className="p-4 rounded-full bg-white/30 mr-4">{icon}</div>
    <div>
      <p className="text-gray-200 text-sm font-medium">{title}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-white">{value}</h2>
    </div>
  </div>
);

export default StatCard;
