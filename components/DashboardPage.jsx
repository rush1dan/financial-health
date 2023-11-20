'use client'

import PageContext from '@/state/PageContext'
import React, { useContext, useState } from 'react'
import Popup from './Popup';
import AddForm from './AddForm';

const DashboardPage = () => {
    const { selectedPage } = useContext(PageContext);

    const [addFormOpened, setOpenAddForm] = useState(false);

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
                        <AddForm />
                    </Popup>
                }
            </div>
        </div>
    )
}

export default DashboardPage