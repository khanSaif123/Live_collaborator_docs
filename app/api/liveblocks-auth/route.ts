import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// here we are authenticating users in lliveblocks 
export async function POST(request: Request) {

  // we want this work with clerk
  const clerkUser = await currentUser();

  if(!clerkUser) redirect('/sign-in')

  const {id, firstName, lastName, emailAddresses, imageUrl} = clerkUser
  // Get the current user from your database
  const user = {
    id,
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id)
    }
  }

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds:[],
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}