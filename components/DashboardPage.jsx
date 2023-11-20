'use client'

import PageContext from '@/state/PageContext'
import React, { useContext, useEffect, useState } from 'react'
import Popup from './Popup';
import AddForm from './AddForm';
import { FetchStatus, apiPath, getMonthFromNumber, getMonthNumFromMonth, getYears, months } from '@/lib/utils';
import TransactionRecord from './TransactionRecord';
import axios from 'axios';
import LoadingWrapper from './LoadingWrapper';
import Dropdown from './Dropdown';
import ScoreCard from './ScoreCard';
import Image from 'next/image';

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

    const [selectedMonth, setSelectedMonth] = useState(new Date().getUTCMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());

    useEffect(() => {
        getTransactions(selectedPage === 'Monthly' ? `${selectedYear}/${selectedMonth}` : `${selectedYear}`);
    }, [selectedPage, selectedMonth, selectedYear]);

    return (
        <div className='w-full h-full overflow-y-auto'>
            <div className="block mx-auto w-full max-w-7xl min-h-full px-12 py-4">

                {/* Month and Year Button */}
                <div className="w-full py-4 flex flex-row items-center justify-start gap-x-4">
                    {
                        selectedPage === 'Monthly' &&
                        <Dropdown className="w-32 h-12" forceUseTitle={false} defaultOption={getMonthFromNumber(selectedMonth)}
                            options={months} setOption={(option) => setSelectedMonth(getMonthNumFromMonth(option))}>
                        </Dropdown>
                    }
                    <Dropdown className="w-32 h-12" forceUseTitle={false} defaultOption={selectedYear}
                        options={getYears(50)} setOption={(option) => setSelectedYear(Number(option))}>
                    </Dropdown>
                </div>

                {/* Chart + Score section */}
                <div className="w-full flex flex-row items-center justify-center">
                    {/* <div className="w-full aspect-video bg-green-400">

                    </div> */}
                    <div className="w-full max-w-[32rem] aspect-video">
                        <LoadingWrapper fetchState={fetchState}>
                            <ScoreCard transactions={transactions} />
                        </LoadingWrapper>
                    </div>
                </div>

                {/* Add Button */}
                <button className='block mx-auto w-28 h-12 bg-gray-200 hover:bg-gray-300 border-dashed border-2 border-gray-400 rounded-lg mt-8 py-1' onClick={() => setOpenAddForm(true)}>
                    <div className='h-full aspect-square relative block mx-auto'>
                        <Image src='/plus.svg' alt='add' fill />
                    </div>
                </button>

                {
                    addFormOpened &&
                    <Popup className={'w-[32rem] rounded-xl h-[32rem] bg-white overflow-clip'} onClosed={() => setOpenAddForm(false)} popUpHeader={'Add Record'} hidden={!addFormOpened}>
                        <AddForm onTransactionAdded={(t) => { setOpenAddForm(false); }} />
                    </Popup>
                }

                <div className='mt-8'></div>

                {/* Transactions */}
                <LoadingWrapper fetchState={fetchState}>
                    {
                        transactions.length > 0 ?
                            <div className='w-full h-fit flex flex-col items-center justify-start gap-y-6'>
                                {
                                    transactions.map((transactionData, index) => {
                                        return (
                                            <TransactionRecord transactionData={transactionData} key={transactionData._id} />
                                        )
                                    })
                                }
                            </div> :
                            <div className='w-full text-center text-2xl font-semibold text-gray-400'>
                                No records yet
                            </div>
                    }
                </LoadingWrapper>
            </div>
        </div>
    )
}

export default DashboardPage