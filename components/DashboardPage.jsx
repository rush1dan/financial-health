'use client'

import PageContext from '@/state/PageContext'
import React, { useContext, useEffect, useState } from 'react'
import Popup from './Popup';
import AddForm from './AddForm';
import { FetchStatus, apiPath } from '@/lib/utils';
import TransactionRecord from './TransactionRecord';
import axios from 'axios';
import LoadingWrapper from './LoadingWrapper';

const DashboardPage = () => {
    const { selectedPage } = useContext(PageContext);

    const [addFormOpened, setOpenAddForm] = useState(false);

    const [transactions, setTransactions] = useState([]);

    const [fetchState, setFetchState] = useState(FetchStatus.none);

    const getTransactions = async (route) => {
        try {
            setFetchState(FetchStatus.pending);
            const response = await axios.get(apiPath(`transaction/${route}/`));
            if (response.status === 200) {
                setTransactions(response.data);
                setFetchState(FetchStatus.success);
            }
        } catch (error) {
            console.log(error.message);
            setFetchState(FetchStatus.error);
        }
    }

    useEffect(() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        getTransactions(selectedPage === 'Monthly' ? `${year}/${month}` : `${year}`);
    }, [selectedPage]);

    return (
        <div className='w-full h-full'>
            <div className="block mx-auto w-full max-w-7xl min-h-full px-12 py-4">

                {/* Month and Year Button */}
                <div className="w-full py-4 flex flex-row items-center justify-start gap-x-4">
                    {
                        selectedPage === 'Monthly' &&
                        <button className="w-32 h-12 bg-yellow-200 text-xl font-semibold rounded-full">
                            Jan
                        </button>
                    }
                    <button className="w-32 h-12 bg-yellow-200 text-xl font-semibold rounded-full">
                        2023
                    </button>
                </div>

                {/* Chart + Score section */}
                <div className="w-full flex flex-row justify-between">
                    <div className="w-full aspect-video bg-green-400">

                    </div>
                    <div className="w-full aspect-video bg-blue-400">

                    </div>
                </div>

                {/* Add Button */}
                <button className='block mx-auto w-24 h-10 bg-purple-400 mt-8' onClick={() => setOpenAddForm(true)}>
                    Add
                </button>

                {
                    addFormOpened &&
                    <Popup className={'w-[32rem] rounded-xl h-[32rem] bg-white overflow-clip'} onClosed={() => setOpenAddForm(false)} popUpHeader={'Add Record'} hidden={!addFormOpened}>
                            <AddForm onTransactionAdded={(t) => { setOpenAddForm(false); setTransactions([t, ...transactions]) }} />
                    </Popup>
                }

                <div className='mt-8'></div>

                {/* Transactions */}
                <LoadingWrapper fetchState={fetchState}>
                    <div className='w-full h-fit'>
                        {
                            transactions.map((transactionData, index) => {
                                return (
                                    <TransactionRecord transactionData={transactionData} key={transactionData._id} />
                                )
                            })
                        }
                    </div>
                </LoadingWrapper>
            </div>
        </div>
    )
}

export default DashboardPage