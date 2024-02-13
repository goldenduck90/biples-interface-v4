import prisma from "@/lib/prisma";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";

export const currentProfile = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }


  //@ts-ignore
  const walletId = session?.user.walletId;

  const profile = await prisma.profile.findUnique({
    where: {
      userId: walletId,
    },
  });

  return profile;
};
