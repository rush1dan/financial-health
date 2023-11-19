import React from 'react'
import { FetchStatus } from '@/lib/utils'
import LoadingState from './LoadingState'

const LoadingWrapper = ({ children, fetchState, fetchInfo, loadImmediatelyOnSuccess=true}) => { 
    if (fetchState !== FetchStatus.none && (loadImmediatelyOnSuccess ? fetchState !== FetchStatus.success : true)) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                <LoadingState className={''} status={fetchState} info={fetchInfo} />
            </div>
        )
    }
    return (
        <>
            {children}
        </>
    )
}

export default LoadingWrapper