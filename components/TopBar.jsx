'use client'

import PageContext from '@/state/PageContext';
import React, { useContext } from 'react'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const TopBar = (props) => {
    const {selectedPage, setSelectedPage} = useContext(PageContext);

    const router = useRouter();
    async function handleSignOut() {
        await signOut({ redirect: false });
        router.push('/login');
    }

    return (
        <div className='w-full h-16 px-8 shadow-sm shadow-black'>
            <div className='w-full h-full flex flex-row items-center justify-between gap-x-12'>
                <Link href={'/'} className='flex flex-row items-center justify-center gap-x-1'>
                    <div className='w-8 h-8 relative'>
                        <Image src={'/FinLogo_Circle.png'} alt='logo' fill />
                    </div>
                    <div className='font-semibold text-lg text-gray-400'>
                        FinDr.
                    </div>
                </Link>
                <div className='flex flex-row items-center justify-center gap-x-10'>
                    <button onClick={() => setSelectedPage('Monthly')}
                        className={`${selectedPage === 'Monthly' ? 'font-bold text-gray-800' : 'font-semibold text-gray-400 hover:text-gray-600'}`}>
                        Monthly
                    </button>
                    <button onClick={() => setSelectedPage('Yearly')}
                        className={`${selectedPage === 'Yearly' ? 'font-bold text-gray-800' : 'font-semibold text-gray-400 hover:text-gray-600'}`}>
                        Yearly
                    </button>
                </div>
                <button className='flex flex-row items-center justify-center gap-x-2 px-2 py-2 bg-blue-900 
                hover:bg-blue-950 rounded-full border-2 border-white' onClick={handleSignOut}>
                    <p className='text-white font-semibold'>Logout</p>
                    <div className='w-4 h-4 relative'>
                        <Image src={'/log-out.svg'} alt='logout' fill />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default TopBar