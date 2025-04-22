"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// ✅ Create a new message
export async function createMessage({ message }) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  // Find user in DB
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const newMessage = await db.message.create({
    data: {
      message,
      clerkUserId: userId,
      organizationId: orgId,
    },
  });

  return newMessage;
}

// ✅ Get all messages for an organization
export async function getMessagesByOrgId(orgId) {
  if (!orgId) {
    throw new Error("Organization ID required");
  }

  const messages = await db.message.findMany({
    where: { organizationId: orgId },
    include: {
      user: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return messages;
}