"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
export default function SubmitButton({ name, onClick }) {
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        onClick={onClick}
        type="submit"
        disabled={pending}
        className={pending ? "opacity-50 cursor-not-allowed w-full" : "w-full"}
      >
        {pending ? "..." : name}
      </Button>
    </>
  );
}
