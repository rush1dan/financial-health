import React from 'react'

const TransactionRecord = ({ transactionData }) => {
    return (
        <div className='w-full py-4 rounded-md shadow-md shadow-black/25'>
            <div className='w-full h-full px-8 flex flex-row items-center justify-between'>
                <p>{transactionData.date.split('T')[0]}</p>
                <p className='w-1/2 overflow-ellipsis'>{transactionData.description}</p>
                <p>{transactionData.type}</p>
                <p>{transactionData.amount}</p>
            </div>
        </div>
    )
}

export default TransactionRecord