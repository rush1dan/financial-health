import React, { useState } from 'react'
import Dropdown from './Dropdown'
import { FetchStatus, apiPath, getFormattedDate } from '@/lib/utils'
import axios from 'axios'
import ActionButton from './ActionButton'

const AddForm = ({onTransactionAdded}) => {
    const initialData = {
        date: getFormattedDate(new Date()),
        type: 'Income',
        amount: 0.00,
        description: ''
    }

    const [transactionData, setTransactionData] = useState(initialData);
    const [fetchState, setFetchState] = useState(FetchStatus.none);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFetchState(FetchStatus.pending);
        try {
            const response = await axios.post(apiPath('transaction/'), transactionData);
            if (response.status === 201) {
                setFetchState(FetchStatus.success);
            }
            
            e.target.reset();
            onTransactionAdded?.(response.data);
        } catch (error) {
            console.log(error.message);
            setFetchState(FetchStatus.error);
        }
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-y-4'>

            {/* Record Form */}
            <form className='w-full px-8 py-4 flex flex-col items-center justify-start gap-y-6' onSubmit={handleSubmit}>
                {/* Date Picker */}
                <label htmlFor='date'>
                    <input type="date" name='date' required defaultValue={getFormattedDate(new Date())} onChange={e => setTransactionData({...transactionData, date: e.target.value})} />
                </label>

                <div className='w-full flex flex-col items-center justify-start gap-y-4'>
                    <input
                        type="text"
                        name="description"
                        required
                        placeholder='Description'
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                        focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })}
                    />
                    <Dropdown className={'w-full h-10'} title={'Transaction Type'} forceUseTitle={false} options={['Income', 'Expense', 'Asset', 'Debt']}
                        defaultOption={'Income'}
                        setOption={(option) => setTransactionData({ ...transactionData, type: option })} />
                    <input
                        type="number"
                        step="0.01"
                        pattern="^\d*(\.\d{0,2})?$"
                        name="amount"
                        required
                        placeholder='Amount'
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm 
                        ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                        focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        onChange={(e) => setTransactionData({ ...transactionData, amount: Number(e.target.value).toFixed(2) })}
                    />
                </div>
                <ActionButton buttonType='submit' className='w-24 h-12 text-xl font-semibold bg-blue-500 text-white rounded-md'
                    isPending={fetchState === FetchStatus.pending}>Add</ActionButton>
            </form>
        </div>
    )
}

export default AddForm