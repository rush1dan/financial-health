'use client'

import { signIn } from 'next-auth/react'
import { useEffect } from 'react';

const LoginRedirect =  () => {
    useEffect(() => {
        async function gotoSignIn() {
            await signIn();
        }
        gotoSignIn();
    }, [])

    return null;
}

export default LoginRedirect