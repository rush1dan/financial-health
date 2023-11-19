import React from 'react'
import { getServerSession } from 'next-auth';
import LoginRedirect from './LoginRedirect';
import authOptions from '@/app/api/auth/[...nextauth]/options';

const ProtectedRoute = async ({ children }) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <LoginRedirect />
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute