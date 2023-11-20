import { getFormattedDate } from '@/lib/utils'
import React from 'react'

const TransactionRecord = ({ transactionData }) => {
    return (
        <div className='w-full h-16 rounded-md shadow-md shadow-black/25'>
            <div className='w-full h-full px-8 flex flex-row items-center justify-between'>
                <p>{transactionData.date.split('T')[0]}</p>
                <p>{transactionData.type}</p>
                <p>{transactionData.amount}</p>
            </div>
        </div>
    )
}

export default TransactionRecord