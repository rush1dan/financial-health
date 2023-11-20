'use client'

import PageContext from '@/state/PageContext';
import React, { useContext } from 'react'

const TopBar = (props) => {
    const {selectedPage, setSelectedPage} = useContext(PageContext);

    return (
        <div className='w-full h-16 px-4 bg-blue-400'>
            <div className='w-full h-full flex flex-row items-center justify-start gap-x-6'>
                <p>Finealth</p>
                <button onClick={() => setSelectedPage('Monthly')} className={selectedPage === 'Monthly' ? 'font-bold' : ''}>
                    Monthly
                </button>
                <button onClick={() => setSelectedPage('Yearly')} className={selectedPage === 'Yearly' ? 'font-bold' : ''}>
                    Yearly
                </button>
            </div>
        </div>
    )
}

export default TopBar