'use client'

import { useEffect, useState, useRef, FormEvent } from "react"
import { FetchStatus } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import LoadingWrapper from "@/components/LoadingWrapper";

export default function LoginPage() {
    const router = useRouter();

    const { data: session, status } = useSession();
    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/');
        }
    }, [status]);
    
    const formRef = useRef(null);

    const initialData = {
        email: '',
        password: ''
    }
    
    const [data, setData] = useState(initialData);
    const [fetchState, setFetchState] = useState(FetchStatus.none);
    const [fetchStateMsg, setFetchStateMsg] = useState('');
    
    async function handleSubmit(e) {
        e.preventDefault();
        setFetchState(FetchStatus.pending);
        try {
            const res = await signIn('credentials', { redirect: false, email: data.email, password: data.password });
            console.log(res);
            if (!res?.error) {
                setFetchState(FetchStatus.success);
                router.push('/user');
            } else {
                throw new Error(res.error);
            }
        } catch (error) {
            console.log("Error logging in", error);
            setFetchStateMsg(error.message);
            setFetchState(FetchStatus.error);
        } finally {
            formRef.current?.reset();
        }
    }

    return (
        <div className="w-screen h-screen">
            <LoadingWrapper fetchState={fetchState} fetchInfo={fetchStateMsg}>
                <div className='h-screen w-full'>
                    <div className="-mt-10 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign In
                            </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" action="#" method="POST" onSubmit={(e) => handleSubmit(e)} ref={formRef}>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => setData({ ...data, email: e.target.value })}
                                            placeholder="demouser@mail.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                            onChange={(e) => setData({ ...data, password: e.target.value })}
                                            placeholder="demopassword"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6
                                        text-white shadow-sm hover:bg-blue-500 focus-visible:outline
                                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </form>
                            <p className="mt-10 text-center text-sm text-gray-500">
                                Don&apos;t have an account?{' '}
                                <Link href="/register" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                                    Register
                                </Link>
                            </p>
                            <p className="mt-6 text-center text-sm text-gray-500">Or Use Any Of The Demo Accounts:</p>
                            <div className="bg-gray-400/20 rounded-lg p-8 mt-4">
                                <p className="w-full text-center"><span className="font-bold">Email:</span> demouser@mail.com</p>
                                <br></br>
                                <p className="w-full text-center"><span className="font-bold">Pasword:</span> demopassword</p>
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingWrapper>
        </div>
    )
}