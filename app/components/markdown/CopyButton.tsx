"use Client";
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { BsCopy } from 'react-icons/bs'
import { IoCheckmarkOutline } from 'react-icons/io5'


const CopyButton = ({ id }: { id: string }) => {
    const [onCopy, setCopy] = useState(false);
    const [onDone, setDone] = useState(false);

    const handleCopy = async () => {
        const text = document.getElementById(id)?.textContent;
        try {
            await navigator.clipboard.writeText(text!);
            setCopy(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div onClick={handleCopy} className='relative p-2 hover:scale-105 cursor-pointer hover:bg-zinc-700 rounded-md'>
            <IoCheckmarkOutline
                className={cn('cursor-pointer transition-all w-5 h-5 text-green-500', onDone ? "scale-100" : "scale-0")}
                onTransitionEnd={() => {
                    setTimeout(() => {
                        setCopy(false);
                        setDone(false);
                    }, 1000);
                }}
            />
            <div className='h-full w-full absolute top-0 left-0 flex items-center justify-center'>
                <BsCopy
                    className={cn('transition-all', onCopy ? "scale-0" : "scale-100")}
                    onTransitionEnd={() => {
                        if (onCopy) {
                            setDone(true);
                        }
                    }} />
            </div>
        </div>
    );
}

export default CopyButton
