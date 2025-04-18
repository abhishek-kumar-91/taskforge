import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";
import UserMenu from "./ui/user.menu";
import { checkUser } from "@/lib/checkUser";

const Header = async() => {
    await checkUser();
    return( 
  
    <header className="container mx-auto">
        <nav className="py-6 px-4 flex justify-between items-center">
            <Link href="/" className="flex items-center">
                <Image src="/logo1.png" width={24} objectFit="none" height={24} alt="taskForge"
                className="h-10 w-auto object-contain" />
                <h3 className="border-l-2 text-lg font-bold border-amber-500 px-2 text-gray-900">
                    <span className="underline">Task</span>
                    <span className="text-yellow-500">Forge</span>
                </h3>
            </Link>
       
   
        <div className="flex items-center gap-4">
        <Link href="/project/create">
            <Button variant="destructive">
            <PenBox size={18} />
            <span>Create Project</span></Button>
        </Link>
        <SignedOut forceRedirectUrl="/onboarding">
            
            <SignInButton> 
            <Button>Login</Button>
            </SignInButton>
        </SignedOut>

        <SignedIn>
           <UserMenu />
        </SignedIn>
        </div>
        </nav>
        </header>
)
};

export default Header;