'use client'

import PageContext from '@/state/PageContext';
import React, { useContext } from 'react'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const TopBar = (props) => {
    const {selectedPage, setSelectedPage} = useContext(PageContext);

    const router = useRouter();
    async function handleSignOut() {
        await signOut({ redirect: false });
        router.push('/login');
    }

    return (
        <div className='w-full h-16 px-8 bg-blue-400'>
            <div className='w-full h-full flex flex-row items-center justify-between gap-x-12'>
                <p>Finealth</p>
                <div className='flex flex-row items-center justify-center gap-x-6'>
                    <button onClick={() => setSelectedPage('Monthly')} className={selectedPage === 'Monthly' ? 'font-bold' : ''}>
                        Monthly
                    </button>
                    <button onClick={() => setSelectedPage('Yearly')} className={selectedPage === 'Yearly' ? 'font-bold' : ''}>
                        Yearly
                    </button>
                </div>
                <button onClick={() => handleSignOut()} className=''>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default TopBar