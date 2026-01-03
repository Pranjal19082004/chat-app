import {  Status, Type, ACK } from "../src/generated/prisma";
import { Prisma as prisma } from "../dist/utility/prismaClient";
import bcrypt from "bcrypt"
async function main() {
  console.log("🌱 Seeding database...");

  /* =======================
     USERS
  ======================= */
  const pwd = "abcd2580"
  const hashedPwd =await bcrypt.hash(pwd,10 )
  const users = await prisma.user.createMany({
    data: [
      {
        username: "alice",
        email: "alice@example.com",
        password: hashedPwd,
        status: Status.ONLINE,
      },
      {
        username: "bob",
        email: "bob@example.com",
        password: hashedPwd,
        status: Status.ACTIVE,
      },
      {
        username: "charlie",
        email: "charlie@example.com",
        password: hashedPwd,
        status: Status.OFFLINE,
      },
    ],
  });

  const allUsers = await prisma.user.findMany();

  const [alice, bob, charlie] = allUsers;

  /* =======================
     CONTACTS (USER ↔ USER)
  ======================= */
  await prisma.contact.createMany({
    data: [
      {
        userId: alice.id,
        contactId: bob.id,
      },
      {
        userId: alice.id,
        contactId: charlie.id,
      },
      {
        userId: bob.id,
        contactId: charlie.id,
      },
    ],
    skipDuplicates: true,
  });

  /* =======================
     GROUPS
  ======================= */
  const singleGroup = await prisma.group.create({
    data: {
      type: Type.SINGLE,
      Name: "Alice & Bob",
    },
  });

  const groupChat = await prisma.group.create({
    data: {
      type: Type.GROUP,
      Name: "Friends Group",
    },
  });

  /* =======================
     MEMBERS (USER ↔ GROUP)
  ======================= */
  await prisma.members.createMany({
    data: [
      // Single chat
      {
        userId: alice.id,
        groupId: singleGroup.id,
      },
      {
        userId: bob.id,
        groupId: singleGroup.id,
      },

      // Group chat
      {
        userId: alice.id,
        groupId: groupChat.id,
      },
      {
        userId: bob.id,
        groupId: groupChat.id,
      },
      {
        userId: charlie.id,
        groupId: groupChat.id,
      },
    ],
    skipDuplicates: true,
  });

  /* =======================
     MESSAGES
  ======================= */
  await prisma.message.createMany({
    data: [
      {
        groupId: singleGroup.id,
        senderId: alice.id,
        content: "Hey Bob 👋",
        ack: ACK.DOUBLE,
      },
      {
        groupId: singleGroup.id,
        senderId: bob.id,
        content: "Hi Alice!",
        ack: ACK.BLUE,
      },
      {
        groupId: groupChat.id,
        senderId: charlie.id,
        content: "Hello everyone!",
        ack: ACK.SINGLE,
      },
      {
        groupId: groupChat.id,
        senderId: alice.id,
        content: "Welcome Charlie 😊",
        ack: ACK.DOUBLE,
      },
    ],
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
