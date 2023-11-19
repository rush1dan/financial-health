'use client'

import React from 'react'

const DashboardPage = () => {
    return (
        <div className='w-full h-full'>
            <div className="block mx-auto w-full max-w-7xl min-h-full px-12 py-4">

                {/* Month and Year Button */}
                <div className="w-full py-4 flex flex-row items-center justify-start gap-x-4">
                    <button className="w-32 h-12 bg-yellow-200 text-xl font-semibold rounded-full">
                        Jan
                    </button>
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
            </div>
        </div>
    )
}

export default DashboardPage