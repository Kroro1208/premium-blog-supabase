"use client";
import { cn } from '@/lib/utils';
import { PersonIcon, ReaderIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navlinks = () => {
    const pathname = usePathname();
    const links = [
        {
            href: "/dashboard",
            text: "dashboard",
            Icon: ReaderIcon
        },
        {
            href: "/dashboard/user",
            text: "user",
            Icon: PersonIcon
        },
    ];
    return (
        <div className='flex items-center gap-5 border-b pb-2'>
            {links.map((link, index) => {
                return (
                    <Link href={link.href} key={index}
                        className={cn(
                            'flex items-center gap-1 hover:underline transition-all', { "text-green-500": pathname === link.href })}>
                        <link.Icon />{link.text}
                    </Link>
                )
            })}
        </div>
    )
}

export default Navlinks
