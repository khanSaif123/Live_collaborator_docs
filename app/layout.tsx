import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Provider from "./Provider";

export const metadata: Metadata = {
  title: "Live Docs",
  description: "Your got-to collaborative editer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3371FF",
          fontSize: "16px",
        },
      }}
    >
      <html lang="en">
        <body>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
