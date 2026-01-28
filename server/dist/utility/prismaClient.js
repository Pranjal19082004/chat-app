import { neonConfig } from "@neondatabase/serverless";
import { PrismaClient } from "../../src/generated/prisma/index.js";
import ws from "ws";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables
neonConfig.webSocketConstructor = ws;
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
export const Prisma = new PrismaClient({ adapter });
//# sourceMappingURL=prismaClient.js.map