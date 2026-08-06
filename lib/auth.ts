import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import User from "@/model/User";
import Ban from "@/model/Ban";
import dbConnect from "@/lib/dbConnect";
import { toEnglishDigits } from "@/utils/numbers";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        phone: { type: "text" },
        password: { type: "password" },
        username: { type: "text" },
        isOtpLogin: { type: "text" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();

          const rawIdentifier = credentials?.phone || credentials?.email;
          if (!rawIdentifier) return null;

          const cleanIdentifier = toEnglishDigits(String(rawIdentifier));

          const user = await User.findOne({
            $or: [
              { phone: cleanIdentifier },
              { phone: cleanIdentifier.replace(/^0/, "") },
              { phone: `0${cleanIdentifier}` },
              { email: cleanIdentifier.toLowerCase() },
            ],
          });

          if (!user) return null;
          if (user.status === "blocked") return null;

          const isBanned = await Ban.findOne({ userId: user._id, status: "active" });
          if (isBanned) return null;

          const isOtp = String(credentials?.isOtpLogin) === "true";
          const pwd = credentials?.password;
          const hasPassword = pwd && pwd !== "undefined" && pwd.trim() !== "";

          if (!isOtp && hasPassword) {
            const isValid = await bcrypt.compare(pwd, user.password);
            if (!isValid) return null;
          }

          return {
            id: user._id.toString(),
            email: user.email || "",
            phone: user.phone || "",
            username: user.username || "",
            role: user.role || "user",
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google") {
        await dbConnect();
        if (!user?.email) return false;

        const emailClean = user.email.toLowerCase();
        const existing = await User.findOne({ email: emailClean });

        if (existing) {
          if (existing.status === "blocked") return false;
          const isBanned = await Ban.findOne({ userId: existing._id, status: "active" });
          if (isBanned) return false;
        }

        if (!existing) {
          const fallbackUsername = user.name || emailClean.split("@")[0] || "user";
          await User.create({
            username: fallbackUsername,
            fullName: user.name || "",
            email: emailClean,
            avatar: user.image || "",
            password: "",
            role: "user",
            status: "active",
          });
        } else {
          let updated = false;
          if (user.image && !existing.avatar) {
            existing.avatar = user.image;
            updated = true;
          }
          if (user.name && !existing.fullName) {
            existing.fullName = user.name;
            updated = true;
          }
          if (updated) {
            await existing.save();
          }
        }
        return true;
      }
      return true;
    },

    async jwt({ token, user }: any) {
      await dbConnect();
      let dbUser = null;

      const email = user?.email || token?.email;
      if (email) {
        dbUser = await User.findOne({ email: String(email).toLowerCase() });
      }

      if (!dbUser) {
        const potentialId = user?.id || token?.id || token?.sub;
        if (typeof potentialId === "string" && /^[0-9a-fA-F]{24}$/.test(potentialId)) {
          dbUser = await User.findById(potentialId);
        }
      }

      if (!dbUser && user?.phone) {
        dbUser = await User.findOne({ phone: user.phone });
      }

      if (dbUser) {
        if (dbUser.status === "blocked") {
          return {};
        }
        const isBanned = await Ban.findOne({ userId: dbUser._id, status: "active" });
        if (isBanned) {
          return {};
        }

        token.id = dbUser._id.toString();
        token.username = dbUser.username || dbUser.fullName || "";
        token.role = dbUser.role || "user";
        token.avatar = dbUser.avatar || "";
        token.email = dbUser.email || "";
        token.phone = dbUser.phone || "";
      }

      return token;
    },

    async session({ session, token }: any) {
      if (!token || !token.id) {
        return null;
      }
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.avatar = token.avatar;
        session.user.email = token.email || "";
        session.user.phone = token.phone || "";
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
