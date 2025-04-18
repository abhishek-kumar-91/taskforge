"use client";
import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesGantt } from 'lucide-react'


const UserMenu = () => {
  return (
   
    <UserButton
    appearance={
        {
            elements:{
                avatarBox: "w-16 h-16"
            }
        }
    }>

    <UserButton.MenuItems>
        <UserButton.Link label='My organizations' labelIcon={<ChartNoAxesGantt size={15} />}
        href='/onboarding'
         />
         <UserButton.Action label='manageAccount' />
    </UserButton.MenuItems>

    </UserButton>
  )
}

export default UserMenu