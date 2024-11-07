"use client";
import { usePaginationStore } from "@/app/store/paginationStore";
export default function DashboardPagination() {
  const { page, total, nextPage, prevPage, loading } = usePaginationStore();
  return (
    <div className=" w-full mt-3 flex justify-center items-center gap-2">
      <button
        onClick={() => prevPage()}
        disabled={page === 1 || loading}
        className={`px-4 py-2 rounded ${
          page === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Previous
      </button>
      <span>
        Page {page} of {total}
      </span>
      <button
        onClick={() => nextPage()}
        disabled={page === total || loading}
        className={`px-4 py-2 rounded ${
          page === total
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Next
      </button>
    </div>
  );
}
