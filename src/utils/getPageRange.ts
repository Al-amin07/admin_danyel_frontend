export function getPageRange(
  currentPage: number,
  totalPage: number,
  maxVisiblePages = 2
) {
  const pages = [];
  const half = Math.floor(maxVisiblePages / 2);

  let start = Math.max(2, currentPage - half);
  let end = Math.min(totalPage - 1, currentPage + half);

  // Adjust if near the start
  if (currentPage - 1 <= half) {
    start = 2;
    end = Math.min(totalPage - 1, maxVisiblePages);
  }

  // Adjust if near the end
  if (totalPage - currentPage <= half) {
    start = Math.max(2, totalPage - maxVisiblePages + 1);
    end = totalPage - 1;
  }

  pages.push(1); // first page

  if (start > 2) pages.push("…"); // left ellipsis

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPage - 1) pages.push("…"); // right ellipsis

  if (totalPage > 1) pages.push(totalPage); // last page

  return pages;
}
