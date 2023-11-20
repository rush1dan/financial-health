import React, { useEffect, useState } from 'react'

const Dropdown = ({ className, buttonClass, title, forceUseTitle, options, defaultOption, setOption }) => {
    const [open, setOpen] = useState(false);
    const [thisOption, setThisOption] = useState(forceUseTitle ? '' : defaultOption);
    useEffect(() => {
        setOption(defaultOption);
    }, [])

    return (
        <div className={className}>
            <div className='w-full h-full relative'>
                <button className={`w-full h-full border border-gray-300 text-base font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100
                        focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-center 
                        flex flex-row items-center justify-center gap-x-1`}
                    type="button" onClick={e => setOpen(!open)}>
                    {
                        thisOption ? thisOption : (title ? title : options[0])
                    }
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>
                <div id="dropdown" className={`${!open && 'hidden'} w-full z-10 divide-y divide-gray-100 rounded-lg shadow bg-gray-50
                    absolute top-full left-0`}>
                    <ul className="py-2 text-sm text-gray-800">
                        {
                            options.map((option, index) => {
                                return (
                                    <li key={option}>
                                        <button className="block w-full py-2 hover:bg-gray-200/50 hover:text-gray-900" type='button'
                                            onClick={e => { setOption(option); setThisOption(option); setOpen(false); }}>{option}</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dropdown