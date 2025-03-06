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
import UserTypeSelector from "./UserTypeSelector";
import Collaborator from "./Collaborator";
import { updateDocumentAccess } from "@/lib/actions/room.actions";

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

  const shareDocumentHandler = async () => {
    setLoading(true)
            
            await updateDocumentAccess({
                roomId, 
                email,
                userType: userType as UserType,
                updatedBy: user.info
            })
    
            setLoading(false)
  };

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
              <UserTypeSelector
                userType={userType}
                setUserType={setUserType}
              />
          </div>
          <Button type="submit" onClick={shareDocumentHandler}
          className="gradient-blue flex h-full gap-1 ml-3 px-5"
          >
            {loading ? 'Sending...' : 'Invite'}
          </Button>
        </div>

        {/* show all of the collaborators */}
        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
              {collaborators.map((collaborator) =>(
                <Collaborator
                  key={collaborator.id}
                  roomId={roomId}
                  creatorId={creatorId}
                  email={collaborator.email}
                  collaborator={collaborator}
                />
              ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
