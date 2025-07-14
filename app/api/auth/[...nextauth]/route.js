// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { existsSync } from "fs";
import { join } from "path";
import * as XLSX from "xlsx";
import { writeFile, readFile } from "fs/promises";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const filePath = join(process.cwd(), "logins.xlsx");
        let data = [];

        // Step 1: Read existing Excel file if it exists
        if (existsSync(filePath)) {
          const buffer = await readFile(filePath);
          const workbook = XLSX.read(buffer, { type: "buffer" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          data = XLSX.utils.sheet_to_json(sheet);
        }

        // Step 2: Add the new login entry
        data.push({
          Name: user.name,
          Email: user.email,
          Image: user.image,
          Date: new Date().toLocaleString(),
        });

        // Step 3: Write back updated data to Excel file
        const newSheet = XLSX.utils.json_to_sheet(data);
        const newBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newBook, newSheet, "Logins");

        const buffer = XLSX.write(newBook, { type: "buffer", bookType: "xlsx" });
        await writeFile(filePath, buffer);

        return true;
      } catch (err) {
        console.error("⚠️ Excel write error:", err);
        // Allow sign-in even if Excel writing fails
        return true;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
