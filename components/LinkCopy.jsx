"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { LuClipboardCheck } from "react-icons/lu";
import { getUserLinks } from "@/actions";

export default function LinkCopy() {
  const [linkAddress, setLinkAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  function copyToClipboard(text) {
    var input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }
  async function getLink() {
    let id = await getUserLinks();
    if (id) {
      id = JSON.parse(id);
    }
    setLinkAddress(`${window.location.origin}/${id}`);
    setLoading(false);
  }
  const { toast } = useToast();
  useEffect(() => {
    getLink();
  });
  return (
    <div className="flex items-center justify-center py-4">
      <span
        className="text-xs md:text-sm cursor-pointer flex items-center gap-5 font-medium border p-4"
        onClick={() => {
          toast({
            description: "Link copied to clipboard",
          });
          copyToClipboard(linkAddress);
        }}
      >
        {loading ? "loading..." : linkAddress}
        <span>
          <LuClipboardCheck />
        </span>
      </span>
    </div>
  );
}
