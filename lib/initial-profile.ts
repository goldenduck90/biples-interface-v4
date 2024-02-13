import prisma from "@/lib/prisma";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const initialProfile = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/sign-in");
  }

  //@ts-ignore
  const walletId = session?.user.walletId;

  const profile = await prisma.profile.findUnique({
    where: {
      userId: walletId,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await prisma.profile.create({
    data: {
      userId: walletId,
      name: (session?.user! as any).username!, //TODO
      imageUrl: "https://i.ibb.co/1dMWvKX/pfp.png",
      email: "test@test.com",
    },
  });

  return newProfile;
};
