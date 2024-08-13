import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className='flex items-center justify-between'>
            <div className='group'>
                <Link href="#" className='text-2xl font-bold'>Premium Blog</Link>
                <div className='h-1 w-0 group-hover:w-full transition-all bg-green-500'></div>
            </div>
            <Button variant="outline" className='flex items-center gap-2'>
                <FaGithub size="lg"/>
                ログイン
            </Button>
        </nav>
    )
}

export default Navbar
