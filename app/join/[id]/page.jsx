import connectDB from "@/db";
import UserModel from "@/db/User.Model";
import { redirect } from "next/navigation";

export default async function page({ params }) {
  if (params.id== "create-user"){
    return}
  await connectDB();
  
  let user = await UserModel.findOne({
    uniqueId: params.id,
  });

  redirect(`/${user._id}`);
}
