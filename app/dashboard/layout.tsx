import React, { ReactNode } from 'react'
import Navlinks from './componets/Navlinks'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='space-y-5'>
            <Navlinks />
            {children}
        </div>
    )
}

export default layout
