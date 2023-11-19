import { FetchStatus } from '@/lib/utils'
import React from 'react'

const ActionLink = ({children, isPending, onClick}) => {
    return (
        <div onClick={onClick} className={`cursor-pointer ${isPending ? 'pointer-events-none' : ''}`}>
            {children}
        </div>
    )
}

export default ActionLink