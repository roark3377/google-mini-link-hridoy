"use client";
import { logIn, signUp } from "@/actions";
import SubmitButton from "@/components/SubmitButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

export default function TabsDemo({ createUser }) {
  const { toast } = useToast();
  async function submitForm(event) {
    if (createUser) {
      let response = await signUp(event);
      if (response) {
        response = JSON.parse(response);
        toast({
          description: response.error,
        });
      }
    } else {
      let response = await logIn(event);
      if (response) {
        response = JSON.parse(response);
        toast({
          description: response.error,
        });
        if (response.success) {
          redirect("/dashboard");
        }
      }
    }
  }
  return (
    <div className="flex items-center flex-col justify-center w-screen h-[90vh]">
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsContent value="sign-in">
          <form action={submitForm}>
            <Card>
              <CardHeader className="text-center">
                <CardTitle>{createUser ? "Create User" : "Sign-in"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">User Name</Label>
                  <Input
                    required
                    name="username"
                    id="name"
                    placeholder="User name "
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="Password">Password</Label>
                  <Input
                    required
                    name="password"
                    type="password"
                    id="Password"
                    placeholder="Password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton name={createUser ? "Create User" : "Submit"} />
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
