export default function CardSkeletonLoading({
  length = 4,
}: {
  length?: number;
}) {
  return (
    <div>
      {" "}
      <div
        className="grid gap-5 w-full"
        style={{ gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }}
      >
        {Array(length)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="w-full h-[187px] p-5 sm:p-6 bg-white rounded-[16px] border border-[#E0E0E0] flex flex-col justify-between animate-pulse"
            >
              {/* Icon and Title */}
              <div className="flex items-center justify-start gap-5">
                <div className="w-[48px] h-[48px] rounded-[12px] bg-gray-200" />
                <div className="w-24 h-5 bg-gray-200 rounded-md" />
              </div>

              {/* Amount */}
              <div className="flex-1 flex flex-col items-start justify-center">
                <div className="w-32 h-8 bg-gray-200 rounded-md my-2" />
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-start gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full" />
                <div className="w-12 h-4 bg-gray-200 rounded-md" />
                <div className="w-20 h-4 bg-gray-200 rounded-md" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
