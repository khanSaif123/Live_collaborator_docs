'use server';
import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";
import { liveblocks } from "../liveblocks";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
   
    const { data } = await clerkClient().users.getUserList({
      emailAddress: userIds
    });

    // Properly format users with correct email address access
    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`.trim(), // Handle empty names
      email: user.emailAddresses[0]?.emailAddress || '', // Safely access email
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) => users.find((user) => user.email === email))

    return parseStringify(sortedUsers)
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
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