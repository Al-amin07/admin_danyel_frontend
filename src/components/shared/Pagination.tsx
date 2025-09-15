import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginationProps {
  meta: {
    page: number;
    totalPage: number;
    total: number;
  };
  start: number;
  end: number;
  onPageChange: (page: number) => void;
  pages: (number | string)[];
}

const Pagination: React.FC<PaginationProps> = ({
  meta,
  start,
  end,
  onPageChange,
  pages,
}) => {
  if (!meta || meta.total === 0) return null;

  return (
    <div className="flex items-center justify-between pt-4 px-4 text-sm text-[#666] mt-4">
      <p className="text-base text-gray-600">
        Showing {start} to {end} of {meta.total} entries
      </p>

      <div className="flex gap-1.5 items-center">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, meta.page - 1))}
          disabled={meta.page === 1}
          className={`text-xl p-2.5 border rounded border-[#DFE0E0] text-[#2563EB] ${
            meta.page === 1
              ? "cursor-not-allowed text-gray-300"
              : "hover:bg-blue-500 hover:text-white transition-colors duration-300"
          }`}
        >
          <FaAngleLeft />
        </button>

        {/* Page Buttons */}
        {pages.map((p, idx) =>
          p === "…" ? (
            <span key={idx} className="px-2">
              …
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(Number(p))}
              className={`px-4 py-1.5 text-lg border rounded cursor-pointer transition-colors duration-300 ${
                p === meta.page
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-300"
              }`}
            >
              {p}
            </button>
          )
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(meta.totalPage, meta.page + 1))}
          disabled={meta.page === meta.totalPage}
          className={`text-xl p-2.5 border rounded border-[#DFE0E0] text-[#2563EB] cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-300`}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
