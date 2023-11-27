import Image from 'next/image';
import React, { useState } from 'react'
import Popup from './Popup';
import EditForm from './EditForm';
import { FetchStatus } from '@/lib/utils';
import axios from 'axios';
import ActionButton from './ActionButton';
import { apiPath } from '@/lib/utils';

function transactionNature(type) {
    if (type === 'Income' || type === 'Asset') {
        return 1;
    }
    return -1;
}

const TransactionRecord = ({ transactionData, onTransactionDeleted }) => {
    const [editFormOpened, setOpenEditForm] = useState(false);
    const [deletionState, setDeletionState] = useState(FetchStatus.none);

    const deleteRecord = async () => {
        setDeletionState(FetchStatus.pending);
        try {
            const response = await axios.delete(apiPath('transaction/'), {data: transactionData});
            if (response.status === 200) {
                setDeletionState(FetchStatus.success);
                onTransactionDeleted?.();
            }
        } catch (error) {
            console.log(error.message);
            setDeletionState(FetchStatus.error);
        }
    }

    return (
        <div className='w-full py-3 rounded-md border-2 border-solid border-gray-300 shadow-lg shadow-gray-300/20'>
            <div className='w-full h-full px-8 flex flex-row items-center justify-between'>
                <div className='w-28 font-medium'>
                    {transactionData.date.split('T')[0]}
                </div>
                <div className='w-96 overflow-x-auto text-sm text-gray-800'>
                    {transactionData.description}
                </div>
                <div className='w-24 font-semibold text-center'>
                    {transactionData.type}
                </div>
                <div className={`w-48 font-bold text-right 
                ${transactionNature(transactionData.type) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {transactionNature(transactionData.type) > 0 ? '+' : '-'}{transactionData.amount}
                </div>
                <div className='h-full w-8 flex flex-col items-center justify-center gap-y-3'>
                    <button className='w-full aspect-square p-1 bg-slate-100 hover:bg-slate-200 border border-slate-400 rounded-md'
                        onClick={(e) => setOpenEditForm(true)}>
                        <div className='w-full h-full relative'>
                            <Image src='/edit.svg' alt='edit' fill />
                        </div>
                    </button>
                    <ActionButton buttonType='button'
                        className='w-full aspect-square p-1 bg-slate-100 hover:bg-slate-200 border border-slate-400 rounded-md'
                        isPending={deletionState === FetchStatus.pending}
                        onClick={(e) => deleteRecord()}>
                        <div className='w-full h-full relative'>
                            <Image src='/delete.svg' alt='edit' fill />
                        </div>
                    </ActionButton>
                </div>
            </div>

            {
                editFormOpened &&
                <Popup className={'w-[32rem] rounded-xl h-[32rem] bg-white overflow-clip'} onClosed={() => setOpenEditForm(false)} popUpHeader={'Edit Record'} hidden={!editFormOpened}>
                    <EditForm transactionToEdit={transactionData} onTransactionEdited={(t) => { setOpenEditForm(false); }} />
                </Popup>
            }
        </div>
    )
}

export default TransactionRecord