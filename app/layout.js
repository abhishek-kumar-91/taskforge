import Header from "@/components/header";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {ClerkProvider} from '@clerk/nextjs'


export const metadata = {
  title: "Work Scheduler",
  description: "Work schedule to increase productivity",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
   >
    <html lang="en" suppressHydrationWarning={true}>
      <body className="antialiased dotted-background" suppressHydrationWarning >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {/* {Header} */}
        <Header />
        <main className="min-h-screen">{children}</main>
        
        <footer className="py-12">
          <div className="container mx-auto px-4 font-bold bg-yellow-500 text-center text-gray-900">
            <p>/ All copyright reserved by taskForge /</p>
          </div>
        </footer>
          
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
