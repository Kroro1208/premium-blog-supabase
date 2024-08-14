import Link from 'next/link'
import React from 'react'
import LoginForm from './LoginForm';

const Navbar = () => {
    return (
        <nav className='flex items-center justify-between'>
            <div className='group'>
                <Link href="#" className='text-2xl font-bold'>Premium Blog</Link>
                <div className='h-1 w-0 group-hover:w-full transition-all bg-green-500'></div>
            </div>
            <LoginForm />
        </nav>
    )
}

export default Navbar
