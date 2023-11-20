'use client'

import React, { useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import PageContext from '@/state/PageContext';

const Providers = ({ children }) => {
    const [selectedPage, setSelectedPage] = useState('Monthly');
    return (
        <SessionProvider>
            <PageContext.Provider value={{ selectedPage, setSelectedPage }} >
                {children}
            </PageContext.Provider>
        </SessionProvider>
    )
}

export default Providers