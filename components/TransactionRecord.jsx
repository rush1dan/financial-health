import React from 'react'

function transactionNature(type) {
    if (type === 'Income' || type === 'Asset') {
        return 1;
    }
    return -1;
}

const TransactionRecord = ({ dateOrMonth, transactionDescription, transactionType, transactionAmount}) => {
    return (
        <div className='w-full py-6 rounded-md border-2 border-solid border-gray-300 shadow-lg shadow-gray-300/20'>
            <div className='w-full h-full px-8 flex flex-row items-center justify-between'>
                <div className='w-28 font-medium'>
                    {dateOrMonth}
                </div>
                <div className='w-96 overflow-x-auto'>
                    {transactionDescription}
                </div>
                <div className='w-24 font-semibold text-center'>
                    {transactionType}
                </div>
                <div className={`w-48 font-bold text-right 
                ${transactionNature(transactionType) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {transactionNature(transactionType) > 0 ? '+' : '-'}{transactionAmount}
                </div>
            </div>
        </div>
    )
}

export default TransactionRecord