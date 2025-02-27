import { useState } from "react";
import Image from "next/image";
// import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useSelf } from "@liveblocks/react/suspense";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  const user = useSelf(); // which use is try to make that change

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState(""); // user which we are trying to add.
  const [userType, setUserType] = useState<UserType>("viewer"); // your type or editor type.

  const shareDocumentHandler = async () => {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="gradient-blue flex h-9 gap-1 px-4"
        disabled={currentUserType !== 'editor'}
        >
          <Image
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p>Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Mange who can view this project</DialogTitle>
          <DialogDescription>
            Select which users can view and edit this document
          </DialogDescription>
        </DialogHeader>
        <Label htmlFor="email" className="mt-6 text-blue-100">
          Email address
        </Label>
        <div className="flex items-centerssss">
          <div className="flex flex-1 rounded-md bg-dark-400">
              <Input 
                id="email"
                placeholder="Enter email address"
                onChange={(e)=>setEmail(e.target.value)}
                className="share-input"
              />
              
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
