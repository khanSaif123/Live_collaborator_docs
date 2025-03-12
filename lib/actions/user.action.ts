'use server';
import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const clerk = clerkClient()
    const { data } = await clerk.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(), // Avoid "null null"
      email: user.emailAddresses?.[0]?.emailAddress || "", // Handle missing email
      avatar: user.imageUrl || "", // Default empty string if image is missing
    }));

    // Ensure sortedUsers contains only valid users (removes undefined/null)
    const sortedUsers = userIds
      .map((email) => users.find((user) => user.email === email))
      .filter(Boolean); // Remove undefined/null entries

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
    return []; // Return empty array in case of failure
  }
};

export const getDocumentUsers = async ({roomId, currentUser, text}: {roomId: string, currentUser:string,
  text: string
})=>{

  try {
    // fisrt get current room.
    const room = await liveblocks.getRoom(roomId)

    // get the user present in the room. and filter yourself.
    const usersInRoom = Object.keys(room.usersAccesses).filter((email) => email !== currentUser)

    // find user that u are mentioning.
    if(text.length){
      const lowerCaseText = text.toLowerCase()

      const MentionedUser = usersInRoom.filter((email:string) => email.toLocaleLowerCase().includes(lowerCaseText))

      return parseStringify(MentionedUser);
    }

    return parseStringify(usersInRoom)
  } catch (error) {
    console.log(`Error while getting the documentUser ${error}`)
  }

}