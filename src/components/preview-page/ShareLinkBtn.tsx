"use client";
import { useToast } from "@/hooks/use-toast";
import Button from "../reusable/Button";

const ShareLinkBtn = () => {
  const { toast } = useToast();
  //
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.toString());
    toast({
      description: "URL Copied to Clipboard",
    });
  };
  //
  return (
    <Button
      onClick={copyLink}
      className="block"
      buttonType="primary"
    >
      Share Link
    </Button>
  );
};

export default ShareLinkBtn;
